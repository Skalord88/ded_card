import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useData } from "../components/Context/Context";
import { DiceText, throwDice } from "../components/Dice/Functions";
import { ThrowDice } from "../components/Dice/ThrowDice";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, signAndCountToString } from "../components/functions";
import { CharacterPc, Weapon } from "../components/interfaces";
import { modifiedCharacter } from "../components/ModifiedCharacter/functions/ModifiedCharacter";
import {
  ModifiedCharacter,
  WeaponElement
} from "../components/ModifiedCharacter/interface/ModifiedCharacter";
import {
  ARMOR_BONUS,
  SHIELD_BONUS
} from "../components/Prerequisite/interface/ModifierEnum";
import {
  mapAllAttacksAreas,
  SummaryCharAttacksSingleElement
} from "../components/SummaryChar/component/SummaryCharAttacks";
import { TotAndBonusElement } from "../components/SummaryChar/component/TotAndBonus";
import { noneWeapon } from "../components/variables";
import { PageLayoutBody } from "./AppLayout";
import {
  indexInPositionInMenuFight,
  positionInIndexInMenuAFight
} from "../components/Fight/component/Menu";

export const createBorder = (
  selected: boolean
  //   position: number | string | string[],
  //   index: number | string
): string => {
  //   const selected = Array.isArray(position)
  //     ? position.includes(String(index))
  //     : position === index;

  return selected
    ? "rpgui-container-framed golden"
    : "rpgui-container-framed grey";
};

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
              const border: string = createBorder(
                true
                // clickMenu[0], indexA
              );
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
              const border: string = createBorder(
                true
                // clickMenu[1], indexB
              );
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

      {/* <div className="fullAttackSection">
    <div style={{ gridArea: "w1", background: "red" }}>1</div>
    <div style={{ gridArea: "w2", background: "blue" }}>2</div>
    <div style={{ gridArea: "wA", background: "green" }}>3</div>
    <div style={{ gridArea: "w21", background: "yellow" }}>4</div>
    <div style={{ gridArea: "w22", background: "orange" }}>5</div>
    <div style={{ gridArea: "w2A", background: "pink" }}>6</div>
</div> */}
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

export type DamageWeaponChar = {
  weaponDamage: string;
  weaponCrit: string;
  charDamage: number;
};

export type FightOptions = {
  text: string;
  number: number;
  damage?: DamageWeaponChar;
};

export const createDefenceOptions = (
  char: ModifiedCharacter,
  optionAction?: string
): FightOptions[] => {
  if (!char) return [];
  if (optionAction && optionAction === "Attack") {
    const touch = char.toListArmorClass?.filter(
      (a) => ![ARMOR_BONUS.text, SHIELD_BONUS.text].includes(a.text ?? "")
    );

    return [
      {
        text:
          char.toListArmorClass?.map((a) => a.bonus + a.pop.text).join(", ") ??
          "",
        number: char.toListArmorClass?.reduce((tot, a) => tot + a.bonus, 0) ?? 0
      },
      {
        text: touch?.map((a) => a.bonus + a.pop.text).join(", ") ?? "",
        number: touch?.reduce((tot, a) => tot + a.bonus, 0) ?? 0
      }
    ];
  } else return [];
};

export const textCreateAttackOptions = (
  w: WeaponElement,
  d: DamageWeaponChar
) => {
  return (
    signAndCountToString([w.babMelee ?? 0], true) +
    " " +
    w.weapon?.name +
    " " +
    w.weapon?.damage +
    (d.charDamage < 0 ? "-" : "+") +
    d.charDamage +
    " " +
    DiceText(d.weaponCrit)
  );
};

export const createElementAttackOption = (
  weaponElement?: WeaponElement,
  weaponBab?: number,
  weaponDamage?: string,
  weaponCritical?: string,
  charDamage?: number
): FightOptions => {
  // if(!weaponElement || !weaponDamage || !weaponCritical || !charDamage) return null
  const damages: DamageWeaponChar = {
    weaponDamage: weaponDamage ?? "",
    weaponCrit: weaponCritical ?? "",
    charDamage: charDamage ?? 0
  };
  return {
    text: weaponElement ? textCreateAttackOptions(weaponElement, damages) : "",
    number: Math.floor(weaponBab ?? 0),
    damage: damages
  };
};

export type AttackOptionsElement = {
  element: WeaponElement | undefined;
  area: string;
  show: boolean;
  selected?: boolean;
};

export const createAttackOptions = (
  char: ModifiedCharacter,
  optionAction?: string
): AttackOptionsElement[] => {
  if (!char) return [];
  if (optionAction === "Attack") {
    // if (char.attacks) {
    return mapAllAttacksAreas([
      char.attacks?.firstAttackSetOne || undefined,
      char.attacks?.secondAttackSetOne || undefined,
      char.attacks?.additionalAttackSetOne || undefined,
      char.attacks?.firstAttackSetTwo || undefined,
      char.attacks?.secondAttackSetTwo || undefined,
      char.attacks?.additionalAttackSetTwo || undefined
    ]);
    // return areas;
    // }
  }
  return [];
};

type ClickMenu = [string | null, string | null, string];

const weaponMap = {
  w1: { group: "I", index: 0 },
  w2: { group: "I", index: 1 },
  wA: { group: "I", index: 0 },

  w21: { group: "II", index: 0 },
  w22: { group: "II", index: 1 },
  w2A: { group: "II", index: 0 }
} as const;

const changePosition = (position: string, clickMenu: ClickMenu): ClickMenu => {
  // A, B, C...
  if (!(position in weaponMap)) {
    return [clickMenu[0], clickMenu[1], position];
  }

  const info = weaponMap[position as keyof typeof weaponMap];

  const currentPosition = clickMenu[0] ?? clickMenu[1];

  // Se sto cambiando gruppo:
  // I -> II oppure II -> I
  if (
    currentPosition &&
    weaponMap[currentPosition as keyof typeof weaponMap].group !== info.group
  ) {
    return info.index === 0
      ? [position, null, clickMenu[2]]
      : [null, position, clickMenu[2]];
  }

  // Stesso gruppo
  const result: ClickMenu = [clickMenu[0], clickMenu[1], clickMenu[2]];

  result[info.index] = position;

  return result;
};

const getMaxCounter = (
  clickMenu: ClickMenu,
  weapon: AttackOptionsElement
): number => {
  // let max = 0;

  // attacco principale
  let max = weapon.element?.weaponThrown ? 2 : 1;

  // seconda arma
  if (clickMenu[1]) {
    if (!weapon.element?.weaponTwoHanded) max++;
  }

  return max;
};

const updateCounter = (
  oldMenu: ClickMenu,
  newMenu: ClickMenu,
  counter: number,
  max: number
): number => {
  const same =
    oldMenu[0] === newMenu[0] &&
    oldMenu[1] === newMenu[1] &&
    oldMenu[2] === newMenu[2];

  if (!same) {
    return 0;
  }

  return (counter + 1) % (max + 1);
};

const ActionMenu: React.FC<ActionMenuProps> = ({ charAB, optionAction }) => {
  const [thrownDice, setThrownDice] = useState<{
    one: number;
    molti: number[];
  } | null>(null);
  const [clickMenu, setClickMenu] = useState<ClickMenu>(["w1", null, "A"]);
  const [selectedAttackIndex, setSelectedAttackIndex] = useState<number>(0);

  if (charAB && charAB.length > 0 && charAB[0] && charAB[1]) {
    const defenceOptions: FightOptions[] = createDefenceOptions(
      charAB[1],
      optionAction
    );

    const attackOptions: AttackOptionsElement[] = createAttackOptions(
      charAB[0],
      optionAction
    );

    const throwAction = () => {
      const tiro: { one: number; molti: number[] } = {
        one: throwDice(20),
        molti: [throwDice(20)]
        // attackOptions[0].element?. .listBab.map((a) => throwDice(20)) || []
      };
      setThrownDice(tiro);
    };

    const setSelectClickMenu = (index: string) => {
      const newMenu = changePosition(index, clickMenu);

      const max = getMaxCounter(
        newMenu,
        attackOptions[positionInIndexInMenuAFight(index)]
      );

      console.log("index", index);
      console.log(
        "counter",
        updateCounter(clickMenu, newMenu, selectedAttackIndex, max)
      );
      console.log("clickMenu", clickMenu);
      console.log("newMenu", newMenu);

      setSelectedAttackIndex((prev) =>
        updateCounter(clickMenu, newMenu, prev, max)
      );

      setClickMenu(newMenu);
    };

    const deselectClickMenu = (index: string) => {
      setClickMenu([
        clickMenu[0] === index ? null : clickMenu[0],
        clickMenu[1] === index ? null : clickMenu[1],
        clickMenu[2]
      ]);
    };

    return (
      <div
        className="rpgui-container-framed grey"
        style={{ flex: 3, display: "flex" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateAreas: `
      "w1 w2"
      "wA ."
      "w21 w22"
      "w2A ."
    `,
            gap: 8
          }}
        >
          {attackOptions.map((att, indexAtt) => {
            // const gridArea = att.area;
            // console.log(att.area);
            const border: string = createBorder(
              clickMenu[0] === att.area || clickMenu[1] === att.area
            );
            return (
              <div
                style={{ gridArea: att.area }}
                onClick={() => setSelectClickMenu(att.area)}
                onDoubleClick={() => deselectClickMenu(att.area)}
              >
                <p>{att.area}</p>
                <SummaryCharAttacksSingleElement
                  key={indexAtt}
                  border={border}
                  totAndBonusAtt={[false, true, false, true]}
                  weapon={att.element?.weapon || noneWeapon}
                  listBab={att.element?.listBabMeleeSpecificBonus || []}
                  damage={att.element?.toListMeleeDamage || []}
                  totAndBonusDmg={[false, true, true]}
                />
              </div>
            );
          })}
        </div>
        <div style={{ flex: 1 }} className="rpgui-container-framed grey">
          <Button className="rpgui-button" onClick={() => throwAction()}>
            <p>throw</p>
          </Button>

          <div>
            {thrownDice && (
              <ThrowDice
                dice={thrownDice}
                value={
                  attackOptions[0]
                  // positionInIndexInMenuAFight(clickMenu[0])
                }
                target={
                  // positionInIndexInMenuBFight(clickMenu[1])
                  defenceOptions[0].number
                }
              />
            )}
          </div>
          {/* )} */}
        </div>
        <div style={{ flex: 1 }}>
          {defenceOptions.map((ca, indexCA) => {
            const border: string = createBorder(
              clickMenu[2] === (indexCA === 0 ? "A" : indexCA === 1 ? "B" : "C")
            );
            return (
              <div
                key={indexCA}
                className={border}
                onClick={() =>
                  setSelectClickMenu(
                    indexCA === 0 ? "A" : indexCA === 1 ? "B" : "C"
                  )
                }
              >
                <p>
                  {indexCA === 0 && <span>{"CA "}</span>}
                  {indexCA === 1 && <span>{"touch "}</span>}
                  {indexCA === 2 && <span>{"flat-footed "}</span>}
                  <span>{ca.number}</span>
                </p>
                <p>{ca.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};
// else if (!optionAction) {
//   return <div style={{ flex: 3 }}></div>;
// }
// };
