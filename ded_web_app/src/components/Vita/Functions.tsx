import { ClassPc } from "../interfaces";

export function CountHitDicesFromClassPc(
    classPcList: ClassPc[]): any[] {
        let hitDices = {
            first: false,
            lv: 0,
            dice: 0
        }
        let listHitDices: any = []
        classPcList.forEach(cl => {
            cl.firstClass? hitDices.first = true : hitDices.first = false
            hitDices.lv = cl.level
            hitDices.dice = cl.hitDice
            listHitDices.push(hitDices)
        })

        return listHitDices;
        
    }

export function CountHitPoints(
    constitutionBonus: number,
    listHitDices:{first: boolean, lv: number, dice: number}[]
): number {
    let hitPoints: number = 0;
    listHitDices.forEach(hD => {
        if (hD.first) {
            hitPoints += hD.dice
            hitPoints += (hD.lv - 1) * hD.dice / 2
        } else {
            hitPoints += hD.dice * hD.lv / 2
        }
    })
    let totLv: number = 0;
    listHitDices.reduce(
        (total, h) => 
           total =+ h.lv ,
        0
    )
    const dispairBonusHits: number = Math.floor((totLv - 1) / 2)
    const constitutionBonusHits: number = constitutionBonus * totLv

    return hitPoints + dispairBonusHits + (constitutionBonusHits);
}