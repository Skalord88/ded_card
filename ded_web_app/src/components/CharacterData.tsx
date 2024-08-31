import { BonusAbilities, SignAndCount } from "./functions";
import { CharacterPc, ClassPc } from "./interfaces";
import { SignNumber } from "../components/functions";
import { DeleteButton } from "./DeleteButton";
import { urlChar } from "./url";
import { D20Popup } from "./Popup/DicePopup/D20Popup";
import { CountBabFromClassPc } from "./Attack/Bab/Functions";
import { CountGrapple } from "./Modifiers/Grapple/Function";

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
          <p>Age:</p>
          <p>Aligment:</p>
        </div>
        <div style={{ flex: 2 }}>
          <p>{char.characterName}</p>
          <p>{char.playerName}</p>
          <p>Amn</p>
          <p>{char.race.subRacesName}</p>
          <p>15</p>
          <p>CHGD</p>
        </div>
      </div>
    </>
  );
};

export const ClassExpGold: React.FC<CharProps> = ({ char }) => {
  const cl: ClassPc[] = char.classPcList.filter(
    (classe) => classe.classType === 1
  );
  const cp: ClassPc[] = char.classPcList.filter(
    (classe) => classe.classType !== 1
  );

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Class and Experience</h2>

      <div>
        <p>LEP: {char.effectiveCharacterLv}</p>
        <p>
          exp: {char.effectiveCharacterLv * 1000 - char.experience} / next lv:{" "}
          {char.experience}
        </p>{" "}
      </div>
      <div 
      // style={{ display: "grid" }}
      >
        {cl.map((classe, index) => {
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
                {classe.className}
                {" "}
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
                {classe.className}
                {" "}
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

export const BaseAttack: React.FC<CharProps> = ({ char }) => {
  const bab = CountBabFromClassPc(char);
  const grapple =
    bab +
    Math.floor((char.abilitys.strength - 10) / 2) +
    CountGrapple(char);

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
      <p>
        bs atk bns: {SignAndCount([bab]).sign}
        {SignAndCount([bab]).number}
      </p>
      <p>
        <D20Popup textOrWeapon={"grapple: "} value={grapple} />
        {SignAndCount([grapple]).sign}
        {SignAndCount([grapple]).number}
      </p>
      <p>
        STR att: {SignNumber(bab + BonusAbilities(char.abilitys, "STR"))}
        {bab + BonusAbilities(char.abilitys, "STR")}
      </p>
      <p>
        DEX att: {SignNumber(bab + BonusAbilities(char.abilitys, "DEX"))}
        {bab + BonusAbilities(char.abilitys, "DEX")}
      </p>
    </>
  );
};
