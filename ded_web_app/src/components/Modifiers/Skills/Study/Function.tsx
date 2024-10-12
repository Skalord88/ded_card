import { FormattingText } from "../../../Formatting/Function";
import { Modifiers } from "../../ModifierInterface";

export function OneStudyModBonus(
    modifiers: Modifiers[],
    studyName: string
  ): Modifiers[] {
    return modifiers.filter(
      (mod) => mod.targets[0].type === studyName
    );
  }
  
  export function OneStudyModBonusNumber(
    modifiers: Modifiers[],
    studyName: string
  ): number {
    return modifiers.reduce(
      (total, mod) =>
        FormattingText(mod.targets[0].type) 
        === FormattingText(studyName)
          ? total + mod.bonus
          : total,
      0
    );
  }