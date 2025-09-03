import { CharacterPc } from "../interfaces";
import { SpecialAbilities } from "../Race/Interfaces";

export const getAllSpecialAbilities = (
  characterPc: CharacterPc
): SpecialAbilities[] => {
  const archetypeAbilities: SpecialAbilities[] = characterPc.archetypes.flatMap(
    (archetype) => archetype.modifiers?.specialAbilities || []
  );
  const raceAbilities = characterPc.race.modifiers?.specialAbilities || [];

  return [...archetypeAbilities, ...raceAbilities];
};
