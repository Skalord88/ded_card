import { useEffect, useState } from "react";
import { SignNumber } from "../functions";
import { CharacterPc, ClassPc, savingThrows } from "../interfaces";
import { AbSummary } from "./AbSummary";
import { SubRace } from "../Race/Interfaces";
import {
  FindAllModifications,
  FindInOneLengthModifier
} from "../Modifiers/Function";
import { Modifiers } from "../Modifiers/ModifierInterface";
import { AbilitysAndModifiers, BonusAbilities } from "../Abilitys/Functions";
import { Abilitys } from "../Abilitys/Interface";
import { Saving, SavingProps } from "../Saving/Saving";
import { CountSavingThrowFromClassPc } from "../Saving/Functions";
import { SavingSummary, SavingSummaryOnlyChar } from "./SavingSummary";
import { FormattingText } from "../Formatting/Function";

export interface SummaryProps {
  character: CharacterPc;
  race: SubRace | undefined;
}

export const CharSummary: React.FC<SummaryProps> = ({ character, race }) => {
  const [modifiers, setModifiers] = useState<Modifiers[]>();
  const [abilitys, setAbilitys] = useState<Abilitys>();
  const [classi, setClassi] = useState<ClassPc[]>([]);
  const [sT, setST] = useState<savingThrows>();
  const [savingBonusAll, setSavingBonusAll] = useState<number>(0);
  const [saving, setSaving] = useState<SavingProps>();

  useEffect(() => {
    if (race) {
      setModifiers(
        FindAllModifications([
          race?.modifiers,
          race?.race.modifiers,
          race?.size.modifiers
        ])
      );
      if (race.levelAdjustment > 0) {
        setClassi([
          ...classi,
          {
            id: 0,
            classType: 0,
            className: 0,
            level: race.levelAdjustment,
            firstClass: false,
            hitDice: 4,
            classBab: 0.5,
            savingThrow: "lll",
            skillPoints: 2,
            feats: []
          }
        ]);
      }
    }
  }, [race]);

  useEffect(() => {
    if (modifiers) {
      setAbilitys(AbilitysAndModifiers(character.abilitys, modifiers));
      setSavingBonusAll(FindInOneLengthModifier(modifiers, "SAVING"));
      setST(CountSavingThrowFromClassPc(classi));
    }
  }, [modifiers, classi, character]);

  useEffect(() => {
    if (sT && savingBonusAll) setSaving(Saving(character, sT, savingBonusAll));
  }, [character, sT, savingBonusAll]);

  return (
    <>
      {character ? (
        <div className="rpgui-container-framed-grey">
          {abilitys ? (
            <p>
              <AbSummary abilitys={abilitys} />
            </p>
          ) : (
            <p>
              <AbSummary abilitys={character.abilitys} />
            </p>
          )}
          <p>Effective Level: {character.effectiveCharacterLv}</p>

          {saving ? (
            <SavingSummary saving={saving} />
          ) : (
            <SavingSummaryOnlyChar
              fortitude={BonusAbilities(character.abilitys, "COS")}
              reflex={BonusAbilities(character.abilitys, "DEX")}
              will={BonusAbilities(character.abilitys, "WIS")}
            />
          )}
          {modifiers ? (
            <p>
              <div style={{ display: "flex", flexDirection: "row" }}>
                {modifiers.map((m, index) => {
                  const lastIndex = modifiers.length;
                  return (
                    <>
                      {FormattingText(m.modifier)}: {FormattingText(m.targets[0])}.{FormattingText(m.targets[1])} {m.bonus}{" "}
                      {lastIndex - 1 !== index ? " / " : ""}
                    </>
                  );
                })}
              </div>
            </p>
          ) : null}
          <p>
            {" "}
            Skills:
            {character?.skillsList.map((skill, index) => {
              const isLast = index === character.skillsList.length - 1;
              return skill.classSkill ? (
                <div key={index + "." + skill.nameSkill}>
                  {skill.fieldOfStudy.length > 0 ? (
                    <>
                      {skill.fieldOfStudy.map((study, index) => {
                        return (
                          <div key={index + "." + study.study}>
                            {study.study},{" "}
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {skill.classSkill ? (
                        <>
                          {skill.nameSkill}
                          {!isLast && ", "}
                        </>
                      ) : null}
                    </>
                  )}
                </div>
              ) : null;
            })}
          </p>
        </div>
      ) : (
        <>...loading...</>
      )}
    </>
  );
};
