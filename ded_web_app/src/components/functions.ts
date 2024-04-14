import { Abilitys, Inventory, Position, SignAndNumber, Weapon, armorClass } from "./interfaces"

export function SignNumber(
    number: number
): string {
    const sign = number >= 0 ? '+' : '';
    return sign;
}

export function BonusAbilities(ab: Abilitys, which: string) {
    switch (which) {
        case 'STR': return Math.floor((ab.streght - 10) / 2);
        case 'DEX': return Math.floor((ab.dextrity - 10) / 2);
        case 'COS': return Math.floor((ab.constitution - 10) / 2);
        case 'INT': return Math.floor((ab.intelligence - 10) / 2);
        case 'WIS': return Math.floor((ab.wisdom - 10) / 2);
        case 'CHA': return Math.floor((ab.charisma - 10) / 2);
        default: return 0;
    }
}

export function SignAndCount(
    numbers: number[]
): SignAndNumber {

    let num: number = numbers.reduce(
        (total, n) => total + n,
        0
    )

    const res = {
        sign: SignNumber(num),
        number: num
    }

    return res;
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
    if (WeaponRanged(weapon)) { return false }
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
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
    if (!WeaponRanged(weapon) && !WeaponThrown(weapon)) return false;
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
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
    if (WeaponRanged(weapon)) { return false }
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
    // se l'arma e' a 2 mani
    if (position.twoHanded) { return false }
    // torna bab + car - n. attacchi
    if (position.pose && !position.light) { return bab + BonusAbilities(ab, whichAb) - nAtt - 6 }
    if (!position.pose && !position.light) { return bab + BonusAbilities(ab, whichAb) - nAtt - 10 }
    if (position.pose && position.light) { return bab + BonusAbilities(ab, whichAb) - nAtt - 4 }
    if (!position.pose && position.light) { return bab + BonusAbilities(ab, whichAb) - nAtt - 8 }
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
    if (!WeaponRanged(weapon) && !WeaponThrown(weapon)) return false;
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
    // se l'arma e' a 2 mani
    if (position.twoHanded) { return false }
    // torna bab + car - n. attacchi
    if (position.pose && !position.light) {
        return bab + BonusAbilities(ab, whichAb) - nAtt - 6
    }
    if (!position.pose && !position.light) {
        return bab + BonusAbilities(ab, whichAb) - nAtt - 10
    }
    if (position.pose && position.light) {
        return bab + BonusAbilities(ab, whichAb) - nAtt - 4
    }
    if (!position.pose && position.light) {
        return bab + BonusAbilities(ab, whichAb) - nAtt - 8
    }
}

export function SetSetWeaponListFromDB(
    inventory: Inventory
): Weapon[] {
    return [
        inventory.weaponOne,
        inventory.weaponTwo,
        inventory.weaponThree,
        inventory.weaponFour,
        inventory.weaponFive
    ]
}

export function IndexWeaponOne(
    listOfWeapons: Weapon[],
    weaponSelected: Weapon
): number {

    let n: number = listOfWeapons.findIndex(
        w => w.id === weaponSelected.id);

    return n
}

export function SetAttacksFromWeapons(
    bab: number,
    idList: number[],
    weaponsList: Weapon[]
) {
    if (idList[0] && weaponsList[0]) {
        return {
            baseAttackBonus: bab,
            setOne: {
                firstHand: weaponsList.find
                    (w => idList.includes(w.id)),
                secondHand: weaponsList.find
                    (w => idList.includes(w.id)),
                additionalWeapon: weaponsList.find
                    (w => idList.includes(w.id))
            },
            setTwo: {
                firstHand: weaponsList.find
                    (w => idList.includes(w.id)),
                secondHand: weaponsList.find
                    (w => idList.includes(w.id)),
                additionalWeapon: weaponsList.find
                    (w => idList.includes(w.id))
            }
        }
    } else {
        return undefined
    }
}

export function CountArmor(
    armor: armorClass,
    inventory: Inventory
): number {
    return 10
        + armor.armorBonus + armor.shieldBonus
        + armor.sizeBonus + armor.dextrityBonus
        + armor.naturalArmor + armor.deflectionBonuses
        + armor.dodgeBonus + inventory.armor.armorClass
        + inventory.shield.armorClass
}

export function EnchantedName(
    item: any
): string {
    let itemName: string = '';
    if (item.enchantment < 0) {
        itemName = 'pft ' + item.name
    } else if (item.enchantment === 0) {
        itemName = item.name
    } else {
        itemName = item.name + '+' + item.enchantment
    }
    console.log(itemName)
    return itemName;
}

export function CostOfEnchant(
    enchantment: number,
    type: string
): number {
    if (type === 'Armor') {
        switch (enchantment) {
            case -1: return 150
            case 1: return 1000
            case 2: return 4000
            case 3: return 9000
            case 4: return 16000
            case 5: return 25000
        }
    }
    if (type === 'Weapn') {
        switch (enchantment) {
            case -1: return 300
            case 1: return 2000
            case 2: return 8000
            case 3: return 18000
            case 4: return 32000
            case 5: return 50000
        }
    }
    return 0;
}

export function EnchantmentCost(
    items: any[]
): number {
    let total: number = 0
    items.forEach(item => {
        if (item.itemType === 'ARMOR' || item.itemType === 'SHIELD') {
            total += item.cost + CostOfEnchant(item.enchantment, 'Armor')
        } else {
            total += item.cost + CostOfEnchant(item.enchantment, 'Weapn')
        }

    })
    return total;
}

export function NameEnchanted(
    item: any
): string {
    if (item.enchantment < 0) {return 'pft ' + item.name}
    if (item.enchantment > 0) {return item.name + '+' + item.enchantment}
    return item.name
}

export function ItemNoEnchanted(
    item: any
): boolean {
    if (
        item.armorName === 'NO_ARMOR' ||
        item.shieldName === 'NO_SHIELD' ||
        item.weaponName === 'UNARMED_STRIKE'
    ) {return false}
    return true;
}