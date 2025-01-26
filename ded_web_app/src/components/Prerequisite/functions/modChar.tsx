import { modifyAttacks, createAttackDisplay } from "../../Attack/function";
import { CharacterPc } from "../../interfaces";
import { emptyAbilitys, emptySize, emptyInventory, emptyAttacks } from "../../variables";
import { Prerequisite } from "../interface/Prerequisite";
import { CharToModify, modifyCharacter } from "./modifyCharacter";

export const createModChar = (char: CharacterPc): CharToModify => {
    let modChar: CharToModify = {
        abilitys: emptyAbilitys,
        size: emptySize,
        // race: { hD: 0, numHD: 0},
        bab: 0,
        adjBonus: { bab: 0, savingThrow: 0, adjLv: 0 },
        classesLv: 0,
        attackRoll: { mono: [], target: [], composed: [] },
        damageBonus: { mono: [], target: [], composed: [] },
        specialAttacks: [],
        initiative: 0,
        baseSave: { fortitude: 0, reflex: 0, will: 0 },
        savingThrow: [],
        listHitDices: [],
        armor: { mono: [], target: [], composed: [] },
        inventory: emptyInventory,
        attacks: emptyAttacks,
        skills: { mono: [], target: [] },
        skillsList: [],
        feats: { feats: [], classFeats: [], pcFeats: [] },
        speed: {
          foot: 0,
          fly: 0,
          climb: 0,
          swim: 0,
          special: ""
        },
        specialAbilities: [],
        spellsPerDay: [],
        spellsKnown: [],
        books: []
      };
      let modif: Prerequisite[] = [];
    
      // archetype
      char.archetypes.forEach(arch =>
        arch.modifiers && modif.push(arch.modifiers) 
      )
    
      // size
      char.race.size.modifiers && modif.push(char.race.size.modifiers);
      // race
      char.race.modifiers && modif.push(char.race.modifiers);
      // subRace
      char.race.subRaceFeats &&
        char.race.subRaceFeats.forEach(
          (f) => f.modifiers && modif.push(f.modifiers)
        );
      // subRace
      char.race.race.modifiers && modif.push(char.race.race.modifiers);
      // subRace
      char.race.race.raceFeats &&
        char.race.race.raceFeats.forEach((f) => {
          f.modifiers && modif.push(f.modifiers);
        });
    
      const createModifierSelected = (
        modif: Prerequisite,
        select: Prerequisite
      ): Prerequisite => {
        return {
          attackRoll: modif.attackRoll,
          damageBonus: modif.damageBonus,
          items: select.items
        };
      };
    
      // feats
      char.featsList.forEach((f) => {
        f.feat.modifiers && f.selected
          ? modif.push(createModifierSelected(f.feat.modifiers, f.selected))
          : f.selected && modif.push(f.selected);
      });
      // feats
      char.classPcList.forEach((cl) => {
        cl &&
          cl.classCharacter.classFeats.forEach((f) => {
            if (f && f.level <= cl.level) {
              f.modifiers && modif.push(f.modifiers);
            }
          });
      });
      modChar = modifyCharacter(char, modif);
    
      modChar.attacks = modifyAttacks(modChar);
      modChar.displayAttType = createAttackDisplay(modChar);

      return modChar;
}