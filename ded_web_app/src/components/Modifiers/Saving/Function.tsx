import { Modifiers } from "../ModifierInterface";

export function SavingBonusModification(
  modifiers: Modifiers[]
): [number, string] {
  const mod = modifiers.find((mod) => mod.modifier === "SAVING");
  return mod
    ? mod.targets.length > 1
      ? [mod.bonus, mod.targets[1].type]
      : [mod.bonus, ""]
    : [0, ""];
}
export function FindSavingModifiers(
  modifiers: [number, string][]
): [number, string] {
  const mod = modifiers.find((mod) => mod[1] === "SAVING");
  return mod ? [mod[0], mod[1]] : [0, ""];
}
