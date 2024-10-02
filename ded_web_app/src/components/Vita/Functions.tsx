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
      hitPoints += ((hD.lv - 1) * hD.dice) / 2;
    } else {
      hitPoints += (hD.dice * hD.lv) / 2;
    }
  });

  let totLv: number = listHitDices.reduce((total, hD) => (total += hD.lv), 0);
  const dispairBonusHits: number = Math.floor((totLv - 1) / 2);
  const constitutionBonusHits: number = constitutionBonus * totLv;

  return hitPoints + dispairBonusHits + constitutionBonusHits;
}

export function CountHitDicesFromAdj(
  lvAdj: number,
  listHitDices: HitDices[]
): HitDices[] {
  let find = false;

  if (lvAdj > 0) {
    const nuovaLista = listHitDices.map((hD) => {
      if (hD.dice === 4) {
        find = true;
        return {
          ...hD,
          lv: hD.lv + lvAdj
        };
      }
      return hD;
    });

    if (!find) {
      nuovaLista.push({
        first: false,
        lv: lvAdj,
        dice: 4
      });
    }

    return nuovaLista;
  } else {
    return listHitDices;
  }
}
