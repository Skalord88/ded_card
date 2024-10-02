import { CharacterPc } from "../interfaces";

export function FindAllAdjLevel(char: CharacterPc): number {
    return char.race.levelAdjustment + char.archetypes.reduce(
        (total, adj) => total + adj.levelAdjustment, 0
    )
}