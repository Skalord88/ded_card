import { Abilitys } from "../Abilitys/Interface";
import { SignAndCount, BonusAbilities } from "../functions";
import { CharacterPc, savingThrows, SignAndNumber } from "../interfaces";
import { FindInOneLengthModifier } from "../Modifiers/Function";
import { Modifiers } from "../Modifiers/ModifierInterface";

export type SavingProps = {
  idFor: number;
  for: SignAndNumber;
  forTot: SignAndNumber;
  forAb: SignAndNumber;
  forOther: SignAndNumber;
  ///
  idRef: number;
  ref: SignAndNumber;
  refTot: SignAndNumber;
  refAb: SignAndNumber;
  refOther: SignAndNumber;
  ///
  idWill: number;
  will: SignAndNumber;
  willTot: SignAndNumber;
  willAb: SignAndNumber;
  willOther: SignAndNumber;
};

export const Saving = (
  abilitys: Abilitys,
  sT: savingThrows,
  savingBonusAll: number,
  modifiers: Modifiers[]
): SavingProps => {
  return {
    idFor: 1,
    for: SignAndCount([sT.fortitude]),
    forTot: SignAndCount([
      sT.fortitude,
      BonusAbilities(abilitys, "COS"),
      savingBonusAll,
      FindInOneLengthModifier(modifiers, "FORTITUDE")
    ]),
    forAb: SignAndCount([BonusAbilities(abilitys, "COS")]),
    forOther: SignAndCount([savingBonusAll]),
    ///
    idRef: 2,
    ref: SignAndCount([sT.reflex]),
    refTot: SignAndCount([
      sT.reflex,
      BonusAbilities(abilitys, "DEX"),
      savingBonusAll,
      FindInOneLengthModifier(modifiers, "REFLEX")
    ]),
    refAb: SignAndCount([BonusAbilities(abilitys, "DEX")]),
    refOther: SignAndCount([savingBonusAll]),
    ///
    idWill: 3,
    will: SignAndCount([sT.will]),
    willTot: SignAndCount([
      sT.will,
      BonusAbilities(abilitys, "WIS"),
      savingBonusAll,
      FindInOneLengthModifier(modifiers, "WILL")
    ]),
    willAb: SignAndCount([BonusAbilities(abilitys, "WIS")]),
    willOther: SignAndCount([savingBonusAll])
  };
};
