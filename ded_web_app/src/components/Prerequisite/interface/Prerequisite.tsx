import { Abilitys } from "../../Abilitys/Interface";
import { ArmorClass } from "../../Armor/interface/ArmorInterface";
import { AttackRoll } from "../../Attack/AttackRoll/interface";
import { ClassPcLevel } from "../../ClassPc/Interface/ClassPcLevel";
import { Feat } from "../../Feats/Interface/FeatInterface";
import { Item, SpecialAttacks } from "../../interfaces";
import { SavingThrow } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { Speed } from "../../Speed/interface";

export type Prerequisite = {
    id?: number;
    abilitys?: Abilitys;
    feats?: Feat[];
    caster?: [];
    bab?: Number;
    attackRoll?: AttackRoll;
    initiative?: Number;
    speed?: Speed;
    savingThrow?: SavingThrow;
    specialAttacks?: SpecialAttacks;
    skillStudy?: PrerequisiteSkills[]
    armorClass?: ArmorClass;
    armorType?: string[];
    weaponType?: string[];
    schools?: string[];
    classPc?: ClassPcLevel[];
    items?: Item[]
    text?: string;
  }