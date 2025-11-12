import { findAbility } from "../Abilitys/Functions";
import { Book, CharacterPc, Spell } from "../interfaces";
import { SorcererWizzardFilter } from "../Prerequisite/functions/modifyCharacter";

export function SortedBooks(books: Book[]): Book[] {
  return books.sort((a, b) => a.caster.localeCompare(b.caster));
}

export type SpellsByLevelAndClass = {
  class: string;
  level: number;
  spells: Spell[];
};

export function FilterSpellsByLevelAndClass(
  spellsDB: Spell[],
  maxLevelClass: { [classe: string]: number }
): SpellsByLevelAndClass[] {
  const result: SpellsByLevelAndClass[] = [];

  for (const maxLv in maxLevelClass) {
    const levels: number = maxLevelClass[maxLv] + 1;
    // levels va aggiunto 1 per iterare correttamente
    for (let i = 0; i < levels; i++) {
      const domanin = SorcererWizzardFilter(maxLv);
      result.push({
        class: maxLv,
        level: i,
        spells: spellsDB.filter((spell) =>
          spell.level?.some((lv) => {
            if (domanin === lv.classDomain && lv.level === i) return lv;
          })
        )
      });
    }
  }

  // console.log("spellsDB" , spellsDB)
  // console.log("maxLevelClass" , maxLevelClass)
  // console.log("result" , result)
  return result;
}

// for (const [className, maxLevel] of Object.entries(maxLevelClass)) {
//   for (let level = 0; level <= maxLevel; level++) {
//     const spellsAtLevel = spellsDB.filter(
//       (spell) => spell.level?.some(sl => sl.classDomain === className) && spell.level?.some(sl => sl.level === level)
//     );

//     if (spellsAtLevel.length > 0) {
//       result.push({
//         class: className,
//         level,
//         spells: spellsAtLevel,
//       });
//     }
//   }
// }

// return result;

// export function FilterSpellsByLevelAndClass(
//   spellsDB: Spell[],
//   // character: CharacterPc,
//   classAndLevel: { [key: string]: number[] }
// ): SpellsByLevelAndClass[] {
//   let filtred: SpellsByLevelAndClass[] = [];

//   const domains: Set<string> = new Set();
//   spellsDB.forEach((spell) => {
//     spell.level?.forEach((lv) => {
//       if (lv.classDomain) {
//         domains.add(lv.classDomain);
//       }
//     });
//   });

//   domains.forEach((domain) => {
//     if(classAndLevel[domain] === undefined) return;
//     const lvs: number[] | null = classAndLevel[domain];
//       const maxLevel: number = lvs.length;
//       // if (classAndLevel[domain]) {
//       for (let level = 0; level < maxLevel; level++) {
//         const spellsForClassAndLevel: Spell[] = spellsDB.filter((spell) =>
//           spell.level?.some(
//             (lv) => lv.classDomain === domain && lv.level === level
//           )
//         );

//         if (spellsForClassAndLevel.length > 0) {
//           filtred.push({
//             class: domain,
//             level: level,
//             // attribute: FindAbilityForCaster(character, domain)[domain],
//             spells: spellsForClassAndLevel
//           });
//         }
//       }})
//   return filtred;
// }

export const FindAbilityForCaster = (
  char: CharacterPc,
  domain: string
): { [key: string]: number } => {
  const mapOfAbility: { [key: string]: number } = {};

  // sicurezza: se char o classPcList mancano
  if (!char?.classPcList || !Array.isArray(char.classPcList)) {
    // console.warn("classPcList è assente o non è un array:", char);
    mapOfAbility[domain] = 0;
    return mapOfAbility;
  }

  // ciclo principale
  for (const c of char.classPcList) {
    const classChar = c.classCharacter;
    if (!classChar) continue;

    if (classChar.spellsDomain && classChar.spellBonus) {
      if (domain === classChar.spellsDomain) {
        mapOfAbility[classChar.spellsDomain] = findAbility(
          char.abilitys,
          classChar.spellBonus
        );
        return mapOfAbility; // trovato, usciamo subito
      }
    }
  }

  // se nessuna corrispondenza trovata
  mapOfAbility[domain] = 0;
  return mapOfAbility;
};

export type BonusTableSpellsType = {
  [key: number]: number[];
};

// export const BonusTableSpells: { [key: number]: number[] } = {
//   10: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   11: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   12: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//   13: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
//   14: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
//   15: [0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
//   16: [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
//   17: [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
//   18: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
//   19: [0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
//   20: [0, 2, 1, 1, 1, 1, 0, 0, 0, 0],
//   21: [0, 2, 1, 1, 1, 1, 0, 0, 0, 0],
//   22: [0, 2, 2, 1, 1, 1, 0, 0, 0, 0],
//   23: [0, 2, 2, 1, 1, 1, 0, 0, 0, 0]
// };

export const FilterPerKnownSpells = (
  all: boolean,
  filter: number[],
  spells: Spell[]
): Spell[] => {
  if (all) return spells;

  return spells.filter((s) => filter.some((f) => f === s.id));
};

export const FilterAlreadyKnownSpells = (
  filterKnown: {
    [classe: string]: Set<number>;
  },
  caster: string,
  level: number,
  spells: SpellsByLevelAndClass[]
): Spell[] => {
  return spells.flatMap((s) =>
    s.class === caster && s.level === level
      ? s.spells.filter(
          (spell) => filterKnown[caster].has(spell.id) === false
        ) ?? []
      : []
  );
};

export const FilterDayByAlreadyKnownSpells = (
  filterKnown: {
    [classe: string]: Set<number>;
  },
  idx: number, // index actual level
  caster: string,
  level: number,
  spells: SpellsByLevelAndClass[],
  choosenKnownSpell: (Book | null)[]
) => {
  return spells.flatMap((s) =>
    s.class === caster && s.level === level
      ? s.spells
        ? s.spells.filter((spell) => {
            if (
              (choosenKnownSpell[idx]?.spellsBook as boolean) &&
              choosenKnownSpell[idx]?.spellsBook === true
            ) {
              return spell;
            }
            if (filterKnown[caster]?.has(spell.id)) {
              return spell;
            }
          })
        : []
      : []
  );
};
