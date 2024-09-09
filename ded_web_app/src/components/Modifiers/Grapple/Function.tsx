import { Modifiers } from "../ModifierInterface";

export function CountModifiersGrapple(modifiers: Modifiers[]): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "GRAPPLE");
    return mod ? [mod.bonus, "GRAPPLE"] : [0, ""];
}
export function FindModifiersGrapple(modifiers: [number, string][]
): [number, string] {
  const mod = modifiers.find((mod) => mod[1] === "GRAPPLE");
  return mod ? [mod[0], ""] : [0, ""];
}