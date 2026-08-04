import { ClassPc } from "../ClassPc/Interface/ClassPcLevel";

export type HitDices = {
  first: boolean;
  lv: number;
  dice: number;
};

export type HitDiceMap = { [dice: number]: { first: boolean; lv: number } };

export const createHitDiceMap = (
  adjLv: number,
  classList: ClassPc[]
): HitDiceMap => {
  const hitDiceMap: HitDiceMap = {};

  if (adjLv > 0) {
    hitDiceMap[4] = {
      first: false,
      lv: adjLv
    };
  }
  if (classList && classList.length > 0) {
    classList.forEach((cl) => {
      const dice = cl.classCharacter.hitDice;
      if (hitDiceMap[dice]) {
        hitDiceMap[dice].lv += cl.level;
        cl.firstClass && (hitDiceMap[dice].first = true);
      } else {
        hitDiceMap[dice] = {
          first: cl.firstClass,
          lv: cl.level
        };
      }
    });
  }

  return hitDiceMap;
};

export const countTotalHitPoints = (
  dice: number,
  first: boolean,
  lv: number,
  constitutionBonus: number
): number => {
  const halfDice = Math.floor(dice / 2);
  let hitPoints: number = 0;

  for (let i = 1; i <= lv; i++) {
    // if(dice === 4) console.log(i, hitPoints);
    if (first && i === 1) {
      hitPoints += dice + constitutionBonus;
      // if(dice === 4) console.log(i, hitPoints);
    } else if (i % 2 === 0) {
      hitPoints += halfDice + constitutionBonus;
      // if(dice === 4) console.log(i, hitPoints);
    } else if (i % 2 !== 0) {
      hitPoints += halfDice + 1 + constitutionBonus;
      // if(dice === 4) console.log(i, hitPoints);
    }
  }
  return hitPoints;
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
    hitDices.dice = cl.classCharacter.hitDice;
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

export const CountHitDicesFromAdj = (
  lvAdj: number,
  listHitDices: HitDices[]
): HitDices[] => {
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
};
