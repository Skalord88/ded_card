import { ClassPc } from "../interfaces";
import { Feat, FeatPc, FeatsToShow } from "./Interface/FeatInterface";

export function GroupAllFeats(
  feats: (FeatPc | Feat | ClassPc)[]
): FeatsToShow[] {
  let featsToReturn: FeatsToShow[] = [];

  feats.forEach((f) => {
    if ("feat" in f) {
      const modifiersExist = Array.isArray(f.feat.modifiers) && f.feat.modifiers.length > 0;
        featsToReturn.push({
            feat: f.feat,
            modifiers: f.selected.length > 0 && modifiersExist
                ? [{
                    modifier: f.feat.modifiers[0].modifier,
                    bonus: f.feat.modifiers[0].bonus,
                    targets: f.selected
                }]
                : f.feat.modifiers,
            listOfBonus: []
        });
    }

    if ("featName" in f) {
      featsToReturn.push({
        feat: f,
        modifiers: [],
        listOfBonus: []
      });
    }

    if ("firstClass" in f) {
      f.feats.forEach((oneF) => {
        if (oneF.level <= f.level) {
          featsToReturn.push({
            feat: oneF.feat,
            modifiers: oneF.modifiers,
            listOfBonus: oneF.listOfBonus
          });
        }
      });
    }
  });

  return featsToReturn;
}
// export function GroupAllFeats(feats: (FeatPc | Feat | ClassPc)[]): Feat[] {
//     let featsToReturn: Feat[] = [];

//     feats.forEach(f => {
//         if ('feat' in f) {
//             const modifiersExist = Array.isArray(f.feat.modifiers) && f.feat.modifiers.length > 0;

//             featsToReturn.push({
//                 id: f.feat.id,
//                 featName: f.feat.featName,
//                 featsType: f.feat.featsType,
//                 modifiers: f.selected.length > 0 && modifiersExist ? {
//                     modifier: f.feat.modifiers[0].modifier,
//                     bonus: f.feat.modifiers[0].bonus,
//                     targets: f.selected
//                 } : f.feat.modifiers,
//                 description: f.feat.description
//             } as Feat);
//         }

//         if ('featName' in f) {
//             featsToReturn.push(f as Feat);
//         }

//         if ('firstClass' in f && Array.isArray(f.feats)) {
//             f.feats.forEach(effe => {
//                 if (effe.level <= f.level) {
//                     featsToReturn.push(effe.feat as Feat);
//                 }
//             });
//         }
//     });

//     return featsToReturn;
// }
