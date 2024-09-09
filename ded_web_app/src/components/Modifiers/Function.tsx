import { CharacterPc } from "../interfaces";
import {
  CharismaBonusModification,
  ConstitutionBonusModification,
  DextrityBonusModification,
  IntelligenceBonusModification,
  StrenghtBonusModification,
  WisdomBonusModification
} from "./Ability/Function";
import { ArmorSizeBonusModification } from "./Armor/Function";
import { BabBonusModification } from "./Bab/Function";
import { CountModifiersGrapple } from "./Grapple/Function";
import { SavingBonusModification } from "./Saving/Function";

export function CheckInAllModifications(
  char: CharacterPc,
  check: string
): [number, string][] {
  let list: [number, string][] = [];
  if ((check = "ability")) {
    list.push([
      StrenghtBonusModification(char.race.modifiers)[0] +
        StrenghtBonusModification(char.race.race.modifiers)[0],
      "STRENGHT"
    ]);
    list.push([
      DextrityBonusModification(char.race.modifiers)[0] +
        DextrityBonusModification(char.race.race.modifiers)[0],
      "DEXTERITY"
    ]);
    list.push([
      ConstitutionBonusModification(char.race.modifiers)[0] +
        ConstitutionBonusModification(char.race.race.modifiers)[0],
      "CONSTITUTION"
    ]);
    list.push([
      IntelligenceBonusModification(char.race.modifiers)[0] +
        IntelligenceBonusModification(char.race.race.modifiers)[0],
      "INTELLIGENCE"
    ]);
    list.push([
      WisdomBonusModification(char.race.modifiers)[0] +
        WisdomBonusModification(char.race.race.modifiers)[0],
      "WISDOM"
    ]);
    list.push([
      CharismaBonusModification(char.race.modifiers)[0] +
        CharismaBonusModification(char.race.race.modifiers)[0],
      "CHARISMA"
    ]);
  }
  if ((check = "bab")) {
    list.push([BabBonusModification(char.race.size.modifiers)[0], "BAB"]);
  }
  if ((check = "armor")) {
    list.push([
      ArmorSizeBonusModification(char.race.size.modifiers)[0],
      "ARMOR_SIZE"
    ]);
  }
  if ((check = "grapple")) {
    list.push([
      CountModifiersGrapple(char.race.size.modifiers)[0] +
        CountModifiersGrapple(char.race.modifiers)[0] +
        CountModifiersGrapple(char.race.race.modifiers)[0],
      "GRAPPLE"
    ]);
    if ((check = "saving")) {
      list.push([
        SavingBonusModification(char.race.modifiers)[0] +
          SavingBonusModification(char.race.race.modifiers)[0],
        "SAVING"
      ]);
    }
  }
  return list;
}
