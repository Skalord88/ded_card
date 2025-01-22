import { CharacterPc } from "../interfaces";
import { SpecialAbilities } from "../Race/Interfaces";

export const getAllSpecialAbilities = (characterPc: CharacterPc): SpecialAbilities[] => {
    const { archetypes, race } = characterPc;
    const archetypeAbilities: SpecialAbilities[] = archetypes.flatMap(ar => ar.specialAbilities);
    const raceAbilities = race.specialAbilities;

    return [...archetypeAbilities, ...raceAbilities];
};