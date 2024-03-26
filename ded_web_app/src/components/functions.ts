import { Abilitys, Position, Weapon } from "./interfaces"

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

export function WeaponThrown(weapon: Weapon) {
    return weapon.type.includes("THROWN");
}

export function WeaponTwoHanded(weapon: Weapon) {
    return weapon.type.includes("TWO_HANDED");
}

export function ListOneHand(weapons: Weapon[]) {
    weapons.filter(weapon => !WeaponTwoHanded(weapon))
}

export function AttackMelee(
    bab: number,
    position: Position,
    weapon: Weapon,
    ab: Abilitys,
    whichAb: string,
    nAtt: number
) {
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if(!position.pose && position.twoHanded){return false}
    // se l'arma e' a distanza
    if(WeaponRanged(weapon)){return false}
    // torna bab + car - n. attacchi
    return bab + BonusAbilities(ab, whichAb) - nAtt
}

export function AttackRanged(
    bab: number,
    position: Position,
    weapon: Weapon,
    ab: Abilitys,
    whichAb: string,
    nAtt: number
) {
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if(!position.pose && position.twoHanded){return false}
    // se l'arma e' a distanza
    if(!WeaponRanged(weapon)) return false;
    // torna bab + car - n. attacchi
    return bab + BonusAbilities(ab, whichAb) - nAtt;
}

// da fare
export function AttackIMelee(
    bab: number,
    weapon: Weapon,
    hand: boolean,
    ab: Abilitys,
    whichAb: string,
    nAtt: number,
    feat: boolean
) {
    if(!hand) return false;
    if(WeaponRanged(weapon)) return false;
    let bonus = -6;
    if(WeaponLight(weapon)) bonus+=2
    return bab + BonusAbilities(ab, whichAb) - nAtt + bonus;
}

// da fare
export function AttackIIMelee(
    bab: number,
    weapon: Weapon,
    hand: boolean,
    ab: Abilitys,
    whichAb: string
    ) {
        let bonus = hand? -6 : -10;
        
        
}