import { ListOfToSelect, NewFeatPc } from "../../pages/Feats";
import { addToDrop, itemInDrop } from "../functions";
import { CharacterPc, Item, Weapon } from "../interfaces";
import { FeatsFromChar } from "../Prerequisite/functions/modifyCharacter";
import { ClassFeats, Feat, FeatPc } from "./Interface/FeatInterface";

export function groupAllFeats(
  char: CharacterPc
): {feats: Feat[] , classFeats: ClassFeats[] , pcFeats: {fromLevel: FeatPc[], fromClass: FeatPc[]}} {

  const classFeats: ClassFeats[] = char.classPcList.flatMap(cl => cl.classCharacter.classFeats.filter(classe => classe.level <= cl.level))
  const featsFromLevel: FeatPc[] = char.featsList.filter(f => checkFeatPcType(f) === 1).map(level => level)
  const featsFromClass: FeatPc[] = char.featsList.filter(f => checkFeatPcType(f) === 2 || checkFeatPcType(f) === 3).map(cl => cl)
  
  return {
    feats: [
      ...(char.race.race.raceFeats ? char.race.race.raceFeats : []),
      ...(char.race.subRaceFeats ? char.race.subRaceFeats : [])
    ],
    classFeats: classFeats,
    pcFeats: {
      fromLevel: featsFromLevel,
      fromClass: featsFromClass
    }
  };

}

export const findFeatById = (feats: FeatsFromChar, findId: number[]): Boolean => {
  return feats.classFeats.find((f) => findId.includes(f.feat.id)) ||
   feats.pcFeats.fromLevel.find((f) => findId.includes(f.feat.id)) ||
   feats.pcFeats.fromClass.find((f) => findId.includes(f.feat.id)) ||
   feats.feats.find((f) => findId.includes(f.id)) ?
   true : false
}

export const findPrerequisiteFeatsInFeatsList = (
  filter: string[], lista: Feat[]
): Feat[] => {
  if (filter) return lista
  .filter(f => f.featType && f.featType
    .some(ft => filter.includes(ft)));
  return []
};

export const findPrerequisiteFeatsInItemDrop = (
  filter: string[], lista: itemInDrop[]
): itemInDrop[] => {
  if (filter) return lista
  .filter(f => (f.item as Feat).featType && (f.item as Feat).featType
    .some(ft => filter.includes(ft)));
  return []
};

export const findPrerequisiteItemsInFeatsList = (
  filter: string, lista: Weapon[]
): Item[] => {
  if (filter) return lista
  .filter(f => f.weaponName && filter === f.weaponName)
  return []
};

export const checkFeatPcType = (f: FeatPc): number => {
    if (f.feat && f.classFeat === null) return 1;
    if (f.feat && f.classFeat) return 2;
    return 0;
  };

// export const typeOfPrerequisiteInToSelect = (
//   element: NewFeatPc, listaToSelect: ListOfToSelect
// ): itemInDrop[] => {
//   let drop: itemInDrop[] = []
//   /// feats
// if (element.toSelect?.featType) {
//     const listaOfFeats: Feat[] = listaToSelect.feats.flatMap((i) => i.item as Feat);
//     const filtredListaByType: Feat[] = findPrerequisiteFeatsInFeatsList(
//       element.toSelect?.featType,
//       listaOfFeats
//     );
//     drop = addToDrop(filtredListaByType, "feat");
//   }
//   if (element.toSelect?.feats && element.toSelect?.feats.length > 0) {
//     drop = addToDrop(element.toSelect?.feats, "feat");
//   }

  /// weapons
//   if (element.toSelect?.weaponType) {
//     const listaOfWeapons: Weapon[] = listaToSelect.weapons.flatMap((i) => i.item as Weapon);
//     const filtredListaByType: Item[] = findPrerequisiteItemsInFeatsList(
//       element.toSelect?.weaponType,
//       listaOfWeapons
//     );
//     drop = addToDrop(filtredListaByType, "items");
//   }
//   if (element.toSelect?.items && element.toSelect?.items.length > 0) {
//     drop = addToDrop(element.toSelect?.items, "items");
//   }
//   return drop;
// }


