import { Abilitys } from "./Abilitys/Interface";
import { BonusAbilities, SignAndCount } from "./functions";
import { CharacterPc } from "./interfaces";
import { FindAllAdjLevel } from "./Race/Function";
import { CountHitDicesFromAdj, CountHitDicesFromClassPc, CountHitPoints, HitDices } from "./Vita/Functions";
export type HpComponentProps = {
  char: CharacterPc;
  abilitys: Abilitys;
};
export const HpComponent: React.FC<HpComponentProps> = ({ char, abilitys }) => {
  const listHitDices: HitDices[] = CountHitDicesFromClassPc(char.classPcList);
  const adjListHitDices: HitDices[] = CountHitDicesFromAdj(FindAllAdjLevel(char), listHitDices)
  const totLv = char.classPcList.reduce((tot, lv) => tot + lv.level, 0)
  const cos = SignAndCount([BonusAbilities(abilitys, "COS")])
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Hit Dice</h2>
      <div>
        <p style={{ display: "flex" }}>
          Hit Dices:
          {adjListHitDices.map((hD, index) => {
            return (
              <div key={index}>
                {hD.lv}D{hD.dice}
                {cos.sign}{cos.number * hD.lv}
                {index === adjListHitDices.length - 1 ? null : ","}
              </div>
            );
          })}
        </p>
      </div>
      <div>
        <p>Life: {abilitys.constitution}</p>
        <p>
          Hit Points: {CountHitPoints(cos.number, adjListHitDices)}
        </p>
        <p>
          dmg: <input placeholder="" type="number" />
        </p>
      </div>
    </>
  );
};
