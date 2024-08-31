import { CharacterPc } from "../../interfaces";
import { Size } from "../../Size/Interfaces";
import { Modifiers } from "../ModifierInterface";

export function CountGrapple(char: CharacterPc): number{
    let bab: number = CountSizeGrapple(char.race.size);

    return bab;
}

export function CountModifiersGrapple(modifiers: Modifiers[]): number{
    const bab = modifiers.reduce((total, modifier) => {
        return modifier.modifier === 'GRAPPLE' ? total + modifier.bonus : total;
    }, 0);
    return bab;
}

export function CountSizeGrapple(size: Size): number{
    return CountModifiersGrapple(size.modifiers)
}