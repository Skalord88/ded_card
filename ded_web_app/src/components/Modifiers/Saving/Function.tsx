import { Modifiers } from "../ModifierInterface";

export function SavingBonusModification(modifiers: Modifiers[]): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "SAVING");
      return mod ? [mod.bonus, ''] : [0, ''];
  }
  export function FindSavingModifiers(modifiers: [number, string][]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod[1] === "SAVING");
    return mod ? [mod[0], ""] : [0, ""];
  }