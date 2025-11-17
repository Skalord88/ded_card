import {
  abilityAbbreviation,
  BonusAbilities,
  findAbility
} from "../../Abilitys/Functions";
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
  SpecialAttacks,
  Spell
} from "../../interfaces";
import {
  findAllProficency,
  ReturnRingPosition
} from "../../Items/Functions/function";
import { modifyInventory } from "../../Items/Inventory/function";
import { SpellsByLevelAndClass } from "../../Magic/Functions";
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
import { emptyAttacks, noneWeapon } from "../../variables";
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
  magicClassLv?: { [classe: string]: number };
  spellsPerDay?: (Book | null)[];
  spellsKnown?: (Book | null)[];
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
      // console.log("tb" , tb , index)
      if (!table[index] || [-2, -1, 0].includes(index) || -2 === tb) {
        return tb;
      } else {
        return tb + table[index];
      }
    });
  }
  return [-3];
};

export const SorcererWizzardFilter = (classe: string): string => {
  if (classe === "WIZARD" || classe === "SORCERER") {
    return "SORCERER_WIZARD";
  } else {
    return classe;
  }
};

export const FindBaseCasterOfPrestige = (
  id: number,
  classi: ClassPc[]
): string => {
  const foundClass = classi.find((c) => c.classCharacter.id === id);
  if (!foundClass) return "";
  return foundClass.classCharacter.className;
};

export const CurrentCasterLevelInClass = (
  classi: ClassPc[]
): { [classe: string]: number } => {
  const casterLevel: { [classe: string]: number } = {};

  classi.forEach((classe) => {
    if (classe.baseClass) {
      // Prestige class: find which base class it contributes to
      const baseCaster = FindBaseCasterOfPrestige(classe.baseClass, classi);
      casterLevel[baseCaster] = (casterLevel[baseCaster] || 0) + classe.level;
    } else {
      // Normal (base) class
      const className = classe.classCharacter.className;
      casterLevel[className] = (casterLevel[className] || 0) + classe.level;
    }
  });

  return casterLevel;
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
  const changedAbilitys: Abilitys = changeAbilitysFromPrerequisite(
    char.abilitys,
    abilitys
  );
  const adjBab: number = Math.floor(
    CountBabFromClassPc(char) + FindAllAdjLevel(char) * adjClass.classBab
  );
  const totalClassLv: number = char.classPcList.reduce(
    (tot, cl) => tot + cl.level,
    0
  );

  const classiMagiche: { [classe: string]: number } = CurrentCasterLevelInClass(
    char.classPcList
  );

  const daySpells: {
    classe: string;
    spells: number[];
  }[] = char.classPcList.flatMap((cl) => {
    if (cl.classCharacter.spellsPerDay && !cl.baseClass) {
      return [
        {
          classe: cl.classCharacter.className,
          spells: addBonusSpells(
            findAbility(char.abilitys, cl.classCharacter.spellBonus ?? ""),
            cl.classCharacter.spellsPerDay.spellsInLevel.find(
              (s) => s.level === classiMagiche[cl.classCharacter.className]
            )?.spells || []
          )
        }
      ];
    } else {
      return [];
    }
  });
  const mapOfDaySpells: { [classe: string]: number[] } = {};
  daySpells.forEach((dS) => {
    mapOfDaySpells[dS.classe] = dS.spells;
  });
  const mapOfDaySpellsDB: { [classe: string]: Spell[] } = {};

  char.books.forEach((b) => {
    if (Array.isArray(b.spellsBook)) {
      const spellsList: Spell[] = Array.from(b.spellsBook).filter(
        (s): s is Spell => s !== null
      );
      mapOfDaySpellsDB[b.caster + "-lv." + b.level] = spellsList;
    }
  });

  let totalSpellsDay: Book[] = [];
  for (const [classe, lista] of Object.entries(mapOfDaySpells)) {
    lista.forEach((numberOfSpells, indexN) => {
      const esiste = mapOfDaySpellsDB[classe + "-lv." + indexN];
      if (esiste) {
        let libro: (Spell | null)[] = [
          ...esiste,
          ...Array(Math.max(0, numberOfSpells - esiste.length)).fill(null)
        ];

        totalSpellsDay.push({
          id: char.books.find((s) => s.level === indexN && s.caster === classe)
            ?.id,
          caster: classe,
          level: indexN,
          knowDay: "DAY",
          spellsBook: libro
        });
      } else {
        totalSpellsDay.push({
          id: -1,
          caster: classe,
          level: indexN,
          knowDay: "DAY",
          spellsBook: Array(Math.max(0, numberOfSpells)).fill(null)
        });
      }
    });
  }

  const knowSpells: {
    classe: string;
    spells: number[];
  }[] = char.classPcList.flatMap((cl) =>
    cl.classCharacter.spellsKnown && !cl.baseClass
      ? [
          {
            classe: cl.classCharacter.className,
            spells: addBonusSpells(
              findAbility(char.abilitys, cl.classCharacter.spellBonus ?? ""),
              cl.classCharacter.spellsKnown.spellsInLevel.find(
                (s) => s.level === classiMagiche[cl.classCharacter.className]
              )?.spells || []
            )
          }
        ]
      : []
  );
  const totalSpellsKnown: (Book | null)[] = knowSpells.flatMap((ks) => {
    const caster: string = ks.classe;
    const sp = char.books.filter(
      (b) => b.caster === caster && b.knowDay === "KNOWN"
    );
    return ks.spells.map((s, sIndex) => {
      if (s !== -3) {
        if (s === -2) {
          return {
            id: -2,
            caster: caster,
            level: sIndex,
            knowDay: "KNOWN",
            spellsBook: true
          };
        }
        const spells: (Spell | null)[] = [];
        for (let i = 0; i < s; i++) {
          if (sp.length - i > 0) {
            sp.forEach((b) => {
              if (b.level === sIndex) {
                spells.push(
                  Array.isArray(b.spellsBook) ? b.spellsBook[i] : null
                );
              }
            });
          } else {
            spells.push(null);
          }
        }
        if (spells === null) {
          return {
            id: -1,
            caster: caster,
            level: sIndex,
            knowDay: "KNOWN",
            spellsBook: spells
          };
        } else {
          return {
            id: sp.find((s) => s.level === sIndex && s.caster === caster)?.id,
            caster: caster,
            level: sIndex,
            knowDay: "KNOWN",
            spellsBook: spells
          };
        }
      } else {
        return null;
      }
    });
  });

  // console.log("totalSpellsKnown", totalSpellsKnown);

  const allClassesSkillPoints: number = char.classPcList.reduce(
    (tot, cl) =>
      tot +
      (cl.firstClass
        ? (cl.classCharacter.skillPoints +
            BonusAbilities(
              changedAbilitys,
              abilityAbbreviation("intelligence")
            )) *
            4 +
          cl.classCharacter.skillPoints * (cl.level - 1)
        : (cl.classCharacter.skillPoints +
            BonusAbilities(
              changedAbilitys,
              abilityAbbreviation("intelligence")
            )) *
          cl.level),
    0
  );

  const maxSkillPnts: number =
    FindAllAdjLevel(char) * adjClass.skillPoints + allClassesSkillPoints;

  const allFeats = groupAllFeats(char);
  const allProficency: { type: string[]; specific: Item[] } = items
    ? findAllProficency(allFeats, items)
    : { type: [], specific: [] };

  const newChar: CharToModify = {
    abilitys: changedAbilitys,
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
    inventory: modifyInventory(char.race.size.id, char.inventory),
    attacks:
      char.attacks === null
        ? emptyAttacks
        : {
            firstAttackSetOne: char.attacks.firstAttackSetOne
              ? char.attacks.firstAttackSetOne
              : noneWeapon,
            secondAttackSetOne: char.attacks.secondAttackSetOne
              ? char.attacks.secondAttackSetOne
              : noneWeapon,
            additionalAttackSetOne: char.attacks.additionalAttackSetOne
              ? char.attacks.additionalAttackSetOne
              : noneWeapon,
            firstAttackSetTwo: char.attacks.firstAttackSetTwo
              ? char.attacks.firstAttackSetTwo
              : noneWeapon,
            secondAttackSetTwo: char.attacks.secondAttackSetTwo
              ? char.attacks.secondAttackSetTwo
              : noneWeapon,
            additionalAttackSetTwo: char.attacks.additionalAttackSetTwo
              ? char.attacks.additionalAttackSetTwo
              : noneWeapon
          },
    proficency: allProficency,
    skills: findSkillsPrerequisite(prer),
    skillsList: createSkillsList(char),
    skillsPointToSpent: maxSkillPnts,
    speed: findSpeedPrerequisite(prer),
    feats: allFeats,
    specialAbilities: getAllSpecialAbilities(char),
    magicClassLv: classiMagiche,
    spellsPerDay: totalSpellsDay,
    spellsKnown: totalSpellsKnown
    // books: char.books
  };
  return newChar;
};
