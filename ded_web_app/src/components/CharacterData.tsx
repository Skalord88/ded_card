import { ClassPc } from "./ClassPc/Interface/ClassPcLevel";
import { FormattingText } from "./Formatting/Function";
import { CharacterPc } from "./interfaces";
import { FindAllAdjLevel } from "./Race/Function";
import { Archetype } from "./Race/Interfaces";

export interface CharProps {
  char: CharacterPc;
}

export const CharacterData: React.FC<CharProps> = ({ char }) => {
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Character Data</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <p>Pg Name:</p>
          <p>Ply Name:</p>
          <p>Region:</p>
          <p>Race:</p>
          {char.archetypes.length > 0 ? <p>Archetypes:</p> : null}
          <p>Age:</p>
          <p>Aligment:</p>
        </div>
        <div style={{ flex: 2 }}>
          <p>{char.characterName}</p>
          <p>{char.playerName}</p>
          <p>---</p>
          <p>{char.race.subRacesName}</p>
          {char.archetypes.length > 0 ? (
            <ArchetypesData archetypes={char.archetypes} />
          ) : null}
          <p>15</p>
          <p>CHGD</p>
        </div>
      </div>
    </>
  );
};

export type ArchetypesDataProps = {
  archetypes: Archetype[];
};

export const ArchetypesData: React.FC<ArchetypesDataProps> = ({
  archetypes
}) => {
  return (
    <>
      {archetypes.map((a, index) => {
        return (
          <div key={index}>
            <p>
              {a.archetypeName}
              {index === archetypes.length - 1 ? null : ", "}
            </p>
          </div>
        );
      })}
    </>
  );
};

export const ClassExpGold: React.FC<CharProps> = ({ char }) => {
  const adjLv: number = FindAllAdjLevel(char);
  const totLv: number =
    adjLv + char.classPcList.reduce((total, cl) => total + cl.level, 0);

  const cl: ClassPc[] = char.classPcList.filter(
    (classe) => classe.classCharacter.classType === "base class"
  );
  const cp: ClassPc[] = char.classPcList.filter(
    (classe) => classe.classCharacter.classType === "prestige class"
  );

  let exp = 0;
  for (let i = 0; i < totLv; i++) {
    exp = exp + i * 1000;
  }
  let expNext = 0;
  for (let i = 1; i <= totLv; i++) {
    expNext = expNext + i * 1000;
  }

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Class and Experience</h2>

      <div>
        <p>LEP: {totLv}</p>
        <p>
          {exp} xp / {expNext - exp} to / {expNext} next
        </p>
      </div>
      <div>
        {char.race.levelAdjustment > 0 ? (
          <p>{char.race.subRacesName + " " + char.race.levelAdjustment}</p>
        ) : null}
        {char.archetypes.map((arch, index) =>
          arch.levelAdjustment > 0 ? (
            <div key={index}>
              <p>{arch.archetypeName + " " + arch.levelAdjustment}</p>
            </div>
          ) : null
        )}
        {cl.map((classe, index) => {
          return (
            <div key={index}>
              <p>
                {FormattingText(classe.classCharacter.className) +
                  " " +
                  classe.level}
              </p>
            </div>
          );
        })}
        {cp.map((classe, index) => {
          return (
            <div key={index}>
              <p>
                {FormattingText(classe.classCharacter.className)} {classe.level}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
