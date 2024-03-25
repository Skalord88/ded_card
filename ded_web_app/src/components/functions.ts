import { Abilitys, Weapon } from "./interfaces"

export function BonusAbilities(ab: Abilitys, which: string) {
    switch(which){
        case 'STR': return Math.floor((ab.streght - 10) / 2);
        case 'DEX': return Math.floor((ab.dextrity - 10) / 2);
        case 'COS': return Math.floor((ab.constitution - 10) / 2);
        case 'INT': return Math.floor((ab.intelligence - 10) / 2);
        case 'WIS': return Math.floor((ab.wisdom - 10) / 2);
        case 'CHA': return Math.floor((ab.charisma - 10) / 2);
        default: return 0;
    } 
}

export function WeaponLight(weapon: Weapon): boolean {
    return weapon.type.includes("LIGHT");
}

export function WeaponRanged(weapon: Weapon) {
    return weapon.type.includes("RANGED");
}

export function Attack(
    bab: number,
    hand: boolean,
    weapon: Weapon,
    ab: Abilitys,
    whichAb: string,
    nAtt: number
) {
    console.log(WeaponRanged(weapon), bab + BonusAbilities(ab, whichAb))
    let bonus =
    !hand
    ? WeaponRanged(weapon) === false
    ? bab + BonusAbilities(ab, whichAb)
    : -100
    : -100

    // if(!bonus){return false}
    return bonus? bonus - nAtt : bonus;
}

export function AttackI(
    bab: number,
    weapon: Weapon,
    hand: boolean,
    ab: Abilitys,
    whichAb: string,
    feat: boolean
) {
    
}

export function AttackII(
    bab: number,
    weapon: Weapon,
    hand: boolean,
    ab: Abilitys,
    whichAb: string
    ) {
        let bonus = hand? -6 : -10;
        
        
}