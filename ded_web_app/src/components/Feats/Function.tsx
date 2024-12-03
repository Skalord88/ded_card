import { ClassPc } from "../interfaces";
import { Feat, FeatPc, FeatsToShow } from "./Interface/FeatInterface";

export function GroupAllFeats(
  feats: (FeatPc | Feat | ClassPc)[]
): FeatsToShow[] {
  let featsToReturn: FeatsToShow[] = [];

  feats.forEach((f) => {
    if ("selected" in f) {
      featsToReturn.push({
        id: f.id,
        title: "FeatPc",
        feat: f.feat,
        modifiers: f.feat.modifiers ? f.feat.modifiers : [],
        listOfBonus: f.selected
      });
    }

    if ("featName" in f) {
      featsToReturn.push({
        id: f.id,
        title: "Feat",
        feat: f,
        modifiers: f.modifiers ? f.modifiers : [],
        listOfBonus: null
      });
    }

    if ("firstClass" in f) {
      f.feats.forEach((oneF) => {
        if (oneF.level <= f.level) {
          featsToReturn.push({
            id: oneF.feat.id,
            title: "ClassFeats " + f.className + " " + oneF.level,
            feat: oneF.feat,
            modifiers: oneF.feat.modifiers ? oneF.feat.modifiers : [],
            listOfBonus: null
          });
        }
      });
    }
  });

  // featsToReturn.forEach(f => (
  //   console.log(f.feat.id, f.feat.featName, f.listOfBonus)
  // ))

  return featsToReturn;
}
