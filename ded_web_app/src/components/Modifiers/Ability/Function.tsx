import { Modifiers } from "../ModifierInterface";

export function StrenghtBonusModification(
    modifiers: Modifiers[]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "STRENGHT");
    return mod ? [mod.bonus, ""] : [0, ""];
  }
export function FindStrenghtModification(
    modifiers: [number, string][]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod[1] === "STRENGHT");
    return mod ? [mod[0], ""] : [0, ""];
  }

export function DextrityBonusModification(
    modifiers: Modifiers[]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "DEXTERITY");
    return mod ? [mod.bonus, ""] : [0, ""];
  }
  export function FindDextrityModification(
    modifiers: [number, string][]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod[1] === "DEXTERITY");
    return mod ? [mod[0], ""] : [0, ""];
  }

export function ConstitutionBonusModification(
    modifiers: Modifiers[]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "CONSTITUTION");
    return mod ? [mod.bonus, ""] : [0, ""];
  }
  export function FindConstitutionModification(
    modifiers: [number, string][]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod[1] === "CONSTITUTION");
    return mod ? [mod[0], ""] : [0, ""];
  }

export function IntelligenceBonusModification(
    modifiers: Modifiers[]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "INTELLIGENCE");
    return mod ? [mod.bonus, ""] : [0, ""];
  }
  export function FindIntelligenceModification(
    modifiers: [number, string][]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod[1] === "INTELLIGENCE");
    return mod ? [mod[0], ""] : [0, ""];
  }

export function WisdomBonusModification(
    modifiers: Modifiers[]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "WISDOM");
    return mod ? [mod.bonus, ""] : [0, ""];
  }
  export function FindWisdomModification(
    modifiers: [number, string][]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod[1] === "WISDOM");
    return mod ? [mod[0], ""] : [0, ""];
  }

export function CharismaBonusModification(
    modifiers: Modifiers[]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "CHARISMA");
    return mod ? [mod.bonus, ""] : [0, ""];
  }
  export function FindCharismaModification(
    modifiers: [number, string][]
  ): [number, string] {
    const mod = modifiers.find((mod) => mod[1] === "CHARISMA");
    return mod ? [mod[0], ""] : [0, ""];
  }