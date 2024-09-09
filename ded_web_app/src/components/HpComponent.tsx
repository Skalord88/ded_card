import { Abilitys } from "./Abilitys/Interface";
import { CharProps } from "./CharacterData";
import { BonusAbilities, SignAndCount } from "./functions";
import { CharacterPc } from "./interfaces";
import { CountHitDicesFromClassPc, CountHitPoints } from "./Vita/Functions";
export type HpComponentProps = {
  char: CharacterPc,
  abilitys: Abilitys
}
export const HpComponent: React.FC<HpComponentProps> = ({ char, abilitys }) => {
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
          Hit Points: {abilitys.constitution} / Life:{" "}
          {CountHitPoints(BonusAbilities(abilitys, 'COS'), listHitDices)}
        </p>
      </div>
    </>
  );
};
