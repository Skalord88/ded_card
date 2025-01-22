import { Abilitys } from "../../Abilitys/Interface";
import { ArmorClass } from "../../Armor/interface/ArmorInterface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { CountBabFromClassPc } from "../../Attack/Bab/Functions";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import {
  AttackElement,
  createAttackDisplay,
  DisplayAttType
} from "../../Attack/function";
import { SpellsTable } from "../../ClassPc/Interface/ClassPcLevel";
import { groupAllFeats } from "../../Feats/function";
import { ClassFeats, Feat, FeatPc } from "../../Feats/Interface/FeatInterface";
import {
  Attacks,
  CharacterPc,
  Inventory,
  SpecialAttacks
} from "../../interfaces";
import { modifyInventory } from "../../Items/Inventory/function";
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
import { emptyAttacks, emptyInventory } from "../../variables";
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
  pcFeats: FeatPc[];
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
  displayAttType?: AttackElement;
  skills: SkillsElement;
  skillsList: SkillsInList[];
  speed: Speed;
  feats: FeatsFromChar;
  specialAbilities: SpecialAbilities[];
  spellsPerDay?: { classe: string; spells: (number | null)[] }[];
  spellsKnown?: { classe: string; spells: (number | null)[] }[];
};

export const modifyCharacter = (
  char: CharacterPc,
  prer: Prerequisite[]
): CharToModify => {
  const abilitys: Abilitys[] = findAbilitysPrerequisite(prer);
  const adjBab: number = Math.floor(
    CountBabFromClassPc(char) + FindAllAdjLevel(char) * adjClass.classBab
  );

  const totalClassLv: number = char.classPcList.reduce(
    (tot, cl) => tot + cl.level,
    0
  );
  const daySpells: { classe: string; spells: number[] }[] =
    char.classPcList.flatMap((cl) =>
      cl.classCharacter.spellsPerDay
        ? [
            {
              classe: cl.classCharacter.className,
              spells:
                cl.classCharacter.spellsPerDay.spellsInLevel
                  .find((lv) => lv.level === cl.level)
                  ?.spells.map((s) => (s ? s : -2)) ?? []
            }
          ]
        : []
    );
  const knowSpells: { classe: string; spells: number[] }[] =
    char.classPcList.flatMap((cl) =>
      cl.classCharacter.spellsKnown
        ? [
            {
              classe: cl.classCharacter.className,
              spells:
                cl.classCharacter.spellsKnown.spellsInLevel
                  .find((lv) => lv.level === cl.level)
                  ?.spells.map((s) => (s ? s : -2)) ?? []
            }
          ]
        : []
    );

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
    skills: findSkillsPrerequisite(prer),
    skillsList: createSkillsList(char),
    speed: findSpeedPrerequisite(prer),
    feats: groupAllFeats(char),
    specialAbilities: getAllSpecialAbilities(char),
    spellsPerDay: daySpells,
    spellsKnown: knowSpells
  };
  return newChar;
};
