import { Prerequisite } from "../Prerequisite/interface/Prerequisite";
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
      return Math.floor((ab.dexterity - 10) / 2);
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

export function AbilitysAndModifiers(
  abilitys: Abilitys,
  modifications: Prerequisite[]
): Abilitys {
  let moddedAbilitys: Abilitys = abilitys;

  modifications.forEach((mod) =>
    mod.abilitys != null
      ? {
          ...abilitys,
          strength: +mod.abilitys.strength,
          dexterity: +mod.abilitys.strength,
          constitution: +mod.abilitys.strength,
          intelligence: +mod.abilitys.strength,
          wisdom: +mod.abilitys.strength,
          charisma: +mod.abilitys.strength
        }
      : moddedAbilitys
  );
  return moddedAbilitys;

  // strength:
  //   abilitys.strength +
  //   FindInOneLengthModifier(modifications, "STRENGHT"),
  //   dexterity:
  //   abilitys.dexterity +
  //   FindInOneLengthModifier(modifications, "DEXTERITY"),
  // constitution:
  //   abilitys.constitution +
  //   FindInOneLengthModifier(modifications, "CONSTITUTION"),
  // intelligence:
  //   abilitys.intelligence +
  //   FindInOneLengthModifier(modifications, "INTELLIGENCE"),
  // wisdom:
  //   abilitys.wisdom +
  //   FindInOneLengthModifier(modifications, "WISDOM"),
  // charisma:
  //   abilitys.charisma +
  //   FindInOneLengthModifier(modifications, "CHARISMA"),
  // };
}
