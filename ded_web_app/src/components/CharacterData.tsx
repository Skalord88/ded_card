import { BonusAbilities, SignAndCount } from "./functions";
import { AbilitysFromChar, CharacterPc, ClassPc } from "./interfaces";
import { SignNumber } from "../components/functions";

export interface CharProps {
  char: CharacterPc;
}

export const CharacterData: React.FC<CharProps> = ({ char }) => {
  return (
    <>
      <div className="rpgui-container-framed-grey">
        <h2 className="rpgui-container-framed-golden-2">Character Data</h2>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, textAlign: "right" }}>
            <p>
              <div className="rpgui-container-framed-grey">Pg Name:</div>
              <div className="rpgui-container-framed-grey">Player Name:</div>
              <div className="rpgui-container-framed-grey">Region:</div>
              <div className="rpgui-container-framed-grey">Race:</div>
              <div className="rpgui-container-framed-grey">Age:</div>
              <div className="rpgui-container-framed-grey">Aligment:</div>
            </p>
          </div>
          <div style={{ flex: 3 }}>
            <p>
              <div className="rpgui-container-framed-grey">
                {char.characterName}
              </div>
              <div className="rpgui-container-framed-grey">
                {char.playerName}
              </div>
              <div className="rpgui-container-framed-grey">region</div>
              <div className="rpgui-container-framed-grey">
                {char.race}, {char.subRace}
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                  <div className="rpgui-container-framed-grey">15</div>
                  <div className="rpgui-container-framed-grey">CHEV</div>
                </div>
                <div style={{ flex: 1, textAlign: "right" }}>
                  <div className="rpgui-container-framed-grey">High:</div>
                  <div className="rpgui-container-framed-grey">Size:</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="rpgui-container-framed-grey">45</div>
                  <div className="rpgui-container-framed-grey">{char.size}</div>
                </div>
                <div style={{ flex: 1, textAlign: "right" }}>
                  <div className="rpgui-container-framed-grey">Weight:</div>
                  <div className="rpgui-container-framed-grey">Gender:</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div className="rpgui-container-framed-grey">60kg</div>
                  <div className="rpgui-container-framed-grey">M</div>
                </div>
              </div>
            </p>
          </div>
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
      <div className="rpgui-container-framed-grey">
        <h2 className="rpgui-container-framed-golden-2">Class and Experience</h2>
        <div style={{ display: "flex" }}>
          <div>
            <p>LEP: {char.effectiveCharacterLv}</p>
            <p>
              exp: {char.effectiveCharacterLv * 1000 - char.experience} / next
              lv: {char.experience}
            </p>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <p>
              {cl.map((classe) => {
                return (
                  <>
                    <div key={classe.id} style={{ display: "flex" }}>
                      <div className="rpgui-container-framed-grey">
                        {classe.className}
                      </div>
                      <div className="rpgui-container-framed-grey">
                        {classe.level}
                      </div>
                    </div>
                  </>
                );
              })}
              {cp.map((classe) => {
                return (
                  <>
                    <div key={classe.id} style={{ display: "flex" }}>
                      <div className="rpgui-container-framed-grey">
                        {classe.className}
                      </div>
                      <div className="rpgui-container-framed-grey">
                        {classe.level}
                      </div>
                    </div>
                  </>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export const BaseAttack: React.FC<CharProps> = ({ char }) => {

    const grapple = char.bab + Math.floor((char.abilitys.streght - 10) / 2);

    return(
        <>
            <div className="rpgui-container-framed-grey">
                <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
                <p>base attack bonus: {SignNumber(char.bab)}{char.bab}, grapple:{" "} {grapple > 0 ? "+" : ""}{grapple}</p>
                <p>STR att: {
                    SignNumber(char.bab + BonusAbilities(char.abilitys, "STR"))
                    }{
                        char.bab + BonusAbilities(char.abilitys, "STR")
                        }{" "}
                / DEX att: {
                    SignNumber(char.bab + BonusAbilities(char.abilitys, "DEX"))
                    }{
                        char.bab + BonusAbilities(char.abilitys, "DEX")
                        }
                </p>
            </div>
        </>
    )
}; 

export const Initiative: React.FC<CharProps> = ({ char }) => {
    return(
        <>
            <div className="rpgui-container-framed-grey">
                <h2 className="rpgui-container-framed-golden-2">Initiative</h2>
            </div>
        </>
    )
}