import { SignNumber } from "../components/functions";
import { FormattingText } from "./Formatting/Function";
import { SignAndCount } from "./functions";
import { CharacterPc, ClassPc } from "./interfaces";
import {} from "./Modifiers/Ability/Function";
import { D20Popup } from "./Popup/DicePopup/D20Popup";
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
    <p style={{ display: "flex", flexDirection: "row" }}>
      {archetypes.map((a, index) => {
        return (
          <>
            {a.archetypeName}
            {index === archetypes.length - 1 ? null : ", "}
          </>
        );
      })}
    </p>
  );
};

export const ClassExpGold: React.FC<CharProps> = ({ char }) => {
  const adjLv: number = FindAllAdjLevel(char);
  const totLv: number =
    adjLv + char.classPcList.reduce((total, cl) => total + cl.level, 0);
  const cl: ClassPc[] = char.classPcList.filter(
    (classe) => classe.classType === 1
  );
  const cp: ClassPc[] = char.classPcList.filter(
    (classe) => classe.classType !== 1
  );

  let exp = 0
  for (let i = 0; i < totLv; i++){
    exp = exp + (i * 1000)
  }
  let expNext = 0
  for (let i = 1; i <= totLv; i++){
    expNext = expNext + (i * 1000)
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
      <div
      // style={{ display: "grid" }}
      >
        {char.race.levelAdjustment > 0 ? (
          <p>{char.race.subRacesName + " " + char.race.levelAdjustment}</p>
        ) : null}
        {char.archetypes.map(arch => (
          arch.levelAdjustment > 0?
          <p>{arch.archetypeName + " " + arch.levelAdjustment}</p> : null
        ))}
        {cl.map((classe, index) => {
          return (
            <>
              <p key={index}>
                {classe.className + " " + classe.level}
              </p>
            </>
          );
        })}
        {cp.map((classe, index) => {
          return (
            <>
              <p
                key={index}
                // style={{
                //   gridColumn: "1 / span 2",
                //   gridRow: 1
                // }}
                // className="rpgui-container-framed-grey"
              >
                {classe.className}{" "}
                {/* </p>
              <p
                key={index + "." + index}
                style={{
                  gridColumn: 3,
                  gridRow: 1
                }}
                className="rpgui-container-framed-grey"
              > */}
                {classe.level}
              </p>
            </>
          );
        })}
      </div>
    </>
  );
};

export type BaseAttackProp = {
  bab: number;
  grapple: number;
  strenghtAtt: number;
  dextrityAtt: number;
};

export const BaseAttack: React.FC<BaseAttackProp> = ({
  bab,
  grapple,
  strenghtAtt,
  dextrityAtt
}) => {
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
      <p>
        bs atk bns: {SignAndCount([bab]).sign}
        {SignAndCount([bab]).number}
      </p>
      <p>
        <D20Popup textOrWeapon={"grapple: "} value={grapple} modifiers={[]} />
        {SignNumber(grapple)}
        {grapple}
      </p>
      <p>
        <D20Popup
          textOrWeapon={"STR att: "}
          value={strenghtAtt}
          modifiers={[]}
        />
        {SignNumber(strenghtAtt)}
        {strenghtAtt}
      </p>
      <p>
        <D20Popup
          textOrWeapon={"DEX att: "}
          value={dextrityAtt}
          modifiers={[]}
        />
        {SignNumber(dextrityAtt)}
        {dextrityAtt}
      </p>
    </>
  );
};
