import { FormattingText } from "../../../Formatting/Function";
import { Modifiers } from "../../ModifierInterface";

export function OneSkillModBonus(
    modifiers: Modifiers[],
    studyName: string
  ): Modifiers[] {
    return modifiers.filter(
      (mod) => mod.targets[0] === studyName
    );
  }
  
  export function OneSkillModBonusNumber(
    modifiers: Modifiers[],
    studyName: string
  ): number {
    return modifiers.reduce(
      (total, mod) =>
        FormattingText(mod.targets[0]) 
        === FormattingText(studyName)
          ? total + mod.bonus
          : total,
      0
    );
  }