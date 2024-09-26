import { CharacterPc } from "../interfaces";
import { Modifiers } from "./ModifierInterface";

export function FindAllModifications(
  modifications: Modifiers[][]
): Modifiers[] {
  return modifications.reduce((lists, modList) => lists.concat(modList), []);
}

export function CheckInAllModifications(char: CharacterPc): Modifiers[] {
  const modifiersFromClasses: Modifiers[] = char.classPcList.reduce<
    Modifiers[]
  >(
    (list, classe) =>
      list.concat(
        ...classe.feats.flatMap((feat) =>
          feat.modifiers ? feat.modifiers : []
        )
      ),
    []
  );
  const modifiersFromFeats: Modifiers[] = char.featsList.reduce<Modifiers[]>(
    (list, feat) =>
      list.concat(
        feat.feat.modifiers.flatMap((f) =>
          f.targets.length > 3
            ? [
                { modifier: f.modifier, bonus: f.bonus, targets: feat.selected }
              ]
            : []
        )
      ),
    []
  );

  const modifiersFromArchetypes: Modifiers[] = char.archetypes.reduce<
    Modifiers[]
  >(
    (list, archetype) =>
      list.concat(...archetype.modifiers.flatMap((mod) => (mod ? mod : []))),
    []
  );

  const modifiersFromCharacter: Modifiers[] = FindAllModifications([
    char.race.size.modifiers,
    char.race.modifiers,
    char.race.race.modifiers,
    modifiersFromArchetypes,
    modifiersFromFeats,
    modifiersFromClasses,
    char.inventory.armor.modifiers,
    char.inventory.shield.modifiers
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
