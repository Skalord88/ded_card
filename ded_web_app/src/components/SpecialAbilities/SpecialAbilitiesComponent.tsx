import { Abilitys } from "../Abilitys/Interface";
import { BonusAbilities } from "../functions";
import { DamageThrow } from "../Popup/DicePopup/DamageThrow";
import { Popup } from "../Popup/Popup";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { SpecialAbilities } from "../Race/Interfaces";

export type SpecialAbilitiesProps = {
  char: CharToModify;
};

export const getCDSpecialAbilities = (
  hdRace: number,
  hdAdj: number,
  hdClass: number,
  ab: Abilitys,
  sA: SpecialAbilities
): number => {
  let dc = 10;
  if (sA.dcAbility) {
    dc = sA.dcAbility.includes("CHA") ? dc + BonusAbilities(ab, "CHA") : dc;
    dc = sA.dcAbility.includes("HALF_CHA")
      ? dc + Math.floor(BonusAbilities(ab, "CHA") / 2)
      : dc;
    dc = sA.dcAbility.includes("COS") ? dc + BonusAbilities(ab, "COS") : dc;
    dc = sA.dcAbility.includes("HALF_COS")
      ? dc + Math.floor(BonusAbilities(ab, "COS") / 2)
      : dc;
    dc = sA.dcAbility.includes("RACE_HD") ? dc + hdRace + hdAdj : dc;
    dc = sA.dcAbility.includes("CLASS_HD") ? dc + hdClass : dc;
    dc = sA.dcAbility.includes("HALF_RACE") ? dc + Math.floor(hdRace + hdAdj / 2) : dc;
    dc = sA.dcAbility.includes("HALF_HD") ? dc + Math.floor(hdClass / 2) : dc;
  }
  return dc;
};

export type SpecialAbility = {
  name: string;
  type: string;
  text: string;
  description: string;
};

export const isSpecialAbility = (sA: SpecialAbilities): boolean => {
  return sA.specialType === 1;
};

export type DamageSpecialAbility = {
  name: string;
  type: string;
  description: string;
  cd: number;
  damageDice: string;
  damageNumberDice: number;
  area: string;
  target: string;
};

export const isDamageSpecialAbility = (sA: SpecialAbilities): boolean => {
  return sA.specialType === 2;
};

export type ResistanceToEnergy = {
  name: string;
  valueText: [number, string][];
};

export const isResistanceToEnergy = (sA: SpecialAbilities): boolean => {
  return sA.specialType === 3;
};

export type SpellResistance = {
  name: string;
  value: number;
  maxValue?: number;
};

export const isSpellResistance = (sA: SpecialAbilities): boolean => {
  return sA.specialType === 4;
};

export type SpecialAbilitiesList = {
  specialAbilities: SpecialAbility[];
  damageSpecialAbiliies: DamageSpecialAbility[];
  resistance: ResistanceToEnergy;
  spellResistances: SpellResistance;
};

export const createListOfSpecialAbilities = (
  sA: SpecialAbilities[],
  hdAdj: number,
  hdRace: number,
  hdClass: number,
  ab: Abilitys
): SpecialAbilitiesList => {
  let spAbilities: SpecialAbility[] = [];
  let dmgSpAbilities: DamageSpecialAbility[] = [];
  let resistances: ResistanceToEnergy = {
    name: "Resistance",
    valueText: []
  };
  let resistancesTexts: [number, string][] = [];
  let spellRes: SpellResistance = {
    name: "",
    value: 0
  };
  sA.forEach((s) => {
    if (isSpecialAbility(s))
      spAbilities.push({
        name: s.name,
        type: s.type,
        text: (s.value ?? "") + (s.valueText ?? ""),
        description: s.description
      } as SpecialAbility);
    if (isDamageSpecialAbility(s)) {
      dmgSpAbilities.push({
        name: s.name,
        type: s.type,
        description: s.description,
        cd: getCDSpecialAbilities(hdRace, hdAdj, hdClass, ab, s),
        damageDice: s.damageDice,
        damageNumberDice: s.damageNumberDice,
        area: s.area,
        target: s.target
      } as DamageSpecialAbility);
    }
    if (isResistanceToEnergy(s)) {
      if (s.prerequisiteHd !== null) {
        if (s.prerequisiteHd < 0) {
          if (-s.prerequisiteHd <= hdRace + hdClass) {
            resistancesTexts.push([s.value ?? 0, s.valueText ?? ""]);
          }
        }
        if (s.prerequisiteHd > 0) {
          if (s.prerequisiteHd <= hdRace + hdClass) {
            resistancesTexts.push([s.value ?? 0, s.valueText ?? ""]);
          }
        }
      } else {
        resistancesTexts.push([s.value ?? 0, s.valueText ?? ""]);
      }
    }

    if (isSpellResistance(s)) {
      spellRes = {
        name: s.name,
        value:
          getCDSpecialAbilities(hdRace, hdAdj, hdClass, ab, s) > s.maxValue
            ? s.maxValue
            : spellRes.value < getCDSpecialAbilities(hdRace, hdAdj, hdClass, ab, s)
            ? getCDSpecialAbilities(hdRace, hdAdj, hdClass, ab, s)
            : spellRes.value
      };
    }
  });

  return {
    specialAbilities: spAbilities,
    damageSpecialAbiliies: dmgSpAbilities,
    resistance: {
      ...resistances,
      valueText: resistancesTexts
    },
    spellResistances: spellRes
  };
};

export const SpecialAbilitiesComponent: React.FC<SpecialAbilitiesProps> = ({
  char
}) => {
  const lista: SpecialAbilitiesList = createListOfSpecialAbilities(
    char.specialAbilities,
    char.adjBonus.adjLv,
    0, // char.raceLv
    char.classesLv,
    char.abilitys
  );

  return (
    <>
      <h2 className="rpgui-container-framed golden-2">Special Abilities</h2>

      <SpecialAbilityComponent sAs={lista.specialAbilities} />
      <DamageSpecialAbiliiesComponent sAs={lista.damageSpecialAbiliies} />
      {lista.resistance.valueText.length > 0 ? (
        <ResistanceToEnergyComponent sAs={lista.resistance} />
      ) : null}
      {lista.spellResistances.value > 0 ? (
        <SpellResistanceComponent sAs={lista.spellResistances} />
      ) : null}
    </>
  );
};

export const SpecialAbilitiesSummaryComponent: React.FC<SpecialAbilitiesProps> = ({
  char
}) => {
  const lista: SpecialAbilitiesList = createListOfSpecialAbilities(
    char.specialAbilities,
    char.adjBonus.adjLv,
    0, // char.raceLv
    char.classesLv,
    char.abilitys
  );

  return (
    <div>
      <span>Special Abilities:</span> 
      <SpecialAbilityComponent sAs={lista.specialAbilities} />
      <DamageSpecialAbiliiesComponent sAs={lista.damageSpecialAbiliies} />
      {lista.resistance.valueText.length > 0 ? (
        <ResistanceToEnergyComponent sAs={lista.resistance} />
      ) : null}
      {lista.spellResistances.value > 0 ? (
        <SpellResistanceComponent sAs={lista.spellResistances} />
      ) : null}
    </div>
  );
};

export type SpcAbProps = {
  sAs: SpecialAbility[];
};

export const SpecialAbilityComponent: React.FC<SpcAbProps> = ({ sAs }) => {
  return (
    <>
      {sAs.map((s, index) => (
        <div key={index}>
            <span>
              - <Popup text={s.name} popText={s.description} />
            </span>
            <span>{" "}{s.text}</span>
        </div>
      ))}
    </>
  );
};

export type DmgSpcAbProps = {
  sAs: DamageSpecialAbility[];
};

export const DamageSpecialAbiliiesComponent: React.FC<DmgSpcAbProps> = ({
  sAs
}) => {
  return (
    <>
      {sAs.map((s, index) => (
        <div key={index}>
          <span>
            - <Popup text={s.name} popText={s.description}/>
            {" "}CD{s.cd}{" "}
            <DamageThrow
              diceNumber={s.damageNumberDice}
              diceDamage={s.damageDice}
            />{" "}
            {s.area} {s.target}
          </span>
        </div>
      ))}
    </>
  );
};

export type ResEnergyProps = {
  sAs: ResistanceToEnergy;
};

export const ResistanceToEnergyComponent: React.FC<ResEnergyProps> = ({
  sAs
}) => {
  const resistanceText: string = sAs.valueText
    .sort((a, b) => a[0] - b[0])
    .sort((a, b) => a[1].localeCompare(b[1]))
    .flatMap((v) => v[0] + " " + v[1])
    .join(", ");
  return (
    <>
      <div>
        <span>
          - {sAs.name} {resistanceText}
        </span>
      </div>
    </>
  );
};

export type SpellResProps = {
  sAs: SpellResistance;
};

export const SpellResistanceComponent: React.FC<SpellResProps> = ({ sAs }) => {
  return (
    <>
      <div>
        <span>
          - {sAs.name} {sAs.value}
        </span>
      </div>
    </>
  );
};
