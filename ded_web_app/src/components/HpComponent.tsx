import { CharProps } from "./CharacterData";
import { BonusAbilities, SignAndCount } from "./functions";

export const HpComponent: React.FC<CharProps> = ({ char }) => {
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Hit Dice</h2>
      <div style={{ display: "flex", fontSize: "80%" }}>
        {Object.entries(char.vitality.hitDices).map((hd) => {
          return (
            <div className="rpgui-container-framed-grey" style={{ flex: 1 }}>
              <p>
                {hd[1]}d{hd[0]}{" "}
                {SignAndCount([char.abilitys.constitution]).sign}
                {/* {BonusAbilities(char.abilitys, "COS") * hd[1]} */}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <p>
          Hit Points: {char.vitality.hitPoints} / Life: {char.vitality.life}
        </p>
      </div>
    </>
  );
};
