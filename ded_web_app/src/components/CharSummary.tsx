import { useEffect, useState } from "react";
import { BonusAbilities, SignNumber } from "./functions";
import { CharacterPc, savingThrows } from "./interfaces";

export interface SummaryProps {
  character: CharacterPc | undefined;
}

export const CharSummary: React.FC<SummaryProps> = ({ character }) => {
  const [saving, setSaving] = useState<savingThrows>({
    fortitude: 0,
    reflex: 0,
    will: 0
  });

  useEffect(() => {
    if (character?.abilitys)
      setSaving((prevSaving) => ({
        ...prevSaving,
        fortitude:
          BonusAbilities(character.abilitys, "COS") +
          character.savingThrows.fortitude,
        reflex:
          BonusAbilities(character.abilitys, "DEX") +
          character.savingThrows.reflex,
        will:
          BonusAbilities(character.abilitys, "WIS") +
          character.savingThrows.will
      }));
  }, [character]);

  return (
    <>
      {character ? (
        <div className="rpgui-container-framed-grey">
          <p>Effective Level: {character.effectiveCharacterLv}</p>
          <p>
            Hit Points: {character.vitality.hitPoints} / Life:{" "}
            {character.vitality.life}
            {" / < "}
            {Object.entries(character.vitality.hitDices).map((vita) => (
              <>
                {vita[1]}d{vita[0]}
                {SignNumber(BonusAbilities(character.abilitys, "COS"))}
                {BonusAbilities(character.abilitys, "COS")}{" "}
              </>
            ))}
            {">"}
          </p>
          <p>
            Base Attack Bonus: {SignNumber(character.bab)}
            {character.bab}
          </p>
          <p>
            Fort: {SignNumber(saving.fortitude)}
            {saving?.fortitude}
            {" / Ref: "}
            {SignNumber(saving?.reflex)}
            {saving?.reflex}
            {" / Will: "}
            {SignNumber(saving?.will)}
            {saving?.will}
          </p>
          <p>
            {" "}
            Skills:
            {character?.skillsList.map((skill, index) => {
              const isLast = index === character.skillsList.length - 1;
              return skill.classSkill ? (
                <>
                  {skill.fieldOfStudy.length > 0 ? (
                    <>
                      {skill.fieldOfStudy.map((study) => {
                        return <>{study.study}, </>;
                      })}
                    </>
                  ) : (
                    <>
                      {skill.classSkill ? (
                        <>
                          {skill.nameSkill}
                          {!isLast && ", "}
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </>
              ) : (
                <></>
              );
            })}
          </p>
        </div>
      ) : (
        <>...loading...</>
      )}
    </>
  );
};
