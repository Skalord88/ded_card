import { CharacterPc } from "../interfaces";
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
