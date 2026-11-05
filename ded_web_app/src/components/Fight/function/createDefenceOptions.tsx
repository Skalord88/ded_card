import { ModifiedCharacter } from "../../ModifiedCharacter/interface/ModifiedCharacter";
import { ARMOR_BONUS, SHIELD_BONUS } from "../../Prerequisite/interface/ModifierEnum";

export type FightOptions = {
  text: string;
  number: number;
  damage?: DamageWeaponChar;
};

export type DamageWeaponChar = {
  weaponDamage: string;
  weaponCrit: string;
  charDamage: number;
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