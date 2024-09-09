import { CharacterPc } from "../../interfaces";
import { Modifiers } from "../ModifierInterface";

export function CountInitiativeModifiers(modifiers: Modifiers[]): [number, string] {
    const mod = modifiers.find((mod) => mod.modifier === "INITIATIVE");
    return mod ? [mod.bonus, "INITIATIVE"] : [0, ""];
}

export function InitiativeAndModifiers(char: CharacterPc): number {
    let initiativeBonus: number = 0
    char.featsList.forEach(feat => {
        initiativeBonus += CountInitiativeModifiers(feat.modifiers)[0]
    })
    return initiativeBonus
}