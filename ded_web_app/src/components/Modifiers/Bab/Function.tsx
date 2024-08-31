import { CharacterPc } from "../../interfaces";
import { Size } from "../../Size/Interfaces";
import { Modifiers } from "../ModifierInterface";

export function CountBab(char: CharacterPc): number{
    let bab: number = CountSizeBab(char.race.size);

    return bab;
}

export function CountModifiersBab(modifiers: Modifiers[]): number{
    const bab = modifiers.reduce((total, modifier) => {
        return modifier.modifier === 'BAB' ? total + modifier.bonus : total;
    }, 0);
    return bab;
}

export function CountSizeBab(size: Size): number{
    return CountModifiersBab(size.modifiers)
}