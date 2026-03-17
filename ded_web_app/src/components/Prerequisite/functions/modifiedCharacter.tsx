import { KeyObject } from "node:crypto";
import {
  addAbilitysModifiers,
  addTwoAbilitysModifiers,
  ifTargetInPrerequisite,
  maxAbilitysModifiers,
  maxBonusInModifier
} from "../../Abilitys/Functions";
import { Abilitys } from "../../Abilitys/Interface";
import { ArmorClass } from "../../Armor/interface/ArmorInterface";
import { DamageBonus } from "../../Attack/DamageBonus/interface";
import { CharacterPc, Item } from "../../interfaces";
import { Resistance, SavingThrow } from "../../Saving/interface";
import { emptyAbilitys } from "../../variables";
import { Prerequisite } from "../interface/Prerequisite";
import { findAllPrerequisiteModifier } from "./findSpecificPrerequisite";

export type ModifierTarget = string | any[];

export type TargetEntry = {
  bonus: number;
  text: string;
  targets?: ModifierTarget[];
};

export type ModifierResult = {
  bonus: number;
  sources?: TargetEntry[];
};

export type AbilitysEntry = {
  text: string;
  ability: string;
};

export type ModifierAbilityResult = {
  abilitys: Abilitys;
  sources: AbilitysEntry[];
};

export type ModifierSaveResult = {
  text: string;
  fortitude?: number;
  reflex?: number;
  will?: number;
  resistance?: Resistance[];
};

export type AllModifiers = {
  [modifier: string]:
    | ModifierResult
    | ModifierSaveResult[]
    | ModifierAbilityResult;
};

export type ModifiedCharacter = {
  abilitys?: AllModifiers;
  attackRoll: AllModifiers;
  damageBonus?: AllModifiers;
  savingThrow?: AllModifiers;
  armorClass: AllModifiers;
};

export const findAllPrerequisite = (char: CharacterPc): Prerequisite[] => {
  let allPrerequisite: Prerequisite[] = [];

  char.archetypes.forEach((archetype) => {
    archetype.modifiers !== null && allPrerequisite.push(archetype.modifiers);
  });

  if (char.race) {
    char.race.race.modifiers !== null &&
      allPrerequisite.push(char.race.race.modifiers);

    char.race.size.modifiers !== null &&
      allPrerequisite.push(char.race.size.modifiers);

    char.race.modifiers !== null && allPrerequisite.push(char.race.modifiers);
  }
  if (char.featsList) {
    char.featsList.forEach((feat) => {
      feat.classFeat?.selected !== null &&
        allPrerequisite.push(feat.classFeat?.selected as Prerequisite);

      feat.feat?.modifiers !== null &&
        allPrerequisite.push(feat.feat?.modifiers as Prerequisite);
    });
  }

  if (char.inventory) {
    char.inventory.armor &&
      char.inventory.armor.modifiers !== null &&
      allPrerequisite.push(char.inventory.armor.modifiers);
    char.inventory.shield &&
      char.inventory.shield.modifiers !== null &&
      allPrerequisite.push(char.inventory.shield.modifiers);
  }

  return allPrerequisite;
};

export const modifiersFromPrerequisite = (
  allPrerequisite: Prerequisite[],
  bonusType: string
): AllModifiers => {
  const result: AllModifiers = {};

  const abilityToString = (ab: Abilitys): string => {
    return Object.entries(ab)
      .filter(([_, v]) => v != null && v !== 0)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
  };

  const applyAbilitysModifier = (text: string, ab: Abilitys) => {
    if (!ab.modifierBonus) {
      if (!result["increase"]) {
        result["increase"] = {
          abilitys: ab,
          sources: []
        } as ModifierAbilityResult;
        const entity = result["increase"];
        const source: { text: string; ability: string } = {
          text: text,
          ability: abilityToString(ab)
        };
        entity.sources.push(source);
      } else {
        const entity: ModifierAbilityResult = result[
          "increase"
        ] as ModifierAbilityResult;
        entity.abilitys = addTwoAbilitysModifiers(entity.abilitys, ab);
        const source: { text: string; ability: string } = {
          text: text,
          ability: abilityToString(ab)
        };
        entity.sources.push(source);
      }
    } else {
      if (ab.modifierBonus && !result[ab.modifierBonus?.text]) {
        result[ab.modifierBonus?.text] = {
          abilitys: ab,
          sources: []
        } as ModifierAbilityResult;
        const entity: ModifierAbilityResult = result[
          ab.modifierBonus?.text
        ] as ModifierAbilityResult;
        const source: AbilitysEntry = {
          text: text,
          ability: abilityToString(ab)
        };
        entity.sources.push(source);
      }
    }
    if (ab.modifierBonus?.text && result[ab.modifierBonus?.text]) {
      const entity: ModifierAbilityResult = result[
        ab.modifierBonus?.text
      ] as ModifierAbilityResult;
      const source: AbilitysEntry = {
        text: text,
        ability: abilityToString(ab)
      };
      entity.sources.push(source);
    }
  };

  const applySkillsModifier = (text: string, st: SavingThrow) => {
    const f: Number = st.fortitude;
    const r: Number = st.reflex;
    const w: Number = st.will;
    const res: Resistance[] = st.resistance;
    const entity: ModifierSaveResult = { text: text };
    if (f && f !== 0) entity.fortitude = f as number;
    if (r && r !== 0) entity.reflex = r as number;
    if (w && w !== 0) entity.will = w as number;
    if (res && res.length > 0) entity.resistance = res as Resistance[];
    if (st.modifierBonus === null) {
      if (!result["increase"]) {
        result["increase"] = [] as ModifierSaveResult[];
        result["increase"].push(entity);
      }
    } else {
      if (st.modifierBonus && !result[st.modifierBonus?.text]) {
        result[st.modifierBonus?.text] = [] as ModifierSaveResult[];
        (result[st.modifierBonus?.text] as ModifierSaveResult[]).push(
          entity as ModifierSaveResult
        );
      }
      if (st.modifierBonus?.text && result[st.modifierBonus?.text]) {
        (result[st.modifierBonus?.text] as ModifierSaveResult[]).push(
          entity as ModifierSaveResult
        );
      }
    }
  };

  const applyModifier = (
    modifierText: string,
    bonus: number,
    text: string,
    targets?: ModifierTarget[] | null
  ) => {
    if (!result[modifierText]) {
      result[modifierText] = { bonus: 0, sources: [] } as ModifierResult;
    }
    const entry: ModifierResult = result[modifierText] as ModifierResult;
    const source: TargetEntry = {
      bonus,
      text
    };
    if (targets && targets.length > 0) {
      source.targets = targets;
    } else {
      // stacking rule
      entry.bonus = Math.max(entry.bonus, bonus);
    }
    entry.sources && entry.sources.push(source);
  };

  const findTargetsInPrerequisite = (
    pre: Prerequisite,
    targets?: string[] | null
  ): ModifierTarget[] | null => {
    if (!targets || targets.length === 0) return null;
    const targetList: ModifierTarget[] = [...targets];
    if (pre.items?.length) {
      targetList.push(pre.items);
    }
    if (pre.weaponType) {
      targetList.push(pre.weaponType);
    }
    return targetList;
  };

  allPrerequisite.forEach((pr) => {
    if (bonusType === "abilitys") {
      applyAbilitysModifier(pr.text ?? "", pr.abilitys ?? emptyAbilitys);
    }
    if (bonusType === "attackRoll") {
      pr.attackRoll?.forEach((a) => {
        if (!a.modifierBonus) return;
        const targets = findTargetsInPrerequisite(pr, a.target);
        applyModifier(
          a.modifierBonus.text,
          (a.bonus as number) ?? 0,
          pr.text ?? "",
          targets
        );
      });
    }
    if (bonusType === "damageBonus") {
      pr.damageBonus?.forEach((d) => {
        if (!d.modifierBonus) return;
        const targets = findTargetsInPrerequisite(pr, d.target);
        applyModifier(
          d.modifierBonus.text,
          (d.bonus as number) ?? 0,
          pr.text ?? "",
          targets
        );
      });
    }
    if (bonusType === "armorClass") {
      // ARMOR CLASS
      pr.armorClass?.forEach((ac) => {
        if (!ac.modifierBonus) return;
        const allTargets: any = findTargetsInPrerequisite(pr, ac.target);
        applyModifier(
          ac.modifierBonus.text,
          ac.bonus ?? 0,
          pr.text ?? "",
          allTargets
        );
      });
    }
    if (bonusType === "savingThrow") {
      // SAVING THROW
      pr.savingThrow?.forEach((st) => {
        if (!st.modifierBonus) return;
        applySkillsModifier(pr.text ?? "", st);
      });
    }
  });

  return result;
};

// SKILLS
//   pr.skillStudy?.forEach(skill => {
//     if (!skill.modifierBonus) return

//     applyModifier(
//       skill.modifierBonus.text,
//       skill.rank ?? 0,
//       skill.target
//     )
//   })

export const modifiedCharacter = (char: CharacterPc): ModifiedCharacter => {
  const allPrerequisite: Prerequisite[] = findAllPrerequisite(char);

  console.log("allPrerequisite", allPrerequisite);

  const ab: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "abilitys"
  );
  const aR: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "attackRoll"
  );
  const dB: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "damageBonus"
  );
  const sT: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "savingThrow"
  );
  const ac: AllModifiers = modifiersFromPrerequisite(
    allPrerequisite,
    "armorClass"
  );

  console.log("abilitys", ab);
  console.log("attackRoll", aR);
  console.log("damageBonus", dB);
  console.log("savingThrow", sT);
  console.log("armorClass", ac);

  return {
    abilitys: ab,
    attackRoll: aR,
    damageBonus: dB,
    savingThrow: sT,
    armorClass: ac
  };
};
