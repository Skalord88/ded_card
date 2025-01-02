import { CharacterPc } from "../interfaces";
import { FeatsFromChar } from "../Prerequisite/functions/modifyCharacter";
import { ClassFeats, Feat, FeatPc } from "./Interface/FeatInterface";

export function groupAllFeats(
  char: CharacterPc
): {feats: Feat[] , classFeats: ClassFeats[] , pcFeats: FeatPc[]} {

  const classFeats: ClassFeats[] = char.classPcList.flatMap(cl => cl.classCharacter.classFeats.filter(classe => classe.level <= cl.level))
  
  return {
    feats: [
      ...(char.race.race.raceFeats ? char.race.race.raceFeats : []),
      ...(char.race.subRaceFeats ? char.race.subRaceFeats : [])
    ],
    classFeats: classFeats,
    pcFeats: char.featsList
  };

}

export const findFeatById = (feats: FeatsFromChar, findId: number[]): Boolean => {
  return feats.classFeats.find((f) => findId.includes(f.feat.id)) ||
   feats.pcFeats.find((f) => findId.includes(f.feat.id)) ||
   feats.feats.find((f) => findId.includes(f.id)) ?
   true : false
}
