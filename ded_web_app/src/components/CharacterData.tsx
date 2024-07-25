import { BonusAbilities } from "./functions";
import { CharacterPc, ClassPc } from "./interfaces";
import { SignNumber } from "../components/functions";
import { DeleteButton } from "./DeleteButton";
import { urlChar } from "./url";
import { D20Popup } from "./Popup/DicePopup/D20Popup";

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
          <p>
            {char.race}, {char.subRace}
          </p>
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
      <div style={{ display: "flex" }}>
        {cl.map((classe) => {
          return (
            <>
              <p style={{ flex: 3 }} className="rpgui-container-framed-grey">
                {classe.className}
              </p>
              <p style={{ flex: 1 }} className="rpgui-container-framed-grey">
                {classe.level}
              </p>
            </>
          );
        })}
        {cp.map((classe) => {
          return (
            <>
              <p style={{ flex: 3 }} className="rpgui-container-framed-grey">
                {classe.className}
              </p>
              <p style={{ flex: 1 }} className="rpgui-container-framed-grey">
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
  const grapple = char.bab + Math.floor((char.abilitys.streght - 10) / 2);

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
      <p>
        bs atk bns: {SignNumber(char.bab)}
        {char.bab}
      </p>
      <p>
        <D20Popup textOrWeapon={"grapple: "} value={grapple} />
        {grapple > 0 ? "+" : ""} {grapple}
      </p>
      <p>
        STR att: {SignNumber(char.bab + BonusAbilities(char.abilitys, "STR"))}
        {char.bab + BonusAbilities(char.abilitys, "STR")}
      </p>
      <p>
        DEX att: {SignNumber(char.bab + BonusAbilities(char.abilitys, "DEX"))}
        {char.bab + BonusAbilities(char.abilitys, "DEX")}
      </p>
    </>
  );
};
