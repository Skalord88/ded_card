import { Attributes } from "react";
import { ClassPc, SpellsInLevel } from "../ClassPc/Interface/ClassPcLevel";
import { Book, CharacterPc, Spell } from "../interfaces";
import { Abilitys } from "../Abilitys/Interface";
import { findAbility } from "../Abilitys/Functions";

export function SortedBooks(books: Book[]): Book[] {
  return books.sort((a, b) => a.caster.localeCompare(b.caster));
}

export type SpellsByLevelAndClass = {
  class: string;
  level: number;
  attribute?: number;
  spells: Spell[];
  known?: number;
  perDay?: number;
};

export function FilterSpellsByLevelAndClass(
  spellsDB: Spell[],
  // character: CharacterPc,
  classAndLevel: { [key: string]: number[] }
): SpellsByLevelAndClass[] {
  let filtred: SpellsByLevelAndClass[] = [];

  const domains: Set<string> = new Set();
  spellsDB.forEach((spell) => {
    spell.level?.forEach((lv) => {
      if (lv.classDomain) {
        domains.add(lv.classDomain);
      }
    });
  });

  domains.forEach((domain) => {
    if(classAndLevel[domain] === undefined) return;
    const lvs: number[] | null = classAndLevel[domain];
      const maxLevel: number = lvs.length;
      // if (classAndLevel[domain]) {
      for (let level = 0; level < maxLevel; level++) {
        const spellsForClassAndLevel: Spell[] = spellsDB.filter((spell) =>
          spell.level?.some(
            (lv) => lv.classDomain === domain && lv.level === level
          )
        );

        if (spellsForClassAndLevel.length > 0) {
          filtred.push({
            class: domain,
            level: level,
            // attribute: FindAbilityForCaster(character, domain)[domain],
            spells: spellsForClassAndLevel
          });
        }
      }})
  return filtred;
}

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


export const FilterSpellsByPgClass = (
  spells: SpellsByLevelAndClass[],
  char: CharacterPc
): SpellsByLevelAndClass[] => {
  const castersPg: string[] = char.classPcList.flatMap((c) => {
    if (c.classCharacter.className === "WIZARD") {
      return ["WIZARD", "SORCERER_WIZARD"];
    } else if (c.classCharacter.className === "SORCERER") {
      return ["SORCERER", "SORCERER_WIZARD"];
    } else {
      return c.classCharacter.spellsDomain ? c.classCharacter.spellsDomain : [];
    }
  });
  const spellsFiltred: SpellsByLevelAndClass[] = spells.filter((s) =>
    castersPg.includes(s.class)
  );

  return spellsFiltred;
};

export type BonusTableSpellsType = {
  [key: number]: number[];
};

export const BonusTableSpells: { [key: number]: number[] } = {
    10: [0,0,0,0,0,0,0,0,0,0],
    11: [0,0,0,0,0,0,0,0,0,0],
    12: [0,1,0,0,0,0,0,0,0,0],
    13: [0,1,0,0,0,0,0,0,0,0],
    14: [0,1,1,0,0,0,0,0,0,0],
    15: [0,1,1,0,0,0,0,0,0,0],
    16: [0,1,1,1,0,0,0,0,0,0],
    17: [0,1,1,1,0,0,0,0,0,0],
    18: [0,1,1,1,1,0,0,0,0,0],
    19: [0,1,1,1,1,0,0,0,0,0],
    20: [0,2,1,1,1,1,0,0,0,0],
    21: [0,2,1,1,1,1,0,0,0,0],
    22: [0,2,2,1,1,1,0,0,0,0],
    23: [0,2,2,1,1,1,0,0,0,0]
}

// export const CalculateBonusSpellsByAtribute = (
//   attribute: number,
//   spellsTable: number[],
// ): number[] => {
//   // Prende la riga giusta della tabella o default a 10 se fuori range
//   const bonus = BonusTableSpells[attribute] ?? BonusTableSpells[10];

//   // Taglia i bonus al numero di livelli disponibili
//   const slicedBonus = bonus.slice(0, spellsTable.length);

//   // Somma slot base + bonus
//   const result = spellsTable.map((s, i) => s + (slicedBonus[i] ?? 0));

//   return result;
// };
