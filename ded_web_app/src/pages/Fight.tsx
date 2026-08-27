import { useEffect, useMemo, useState } from "react";
import { useData } from "../components/Context/Context";
import { DiceText } from "../components/Dice/Functions";
import { ThrowDice, ThrowDicePropsWeapon } from "../components/Dice/ThrowDice";
import { DropdownComponent } from "../components/DropDown/DropDown";
import {
  positionInIndexInMenuAFight,
  positionInIndexInMenuBFight
} from "../components/Fight/component/Menu";
import { addToDrop, signAndCountToString } from "../components/functions";
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
  mapAllAttacksAreas,
  MapAllAttacksElements
} from "../components/SummaryChar/component/SummaryCharAttacks";
import { TotAndBonusElement } from "../components/SummaryChar/component/TotAndBonus";
import { PageLayoutBody } from "./AppLayout";
import { count } from "node:console";
import { SelectedCheck } from "../components/Icon/SelectedCheck";
import { noneWeapon } from "../components/variables";

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
            </div>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, false)}
            />
            {sideB.map((b, indexB) => {
              const border: string = createBorder(clickMenu[1] === indexB);
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
  const setMenuOption = (opt: string) => {
    if (selectOption) selectOption(opt);
  };
  return (
    <div className="rpgui-container-framed golden-2">
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
    return mapAllAttacksAreas([
      char.attacks?.firstAttackSetOne || undefined,
      char.attacks?.secondAttackSetOne || undefined,
      char.attacks?.additionalAttackSetOne || undefined,
      char.attacks?.firstAttackSetTwo || undefined,
      char.attacks?.secondAttackSetTwo || undefined,
      char.attacks?.additionalAttackSetTwo || undefined
    ]);
  }
  return [];
};

// type ClickMenu = [{position: string, counter: number} | null, {position: string, counter: number} | null, string];
type ClickMenu = [string | null, string | null, string];

const weaponMap = {
  w1: { group: "I", index: 0 },
  w2: { group: "I", index: 1 },
  wA: { group: "I", index: 0 },

  w21: { group: "II", index: 0 },
  w22: { group: "II", index: 1 },
  w2A: { group: "II", index: 0 }
} as const;

const changePosition = (
  position: string,
  clickMenu: ClickMenu
  // counter?: number,
  // thrown?: boolean
): ClickMenu => {
  // A, B, C...
  if (
    !(position in weaponMap)
    // &&
    // counter === undefined &&
    // thrown === undefined
  ) {
    return [clickMenu[0], clickMenu[1], position];
  }

  const info = weaponMap[position as keyof typeof weaponMap];

  const currentPosition = clickMenu[0] ?? clickMenu[1];

  // Cambio gruppo
  if (
    currentPosition &&
    weaponMap[currentPosition as keyof typeof weaponMap].group !== info.group
  ) {
    return info.index === 0
      ? [
          position,
          // , counter ?? 0, thrown
          null,
          clickMenu[2]
        ]
      : [
          null,
          // [
          position,
          // , counter ?? 0, thrown],
          clickMenu[2]
        ];
  }

  // Stesso gruppo
  const result: ClickMenu = [clickMenu[0], clickMenu[1], clickMenu[2]];

  if (info.index === 0) {
    result[0] =
      // [
      position;
    // , counter ?? 0, thrown
    // ];
  } else {
    result[1] =
      // [
      position;
    // , counter ?? 0, thrown];
  }

  // console.log("changePosition:", result)

  return result;
};

// const showBabListOnIndex = (
//   weapon: WeaponElement,
//   hasOffHand: boolean,
//   counter: number, // 0 o 1
//   thrown: boolean | undefined
// ): TotAndBonusElement[][] => {
//   const oneHandMelee = weapon.listBabMeleeSpecificBonus || [];
//   const twoHandMelee = weapon.listBabMeleeTwoWeaponSpecificBonus || [];

//   const oneHandRanged = weapon.listBabRangedSpecificBonus || [];
//   const twoHandRanged = weapon.listBabRangedTwoWeaponSpecificBonus || [];

//   if (weapon.weaponTwoHanded) {
//     // se l'arma e' a due mani
//     return counter === 0
//       ? !weapon.weaponRanged
//         ? [oneHandMelee[0]] // attacco singolo
//         : [oneHandRanged[0]] // attacco singolo
//       : !weapon.weaponRanged
//         ? oneHandMelee // attacco completo
//         : oneHandRanged; // attacco completo
//   }

//   // arma da lancio
//   if (weapon.weaponThrown) {
//     if (!hasOffHand)
//       return counter === 0
//         ? !thrown
//           ? [oneHandMelee[0]]
//           : [oneHandRanged[0]]
//         : !thrown
//           ? oneHandMelee // attacco completo
//           : oneHandRanged; // attacco completo
//     return !thrown ? twoHandMelee : twoHandRanged; // se mano off occupata
//   }

//   // se arma non da lancio
//   if (hasOffHand) {
//     // se mano off occupata
//     return weapon.weaponRanged
//       ? twoHandRanged // se ranged, 2 mani
//       : twoHandMelee; // se melee, 2 mani
//   }

//   return counter === 0
//     ? !weapon.weaponRanged
//       ? [oneHandMelee[0]] // attacco singolo
//       : [oneHandRanged[0]] // attacco singolo
//     : !weapon.weaponRanged
//       ? oneHandMelee // attacco completo
//       : oneHandRanged; // attacco completo
// };

// const showDamageListOnIndex = (
//   weapon: WeaponElement,
//   // counter: number,
//   offHand?: boolean,
//   thrown?: boolean
// ): number => {
//   if (offHand) {
//     return thrown && weapon.weaponRanged
//       ? weapon.damageRangedTwoWeapon || 0
//       : weapon.damageMeleeTwoWeapon || 0;
//   }

//   return thrown || weapon.weaponRanged
//     ? weapon.damageRanged || 0
//     : weapon.damageMelee || 0;
// };

export const getAttackColor = (
  ranged: boolean,
  // counter: number,
  thrown?: boolean
): string => {
  // if (!weapon) return "";

  // Thrown
  if (thrown !== undefined) return thrown ? "ranged" : "melee";

  // Ranged
  if (ranged) {
    return "ranged";
  }

  // Melee
  return "melee";
};

// const getCounter = (
//   same: boolean,
//   counter: number,
//   thrown?: boolean
// ): number => {
//   if (!same) return 0;
//   if (thrown) return thrown ? 1 : 0;
//   return counter === 0 ? 1 : 0;
// };

const ActionMenu: React.FC<ActionMenuProps> = ({ charAB, optionAction }) => {
  const [clickMenu, setClickMenu] = useState<ClickMenu>(["w1", null, "A"]);
  // const [thrown, setThrown] = useState<boolean>();
  // const [counterClick, setCounterClick] = useState(0);
  const [throwDiceWeapon, setThrowDiceWeapon] = useState<
    [ThrowDicePropsWeapon | null, ThrowDicePropsWeapon | null]
  >([
    {
      position: "w1",
      weapon: charAB?.[0].attacks?.firstAttackSetOne?.weapon || noneWeapon,

      listBab: !charAB?.[0].attacks?.firstAttackSetOne?.weaponRanged
        ? [
            charAB?.[0].attacks?.firstAttackSetOne
              ?.listBabMeleeSpecificBonus?.[0] ?? []
          ]
        : [
            charAB?.[0].attacks?.firstAttackSetOne
              ?.listBabRangedSpecificBonus?.[0] ?? []
          ],

      listDamage: !charAB?.[0].attacks?.firstAttackSetOne?.weaponRanged
        ? (charAB?.[0].attacks?.firstAttackSetOne?.damageMelee ?? 0)
        : (charAB?.[0].attacks?.firstAttackSetOne?.damageRanged ?? 0)
    },
    null
  ]);

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

  // const indexOne = attackOptions[
  //   positionInIndexInMenuAFight(clickMenu[1] ? clickMenu[1][0] : "")
  // ].show
  //   ? clickMenu[1]? clickMenu[1][0] : null
  //   : null;

  // useEffect(() => {
  //   const indexOne: number | null = clickMenu[0]
  //     ? positionInIndexInMenuAFight(clickMenu[0] ? clickMenu[0][0] : "")
  //     : null;

  //   const elementOne =
  //     indexOne !== null ? attackOptions[indexOne]?.element : undefined;

  //   const indexOneString: string | null = clickMenu[0] ? clickMenu[0][0] : null;
  //   const indexTwoString: string | null = clickMenu[1] ? clickMenu[1][0] : null;

  //   const one: ThrowDicePropsWeapon | null = elementOne?.weapon
  //     ? {
  //         weapon: elementOne.weapon,
  //         listBab: showBabListOnIndex(
  //           elementOne,
  //           ![clickMenu[0], clickMenu[1]].includes(null),
  //           clickMenu[0] ? clickMenu[0][1] : 0,
  //           clickMenu[0] ? clickMenu[0][2] : undefined
  //         ),
  //         listDamage: showDamageListOnIndex(
  //           elementOne,
  //           [indexOneString, indexTwoString].includes(null),
  //           clickMenu[0] ? clickMenu[0][2] : undefined
  //         )
  //       }
  //     : null;

  //   const indexTwo: number | null = clickMenu[1]
  //     ? positionInIndexInMenuAFight(clickMenu[1] ? clickMenu[1][0] : "")
  //     : null;

  //   const elementTwo =
  //     indexTwo !== null ? attackOptions[indexTwo]?.element : undefined;

  //   const two: ThrowDicePropsWeapon | null = elementTwo?.weapon
  //     ? {
  //         weapon: elementTwo.weapon,
  //         listBab: showBabListOnIndex(
  //           elementTwo,
  //           ![clickMenu[0], clickMenu[1]].includes(null),
  //           clickMenu[1] ? clickMenu[1][1] : 0,
  //           clickMenu[1] ? clickMenu[1][2] : undefined
  //         ),
  //         listDamage: showDamageListOnIndex(
  //           elementTwo,
  //           [indexOneString, indexTwoString].includes(null),
  //           clickMenu[1] ? clickMenu[1][2] : undefined
  //         )
  //       }
  //     : null;

  //   const newDiceWeapon =
  //     one && two ? [one, two] : one ? [one] : two ? [two] : [];

  //   setThrowDiceWeapon(newDiceWeapon);
  // }, [attackOptions, clickMenu]);

  const setSelectClickMenu = (
    element?: ThrowDicePropsWeapon,
    indexD?: string
  ) => {
    if (element) {
      const newMenu = changePosition(element.position, clickMenu);
      setClickMenu(newMenu);
      const newWeapon: ThrowDicePropsWeapon = {
        position: element.position,
        weapon: element.weapon,
        listBab: element.listBab,
        listDamage: element.listDamage
      };
      const newThrowDiceWeapon: [
        ThrowDicePropsWeapon | null,
        ThrowDicePropsWeapon | null
      ] = [
        newMenu[0] === newWeapon.position ? newWeapon : throwDiceWeapon[0],
        newMenu[1] === newWeapon.position ? newWeapon : throwDiceWeapon[1]
      ];
      // const new
      setThrowDiceWeapon(newThrowDiceWeapon);
    }
    if (indexD) {
      const newMenu: ClickMenu = [clickMenu[0], clickMenu[1], indexD];
      setClickMenu(newMenu);
    }
  };

  const deselectClickMenu = (index: string) => {
    setClickMenu([
      clickMenu[0] !== null && clickMenu[0][0] === index ? null : clickMenu[0],
      clickMenu[1] !== null && clickMenu[1][0] === index ? null : clickMenu[1],
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
          gap: 4
        }}
      >
        {/* <p>{clickMenu}</p> */}
        {attackOptions.map((att, indexAtt) => {
          if (att.show === false) return null;
          return (
            <div style={{ gridArea: att.area }} key={indexAtt}>
              <OneAttackOptionsElement
                att={att}
                myIndex={att.area}
                indexOne={clickMenu[0] ? clickMenu[0] : null}
                indexTwo={clickMenu[1] ? clickMenu[1] : null}
                onAction={(el) => setSelectClickMenu(el)}
                onDeAction={() => deselectClickMenu(att.area)}
              />
            </div>
          );
        })}
      </div>
      <div style={{ flex: 1 }} className="rpgui-container-framed grey">
        <div>
          {throwDiceWeapon && (
            <ThrowDice
              // dice={thrownDice}
              weapons={throwDiceWeapon}
              target={
                defenceOptions[positionInIndexInMenuBFight(clickMenu[2])].number
              }
            />
          )}
        </div>
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
                  undefined,
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
};

export type OneAttackOptionsElementProps = {
  att: AttackOptionsElement;
  myIndex: string;
  indexOne: string | null;
  indexTwo: string | null;
  // throwDiceWeapon: ThrowDicePropsWeapon[]
  // clickMenu: [string | null, string | null];
  onAction: (element: ThrowDicePropsWeapon) => void;
  onDeAction: () => void;
};

const OneAttackOptionsElement: React.FC<OneAttackOptionsElementProps> = ({
  att,
  myIndex,
  indexOne,
  indexTwo,
  // clickMenu,
  onAction,
  onDeAction
  // , throwDiceWeapon
}) => {
  const [counter, setCounter] = useState(0);
  const [thrown, setThrown] = useState<boolean>();
  // const [listBabBonusII, setListBabBonusII] =
  //   useState<TotAndBonusElement[][]>();
  // const [listDamageII, setListDamageII] = useState<TotAndBonusElement[]>();

  const newlistBabBonus = useMemo(
    () =>
      [
        att.element?.listBabMeleeSpecificBonus,
        att.element?.listBabRangedSpecificBonus,
        att.element?.listBabMeleeTwoWeaponSpecificBonus,
        att.element?.listBabRangedTwoWeaponSpecificBonus
      ].filter((a) => a != null),
    [att.element]
  );
  const newlistDamage = useMemo(
    () =>
      [
        att.element?.toListMeleeDamage,
        att.element?.toListRangedDamage,
        att.element?.toListMeleeTwoWeaponDamage,
        att.element?.toListRangedTwoWeaponDamage
      ].filter((a) => a !== undefined),
    [att.element]
  );

  const listBabBonusII = useMemo(
    () =>
      showBabListByIndex(
        newlistBabBonus,
        ![indexOne, indexTwo].includes(null),
        counter,
        att.element?.weaponRanged || false,
        att.element?.weaponThrown || false,
        thrown,
        att.element?.weaponTwoHanded || false
      ),
    [newlistBabBonus, indexOne, indexTwo, counter, thrown, att.element]
  );

  const listDamageII = useMemo(
    () =>
      showDmgListByIndex(
        newlistDamage,
        ![indexOne, indexTwo].includes(null),
        counter,
        att.element?.weaponRanged || false,
        att.element?.weaponThrown || false,
        thrown,
        att.element?.weaponTwoHanded || false
      ),
    [newlistDamage, indexOne, indexTwo, counter, thrown, att.element]
  );
  const clickOne = (weapon: ThrowDicePropsWeapon) => {
    const newCounter = counter + 1 === 2 ? 0 : counter + 1;

    const newBab = showBabListByIndex(
      newlistBabBonus,
      ![indexOne, indexTwo].includes(null),
      newCounter,
      att.element?.weaponRanged || false,
      att.element?.weaponThrown || false,
      thrown,
      att.element?.weaponTwoHanded || false
    );

    const newDamage = showDmgListByIndex(
      newlistDamage,
      ![indexOne, indexTwo].includes(null),
      newCounter,
      att.element?.weaponRanged || false,
      att.element?.weaponThrown || false,
      thrown,
      att.element?.weaponTwoHanded || false
    );

    setCounter(newCounter);

    onAction({
      ...weapon,
      listBab: newBab,
      listDamage: newDamage.reduce((tot, d) => tot + d.bonus, 0)
    });
  };

  return (
    <div style={{ gridArea: att.area }}>
      <div onDoubleClick={() => onDeAction()}>
        <p>
          counter: {counter}, {myIndex}, {indexOne ?? "null"},{" "}
          {indexTwo ?? "null"}
        </p>
        <p>{att.element?.weapon?.name}</p>
        {Array.from({ length: 2 }).map((_, indexA) => {
          if (indexA === counter && listBabBonusII && listDamageII)
            return (
              <div
                onClick={() =>
                  att.element &&
                  clickOne({
                    position: att.area,
                    weapon: att.element.weapon || noneWeapon,
                    listBab: listBabBonusII,
                    listDamage: listDamageII.reduce(
                      (tot, d) => tot + d.bonus,
                      0
                    )
                  })
                }
              >
                {
                  <MapAllAttacksElements
                    index={indexA}
                    clicked={indexOne === att.area || indexTwo === att.area}
                    ranged={att.element?.weaponRanged || false}
                    thrown={att.element?.weaponThrown || false}
                    weaponDamage={att.element?.weapon?.damage || ""}
                    weaponCritical={att.element?.weapon?.critical || ""}
                    listBabBonusII={listBabBonusII}
                    listDamageII={listDamageII}
                  />
                }
              </div>
            );
        })}
        {/* <SummaryCharAttacksSingleElement
          border={finalBorder}
          totAndBonusAtt={[false, true, false, true]}
          weapon={att.element?.weapon || noneWeapon}
          listBab={actualBabList}
          damage={actualDamageList}
          totAndBonusDmg={[false, true, true]}
        /> */}
      </div>
      <div>
        {att.element?.weaponThrown && (
          <p>
            <SelectedCheck onAction={(on) => setThrown(on)} />
            <span>{"Thrown"}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export const showBabListByIndex = (
  listBabBonus: TotAndBonusElement[][][],
  hasOffHand: boolean,
  counter: number, // 0 o 1 || 0,1,2,3
  ranged: boolean,
  thrown: boolean,
  toThrown: boolean | undefined,
  weaponTwoHanded: boolean
): TotAndBonusElement[][] => {
  const oneMelee = listBabBonus[0];
  const oneRanged = ranged ? listBabBonus[0] : listBabBonus[1];

  const oneMeleeTwo = toThrown ? listBabBonus[2] : listBabBonus[1];
  const oneRangedTwo = toThrown ? listBabBonus[3] : listBabBonus[1];

  if (weaponTwoHanded) {
    return counter === 0
      ? !ranged
        ? [oneMelee[0]]
        : [oneRanged[0]]
      : !ranged
        ? oneMelee
        : oneRanged;
  }

  if (toThrown !== undefined) {
    if (!hasOffHand) {
      return counter === 0
        ? !toThrown
          ? [oneMelee[0]]
          : [oneRanged[0]]
        : !toThrown
          ? oneMelee
          : oneRanged;
    }
    return !toThrown ? oneMeleeTwo : oneRangedTwo;
  }

  if (hasOffHand) {
    return !ranged ? oneMeleeTwo : oneRangedTwo;
  }

  return counter === 0 ? [oneMelee[0]] : oneMelee;
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
  const oneMelee = listBabBonus[0];
  const oneRanged = !ranged ? listBabBonus[0] : listBabBonus[1];

  const oneMeleeTwo = toThrown ? listBabBonus[2] : listBabBonus[1];
  const oneRangedTwo = toThrown ? listBabBonus[3] : listBabBonus[1];

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
