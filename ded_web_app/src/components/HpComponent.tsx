import { BonusAbilities, signAndCount } from "./functions";
import { SignAndNumber } from "./interfaces";
import { CharToModify } from "./Prerequisite/functions/modifyCharacter";
import { CountHitPoints } from "./Vita/Functions";
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

  const cos: SignAndNumber = signAndCount([
    BonusAbilities(char.abilitys, "COS")
  ]);
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Hit Dice</h2>
      <div style={{ display: "flex" }} className="rpgui-container-framed-grey">
        <span>Hit Dices:</span>
        {oneDList.map((hD, index) => {
          return (
            <span key={index}>
              {hD.lv}D{hD.dice}
              {cos.sign}
              {cos.number * hD.lv}
              {index === oneDList.length - 1 ? null : ","}
            </span>
          );
        })}
      </div>
      <div className="rpgui-container-framed-grey">
        <p>Life: {char.abilitys.constitution}</p>
        <p>Hit Points: {CountHitPoints(cos.number, char.listHitDices)}</p>
        <p>
          dmg: <input placeholder="" type="number" />
        </p>
      </div>
    </>
  );
};

export const HpSummaryComponent: React.FC<HpComponentProps> = ({ char }) => {
  let oneDList: { lv: number; dice: number }[] = [];

  char.listHitDices.forEach((c) => {
    const existing = oneDList.find((one) => one.dice === c.dice);
    if (existing) {
      existing.lv += c.lv;
    } else {
      oneDList.push({ lv: c.lv, dice: c.dice });
    }
  });

  const cos: SignAndNumber = signAndCount([
    BonusAbilities(char.abilitys, "COS")
  ]);

  const hdTextList: {lvHd: string, totLvHd: number}[] = oneDList.map(
    hD => (
      { lvHd: hD.lv + "D" + hD.dice + cos.sign + (hD.lv * cos.number), 
        totLvHd: hD.lv * (hD.dice + cos.number) })
  );

  const hdText: string = hdTextList.flatMap(hd => hd.lvHd + " (" + hd.totLvHd + ")").join(" / ")
  const tot: number = hdTextList.reduce((tot, hd) => tot + hd.totLvHd, 0)

  return(
  <div>
    <p>vita: {hdText} total HD: {tot}</p>
  </div>
  )
}
