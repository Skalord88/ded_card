import { abilityBackgroundColor } from "../../Abilitys/Colors";
import { abilityAbbreviation } from "../../Abilitys/Functions";
import { FormattingText } from "../../Formatting/Function";
import { BonusAbilities, signAndCount } from "../../functions";
import { D20Popup } from "../../Popup/DicePopup/D20Popup";
import { DicePopupProps } from "../../Popup/DicePopup/Interface";
import { CharToModify } from "../../Prerequisite/functions/modifyCharacter";
import { PrerequisiteSkills } from "../interface/PrerequisiteSkills";
import { Skill } from "../interface/Skill";
import { SkillsInList } from "../interface/SkillsInList";
import { StudyInList } from "../interface/StudysInList";

export type SkillShowComponentProps = {
  char: CharToModify;
};

export const SkillShowComponent: React.FC<SkillShowComponentProps> = ({
  char
}) => {
  const penality: number =
    char.inventory.armor.penality + char.inventory.shield.penality;

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "8% 46% 10% 9% 9% 9% 9%"
        }}
      >
        <div className="rpgui-container-framed-grey-mini">
          <p>cs</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>Skill</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>tot</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>rnk</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>abl</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>bns</p>
        </div>
        <div className="rpgui-container-framed-grey-mini">
          <p>pnl</p>
        </div>
        {char.skillsList.map((sk, index) =>
          sk.study && sk.study?.length > 0 ? (
            <>
              <SkillWithStudy
                title={sk.skill.skillName}
                key={`skillWithStudy-${index}-${sk.skill.skillName}`}
              />
              {sk.study.map((st, stIndex) => (
                <OneStudyShow
                  key={`study-${stIndex}-${st.study.studyName}`}
                  study={st}
                  skill={sk.skill}
                  bonusAb={BonusAbilities(
                    char.abilitys,
                    abilityAbbreviation(sk.skill.ability)
                  )}
                  penality={penality}
                  bonusModifier={char.skills.mono}
                />
              ))}
            </>
          ) : (
            <OneSkillShow
              key={`oneSkillShow-${index}-${sk.skill.skillName}`}
              sk={sk}
              bonusAb={BonusAbilities(
                char.abilitys,
                abilityAbbreviation(sk.skill.ability)
              )}
              penality={penality}
              bonusModifier={char.skills.mono}
            />
          )
        )}
      </div>
    </>
  );
};

export type SkillWithStudyProps = {
  title: string;
};

export const SkillWithStudy: React.FC<SkillWithStudyProps> = ({ title }) => {
  return (
    <>
      <div className="rpgui-container-framed-grey-mini">
        <p></p>
      </div>
      <div className="rpgui-container-framed-grey-mini">
        <p>{FormattingText(title)}</p>
      </div>
      <div className="rpgui-container-framed-grey-mini">
        <p></p>
      </div>
      <div className="rpgui-container-framed-grey-mini">
        <p></p>
      </div>
      <div className="rpgui-container-framed-grey-mini">
        <p></p>
      </div>
      <div className="rpgui-container-framed-grey-mini">
        <p></p>
      </div>
      <div className="rpgui-container-framed-grey-mini">
        <p></p>
      </div>
    </>
  );
};

export type OneSkillShowProps = {
  sk: SkillsInList;
  bonusAb: number;
  penality: number;
  bonusModifier?: PrerequisiteSkills[];
  onActionSkill?: (action: string, id: number) => void;
};

export const OneSkillShow: React.FC<OneSkillShowProps> = ({
  sk,
  bonusAb,
  penality,
  bonusModifier,
  onActionSkill
}) => {
  const bonus: number =
    bonusModifier
      ?.filter((mod) => mod.skill?.id === sk.skill.id)
      .reduce((tot, b) => tot + b.rank, 0) ?? 0;

  const tot: number =
  Math.floor(
    sk.rank + bonusAb + sk.skill.penality * (penality ? penality : 0) + bonus);

  const addRank = (idSkill: number) => {
    if (onActionSkill) {
      onActionSkill("+", idSkill);
    }
  };
  const delRank = (idSkill: number) => {
    if (onActionSkill) {
      onActionSkill("-", idSkill);
    }
  };

  return (
    <>
      <div className={abilityBackgroundColor(sk.skill.ability)}>
        <p>{sk.classSkill ? "x" : ""}</p>
      </div>
      <div className={abilityBackgroundColor(sk.skill.ability)}>
        <p>
          <ModSkillStudyInDice
            key={sk.skill.id + "." + sk.skill.skillName}
            dice={{
              textOrWeapon: FormattingText(sk.skill.skillName),
              value: tot,
              modifiers: {}
            }}
          />
        </p>
      </div>
      <div className={abilityBackgroundColor(sk.skill.ability)}>
        {onActionSkill ? (
          <p onClick={() => delRank(sk.skill.id)} style={{ color: "orange" }}>
            {tot}
          </p>
        ) : (
          <p style={{ color: "orange" }}>{tot}</p>
        )}
      </div>
      <div className={abilityBackgroundColor(sk.skill.ability)}>
        {onActionSkill ? (
          <p style={{ color: "yellow" }} onClick={() => addRank(sk.skill.id)}>
            {sk.rank}
          </p>
        ) : (
          <p>{sk.rank}</p>
        )}
      </div>
      <div className={abilityBackgroundColor(sk.skill.ability)}>
        <p>{bonusAb}</p>
      </div>
      <div className={abilityBackgroundColor(sk.skill.ability)}>
        <p>{bonus}</p>
      </div>
      <div className={abilityBackgroundColor(sk.skill.ability)}>
        <p>{sk.skill.penality * (penality ? penality : 0)}</p>
      </div>
    </>
  );
};
export type OneStudyShowProps = {
  index?: number;
  study: StudyInList;
  skill: Skill;
  bonusAb: number;
  penality: number;
  bonusModifier?: PrerequisiteSkills[];
  onActionStudy?: (action: string, idStudy: number, idSkill: number) => void;
};

export const OneStudyShow: React.FC<OneStudyShowProps> = ({
  study,
  skill,
  bonusAb,
  penality,
  bonusModifier,
  onActionStudy
}) => {
  const bonus: number =
    bonusModifier
      ?.filter((mod) => mod.skill?.id === study.study.id)
      .reduce((tot, b) => tot + b.rank, 0) ?? 0;

  const tot: number =
  Math.floor(  
  study.rank + bonusAb + skill.penality * (penality ? penality : 0) + bonus);

  const name: string = study.study.studyName
    ? study.study.studyName
    : study.study.newStudy
    ? study.study.newStudy
    : "";

  const addRank = (idStudy: number, idSkill: number) => {
    if (onActionStudy) {
      onActionStudy("+", idStudy, idSkill);
    }
  };
  const delRank = (idStudy: number, idSkill: number) => {
    if (onActionStudy) {
      onActionStudy("-", idStudy, idSkill);
    }
  };

  return (
    <>
      <div className={abilityBackgroundColor(skill.ability)}>
        <p>{study.classSkill ? "x" : ""}</p>
      </div>
      <div className={abilityBackgroundColor(skill.ability)}>
        <p>
          <ModSkillStudyInDice
            key={study.study.id + "." + skill.skillName}
            dice={{
              textOrWeapon: FormattingText(name),
              value: tot,
              modifiers: {}
            }}
          />
        </p>
      </div>
      <div className={abilityBackgroundColor(skill.ability)}>
        {onActionStudy ? (
          <p
            onClick={() => delRank(study.study.id, skill.id)}
            style={{ color: "orange" }}
          >
            {tot}
          </p>
        ) : (
          <p style={{ color: "orange" }}></p>
        )}
      </div>
      <div className={abilityBackgroundColor(skill.ability)}>
        {onActionStudy ? (
          <p
            style={{ color: "yellow" }}
            onClick={() => addRank(study.study.id, skill.id)}
          >
            {study.rank}
          </p>
        ) : (
          <p>{study.rank}</p>
        )}
      </div>
      <div className={abilityBackgroundColor(skill.ability)}>
        <p>{bonusAb}</p>
      </div>
      <div className={abilityBackgroundColor(skill.ability)}>
        <p>{bonus}</p>
      </div>
      <div className={abilityBackgroundColor(skill.ability)}>
        <p>{skill.penality * (penality ? penality : 0)}</p>
      </div>
    </>
  );
};

export type ModSkillStudyInDiceProps = {
  dice: DicePopupProps;
};

export const ModSkillStudyInDice: React.FC<ModSkillStudyInDiceProps> = ({
  dice
}) => {
  return (
    <D20Popup
      textOrWeapon={dice.textOrWeapon}
      value={dice.value}
      modifiers={dice.modifiers}
    />
  );
};

export type SkillsSummary = {
  skillText: string;
  sign?: string;
  value?: number;
};

export const SkillSummaryComponent: React.FC<SkillShowComponentProps> = ({
  char
}) => {
  const classSkills: SkillsSummary[] = char.skillsList.flatMap((s) => {
    const text: string =
      s.study && s.study?.length > 0
        ? s.study
            .flatMap((st) => s.skill.skillName + " " + st.study.studyName)
            .join(", ")
        : s.skill.skillName;

    return s.classSkill ? { skillText: text } : [];
  });
  const skillsNotZero: SkillsSummary[] = char.skills.mono.flatMap((s) =>
    s.skill && s.rank > 0
      ? {
          skillText: FormattingText(s.skill.skillName),
          sign: signAndCount([s.rank]).sign,
          value: s.rank
        }
      : []
  );

  const classSkillsText: string[] = classSkills.flatMap((s) => {
    return FormattingText(s.skillText);
  });
  const skillsNotZeroText: string[] = skillsNotZero.flatMap((s) => {
    return s.skillText + ": " + s.sign + s.value;
  });

  return (
    <div>
      {skillsNotZeroText.length > 0 ? (
        <p>skills bonus: {skillsNotZeroText.join(" / ")}</p>
      ) : null}
      {classSkillsText.length > 0 ? (
        <p>class skills: {classSkillsText.join(", ")}</p>
      ) : null}
    </div>
  );
};
