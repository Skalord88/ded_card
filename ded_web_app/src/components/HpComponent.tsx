import { Abilitys } from "./Abilitys/Interface";
import { BonusAbilities, SignAndCount } from "./functions";
import { CharacterPc } from "./interfaces";
import { CountHitDicesFromClassPc, CountHitPoints } from "./Vita/Functions";
export type HpComponentProps = {
  char: CharacterPc;
  abilitys: Abilitys;
};
export const HpComponent: React.FC<HpComponentProps> = ({ char, abilitys }) => {
  const listHitDices = CountHitDicesFromClassPc(char.classPcList);
  const totLv = char.classPcList.reduce((tot, lv) => tot + lv.level, 0)
  const cos = SignAndCount([BonusAbilities(abilitys, "COS")])
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Hit Dice</h2>
      <div>
        <p style={{ display: "flex" }}>
          Hit Dices:
          {listHitDices.map((hD, index) => {
            return (
              <div key={index}>
                {hD.lv}D{hD.dice}
                {cos.sign}{cos.number * totLv}
                {index === listHitDices.length - 1 ? null : ","}
              </div>
            );
          })}
        </p>
      </div>
      <div>
        <p>Hit Points: {abilitys.constitution}</p>
        <p>
          Life: {CountHitPoints(BonusAbilities(abilitys, "COS"), listHitDices)}
        </p>
        <p>
          dmg: <input placeholder="" type="number" />
        </p>
      </div>
    </>
  );
};
