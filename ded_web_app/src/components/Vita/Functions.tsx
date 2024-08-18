import { ClassPc } from "../interfaces";

export type HitDices = {
  first: boolean;
  lv: number;
  dice: number;
};

export function CountHitDicesFromClassPc(classPcList: ClassPc[]): HitDices[] {
  let listHitDices: HitDices[] = [];
  classPcList.forEach((cl) => {
    let hitDices: HitDices = {
      first: false,
      lv: 0,
      dice: 0
    };
    if (cl.firstClass) {
      hitDices.first = true;
    }
    hitDices.lv = cl.level;
    hitDices.dice = cl.hitDice;
    listHitDices.push(hitDices);
  });

  return listHitDices;
}

export function CountHitPoints(
  constitutionBonus: number,
  listHitDices: HitDices[]
): number {
  let hitPoints: number = 0;
  listHitDices.forEach((hD) => {
    if (hD.first) {
      hitPoints += hD.dice;
      hitPoints += (hD.lv - 1) * hD.dice / 2;
      console.log(hitPoints)
    } else {
      hitPoints += hD.dice * hD.lv / 2;
    }
    
  });
  
  let totLv: number = listHitDices.reduce((total, hD) => (total += hD.lv), 0);
  const dispairBonusHits: number = Math.floor((totLv - 1) / 2);
  const constitutionBonusHits: number = constitutionBonus * totLv;
  console.log(totLv, dispairBonusHits, constitutionBonusHits)

  return hitPoints + dispairBonusHits + constitutionBonusHits;
}
