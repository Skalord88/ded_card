import { CharProps } from "./CharacterData";
import { BonusAbilities, SignAndCount } from "./functions";
import { CountHitDicesFromClassPc, CountHitPoints } from "./Vita/Functions";

export const HpComponent: React.FC<CharProps> = ({ char }) => {
  const listHitDices = CountHitDicesFromClassPc(char.classPcList);
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Hit Dice</h2>
      <div style={{ display: "flex", fontSize: "80%" }}>
        {listHitDices.map((hD) => {
          return (
            <div className="rpgui-container-framed-grey" style={{ flex: 1 }}>
              <p>
                {hD.lv}D{hD.dice}
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <p>
          Hit Points: {char.abilitys.constitution} / Life:{" "}
          {CountHitPoints(BonusAbilities(char.abilitys, 'COS'), listHitDices)}
        </p>
      </div>
    </>
  );
};
