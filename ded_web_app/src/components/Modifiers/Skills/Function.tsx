import { FormattingText } from "../../Formatting/Function";
import { Modifiers } from "../ModifierInterface";

export function OneSkillModBonus(
  modifiers: Modifiers[],
  skillName: string
): Modifiers[] {
  return modifiers.filter(
    (mod) => mod.targets[0] === skillName
  );
}

export function OneSkillModBonusNumber(
  modifiers: Modifiers[],
  skillName: string
): number {
  return modifiers.reduce(
    (total, mod) =>
      FormattingText(mod.targets[0]) 
      === FormattingText(skillName)
        ? total + mod.bonus
        : total,
    0
  );
}
