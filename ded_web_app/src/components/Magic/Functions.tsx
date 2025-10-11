import { ClassPc, SpellsInLevel } from "../ClassPc/Interface/ClassPcLevel";
import { Book, CharacterPc, Spell } from "../interfaces";

export function SortedBooks(books: Book[]): Book[] {
  return books.sort((a, b) => a.caster.localeCompare(b.caster));
}

export type SpellsByLevelAndClass = {
  class: string;
  level: number;
  spells: Spell[];
  known?: number;
  perDay?: number;
};

export function FilterSpellsByLevelAndClass(
  spellsDB: Spell[],
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
    const lvs: number[] | null = classAndLevel[domain];
    if (lvs) {
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
            spells: spellsForClassAndLevel
          });
        }
      }
    }
  });
  return filtred;
}

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
