import { BonusAbilities, SignAndCount } from "./functions";
import { SignAndNumber } from "./interfaces";
import { CharToModify } from "./Prerequisite/functions/modifyCharacter";
import {
  CountHitPoints
} from "./Vita/Functions";
export type HpComponentProps = {
  char: CharToModify;
};
export const HpComponent: React.FC<HpComponentProps> = ({ char }) => {
  let oneDList: { lv: number; dice: number }[] = [];

  char.listHitDices.forEach((c) => {
    const existing = oneDList.find((one) => one.dice === c.dice);
    if (existing) {
      existing.lv += c.lv;
    } else {
      oneDList.push({ lv: c.lv, dice: c.dice });
    }
  });

  console.log(char.listHitDices);

  const cos: SignAndNumber = SignAndCount([
    BonusAbilities(char.abilitys, "COS")
  ]);
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Hit Dice</h2>
      <div>
        <p style={{ display: "flex" }}>
          Hit Dices:
          {oneDList.map((hD, index) => {
            return (
              <div key={index}>
                {hD.lv}D{hD.dice}
                {cos.sign}
                {cos.number * hD.lv}
                {index === oneDList.length - 1 ? null : ","}
              </div>
            );
          })}
        </p>
      </div>
      <div>
        <p>Life: {char.abilitys.constitution}</p>
        <p>Hit Points: {CountHitPoints(cos.number, char.listHitDices)}</p>
        <p>
          dmg: <input placeholder="" type="number" />
        </p>
      </div>
    </>
  );
};
