import { AttackRoll } from "../Attack/AttackRoll/interface";
import { Item } from "../interfaces";
import { Prerequisite } from "../Prerequisite/interface/Prerequisite";
import { Abilitys } from "./Interface";

export function abilityAbbreviation(ability: string): string {
  switch (ability) {
    case "STRENGTH":
      return "STR";
    case "DEXTERITY":
      return "DEX";
    case "CONSTITUTION":
      return "CON";
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
export function findAbility(charAb: Abilitys, ability: string): number {
  switch (ability) {
    case "STRENGTH":
      return charAb.strength;
    case "STR":
      return charAb.strength;
    case "DEXTERITY":
      return charAb.dexterity;
    case "DEX":
      return charAb.dexterity;
    case "CONSTITUTION":
      return charAb.constitution;
    case "CON":
      return charAb.constitution;
    case "INTELLIGENCE":
      return charAb.intelligence;
    case "INT":
      return charAb.intelligence;
    case "WISDOM":
      return charAb.wisdom;
    case "WIS":
      return charAb.wisdom;
    case "CHARISMA":
      return charAb.charisma;
    case "CHA":
      return charAb.charisma;
    default:
      return 0;
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

export const addTwoAbilitysModifiers = (
  abOne: Abilitys,
  abTwo: Abilitys
): Abilitys => {
  return {
    strength: (abOne.strength ?? 0) + (abTwo.strength ?? 0),
    dexterity: (abOne.dexterity ?? 0) + (abTwo.dexterity ?? 0),
    constitution: (abOne.constitution ?? 0) + (abTwo.constitution ?? 0),
    intelligence: (abOne.intelligence ?? 0) + (abTwo.intelligence ?? 0),
    wisdom: (abOne.wisdom ?? 0) + (abTwo.wisdom ?? 0),
    charisma: (abOne.charisma ?? 0) + (abTwo.charisma ?? 0)
  };
};
export const maxTwoAbilitysModifiers = (
  abOne: Abilitys,
  abTwo: Abilitys
): Abilitys => {
  return {
    strength: abOne.strength > abTwo.strength? abOne.strength : abTwo.strength,
    dexterity: abOne.dexterity > abTwo.dexterity? abOne.dexterity : abTwo.dexterity,
    constitution: abOne.constitution > abTwo.constitution? abOne.constitution : abTwo.constitution,
    intelligence: abOne.intelligence > abTwo.intelligence? abOne.intelligence : abTwo.intelligence,
    wisdom: abOne.wisdom > abTwo.wisdom? abOne.wisdom : abTwo.wisdom,
    charisma: abOne.charisma > abTwo.charisma? abOne.charisma : abTwo.charisma
  };
};

export const addAbilitysModifiers = (abs: Abilitys[]): Abilitys => {
  return abs.reduce(
    (max, one) => {
      return {
        strength: max.strength + one.strength,
        dexterity: max.dexterity + one.dexterity,
        constitution: max.constitution + one.constitution,
        intelligence: max.intelligence + one.intelligence,
        wisdom: max.wisdom + one.wisdom,
        charisma: max.charisma + one.charisma
      };
    },
    {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    } as Abilitys);
};
export const maxAbilitysModifiers = (abs: Abilitys[]): Abilitys => {
  return abs.reduce(
    (max, one) => {
      return {
        strength: max.strength > one.strength ? max.strength : one.strength,
        dexterity:
          max.dexterity > one.dexterity ? max.dexterity : one.dexterity,
        constitution:
          max.constitution > one.constitution
            ? max.constitution
            : one.constitution,
        intelligence:
          max.intelligence > one.intelligence
            ? max.intelligence
            : one.intelligence,
        wisdom: max.wisdom > one.wisdom ? max.wisdom : one.wisdom,
        charisma: max.charisma > one.charisma ? max.charisma : one.charisma
      };
    },
    {
      strength: 0,
      dexterity: 0,
      constitution: 0,
      intelligence: 0,
      wisdom: 0,
      charisma: 0
    } as Abilitys
  );
};

export const ifTargetInPrerequisite = (
  pre: Prerequisite
): (string | Item[])[] => {
  const returnList: (string | Item[])[] = [];
  if (pre.weaponType) returnList.push(pre.weaponType);
  if (pre.armorType) returnList.push(pre.armorType);
  if (pre.items) returnList.push(pre.items);
  return returnList;
};

export const maxBonusInModifier = (actualBonus: number, newBonus: number) => {
  return actualBonus > newBonus ? actualBonus : newBonus;
};

export const maxBonusInAttackRoll = (list: AttackRoll[]): AttackRoll[] => {
  const newList: AttackRoll[] = list.map((item, index) => {
    const next = list[index + 1];
    if (
      next &&
      item.modifierBonus !== next.modifierBonus &&
      item.target !== next.target &&
      item.type !== next.type
    ) {
      return item;
    } else if (next) {
      return {
        ...item,
        bonus:
          (item.bonus as number) > (next.bonus as number)
            ? (item.bonus as number)
            : (next.bonus as number)
      };
    }
    return item;
  });
  return newList;
};
export const addBonusInAttackRoll = (list: AttackRoll[]): AttackRoll[] => {
  const newList: AttackRoll[] = list.map((item, index) => {
    const next = list[index + 1];
    if (
      next &&
      item.modifierBonus !== next.modifierBonus &&
      item.target !== next.target &&
      item.type !== next.type
    ) {
      return item;
    } else if (next) {
      return {
        ...item,
        bonus: (item.bonus as number) + (next.bonus as number)
      };
    }
    return item;
  });
  return newList;
};

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
          dexterity: +mod.abilitys.dexterity,
          constitution: +mod.abilitys.constitution,
          intelligence: +mod.abilitys.intelligence,
          wisdom: +mod.abilitys.wisdom,
          charisma: +mod.abilitys.charisma
        }
      : moddedAbilitys
  );
  return moddedAbilitys;
}
