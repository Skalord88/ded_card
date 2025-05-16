import { CharacterPc } from "../interfaces";

export function FindAllAdjLevel(char: CharacterPc): number {
    return char.race.levelAdjustment + char.archetypes.reduce(
        (total, adj) => total + adj.levelAdjustment, 0
    )
}

export const findIconRace = (id: number): string => {
    switch (id) {
        case 1:
            return "dwarf-artic";
        case 2:
            return "dwarf-gold";
        case 3:
            return "dwarf-grey";
        case 4:
            return "dwarf-savage";
        case 5:
            return "dwarf-shield";
        case 6:
            return "dwarf-urdunir";
        default:
            return "";
    }
}