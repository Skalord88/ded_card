import { Modifiers } from "../ModifierInterface";

export function ArmorSizeBonusModification(
  modifiers: Modifiers[]
): [number, string] {
  const mod = modifiers.find((mod) => mod.modifier === "ARMOR_SIZE");
  return mod ? [mod.bonus, ""] : [0, ""];
}
export function FindArmorSizeModification(
  modifiers: [number, string][]
): [number, string] {
  const mod = modifiers.find((mod) => mod[1] === "ARMOR_SIZE");
  return mod ? [mod[0], 'size'] : [0, ""];
}

export function CountSpecificArmorBonusInModification(
  mod: Modifiers
): [number, string] {
  return [mod.bonus, mod.targets[0].type];
}
