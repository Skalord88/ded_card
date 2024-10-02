import { useEffect, useState } from "react";
import { CharacterPc, savingThrows } from "../interfaces";
import { AbSummary } from "./AbSummary";
import { SubRace } from "../Race/Interfaces";
import {
  FindAllModifications,
  FindInOneLengthModifier
} from "../Modifiers/Function";
import { Modifiers } from "../Modifiers/ModifierInterface";
import { AbilitysAndModifiers } from "../Abilitys/Functions";
import { Abilitys } from "../Abilitys/Interface";
import { Saving, SavingProps } from "../Saving/Saving";
import {
  CountSavingThrowFromAdjClass
} from "../Saving/Functions";
import { SavingSummary } from "./SavingSummary";
import { ModifierSummary } from "./ModifierSummary";
import { FeatsSummary } from "./FeatsSummary";
import { FindAllAdjLevel } from "../Race/Function";

export interface SummaryProps {
  character: CharacterPc;
  race: SubRace | undefined;
}

export const CharSummary: React.FC<SummaryProps> = ({ character, race }) => {
  const [modifiers, setModifiers] = useState<Modifiers[]>();
  const [noAbilitysMod, setNoAbilitysMod] = useState<Modifiers[]>([]);
  const [abilitys, setAbilitys] = useState<Abilitys>();
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
      }
    }
  }, [race, character]);

  useEffect(() => {
    if (modifiers) {
      setNoAbilitysMod(
        modifiers?.filter(
          (mod) =>
            ![
              "STRENGHT",
              "DEXTERITY",
              "CONSTITUTION",
              "INTELLIGENCE",
              "WISDOM",
              "CHARISMA"
            ].some((ability) => mod.modifier.includes(ability))
        )
      );
    }
  }, [modifiers]);

  useEffect(() => {
    const sTAdj = CountSavingThrowFromAdjClass(FindAllAdjLevel(character));
    
    let savingBonusAll: number = 0;
    if (modifiers) {
      savingBonusAll = FindInOneLengthModifier(modifiers, "SAVING");
      abilitys
        ? setSaving(Saving(abilitys, sTAdj, savingBonusAll, modifiers))
        : setSaving(
            Saving(character.abilitys, sTAdj, savingBonusAll, modifiers)
          );
    }
  }, [abilitys, character.abilitys, modifiers, race]);

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
            <AbSummary abilitys={abilitys} />
          ) : (
            <AbSummary abilitys={character.abilitys} />
          )}

          <SavingSummary saving={saving} />

          {noAbilitysMod ? <ModifierSummary modifiers={noAbilitysMod} /> : null}

          {race ? <FeatsSummary feats={race?.raceFeats} /> : null}
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
