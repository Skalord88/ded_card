import { createAttackDisplay, getAttacksData } from "../../Attack/function";
import { CharacterPc, ItemsList } from "../../interfaces";
import {
  emptyAbilitys,
  emptySize,
  emptyInventory,
  emptyAttacks
} from "../../variables";
import { Prerequisite } from "../interface/Prerequisite";
import { CharToModify, modifyCharacter } from "./modifyCharacter";

export const createModChar = (
  char: CharacterPc,
  items?: ItemsList
): CharToModify => {
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
    skillsPointToSpent: 0,
    feats: {
      feats: [],
      classFeats: [],
      pcFeats: { fromLevel: [], fromClass: [] }
    },
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
    books: [],
    proficency: {
      type: [],
      specific: []
    }
  };
  let modif: Prerequisite[] = [];

  // archetype
  char.archetypes.forEach(
    (arch) => arch.modifiers && modif.push(arch.modifiers)
  );

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
      attackRoll: modif.attackRoll? modif.attackRoll : undefined,
      damageBonus: modif.damageBonus? modif.damageBonus : undefined,
      items: select.items? select.items : undefined,
      weaponType: modif.weaponType? modif.weaponType : undefined,
    };
  };

  // feats
  char.featsList.forEach((f) => {
    if (f && f.feat && f.feat.modifiers && f.selected) { // il feat ha un selezionato, attivo sul modifier
      modif.push(createModifierSelected(f.feat.modifiers, f.selected));
    } else if (f && f.selected) { // il feat ha un selezionato
      modif.push(f.selected);
    } else if (f && f.feat && f.feat.modifiers) { // il feat ha un modifier
      modif.push(f.feat.modifiers);
    }
  });

  // class feats
  char.classPcList.forEach((cl) => {
    if (cl && cl.classCharacter && cl.classCharacter.classFeats) {
      cl.classCharacter.classFeats.forEach((f) => {
        if (f && f.level <= cl.level && f.modifiers) {
          modif.push(f.modifiers);
        }
      });
    }
  });

  console.log("modif", modif);

  // items
  
    // modif.push(char.inventory.armor.modifiers);
    // modif.push(char.inventory.shield.modifiers);
    // modif.push(char.inventory.weaponOne.modifiers);
    // modif.push(char.inventory.weaponTwo.modifiers);
    // modif.push(char.inventory.weaponThree.modifiers);
    // modif.push(char.inventory.weaponFour.modifiers);
    // modif.push(char.inventory.weaponFive.modifiers);
    char.inventory.cloak.modifiers && modif.push(char.inventory.cloak.modifiers);
  
  // console.log("modif", modif);
  modChar = modifyCharacter(char, modif, items);

  modChar.displayAttType = createAttackDisplay(
    getAttacksData(modChar),
    modChar.attacks
  );

  return modChar;
};
