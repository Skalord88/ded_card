import { Abilitys, Position, Weapon } from "./interfaces"

export function SignNumber(number: number): string {
    const sign = number >= 0? '+' : '';
    return sign;
}

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
    weapon: Weapon,
    bab: number,
    position: Position,
    ab: Abilitys,
    whichAb: string,
    nAtt: number
) {
    // se l'arma e' a distanza
    if(WeaponRanged(weapon)){return false}
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if(!position.pose && position.twoHanded){return false}
    // torna bab + car - n. attacchi
    return bab + BonusAbilities(ab, whichAb) - nAtt
}

export function AttackRanged(
    weapon: Weapon,
    bab: number,
    position: Position,
    ab: Abilitys,
    whichAb: string,
    nAtt: number
) {
    // se l'arma e' a distanza
    if(!WeaponRanged(weapon) && !WeaponThrown(weapon)) return false;
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if(!position.pose && position.twoHanded){return false}
    // torna bab + car - n. attacchi
    return bab + BonusAbilities(ab, whichAb) - nAtt;
}

export function AttackIIMelee(
    weapon: Weapon,
    bab: number,
    position: Position,
    ab: Abilitys,
    whichAb: string,
    nAtt: number
) {
    // se l'arma e' a distanza
    if(WeaponRanged(weapon)){return false}
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if(!position.pose && position.twoHanded){return false}
    // se l'arma e' a 2 mani
    if(position.twoHanded){return false}
    // torna bab + car - n. attacchi
    if(position.pose && !position.light){return bab + BonusAbilities(ab, whichAb) - nAtt -6}
    if(!position.pose && !position.light){return bab + BonusAbilities(ab, whichAb) - nAtt -10}
    if(position.pose && position.light){return bab + BonusAbilities(ab, whichAb) - nAtt -4}
    if(!position.pose && position.light){return bab + BonusAbilities(ab, whichAb) - nAtt -8}
}

export function AttackIIRanged(
    weapon: Weapon,
    bab: number,
    position: Position,
    ab: Abilitys,
    whichAb: string,
    nAtt: number
) {
    // se l'arma e' a distanza
    if(!WeaponRanged(weapon) && !WeaponThrown(weapon)) return false;
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if(!position.pose && position.twoHanded){return false}
    // se l'arma e' a 2 mani
    if(position.twoHanded){return false}
    // torna bab + car - n. attacchi
    if(position.pose && !position.light){return bab + BonusAbilities(ab, whichAb) - nAtt -6}
    if(!position.pose && !position.light){return bab + BonusAbilities(ab, whichAb) - nAtt -10}
    if(position.pose && position.light){return bab + BonusAbilities(ab, whichAb) - nAtt -4}
    if(!position.pose && position.light){return bab + BonusAbilities(ab, whichAb) - nAtt -8}
}