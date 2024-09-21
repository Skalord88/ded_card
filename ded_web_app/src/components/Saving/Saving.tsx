import { SignAndCount, BonusAbilities } from "../functions";
import { CharacterPc, savingThrows, SignAndNumber } from "../interfaces";

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
  char: CharacterPc,
  sT: savingThrows,
  savingBonusAll: number
): SavingProps => {
  return {
    idFor: 1,
    for: SignAndCount([sT.fortitude]),
    forTot: SignAndCount([
      sT.fortitude,
      BonusAbilities(char.abilitys, "COS"),
      savingBonusAll
    ]),
    forAb: SignAndCount([BonusAbilities(char.abilitys, "COS")]),
    forOther: SignAndCount([savingBonusAll]),
    ///
    idRef: 2,
    ref: SignAndCount([sT.reflex]),
    refTot: SignAndCount([
      sT.reflex,
      BonusAbilities(char.abilitys, "DEX"),
      savingBonusAll
    ]),
    refAb: SignAndCount([BonusAbilities(char.abilitys, "DEX")]),
    refOther: SignAndCount([savingBonusAll]),
    ///
    idWill: 3,
    will: SignAndCount([sT.will]),
    willTot: SignAndCount([
      sT.will,
      BonusAbilities(char.abilitys, "WIS"),
      savingBonusAll
    ]),
    willAb: SignAndCount([BonusAbilities(char.abilitys, "WIS")]),
    willOther: SignAndCount([savingBonusAll])
  };
};
