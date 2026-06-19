import { Fragment } from "react/jsx-runtime";
import { SummaryCharProps } from "../SummaryChar";
import { Popup } from "../../Popup/Popup";
import { SkillCharacter } from "../../Skills/interface/SkillsInterface";
import { Item } from "../../interfaces";
import { signAndCountToString, SignNumber } from "../../functions";

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
            const elements = (
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
                    ? [
                        f.selected?.skillStudy || null,
                        f.selected?.items || null
                      ]
                    : null
            )?.filter(Boolean);

            const title: string = [
              f.classFeat ? f.classFeat.feat.featName + ": " : null,
              f.feat ? f.feat.featName : null,
              f.level ? (f.level || null) + ".lv" : null
            ]
              .filter(Boolean)
              .join(" ");

            // console.log("elements", elements)

            const description: string = [
              f.classFeat ? f.classFeat.feat.modifiers?.text : "",
              f.feat ? f.feat.modifiers?.text : ""
            ]
              .filter(Boolean)
              .join(" ");

            const list = getElementNames(elements ?? []);

            return (
              <div key={index}>
                <p>
                  <Popup text={title} popText={{ text: description }} />
                  <span>{" "}</span>
                  <span>{list}</span>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
};
