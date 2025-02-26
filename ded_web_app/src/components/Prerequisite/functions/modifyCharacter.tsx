import { findAbility } from "../../Abilitys/Functions";
import { Abilitys } from "../../Abilitys/Interface";
import { ArmorClass } from "../../Armor/interface/ArmorInterface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { CountBabFromClassPc } from "../../Attack/Bab/Functions";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { AttackElement } from "../../Attack/function";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { groupAllFeats } from "../../Feats/function";
import { ClassFeats, Feat, FeatPc } from "../../Feats/Interface/FeatInterface";
import {
  Attacks,
  Book,
  CharacterPc,
  Inventory,
  Item,
  ItemsList,
  SpecialAttacks
} from "../../interfaces";
import { findAllProficency } from "../../Items/Functions/function";
import { modifyInventory } from "../../Items/Inventory/function";
import { CountLevelFromClass } from "../../Level/Functions";
import { adjClass } from "../../Race/AdjClass";
import { FindAllAdjLevel } from "../../Race/Function";
import { SpecialAbilities } from "../../Race/Interfaces";
import { CountSavingThrowFromClassPc } from "../../Saving/Functions";
import { SavingThrow } from "../../Saving/interface";
import { Size } from "../../Size/interfaces";
import { createSkillsList } from "../../Skills/functions/function";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { SkillsInList } from "../../Skills/interface/SkillsInList";
import { getAllSpecialAbilities } from "../../SpecialAbilities/function";
import { Speed } from "../../Speed/interface";
import {
  CountHitDicesFromAdj,
  CountHitDicesFromClassPc,
  HitDices
} from "../../Vita/Functions";
import { changeAbilitysFromPrerequisite } from "../abilitys/functions/function";
import { Prerequisite } from "../interface/Prerequisite";
import {
  findAbilitysPrerequisite,
  findArmorPrerequisite,
  findAttackRollPrerequisite,
  findDamageBonusPrerequisite,
  findInitiativePrerequisite,
  findSavingThrowPrerequisite,
  findSkillsPrerequisite,
  findSpecialAttacksPrerequisite,
  findSpeedPrerequisite
} from "./findSpecificPrerequisite";

export type AttackRollElement = {
  mono: AttackRoll[];
  target: AttackRoll[];
  composed: Prerequisite[];
};
export type DamageBonusElement = {
  mono: DamageBonus[];
  target: DamageBonus[];
  composed: Prerequisite[];
};
export type ArmorClassElement = {
  mono: ArmorClass[];
  target: ArmorClass[];
  composed: Prerequisite[];
};

export type SkillsElement = {
  mono: PrerequisiteSkills[];
  target: PrerequisiteSkills[];
};

export type FeatsFromChar = {
  feats: Feat[];
  classFeats: ClassFeats[];
  pcFeats: { fromLevel: FeatPc[]; fromClass: FeatPc[] };
};

export type CharToModify = {
  abilitys: Abilitys;
  bab: number;
  size: Size;
  adjBonus: { bab: number; savingThrow: number; adjLv: number };
  classesLv: number;
  attackRoll: AttackRollElement;
  damageBonus: DamageBonusElement;
  specialAttacks: SpecialAttacks[];
  initiative: number;
  baseSave: { fortitude: number; reflex: number; will: number };
  savingThrow: SavingThrow[];
  listHitDices: HitDices[];
  armor: ArmorClassElement;
  inventory: Inventory;
  attacks: Attacks;
  proficency: { type: string[]; specific: Item[] };
  displayAttType?: AttackElement;
  skills: SkillsElement;
  skillsList: SkillsInList[];
  skillsPointToSpent: number;
  speed: Speed;
  feats: FeatsFromChar;
  specialAbilities: SpecialAbilities[];
  spellsPerDay?: { classe: string; spells: number[] }[];
  spellsKnown?: { classe: string; spells: number[] }[];
  books: Book[];
};

export type TableOfBonusSpells = {
  ab: number[];
  table: number[];
};

export const tableOfBonusSpells: TableOfBonusSpells[] = [
  { ab: [10, 11], table: [] },
  { ab: [12, 13], table: [-1, 1] },
  { ab: [14, 15], table: [-1, 1, 1] },
  { ab: [16, 17], table: [-1, 1, 1, 1] },
  { ab: [18, 19], table: [-1, 1, 1, 1, 1] },
  { ab: [20, 21], table: [-1, 2, 1, 1, 1, 1] },
  { ab: [22, 23], table: [-1, 2, 2, 1, 1, 1, 1] },
  { ab: [24, 25], table: [-1, 2, 2, 2, 1, 1, 1, 1] },
  { ab: [26, 27], table: [-1, 2, 2, 2, 2, 1, 1, 1, 1] },
  { ab: [28, 29], table: [-1, 3, 2, 2, 2, 2, 1, 1, 1, 1] },
  { ab: [30, 31], table: [-1, 3, 3, 2, 2, 2, 2, 1, 1, 1] },
  { ab: [32, 33], table: [-1, 3, 3, 3, 2, 2, 2, 2, 1, 1] },
  { ab: [34, 35], table: [-1, 3, 3, 3, 3, 2, 2, 2, 2, 1] },
  { ab: [36, 37], table: [-1, 4, 3, 3, 3, 3, 2, 2, 2, 2] },
  { ab: [38, 39], table: [-1, 4, 4, 3, 3, 3, 3, 2, 2, 2] },
  { ab: [40, 41], table: [-1, 4, 4, 4, 3, 3, 3, 3, 2, 2] },
  { ab: [42, 43], table: [-1, 4, 4, 4, 4, 3, 3, 3, 3, 2] },
  { ab: [44, 45], table: [-1, 5, 4, 4, 4, 4, 3, 3, 3, 3] }
];

export const canCastSpell = (bnsAb: number): boolean => {
  if (tableOfBonusSpells.find((tB) => tB.ab.includes(bnsAb))) return true;
  return false;
};

export const addBonusSpells = (bnsAb: number, spells: number[]): number[] => {
  if (canCastSpell(bnsAb)) {
    const table =
      tableOfBonusSpells.find((tB) => tB.ab.includes(bnsAb))?.table || [];
    return spells.map((tb, index) => {
      if (table[index] && ![-2, -1, 0].includes(index)) {
        return tb + table[index];
      }
      return tb;
    });
  }
  return [-3];
};

export const checkKnownSpells = (bnsAb: number, spells: number[]): number[] => {
  if (canCastSpell(bnsAb)) {
    return spells.map((tb, index) => {
      if (bnsAb - 10 > index) {
        return tb;
      }
      return -3;
    });
  }
  return [-3];
};

export const modifyCharacter = (
  char: CharacterPc,
  prer: Prerequisite[],
  items?: ItemsList
): CharToModify => {
  const abilitys: Abilitys[] = findAbilitysPrerequisite(prer);
  const adjBab: number = Math.floor(
    CountBabFromClassPc(char) + FindAllAdjLevel(char) * adjClass.classBab
  );
  const totalClassLv: number = char.classPcList.reduce(
    (tot, cl) => tot + cl.level,
    0
  );
  const daySpells: {
    classe: string;
    spells: number[];
  }[] = char.classPcList.flatMap((cl) =>
    cl.classCharacter.spellsPerDay
      ? [
          {
            classe: cl.classCharacter.className,
            spells: addBonusSpells(
              findAbility(char.abilitys, cl.classCharacter.spellBonus),
              cl.classCharacter.spellsPerDay.spellsInLevel
                .find((sp) => sp.level === cl.level)
                ?.spells.map((s) => s) || []
            )
          }
        ]
      : []
  );

  const knowSpells: {
    classe: string;
    spells: number[];
  }[] = char.classPcList.flatMap((cl) =>
    cl.classCharacter.spellsKnown
      ? [
          {
            classe: cl.classCharacter.className,
            spells: checkKnownSpells(
              findAbility(char.abilitys, cl.classCharacter.spellBonus),
              cl.classCharacter.spellsKnown.spellsInLevel
                .find((lv) => lv.level === cl.level)
                ?.spells.map((s) => s) || []
            )
          }
        ]
      : []
  );

  const maxSkillPnts: number =
    FindAllAdjLevel(char) * adjClass.skillPoints +
    char.classPcList.reduce(
      (tot, cl) => tot + cl.level * cl.classCharacter.skillPoints,
      0
    );
  const allFeats = groupAllFeats(char);
  const allProficency: { type: string[]; specific: Item[] } = items
    ? findAllProficency(allFeats, items)
    : { type: [], specific: [] };

  const newChar: CharToModify = {
    abilitys: changeAbilitysFromPrerequisite(char.abilitys, abilitys),
    bab: adjBab,
    size: char.race.size,
    adjBonus: {
      bab: FindAllAdjLevel(char) * adjClass.classBab,
      savingThrow: FindAllAdjLevel(char) * adjClass.classBab,
      adjLv: FindAllAdjLevel(char)
    },
    classesLv: totalClassLv,
    attackRoll: findAttackRollPrerequisite(prer),
    damageBonus: findDamageBonusPrerequisite(prer),
    specialAttacks: findSpecialAttacksPrerequisite(prer),
    initiative: findInitiativePrerequisite(prer),
    baseSave: CountSavingThrowFromClassPc(char.classPcList),
    savingThrow: findSavingThrowPrerequisite(prer),
    listHitDices: CountHitDicesFromAdj(
      FindAllAdjLevel(char),
      CountHitDicesFromClassPc(char.classPcList)
    ),
    armor: findArmorPrerequisite(prer),
    inventory: modifyInventory(char),
    attacks: char.attacks,
    proficency: allProficency,
    skills: findSkillsPrerequisite(prer),
    skillsList: createSkillsList(char),
    skillsPointToSpent: maxSkillPnts,
    speed: findSpeedPrerequisite(prer),
    feats: allFeats,
    specialAbilities: getAllSpecialAbilities(char),
    // spellsPerDay: bonusDaySpells,
    spellsPerDay: daySpells,
    spellsKnown: knowSpells,
    books: char.books
  };
  return newChar;
};
