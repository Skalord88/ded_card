import { Abilitys } from "../Abilitys/Interface";
import { BonusAbilities, signAndCount } from "../functions";
import { savingThrows, SignAndNumber } from "../interfaces";

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
  // modifiers: Modifiers[]
): SavingProps[] => {
  return [
    {
      id: 1,
      text: 'for',
      save: signAndCount([sT.fortitude]),
      tot: signAndCount([
        sT.fortitude,
        BonusAbilities(abilitys, "COS"),
        savingBonusAll,
        // FindInOneLengthModifier(modifiers, "FORTITUDE")
      ]),
      ab: signAndCount([BonusAbilities(abilitys, "COS")]),
      other: signAndCount([savingBonusAll])
    },
    {
      id: 2,
      text: 'ref',
      save: signAndCount([sT.reflex]),
      tot: signAndCount([
        sT.reflex,
        BonusAbilities(abilitys, "DEX"),
        savingBonusAll,
        // FindInOneLengthModifier(modifiers, "REFLEX")
      ]),
      ab: signAndCount([BonusAbilities(abilitys, "DEX")]),
      other: signAndCount([savingBonusAll])
    },
    {
      id: 3,
      text: 'will',
      save: signAndCount([sT.will]),
      tot: signAndCount([
        sT.will,
        BonusAbilities(abilitys, "WIS"),
        savingBonusAll,
        // FindInOneLengthModifier(modifiers, "WILL")
      ]),
      ab: signAndCount([BonusAbilities(abilitys, "WIS")]),
      other: signAndCount([savingBonusAll])
    }
  ];
};
