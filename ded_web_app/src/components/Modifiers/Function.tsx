import { Feat } from "../Feats/Interface/FeatInterface";
import { CharacterPc } from "../interfaces";
import { Modifiers } from "./ModifierInterface";

export function FindAllModifications(
  modifications: Modifiers[][]
): Modifiers[] {
  return modifications.reduce(
    (lists, modList) => (modList ? lists.concat(modList) : []),
    []
  );
}

export function CheckInAllModifications(
  char: CharacterPc,
  feats: Feat[]
): Modifiers[] {
  let allModFeats: Modifiers[] = [];
  let modifiersFromArchetypes: Modifiers[] = [];

  if (feats !== null && feats.length > 0)
    allModFeats = feats.flatMap((f) => (f.modifiers ? f.modifiers : []));

  if (char.archetypes !== null && char.archetypes.length > 0)
    modifiersFromArchetypes = char.archetypes.reduce<Modifiers[]>(
      (list, archetype) =>
        list.concat(...archetype.modifiers.flatMap((mod) => (mod ? mod : []))),
      []
    );

  const modifiersFromCharacter: Modifiers[] = FindAllModifications([
    char.race.size.modifiers.length > 0? char.race.size.modifiers : [],
    char.race.modifiers.length > 0? char.race.modifiers : [],
    char.race.race.modifiers.length > 0? char.race.race.modifiers : [],
    modifiersFromArchetypes,
    allModFeats,
    char.inventory.armor.modifiers.length > 0? char.inventory.armor.modifiers : [],
    char.inventory.shield.modifiers.length > 0? char.inventory.shield.modifiers : []
  ]);

  return modifiersFromCharacter;
}

export function FindInOneLengthModifier(
  modifications: Modifiers[],
  type: string
): number {
  return modifications.reduce(
    (total, mod) =>
      mod.modifier === type && mod.targets.length === 0
        ? total + mod.bonus
        : total,
    0
  );
}

export function FindInMoreLengthModifier(
  modifications: Modifiers[],
  type: string | string[]
): Modifiers[] {
  return modifications.filter(
    (mod) => mod.targets.length > 0 && type.includes(mod.modifier)
  );
}
