import { ClassPc } from "../ClassPc/Interface/ClassPcLevel";
import { Book, CharacterPc, Spell } from "../interfaces";

export function SortedBooks(books: Book[]): Book[] {
  return books.sort((a, b) => a.caster.localeCompare(b.caster));
}

export type SpellsByLevelAndClass = {
  class: string;
  level: number;
  spells: Spell[];
};

export function FilterSpellsByLevelAndClass(
  spellsDB: Spell[]
): SpellsByLevelAndClass[] {
  let filtred: {
    class: string;
    level: number;
    spells: Spell[];
  }[] = [];

  const domains: Set<string> = new Set();
  spellsDB.forEach((spell) => {
    spell.level?.forEach((lv) => {
      if (lv.classDomain) {
        domains.add(lv.classDomain);
      }
    });
  });

  // console.log(domains);

  domains.forEach((domain) => {
    for (let level = 0; level <= 9; level++) {
      const spellsForClassAndLevel = spellsDB.filter((spell) =>
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
  });

  // console.log(filtred);
  return filtred;
}

export const FilterSpellsByPgClass = (
  spells: SpellsByLevelAndClass[],
  char: CharacterPc
): SpellsByLevelAndClass[] => {
  // return spells.filter(s => caster.includes(s.class));
  const castersPg: string[] = char.classPcList.flatMap((c) => {
    if (c.classCharacter.className === "WIZARD") {
      return ["WIZARD", "SORCERER_WIZARD"];
    } else if (c.classCharacter.className === "SORCERER") {
      return ["SORCERER", "SORCERER_WIZARD"];
    } else {
      return c.classCharacter.spellsDomain ? c.classCharacter.spellsDomain : [];
    }
  });
  return spells.filter((s) => castersPg.includes(s.class));
};
