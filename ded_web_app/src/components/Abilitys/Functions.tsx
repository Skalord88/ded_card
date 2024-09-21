import { CharacterPc } from "../interfaces";
import {
} from "../Modifiers/Ability/Function";
import { FindInOneLengthModifier } from "../Modifiers/Function";
import { Modifiers } from "../Modifiers/ModifierInterface";
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

export function AbilitysAndModifiers(abilitys: Abilitys, modifications: Modifiers[]): Abilitys {
  return {
    strength:
      abilitys.strength +=
      FindInOneLengthModifier(modifications, "STRENGHT"),
    dextrity:
      abilitys.dextrity +=
      FindInOneLengthModifier(modifications, "DEXTERITY"),
    constitution: 
      abilitys.constitution +=
      FindInOneLengthModifier(modifications, "CONSTITUTION"),
    intelligence:
      abilitys.intelligence +=
      FindInOneLengthModifier(modifications, "INTELLIGENCE"),
    wisdom: 
      abilitys.wisdom +=
      FindInOneLengthModifier(modifications, "WISDOM"),
    charisma: 
      abilitys.charisma +=
      FindInOneLengthModifier(modifications, "CHARISMA"),
  };
}
