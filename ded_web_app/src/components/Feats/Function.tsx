import { CharacterPc } from "../interfaces";
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

export const checkFeatPcType = (f: FeatPc): number => {
    if (f.feat && f.classFeat === null && f.selected === null) return 1;
    if (f.feat && f.classFeat && f.selected === null) return 2;
    if (f.feat && f.classFeat && f.selected) return 3;
    return 0;
  };


