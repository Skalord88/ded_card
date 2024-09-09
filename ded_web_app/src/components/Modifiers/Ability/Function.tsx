import { Modifiers } from "../ModifierInterface";

export function StrenghtBonusModification(
  modifiers: Modifiers[]
): number {
  const mod = modifiers.reduce(
    (total, mod) => (
      mod.modifier === "STRENGHT" ? total + mod.bonus : total),
    0
  );
  return mod ? mod : 0
}

export function DextrityBonusModification(
  modifiers: Modifiers[]
): [number, string] {
  const mod = modifiers.reduce(
    (total, mod) => (
      mod.modifier === "DEXTERITY" ? total + mod.bonus : total),
    0
  );
  return mod ? [mod, "DEXTERITY"] : [0, ""];
}

export function ConstitutionBonusModification(
  modifiers: Modifiers[]
): [number, string] {
  const mod = modifiers.reduce(
    (total, mod) => (
      mod.modifier === "CONSTITUTION" ? total + mod.bonus : total),
    0
  );
  return mod ? [mod, "CONSTITUTION"] : [0, ""];
}

export function IntelligenceBonusModification(
  modifiers: Modifiers[]
): [number, string] {
  const mod = modifiers.reduce(
    (total, mod) => (
      mod.modifier === "INTELLIGENCE" ? total + mod.bonus : total),
    0
  );
  return mod ? [mod, "INTELLIGENCE"] : [0, ""];
}

export function WisdomBonusModification(
  modifiers: Modifiers[]
): [number, string] {
  const mod = modifiers.reduce(
    (total, mod) => (
      mod.modifier === "WISDOM" ? total + mod.bonus : total),
    0
  );
  return mod ? [mod, "WISDOM"] : [0, ""];
}

export function CharismaBonusModification(
  modifiers: Modifiers[]
): [number, string] {
  const mod = modifiers.reduce(
    (total, mod) => (
      mod.modifier === "CHARISMA" ? total + mod.bonus : total),
    0
  );
  return mod ? [mod, "CHARISMA"] : [0, ""];
}
