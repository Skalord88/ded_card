import { Abilitys } from "../Abilitys/Interface";
import { SignAndCount, BonusAbilities } from "../functions";
import { savingThrows, SignAndNumber } from "../interfaces";
import { FindInOneLengthModifier } from "../Modifiers/Function";
import { Modifiers } from "../Modifiers/ModifierInterface";

// export type SavingProps = {
//   idFor: number;
//   for: SignAndNumber;
//   forTot: SignAndNumber;
//   forAb: SignAndNumber;
//   forOther: SignAndNumber;
//   ///
//   idRef: number;
//   ref: SignAndNumber;
//   refTot: SignAndNumber;
//   refAb: SignAndNumber;
//   refOther: SignAndNumber;
//   ///
//   idWill: number;
//   will: SignAndNumber;
//   willTot: SignAndNumber;
//   willAb: SignAndNumber;
//   willOther: SignAndNumber;
// };
export type SavingProps = {
  id: number;
  text: string,
  save: SignAndNumber;
  tot: SignAndNumber;
  ab: SignAndNumber;
  other: SignAndNumber;
};

export const Saving = (
  abilitys: Abilitys,
  sT: savingThrows,
  savingBonusAll: number,
  modifiers: Modifiers[]
): SavingProps[] => {
  return [
    {
      id: 1,
      text: 'for',
      save: SignAndCount([sT.fortitude]),
      tot: SignAndCount([
        sT.fortitude,
        BonusAbilities(abilitys, "COS"),
        savingBonusAll,
        FindInOneLengthModifier(modifiers, "FORTITUDE")
      ]),
      ab: SignAndCount([BonusAbilities(abilitys, "COS")]),
      other: SignAndCount([savingBonusAll])
    },
    {
      id: 2,
      text: 'ref',
      save: SignAndCount([sT.reflex]),
      tot: SignAndCount([
        sT.reflex,
        BonusAbilities(abilitys, "DEX"),
        savingBonusAll,
        FindInOneLengthModifier(modifiers, "REFLEX")
      ]),
      ab: SignAndCount([BonusAbilities(abilitys, "DEX")]),
      other: SignAndCount([savingBonusAll])
    },
    {
      id: 3,
      text: 'will',
      save: SignAndCount([sT.will]),
      tot: SignAndCount([
        sT.will,
        BonusAbilities(abilitys, "WIS"),
        savingBonusAll,
        FindInOneLengthModifier(modifiers, "WILL")
      ]),
      ab: SignAndCount([BonusAbilities(abilitys, "WIS")]),
      other: SignAndCount([savingBonusAll])
    }
  ];
};
