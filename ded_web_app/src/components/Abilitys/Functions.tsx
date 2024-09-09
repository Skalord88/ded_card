import { CharacterPc } from "../interfaces";
import {
  FindCharismaModification,
  FindConstitutionModification,
  FindDextrityModification,
  FindIntelligenceModification,
  FindStrenghtModification,
  FindWisdomModification
} from "../Modifiers/Ability/Function";
import { CheckInAllModifications } from "../Modifiers/Function";
import { Abilitys } from "./Interface";

export function AbilityAbbreviation(ability: string): string {
  switch (ability) {
    case "STRENGHT":
      return "STR";
    case "DEXTERITY":
      return "DEX";
    case "CONSTITUTION":
      return "COS";
    case "INTELLIGENCE":
      return "INT";
    case "WISDOM":
      return "WIS";
    case "CHARISMA":
      return "CHA";
    default:
      return "";
  }
}

export function BonusAbilities(ab: Abilitys, which: string) {
  switch (which) {
    case "STR":
      return Math.floor((ab.strength - 10) / 2);
    case "DEX":
      return Math.floor((ab.dextrity - 10) / 2);
    case "COS":
      return Math.floor((ab.constitution - 10) / 2);
    case "INT":
      return Math.floor((ab.intelligence - 10) / 2);
    case "WIS":
      return Math.floor((ab.wisdom - 10) / 2);
    case "CHA":
      return Math.floor((ab.charisma - 10) / 2);
    default:
      return 0;
  }
}

export function AbilitysAndModifiers(char: CharacterPc): Abilitys {
  return {
    strength:
      char.abilitys.strength +
      FindStrenghtModification(CheckInAllModifications(char, "ability"))[0],
    dextrity:
      char.abilitys.dextrity +
      FindDextrityModification(CheckInAllModifications(char, "ability"))[0],
    constitution: (char.abilitys.constitution += FindConstitutionModification(
      CheckInAllModifications(char, "ability")
    )[0]),
    intelligence: (char.abilitys.intelligence += FindIntelligenceModification(
      CheckInAllModifications(char, "ability")
    )[0]),
    wisdom: (char.abilitys.wisdom += FindWisdomModification(
      CheckInAllModifications(char, "ability")
    )[0]),
    charisma: (char.abilitys.charisma += FindCharismaModification(
      CheckInAllModifications(char, "ability")
    )[0])
  };
}
