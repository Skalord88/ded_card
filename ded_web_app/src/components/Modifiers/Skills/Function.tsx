import { FormattingText } from "../../Formatting/Function";
import { Modifiers } from "../ModifierInterface";

export function OneSkillModBonus(
  modifiers: Modifiers[],
  skillName: string
): Modifiers[] {
  return modifiers.filter(
    (mod) => mod.targets[0].type === skillName
  );
}

export function OneSkillModBonusNumber(
  modifiers: Modifiers[],
  skillName: string
): number {
  return modifiers.reduce(
    (total, mod) =>
      FormattingText(mod.targets[0].type) 
      === FormattingText(skillName)
        ? total + mod.bonus
        : total,
    0
  );
}
export function SkillsIsPenal(
  skillName: string,
  penalty: number
): number {
  if (skillName === 'Swim') {
    return penalty * 2;
  }

  const penalizedSkills = [
    'Balance',
    'Climb',
    'Escape Artist',
    'Hide',
    'Jump',
    'Move Silently',
    'Sleight Of Hand',
    'Tumble'
  ];

  return penalizedSkills.includes(skillName) ? penalty : 0;
}

