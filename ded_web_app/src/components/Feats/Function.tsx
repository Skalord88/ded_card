
import { CharacterPc, Item, Weapon } from "../interfaces";
import { ModifiedCharacter } from "../ModifiedCharacter/interface/ModifiedCharacter";
import {
  CharToModify,
  FeatsFromChar
} from "../Prerequisite/functions/modifyCharacter";
import { ClassFeats, Feat, FeatPc } from "./Interface/FeatInterface";

export function groupAllFeats(char: CharacterPc): {
  feats: Feat[];
  classFeats: ClassFeats[];
  pcFeats: { fromLevel: FeatPc[]; fromClass: FeatPc[] };
} {
  const classFeats: ClassFeats[] = char.classPcList.flatMap((cl) =>
    cl.classCharacter.classFeats.filter((classe) => classe.level <= cl.level)
  );
  const featsFromLevel: FeatPc[] = char.featsList.filter(
    (f) => checkFeatPcType(f) === 1
  );

  const featsFromClass: FeatPc[] = char.featsList.filter(
    (f) => checkFeatPcType(f) === 2
  );

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

export const findFeatById = (
  feats: FeatsFromChar,
  findId: number[]
): boolean => {
  return feats.classFeats
    .filter(Boolean)
    .find((f) => f.feat && findId.includes(f.feat.id)) ||
    feats.pcFeats.fromLevel
      .filter(Boolean)
      .find((f) => f.feat && findId.includes(f.feat.id)) ||
    feats.pcFeats.fromClass
      .filter(Boolean)
      .find((f) => f.feat && findId.includes(f.feat.id)) ||
    feats.feats.filter(Boolean).find((f) => f.id && findId.includes(f.id))
    ? true
    : false;
};

export const findPrerequisiteFeatsInFeatsList = (
  filter: string[],
  lista: Feat[]
): Feat[] => {
  if (filter)
    return lista.filter(
      (f) => f.featType && f.featType.some((ft) => filter.includes(ft))
    );
  return [];
};

export const findPrerequisiteFeatsInItemDrop = (
  filter: string[],
  lista: ItemInDrop[]
): ItemInDrop[] => {
  if (filter)
    return lista.filter(
      (f) =>
        (f.item as Feat).featType &&
        (f.item as Feat).featType.some((ft) => filter.includes(ft))
    );
  return [];
};

export const findPrerequisiteItemsInFeatsList = (
  filter: string,
  lista: Weapon[]
): Item[] => {
  if (filter)
    return lista.filter((f) => f.weaponName && filter === f.weaponName);
  return [];
};

export const checkFeatPcType = (f: FeatPc): number => {
  if (f.feat && f.classFeat === null && f.level) return 1;
  if (f.feat === null && f.classFeat && f.level === null) return 2;
  return 0;
};

export const createPcBonusFeats = (
  newModChar: ModifiedCharacter
): FeatPc[] => {
  const totalClassLevel =
    newModChar.classPcList?.reduce((tot, c) => tot + c.level, 0) ?? 0;
  const quantiFeats = Math.floor(totalClassLevel / 3) + 1;
  const featsFromLevel = newModChar.feats?.filter((f) => f.level) ?? [];

  return Array.from({ length: quantiFeats }, (_, i) => {
    const level = i === 0 ? 1 : i * 3;
    const existingFeat = featsFromLevel.find((f) => f.level === level);

    return {
      id: existingFeat?.id ?? null,
      feat: existingFeat?.feat ?? null,
      level,
      selected: existingFeat?.selected ?? null
    };
  });
};

export const createClassPcClassFeats = (newModChar: ModifiedCharacter): FeatPc[] => {

  const quantiBonus: ClassFeats[] = newModChar.feats.classFeats.filter(
    (c: ClassFeats) =>
      (c.feat.toSelect
        //  && c.selected === null
        )
  );
  let featsGiaPresenti: number = newModChar.feats.pcFeats.fromClass.length;

  let classPcBonusFeats: FeatPc[] = [];

  for (let i = 0; i < quantiBonus.length; i++) {
    if (featsGiaPresenti > 0) {
      classPcBonusFeats.push({
        id: newModChar.feats.pcFeats.fromClass[i].id,
        classFeat: newModChar.feats.pcFeats.fromClass[i].classFeat,
        selected: newModChar.feats.pcFeats.fromClass[i].selected
      });
      featsGiaPresenti--;
    } else {
      classPcBonusFeats.push({
        id: null,
        classFeat: {
          id: quantiBonus[i].id,
          // modifiers: quantiBonus[i].feat.modifiers,
          level: quantiBonus[i].level,
          feat: quantiBonus[i].feat,
          classId: quantiBonus[i].classId,
          className: quantiBonus[i].className
        },
        selected: quantiBonus[i].selected
      });
    }
  }
  return classPcBonusFeats;
};
