import { useEffect, useState } from "react";
import { FightAttack } from "../components/Attack";
import { PageLayoutBody } from "./AppLayout";
import { CharacterPc } from "../components/interfaces";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { useData } from "../components/Context/Context";
import {
  addToDrop,
  signAndCount,
  signAndCountToString
} from "../components/functions";
import { modifiedCharacter } from "../components/ModifiedCharacter/functions/ModifiedCharacter";
import { ModifiedCharacter } from "../components/ModifiedCharacter/interface/ModifiedCharacter";
import { D20Popup } from "../components/Popup/DicePopup/D20Popup";
import { Button } from "react-bootstrap";
import { DiceNumber, throwDice } from "../components/Dice/Functions";
import { ThrowDice, ThrownResultat } from "../components/Dice/ThrowDice";

export function Fight() {
  const { getData, loading, reload } = useData();

  useEffect(() => {
    reload("charList");
  }, [reload]);

  const charList = addToDrop(getData("charList"), (c) => c.characterName);

  const [sideA, setSideA] = useState<ModifiedCharacter[]>([]);
  const [sideB, setSideB] = useState<ModifiedCharacter[]>([]);
  const [clickMenu, setClickMenu] = useState<[number, number]>([0, 0]);
  const [optionActionMenu, setActionOption] = useState<string>();

  const addToSide = (char: CharacterPc, side: boolean) => {
    side
      ? setSideA(sideA.concat([modifiedCharacter(char)]))
      : setSideB(sideB.concat([modifiedCharacter(char)]));
  };
  const delToSide = (index: number, side: boolean) => {
    if (side) {
      setSideA((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSideB((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (loading.charList) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayoutBody>
      {charList && (
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, true)}
            />
            <div>
              {/* <p>
                {clickMenu[0]} {sideA[clickMenu[0]]?.name}
              </p> */}
            </div>
            {sideA.map((a, indexA) => {
              const border: string =
                clickMenu[0] === indexA
                  ? "rpgui-container-framed golden"
                  : "rpgui-container-framed grey";
              // console.log(clickMenu)
              return (
                <div key={indexA}>
                  <div>
                    <p className={border}>
                      <span
                        style={{ color: "orange" }}
                        onClick={() => delToSide(indexA, true)}
                      >
                        X
                      </span>
                      <span
                        onClick={() => setClickMenu([indexA, clickMenu[1]])}
                      >
                        {a.name + ", " + a.title}
                      </span>
                    </p>
                  </div>
                  {clickMenu[0] === indexA && (
                    <FightsMenu selectOption={(opt) => setActionOption(opt)} />
                  )}
                </div>
              );
            })}
          </div>

          {optionActionMenu && (
            <ActionMenu
              charAB={[sideA[clickMenu[0]], sideB[clickMenu[1]]]}
              optionAction={optionActionMenu}
            />
          )}

          <div style={{ flex: 1 }}>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, false)}
            />
            <div>{/* <p>{clickMenu[1]}</p> */}</div>
            {sideB.map((b, indexB) => {
              const border: string =
                clickMenu[1] === indexB
                  ? "rpgui-container-framed golden"
                  : "rpgui-container-framed grey";
              return (
                <div>
                  <p className={border}>
                    <span
                      style={{ color: "orange" }}
                      onClick={() => delToSide(indexB, false)}
                    >
                      X
                    </span>
                    <span onClick={() => setClickMenu([clickMenu[0], indexB])}>
                      {b.name + ", " + b.title}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PageLayoutBody>
  );
}

export type FightsProps = {
  selectOption?: (option: string) => void;
};

const FightsMenu: React.FC<FightsProps> = ({ selectOption }) => {
  // const [option, setOption] = useState<string>("");
  const setMenuOption = (opt: string) => {
    if (selectOption) selectOption(opt);
  };
  return (
    <div className="rpgui-container-framed golden">
      <div>
        <p onClick={() => setMenuOption("Attack")}>Attack</p>
      </div>
      <div>
        <p>Magic</p>
      </div>
      <div>
        <p>Action</p>
      </div>
      <div>
        <p>Skills</p>
      </div>
      {/* <div style={{ flex: 3 }}>{option === "Attack" && <FightAttack />}</div> */}
    </div>
  );
};

export type ActionMenuProps = {
  charAB?: [ModifiedCharacter, ModifiedCharacter];
  optionAction?: string;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ charAB, optionAction }) => {
  const [thrown, setThrown] = useState<number>();
  const [thrownResultat, setThrownResultat] = useState<number>();
  const [damage, setDamage] = useState<number[]>();
  if (charAB && charAB.length > 0 && charAB[0] && charAB[1]) {
    if (optionAction && optionAction === "Attack") {
      const damages: number[] = DiceNumber(charAB[0].attacks?.firstMelee.weapon?.damage ?? "")
      const firstMelee: {
        text: string;
        number: number;
        damage: number[];
      } = {
        text:
          signAndCountToString(
            [charAB[0].attacks?.firstMelee.babMelee ?? 0],
            true
          ) +
          " " +
          charAB[0].attacks?.firstMelee.weapon?.name +
          " " +
          charAB[0].attacks?.firstMelee.weapon?.damage,
        number: Math.floor(charAB[0].attacks?.firstMelee.babMelee ?? 0),
        damage: damages.concat([
          charAB[0].attacks?.firstMelee.damageMelee ?? 0
        ])
      };

      const caB: {
        text: string;
        number: number;
      } = {
        text:
          charAB[1]?.toListArmorClass
            ?.map((a) => a.bonus + a.pop.text)
            .join(", ") ?? "",
        number:
          charAB[1]?.toListArmorClass?.reduce((tot, a) => tot + a.bonus, 0) ?? 0
      };

      const throwAction = () => {
        const tiro: number = throwDice(20);
        setThrown(tiro);
        const resultat: number = tiro + firstMelee.number;
        setThrownResultat(resultat);
      };

      return (
        <div
          className="rpgui-container-framed golden"
          style={{ flex: 3, display: "flex" }}
        >
          <div style={{ flex: 1 }}>
            <p>{firstMelee.text}</p>
          </div>
          <div style={{ flex: 1 }}>
            <Button className="rpgui-button" onClick={() => throwAction()}>
              <p>throw</p>
            </Button>
            {thrownResultat && (
              <div>
                <ThrowDice dice={thrown ?? 0} value={firstMelee.number} />
                <ThrownResultat value={thrownResultat} target={caB.number} />
                {/* <ThrowDice dice={thrown ?? 0} value={firstMelee.number} /> */}
                {firstMelee.damage}
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <p>CA {caB.number}</p>
            <p>{caB.text}</p>
          </div>
        </div>
      );
    }
  } else if (!optionAction) {
    return <div style={{ flex: 3 }}></div>;
  }
};
