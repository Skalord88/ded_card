import { Fragment } from "react/jsx-runtime";
import { BonusAbilities, signAndCountToString, SignNumber } from "../functions";
import { Item } from "../interfaces";
import { Popup } from "../Popup/Popup";
import {
  BASE_VALUE,
  EMPTY_BONUS,
  ModifierEnum,
  modifierEnumList
} from "../Prerequisite/interface/ModifierEnum";
import { signAndCountString } from "../Sign/Function";
import { Speed } from "../Speed/interface";
import { countTotalHitPoints } from "../Vita/Functions";
import { BonusResultMap } from "./functions/GetBonusResult";
import { ModifiedCharacter } from "./interface/ModifiedCharacter";

export type SummaryCharProps = {
  modCharacter: ModifiedCharacter;
};

export const SummaryChar: React.FC<SummaryCharProps> = ({ modCharacter }) => {
  return (
    <div className="rpgui-container-framed golden">
      <h2>{modCharacter.title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: "10px"
        }}
      >
        <div>
          <p>Size/Type:</p>
        </div>
        <div>
          <p>
            {modCharacter.race?.size.size}{" "}
            {modCharacter.race?.race.raceType.raceClass.className}
          </p>
        </div>

        <div>
          <p>Hit Dice:</p>
        </div>
        <SummaryCharVita modCharacter={modCharacter} />

        <div>
          <p>Initiative:</p>
        </div>
        <div>
          <p>
            {signAndCountString([BonusAbilities(modCharacter.abilitys, "DEX")])}
          </p>
        </div>

        <SummaryCharSpeed modCharacter={modCharacter} />
        <SummaryCharArmorClass modCharacter={modCharacter} />
        <SummaryCharBaseAttack modCharacter={modCharacter} />
        <SummaryCharAttacks modCharacter={modCharacter} />
      </div>
    </div>
  );
};

export const SummaryCharAttacks: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const toListBab: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true
  );
  const bab: number = Math.floor(
    toListBab.reduce((tot, element) => (tot += element.bonus), 0)
  );

  const listFirstAttack = [
    modCharacter.attacks?.firstAttackSetOne,
    modCharacter.attacks?.firstAttackSetTwo,

    modCharacter.attacks?.secondAttackSetOne,
    modCharacter.attacks?.secondAttackSetTwo,

    modCharacter.attacks?.additionalAttackSetOne,
    modCharacter.attacks?.additionalAttackSetTwo
  ];
  const firstMelee = listFirstAttack.find((w) => !w?.type.includes("RANGED"));
  const firstRanged = listFirstAttack.find((w) => w?.type.includes("RANGED"));

  const toListMelee: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true,
    "Melee"
  );
  const toListRanged: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true,
    "Ranged"
  );
  const babMelee: number = Math.floor(
    toListMelee.reduce((tot, element) => (tot += element.bonus), 0)
  );
  const babRanged: number = Math.floor(
    toListRanged.reduce((tot, element) => (tot += element.bonus), 0)
  );

  const toListSpecific: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true,
    firstRanged?.itemId
  );
  const babSpecific: number = Math.floor(
    toListSpecific.reduce((tot, element) => (tot += element.bonus), 0)
  );

  return (
    <>
      <div>
        <p>Attack:</p>
      </div>
      <div>
        <p>
          <span style={{ color: "yellow" }}>
            {signAndCountString([babMelee])}
          </span>
          <span>{firstMelee?.name}</span>
          <span>{firstMelee?.damage}</span>
          {" / "}
          <span style={{ color: "yellow" }}>
            {signAndCountString([bab + babRanged - bab + babSpecific - bab])}
          </span>
          <span>{firstRanged?.name}</span>
          <span>{firstRanged?.damage}</span>
        </p>
      </div>
      <div>
        <p>Full Attack:</p>
      </div>
      <div></div>
    </>
  );
};

export const SummaryCharBaseAttack: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const toListBab: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true
  );
  const toListGrapple: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.attackRollMod || {},
    true,
    "Grapple"
  );

  return (
    <>
      <div>
        <p>Base Attack:</p>
      </div>
      <div>
        <TotAndBonus list={toListBab} />
      </div>
      <div>
        <p>Grapple:</p>
      </div>
      <div>
        <TotAndBonus list={toListGrapple} />
      </div>
    </>
  );
};

export const createTotAndBonusElement = (
  map: BonusResultMap,
  testo: boolean,
  serch?: string | number
): TotAndBonusElement[] => {
  let list: TotAndBonusElement[] = [];
  Object.entries(map).map(([key, value]) => {
    if (!serch) {
      value.forEach((v) => {
        if (!v.source) {
          list.push(
            testo
              ? {
                  bonus: v.bonus,
                  text: key,
                  pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
                    ...EMPTY_BONUS,
                    description: key,
                    text: v.text
                  }
                }
              : {
                  bonus: v.bonus,
                  pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
                    ...EMPTY_BONUS,
                    description: key,
                    text: v.text
                  }
                }
          );
        }
      });
    }
    if (serch) {
      value.forEach((v) => {
        // console.log("v", v, v.source)
        if (
          !v.source ||
          serch === (v.source as Item)?.id ||
          serch === (v.source as ModifierEnum)?.text
        ) {
          // const text: ModifierEnum = v.source as ModifierEnum;

          // serch === "Melee" && console.log("serch", serch, text, v)
          list.push({
            bonus: v.bonus,
            text: key,
            pop: modifierEnumList.filter((m) => m.text === v.text)[0] || {
              ...EMPTY_BONUS,
              description: key,
              text: v.text
            }
          });
        }
      });
    }
  });
  // console.log("list", list)
  return list;
};

export type TotAndBonusElement = {
  bonus: number;
  text?: string;
  pop: ModifierEnum;
};

export type TotAndBonusProps = {
  tot?: number;
  list: TotAndBonusElement[];
  children?: React.ReactNode;
};

export const TotAndBonus: React.FC<TotAndBonusProps> = ({
  tot,
  list,
  children
}) => {
  const total: number = Math.floor(
    list.reduce((tot, element) => (tot += element.bonus), 0)
  );
  return (
    <div>
      <span style={{ color: "orange" }}>{total}</span>

      <span>
        {" : ("}
        {list.length !== 0 &&
          list.map((l, index) => {
            const sign: string = signAndCountToString([l.bonus]);
            const text = l.text ? [sign, l.text] : [sign];

            return (
              <Fragment key={index}>
                <Popup text={text} popText={l.pop} />
                {index === list.length - 1 ? null : <span> </span>}
              </Fragment>
            );
          })}
        {")"}
      </span>

      {children}
    </div>
  );
};

export const ListOfAllModifiers: React.FC<{
  total: number;
  modChar: ModifiedCharacter;
}> = ({ total, modChar }) => {
  // console.log("modifiers", modifiers);

  const toList: TotAndBonusElement[] = createTotAndBonusElement(
    modChar.attackRollMod ?? {},
    true,
    "Grapple"
  );
  // .filter((e) => e.pop === key)

  return (
    <>
      <span>{SignNumber(total)}</span>
      <span>{total}</span>
      <TotAndBonus list={toList} />
      {/* {mods.map((m) => (
        <Popup text={signAndCountString([m.bonus])} popText={m.key} />
      ))}
      <span>
        {" / "}
        {babAndGrapple}
      </span>
      {mods.map((m) => (
        <Popup text={signAndCountString([m.bonus])} popText={m.key} />
      ))}
      {modsGrapple.map((m) => (
        <Popup text={signAndCountString([m.bonus])} popText={m.key} />
      ))} */}
    </>
  );
};

export const SummaryCharArmorClass: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const toList: TotAndBonusElement[] = createTotAndBonusElement(
    modCharacter.armorClassMod ?? {},
    true
  );
  return (
    <>
      <div>
        <p>Armor Class:</p>
      </div>
      <TotAndBonus list={[{ bonus: 10, pop: BASE_VALUE }, ...toList]} />
    </>
  );
};

export const SummaryCharSpeed: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const speed: Speed = {
    foot:
      ((modCharacter.race?.modifiers?.speed?.foot as number) || 0) +
      ((modCharacter.race?.race.modifiers?.speed?.foot as number) || 0) +
      (modCharacter.archetypes?.reduce((acc, archetype) => {
        return acc + ((archetype.modifiers?.speed?.foot as number) || 0);
      }, 0) || 0),
    fly:
      ((modCharacter.race?.modifiers?.speed?.fly as number) || 0) +
      ((modCharacter.race?.race.modifiers?.speed?.fly as number) || 0) +
      (modCharacter.archetypes?.reduce((acc, archetype) => {
        return acc + ((archetype.modifiers?.speed?.fly as number) || 0);
      }, 0) || 0),
    swim:
      ((modCharacter.race?.modifiers?.speed?.swim as number) || 0) +
      ((modCharacter.race?.race.modifiers?.speed?.swim as number) || 0) +
      (modCharacter.archetypes?.reduce((acc, archetype) => {
        return acc + ((archetype.modifiers?.speed?.swim as number) || 0);
      }, 0) || 0),
    climb:
      ((modCharacter.race?.modifiers?.speed?.climb as number) || 0) +
      ((modCharacter.race?.race.modifiers?.speed?.climb as number) || 0) +
      (modCharacter.archetypes?.reduce((acc, archetype) => {
        return acc + ((archetype.modifiers?.speed?.climb as number) || 0);
      }, 0) || 0),
    special: ""
  };

  return (
    <>
      <div>
        <p>Speed:</p>
      </div>
      <div>
        {Object.entries(speed).map(([key, value]) => {
          if (value && value !== 0 && value !== "") {
            return (
              <p key={key}>
                {key} {value as number | string}
              </p>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};

export const SummaryCharVita: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  const vita = modCharacter.listHitDices;
  return (
    <div>
      <p>
        {vita &&
          Object.entries(vita)
            // metti come prima il [dice] dove first e' vero
            .sort(([diceA, { first: firstA }], [diceB, { first: firstB }]) => {
              if (firstA && !firstB) {
                return -1;
              } else if (!firstA && firstB) {
                return 1;
              } else {
                return 0;
              }
            })
            .map(
              ([dice, { first, lv }]) =>
                `${lv}d${dice} (${countTotalHitPoints(
                  parseInt(dice),
                  first,
                  lv,
                  BonusAbilities(modCharacter.abilitys, "COS")
                )})`
            )
            .join(", ")}
      </p>
    </div>
  );
};
