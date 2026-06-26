import { FeatPc } from "../../Feats/Interface/FeatInterface";
import { signAndCountToString } from "../../functions";
import { Item } from "../../interfaces";
import { Popup } from "../../Popup/Popup";
import { PrerequisiteSkills } from "../../Skills/interface/PrerequisiteSkills";
import { SkillCharacter } from "../../Skills/interface/SkillsInterface";
import { SummaryCharProps } from "../SummaryChar";

export const getElelementFeats = (
  f: FeatPc
): (PrerequisiteSkills[] | Item[] | null)[] | undefined => {
  return (
    f.classFeat?.selected
      ? [
          f.classFeat?.selected?.skillStudy || null,
          f.classFeat?.selected.items || null
        ]
      : f.feat?.modifiers
        ? [
            f.feat?.modifiers?.skillStudy || null,
            f.feat?.modifiers?.items || null
          ]
        : f.selected
          ? [f.selected?.skillStudy || null, f.selected?.items || null]
          : null
  )?.filter(Boolean);
};

export const getElementNames = (elements: unknown[]) =>
  elements
    .flatMap((e) => {
      if (!Array.isArray(e) || !e.length) return [];

      const first = e[0];

      if ("skill" in first || "study" in first) {
        return (e as SkillCharacter[])
          .map(
            (s) =>
              (s.skill?.skillName?.text ?? s.study?.studyName?.text) +
              " " +
              signAndCountToString([s.rank])
          )
          .filter(Boolean);
      }

      if ("name" in first) {
        return (e as Item[]).map((i) => i.name).filter(Boolean);
      }

      return [];
    })
    .join(", ");

export const SummaryCharFeats: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  return (
    <>
      <div>
        <p>Feats:</p>
      </div>
      <div>
        {modCharacter.feats &&
          modCharacter.feats.map((f, index) => {
            const elements = getElelementFeats(f);

            const title: string = [
              f.classFeat ? f.classFeat.feat.featName + ", " : null,
              f.feat ? f.feat.featName : null,
              f.level ? (f.level || null) + ".lv" : null
            ]
              .filter(Boolean)
              .join(" ");

            const description: string = [
              f.classFeat ? f.classFeat.feat.modifiers?.text : "",
              f.feat ? f.feat.modifiers?.text : ""
            ]
              .filter(Boolean)
              .join(" ");

            const list = getElementNames(elements ?? []);

            return (
              <div key={index}>
                <div>
                  <Popup text={title} popText={{ text: description }} />
                  <span>{list !== "" ? ": " + list : null}</span>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};
