import { totalmem } from "node:os";
import { BonusAbilities, signAndCountToString, SignNumber } from "../functions";
import { Popup } from "../Popup/Popup";
import { Speed } from "../Speed/interface";
import { countTotalHitPoints } from "../Vita/Functions";
import { generalBonus } from "./functions/GeneralBonus";
import {
  getBonusList,
  specificTargetBonusList,
  specificTargetBonusNumber
} from "./functions/SpecificTargetBonus";
import {
  AllModifiers,
  ModifiedCharacter,
  ModifierResult
} from "./interface/ModifiedCharacter";
import { signAndCountString } from "../Sign/Function";
import { BonusResultMap, TargetBonus } from "./functions/GetBonusResult";
import { Item } from "../interfaces";
import { ModifierEnum } from "../Prerequisite/interface/ModifierEnum";

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
      </div>
    </div>
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
        <p>Base Attack/Grapple:</p>
      </div>
      <div>
        <TotAndBonus list={toListBab} />
        <span>{" / "}</span>
        <TotAndBonus list={toListGrapple} />
      </div>
    </>
  );
};

export const createTotAndBonusElement = (
  map: BonusResultMap,
  testo: boolean,
  serch?: string
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
                  pop: v.text
                }
              : {
                  bonus: v.bonus,
                  pop: v.text
                }
          );
        }
      });
    }
    if (serch) {
      value.forEach((v) => {
        if (
          !v.source ||
          serch === (v.source as Item)?.name ||
          serch === (v.source as ModifierEnum)?.text
        ) {
          const text: string =
            (v.source as Item)?.name || (v.source as ModifierEnum)?.text;
          list.push({
            bonus: v.bonus,
            text: key,
            pop: !v.source ? v.text : text + ", " + v.text
          });
        }
      });
    }
  });
  return list;
};

export type TotAndBonusElement = { bonus: number; text?: string; pop: string };

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
  const total: number = list.reduce((tot, element) => tot += element.bonus, 0)
  return (
    <div>
      <span style={{color: "orange"}}>{total}</span>
      <span>{" : ("}
      {list.length !== 0 &&
        list.map((l, index) => {
          const sign: string = index === 0? l.bonus.toString() : signAndCountToString([l.bonus])
          const text = l.text
            ? [sign, l.text]
            : [sign];
          return (
          <>
          <Popup key={index} text={text} popText={l.pop} />
          {index === list.length-1? null : (<span>{" "}</span>)}
          </>
          );
        })}
        {")"}</span>
      {children ? children : null}
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
  // .filter((e) => e.pop === key)
  return (
    <>
      <div>
        <p>Armor Class:</p>
      </div>
      <TotAndBonus list={[{bonus: 10, pop: "base"}, ...toList]} />
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
