import { useEffect, useState } from "react";
import { SignAndCount, SignNumber } from "../functions";
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
import { SavingSummary } from "./SavingSummary";
import { FormattingText } from "../Formatting/Function";

export interface SummaryProps {
  character: CharacterPc;
  race: SubRace | undefined;
}

export const CharSummary: React.FC<SummaryProps> = ({ character, race }) => {
  const [modifiers, setModifiers] = useState<Modifiers[]>();
  const [abilitys, setAbilitys] = useState<Abilitys>();
  const [classi, setClassi] = useState<ClassPc[]>([]);
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
  }, [classi, race, character]);

  useEffect(() => {
    let sT: savingThrows = {fortitude: 0, reflex: 0, will: 0}
    if(classi)sT = CountSavingThrowFromClassPc(classi)
    let savingBonusAll: number = 0
    if(modifiers) savingBonusAll = FindInOneLengthModifier(
      modifiers,
      "SAVING"
    )

    setSaving( Saving(character, sT, savingBonusAll) )
  },[character, classi, modifiers])

  useEffect(() => {
    if (modifiers) {
      setAbilitys(AbilitysAndModifiers(character.abilitys, modifiers));
    }
  }, [character.abilitys, modifiers]);

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

          <SavingSummary saving={saving} />

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
