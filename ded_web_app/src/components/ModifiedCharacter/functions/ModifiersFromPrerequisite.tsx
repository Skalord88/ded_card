import { addTwoAbilitysModifiers } from "../../Abilitys/Functions";
import { Abilitys } from "../../Abilitys/Interface";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { SavingThrow, Resistance } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { AllModifiers, ModifierAbilityResult, AbilitysEntry, ModifierSaveResult, ModifierTarget, ModifierResult, TargetEntry, ModifierSkillsResult } from "../interface/ModifiedCharacter";

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

  const applySaveModifier = (text: string, st: SavingThrow) => {
    const f: Number = st.fortitude? st.fortitude : 0;
    const r: Number = st.reflex? st.reflex : 0;
    const w: Number = st.will? st.will : 0;
    const res: Resistance[] = st.resistance? st.resistance : [];
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
    targets?: ModifierEnum[] | null
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

  const applySkillsModifier = (text: string, ss: PrerequisiteSkills[]) => {
    ss.forEach((s) => {
      if (!s.modifierBonus) {
        if (!result["increase"]) {
          (result["increase"] as ModifierSkillsResult) = {
            text: text,
            skillsStudies: []
          } as ModifierSkillsResult;
        }
        const entity: ModifierSkillsResult = result["increase"];
        // entity.text = text;
        entity.skillsStudies.push(s);
      } else {
        if (!result[s.modifierBonus.text]) {
          (result[s.modifierBonus.text] as ModifierSkillsResult) = {
            text: text,
            skillsStudies: []
          } as ModifierSkillsResult;
        }
        const entity: ModifierSkillsResult = result[s.modifierBonus.text];
        entity.skillsStudies.push(s);
      }
    });
  };

  allPrerequisite.forEach((pr) => {
    if (bonusType === "abilitys") {
      pr.abilitys && applyAbilitysModifier(pr.text ?? "", pr.abilitys);
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
      // applyModifier(
      //   "dexterity",
      //   abilityModifiers?.dexterity ?? 0,
      //   "Dexterity modifier"
      // )
    }
    if (bonusType === "savingThrow") {
      // SAVING THROW
      pr.savingThrow?.forEach((st) => {
        if (!st.modifierBonus) return;
        applySaveModifier(pr.text ?? "", st);
      });
    }
    if (bonusType === "skillStudy") {
      pr.skillStudy && applySkillsModifier(pr.text ?? "", pr.skillStudy);
    }
  });

  return result;
};