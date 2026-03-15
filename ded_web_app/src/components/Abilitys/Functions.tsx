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
    case "DEXTERITY":
      return charAb.dexterity;
    case "CONSTITUTION":
      return charAb.constitution;
    case "INTELLIGENCE":
      return charAb.intelligence;
    case "WISDOM":
      return charAb.wisdom;
    case "CHARISMA":
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
    } as Abilitys
  );
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

// export const addBonusInAttackRoll = (list: AttackRoll[]): AttackRoll[] => {
//   const newList: AttackRoll[] = list.map((item, index) => {
//     if (list[index + 1]){
//     if (
//       item.modifierBonus !== list[index + 1].modifierBonus &&
//       item.target !== list[index + 1].target &&
//       item.type !== list[index + 1].type
//     ) {
//       return item;
//     } else {
//       return {
//         modifierBonus: item.modifierBonus,
//         target: item.target,
//         type: item.type,
//         bonus: (item.bonus as number) + (list[index + 1].bonus as number)
//       };
//     }} return item;
//   });
//   return newList;
// };

export const ifTargetInPrerequisite = (pre: Prerequisite): (string | Item[])[] => {
  const returnList: (string | Item[])[] = [];
  if(pre.weaponType) returnList.push(pre.weaponType);
  if(pre.armorType) returnList.push(pre.armorType);
  if(pre.items) returnList.push(pre.items);
  return returnList;
};

export const maxBonusInModifier = (actualBonus: number, newBonus: number) => {
  return actualBonus > newBonus? actualBonus : newBonus
}

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
        bonus: (item.bonus as number) > (next.bonus as number) ? (item.bonus as number) : (next.bonus as number)
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
