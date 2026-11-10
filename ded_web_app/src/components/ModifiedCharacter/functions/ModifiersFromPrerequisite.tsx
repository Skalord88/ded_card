import { addTwoAbilitysModifiers } from "../../Abilitys/Functions";
import { Abilitys } from "../../Abilitys/Interface";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";
import { Prerequisite } from "../../Prerequisite/interface/Prerequisite";
import { Resistance, SavingThrow } from "../../Saving/interface";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { AbilitysEntry, AllModifiers, ModifierAbilityResult, ModifierResult, ModifierSaveResult, ModifierSkillsResult, ModifierTarget, TargetEntry } from "../interface/ModifiedCharacter";

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
    if (!ab.modifierType) {
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
      if (ab.modifierType && !result[ab.modifierType?.text]) {
        result[ab.modifierType?.text] = {
          abilitys: ab,
          sources: []
        } as ModifierAbilityResult;
        const entity: ModifierAbilityResult = result[
          ab.modifierType?.text
        ] as ModifierAbilityResult;
        const source: AbilitysEntry = {
          text: text,
          ability: abilityToString(ab)
        };
        entity.sources.push(source);
      }
    }
    if (ab.modifierType?.text && result[ab.modifierType?.text]) {
      const entity: ModifierAbilityResult = result[
        ab.modifierType?.text
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
    if (st.modifierType === null) {
      if (!result["increase"]) {
        result["increase"] = [] as ModifierSaveResult[];
        result["increase"].push(entity);
      }
    } else {
      if (st.modifierType && !result[st.modifierType?.text]) {
        result[st.modifierType?.text] = [] as ModifierSaveResult[];
        (result[st.modifierType?.text] as ModifierSaveResult[]).push(
          entity as ModifierSaveResult
        );
      }
      if (st.modifierType?.text && result[st.modifierType?.text]) {
        (result[st.modifierType?.text] as ModifierSaveResult[]).push(
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
      if (!s.modifierType) {
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
        if (!result[s.modifierType.text]) {
          (result[s.modifierType.text] as ModifierSkillsResult) = {
            text: text,
            skillsStudies: []
          } as ModifierSkillsResult;
        }
        const entity: ModifierSkillsResult = result[s.modifierType.text];
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
        if (!a.modifierType) return;
        const targets = findTargetsInPrerequisite(pr, a.target);
        applyModifier(
          a.modifierType.text,
          (a.bonus as number) ?? 0,
          pr.text ?? "",
          targets
        );
      });
    }
    if (bonusType === "damageBonus") {
      pr.damageBonus?.forEach((d) => {
        if (!d.modifierType) return;
        const targets = findTargetsInPrerequisite(pr, d.target);
        applyModifier(
          d.modifierType.text,
          (d.bonus as number) ?? 0,
          pr.text ?? "",
          targets
        );
      });
    }
    if (bonusType === "armorClass") {
      // ARMOR CLASS
      pr.armorClass?.forEach((ac) => {
        if (!ac.modifierType) return;
        const allTargets: any = findTargetsInPrerequisite(pr, ac.target);
        applyModifier(
          ac.modifierType.text,
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
      pr?.savingThrow?.forEach((st) => {
        if (!st.modifierType) return;
        applySaveModifier(pr.text ?? "", st);
      });
    }
    if (bonusType === "skillStudy") {
      pr?.skillStudy && applySkillsModifier(pr.text ?? "", pr.skillStudy);
    }
  });

  return result;
};