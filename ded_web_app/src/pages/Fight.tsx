import { useEffect, useMemo, useState } from "react";
import { useData } from "../components/Context/Context";
import { DiceText } from "../components/Dice/Functions";
import { ThrowDice, ThrowDicePropsWeapon } from "../components/Dice/ThrowDice";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { positionInIndexInMenuBFight } from "../components/Fight/function/Menu";
import { addToDrop, signAndCountToString } from "../components/functions";
import { SelectedCheck } from "../components/Icon/SelectedCheck";
import { CharacterPc } from "../components/interfaces";
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
  MapAllAttacksElements
} from "../components/SummaryChar/component/SummaryCharAttacks";
import { TotAndBonusElement } from "../components/SummaryChar/component/TotAndBonus";
import { PageLayoutBody } from "./AppLayout";
import { changePosition } from "../components/Fight/function/changePosition";
import {
  createAttackOptions,
  AttackOptionsElement
} from "../components/Fight/function/createAttackOptions";

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
            <div>
              <h3>side A</h3>
            </div>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, true)}
            />
            <div></div>
            {sideA.map((a, indexA) => {
              const border: string = createBorder(clickMenu[0] === indexA);
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
            <div>
              <h3>side B</h3>
              {/* {optionActionMenu && (<p>{optionActionMenu}</p>)} */}
            </div>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, false)}
            />
            {sideB.map((b, indexB) => {
              const border: string = createBorder(clickMenu[1] === indexB);
              return (
                <div key={indexB}>
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
  const setMenuOption = (opt: string) => {
    if (selectOption) selectOption(opt);
  };
  return (
    <div className="rpgui-container-framed golden-2">
      <div>
        <p
          className="rpgui-cursor-point"
          onClick={() => setMenuOption("Attack")}
        >
          Attack
        </p>
      </div>
      <div>
        <p
          className="rpgui-cursor-point"
          onClick={() => setMenuOption("Magic")}
        >
          Magic
        </p>
      </div>
      <div>
        <p
          className="rpgui-cursor-point"
          onClick={() => setMenuOption("Action")}
        >
          Action
        </p>
      </div>
      <div>
        <p
          className="rpgui-cursor-point"
          onClick={() => setMenuOption("Skills")}
        >
          Skills
        </p>
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
  }
  if (optionAction && optionAction === "Magic") {
    return [
      {
        text: "Fortitude",
        number: char.fortitude?.reduce((tot, a) => tot + a.bonus, 0) ?? 0
      },
      {
        text: "Reflex",
        number: char.reflex?.reduce((tot, a) => tot + a.bonus, 0) ?? 0
      },
      {
        text: "Will",
        number: char.will?.reduce((tot, a) => tot + a.bonus, 0) ?? 0
      }
    ];
  }
  return [];
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

export type ClickMenu = [string | null, string | null, string];

type AttackCounter = {
  [position: string]: [number, boolean | undefined];
};

export type AttackSelection = {
  menu: ClickMenu;
  counters: AttackCounter;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ charAB, optionAction }) => {
  const [attackSelection, setAttackSelection] = useState<AttackSelection>({
    menu: ["w1", null, "A"],
    counters: {
      w1: [0, undefined],
      w2: [0, undefined],
      wA: [0, undefined],
      w21: [0, undefined],
      w22: [0, undefined],
      wA2: [0, undefined]
    }
  });

  const defenceOptions: FightOptions[] =
    charAB && charAB.length > 1
      ? createDefenceOptions(charAB[1], optionAction)
      : [];

  const attackOptions = useMemo(
    () =>
      charAB && charAB.length > 0
        ? createAttackOptions(charAB[0], optionAction)
        : [],
    [charAB, optionAction]
  );

  const deselectAttackSelection = (index: string) => {
    setAttackSelection((prev) => ({
      ...prev,
      menu: [
        prev.menu[0] === index ? null : prev.menu[0],
        prev.menu[1] === index ? null : prev.menu[1],
        prev.menu[2]
      ]
    }));
  };

  const handleWeaponClick = (position: string, isThrown?: boolean) => {
    setAttackSelection((prev) => {
      const oldMenu = prev.menu;
      const newMenu = changePosition(position, prev);

      const oldCounter = prev.counters[position] ?? 0;

      const addingSecondWeapon =
        oldMenu[0] !== null && oldMenu[1] === null && oldMenu[0] !== position;

      const counter = addingSecondWeapon ? 1 : oldCounter[0] === 0 ? 1 : 0;

      return {
        menu: newMenu,
        counters: {
          ...prev.counters,
          [position]:
            isThrown !== undefined ? [counter, isThrown] : [counter, undefined]
        }
      };
    });
  };

  const handleThrowClick = (position: string, isThrown: boolean) => {
    setAttackSelection((prev) => ({
      ...prev,
      counters: {
        ...prev.counters,
        [position]: [
          prev.counters[position]
            ? prev.counters[position][0]
            : prev.counters[position],
          isThrown
        ]
      }
    }));
  };

  const throwDiceWeapon = useMemo(() => {
    const positions = [attackSelection.menu[0], attackSelection.menu[1]];

    return positions.map((position) => {
      if (position === null) {
        return null;
      }

      const att = attackOptions.find((a) => a.area === position);

      if (!att?.element?.weapon) {
        return null;
      }

      const element = att.element;

      const listBabBonus = [
        element.listBabMeleeSpecificBonus ?? [],
        element.listBabRangedSpecificBonus ?? [],
        element.listBabMeleeTwoWeaponSpecificBonus ?? [],
        element.listBabRangedTwoWeaponSpecificBonus ?? []
      ];

      const listDamage = [
        element.toListMeleeDamage ?? [],
        element.toListRangedDamage ?? [],
        element.toListMeleeTwoWeaponDamage ?? [],
        element.toListRangedTwoWeaponDamage ?? []
      ];

      const ranged = element.weaponRanged ?? false;

      const counter = attackSelection.counters[position];

      const hasTwoWeapons =
        attackSelection.menu[0] !== null && attackSelection.menu[1] !== null;

      const listBab = showBabListByIndex(
        listBabBonus,
        hasTwoWeapons,
        counter[0],
        ranged,
        element.weaponThrown ?? false,
        counter[1],
        element.weaponTwoHanded ?? false
      );

      const listDmg = showDmgListByIndex(
        listDamage,
        hasTwoWeapons,
        counter[0],
        ranged,
        element.weaponThrown ?? false,
        counter[1],
        element.weaponTwoHanded ?? false
      );

      return {
        position,
        weapon: element.weapon,
        listBab,
        listDamage: listDmg
        // totalDamage
      };
    }) as [ThrowDicePropsWeapon | null, ThrowDicePropsWeapon | null];
  }, [attackSelection, attackOptions]);

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
          gap: 4
        }}
      >
        {attackOptions.map((att, indexAtt) => {
          if (att.show === false) return null;
          const actualListBab =
            throwDiceWeapon[0]?.position === att.area
              ? throwDiceWeapon[0]?.listBab
              : throwDiceWeapon[1]?.position === att.area
                ? throwDiceWeapon[1]?.listBab
                : [];
          const actualListDamage =
            throwDiceWeapon[0]?.position === att.area
              ? throwDiceWeapon[0]?.listDamage
              : throwDiceWeapon[1]?.position === att.area
                ? throwDiceWeapon[1]?.listDamage
                : [];

          const currentCounter = attackSelection.counters[att.area];
          const counter = Array.isArray(currentCounter)
            ? currentCounter[0]
            : currentCounter;
          return (
            <div style={{ gridArea: att.area }} key={indexAtt}>
              {/* <p>{attackSelection.counters[att.area]}</p> */}
              <OneAttackOptionsElement
                att={att}
                myIndex={att.area}
                indexOne={attackSelection.menu[0]}
                indexTwo={attackSelection.menu[1]}
                onAction={(isThrown, toTwo) =>
                  handleWeaponClick(
                    att.area,
                    isThrown
                    // , toTwo
                  )
                }
                onThrow={(isThrown) => handleThrowClick(att.area, isThrown)}
                // onToTwo={(toTwo) => handleWeaponClick(att.area, toTwo)}
                onDeAction={() => deselectAttackSelection(att.area)}
                counter={counter}
                listBabBonus={actualListBab}
                listDamage={actualListDamage}
              />
              
              {att.element?.weaponRanged && charAB && charAB[0] && (
                <>
                <p>Quiver:</p>
                  {charAB[0].inventory?.quiver?.map((q, indexQ) => (
                    <div key={indexQ}>
                      <p>
                        {q.quantity}x {q.item.name}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1 }} className="rpgui-container-framed grey">
        <div>
          {throwDiceWeapon && (
            <div>
              <ThrowDice
                weapons={throwDiceWeapon}
                target={
                  defenceOptions[
                    positionInIndexInMenuBFight(attackSelection.menu[2])
                  ].number
                }
              />
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {defenceOptions.map((ca, indexCA) => {
          const border: string = createBorder(
            attackSelection.menu[2] ===
              (indexCA === 0 ? "A" : indexCA === 1 ? "B" : "C")
          );
          return (
            <div
              key={indexCA}
              className={border}
              onClick={() =>
                handleWeaponClick(
                  indexCA === 0 ? "A" : indexCA === 1 ? "B" : "C"
                )
              }
            >
              {optionAction && <OneDefendOptionsElement option={optionAction} index={indexCA} def={ca} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export type OneDefendOptionsElementProps = {
  option: string;
  index: number;
  def: FightOptions;
};

const OneDefendOptionsElement: React.FC<OneDefendOptionsElementProps> = ({
  option,
  index,
  def
}) => {
  const optionShow: string =
    option === "Attack"
      ? index === 0
        ? "CA "
        : index === 1
          ? "touch "
          : "flat-footed "
        : "";
  return (
    <>
      <p>
        {optionShow.length > 0 && <span>{optionShow}</span>}
        <span>{Math.floor(def.number)}</span>
      </p>
      <p>{def.text}</p>
    </>
  );
};

export type OneAttackOptionsElementProps = {
  att: AttackOptionsElement;
  myIndex: string;
  indexOne: string | null;
  indexTwo: string | null;

  counter: number;

  onAction: (toThrow?: boolean, toTwo?: boolean) => void;
  onThrow?: (toThrow: boolean) => void;
  onToTwo?: (toTwo: boolean) => void;
  onDeAction: () => void;

  listBabBonus: TotAndBonusElement[][] | undefined;
  listDamage: TotAndBonusElement[] | undefined;
  // listDamage: number;
};

const OneAttackOptionsElement: React.FC<OneAttackOptionsElementProps> = ({
  att,
  myIndex,
  indexOne,
  indexTwo,
  counter,
  onAction,
  onThrow,
  onToTwo,
  onDeAction,
  listBabBonus,
  listDamage
}) => {
  const [toThrow, setToThrow] = useState<boolean>();
  // const [toTwo, setToTwo] = useState<boolean>();

  useEffect(() => {
    if (toThrow !== undefined && onThrow) onThrow(toThrow);
    // if(toTwo !== undefined && onToTwo) onToTwo(toTwo);
  }, [
    toThrow
    // , toTwo
  ]);

  return (
    <div style={{ gridArea: att.area }}>
      <div>
        <p onDoubleClick={onDeAction}>{att.element?.weapon?.name}</p>

        {Array.from({ length: 2 }).map((_, indexA) => {
          if (indexA !== counter) {
            return null;
          }

          return (
            <div
              key={indexA}
              onClick={
                // toThrow
                //   ? () => onAction(att.area, toThrow)
                //   :
                () =>
                  onAction(
                    toThrow
                    // , toTwo
                  )
              }
              className="rpgui-cursor-point"
            >
              {/* <p>
                index: {indexA}, counter: {counter}, toThrow:{" "}
                {toThrow?.toString()}
              </p> */}
              <MapAllAttacksElements
                index={indexA}
                clicked={indexOne === att.area || indexTwo === att.area}
                ranged={att.element?.weaponRanged || false}
                thrown={toThrow || false}
                weaponDamage={att.element?.weapon?.damage || ""}
                weaponCritical={att.element?.weapon?.critical || ""}
                listBabBonusII={listBabBonus}
                listDamageII={listDamage}
              />
            </div>
          );
        })}
      </div>
      <div>
        {att.element?.weaponThrown && (
          <p>
            <SelectedCheck onAction={setToThrow} />
            Thrown
          </p>
        )}
        {/* {[indexOne, indexTwo].includes(null) && (
          <p>
            <SelectedCheck onAction={setToTwo} />
            twoHanded
          </p>
        )} */}
      </div>
    </div>
  );
};

export const showBabListByIndex = (
  listBabBonus: TotAndBonusElement[][][],
  hasTwoWeapons: boolean,
  counter: number,
  ranged: boolean,
  thrown: boolean,
  toThrown: boolean | undefined,
  weaponTwoHanded: boolean
): TotAndBonusElement[][] => {
  // console.log("toThrown", toThrown, "hasTwoWeapons", hasTwoWeapons)
  const oneMelee = listBabBonus[0] ?? [];
  const oneRanged = listBabBonus[1] ?? [];

  const oneMeleeTwo = listBabBonus[2] ?? [];
  const oneRangedTwo = listBabBonus[3] ?? [];

  // 2 armi
  if (hasTwoWeapons) {
    return ranged || toThrown ? oneRangedTwo : oneMeleeTwo;
  }

  // arma a due mani
  if (weaponTwoHanded) {
    return counter === 0
      ? [ranged ? oneRanged[0] : oneMelee[0]]
      : ranged
        ? oneRanged
        : oneMelee;
  }

  // da lancio
  if (toThrown !== undefined) {
    return counter === 0
      ? [toThrown ? oneRanged[0] : oneMelee[0]]
      : toThrown
        ? oneRanged
        : oneMelee;
  }

  // arma singola
  return counter === 0
    ? [ranged ? oneRanged[0] : oneMelee[0]]
    : ranged
      ? oneRanged
      : oneMelee;
};

export const showDmgListByIndex = (
  listBabBonus: TotAndBonusElement[][],
  hasOffHand: boolean,
  counter: number, // 0 o 1 || 0,1,2,3
  ranged: boolean,
  thrown: boolean,
  toThrown: boolean | undefined,
  weaponTwoHanded: boolean
): TotAndBonusElement[] => {
  const oneMelee = listBabBonus[0] ?? [];
  const oneRanged = listBabBonus[1] ?? [];

  const oneMeleeTwo = listBabBonus[2] ?? [];
  const oneRangedTwo = listBabBonus[3] ?? [];

  // console.log([oneMelee, oneRanged, oneMeleeTwo, oneRangedTwo]);

  if (toThrown !== undefined) {
    // if(!hasOffHand){
    return !toThrown ? oneMelee : oneRanged;
    // }
  }

  if (hasOffHand) {
    return !ranged ? oneMeleeTwo : oneRangedTwo;
  }

  return !ranged ? oneMelee : oneRanged;
};
