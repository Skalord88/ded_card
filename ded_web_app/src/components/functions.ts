import { Abilitys, Armor, Book, ClassPc, Enchantment, Inventory, Position, Shield, SignAndNumber, Weapon, WonderousItem, armorClass } from "./interfaces"

export function SignNumber(
    number: number
): string {
    if (number < 0) { return "" }
    return "+";
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

export function CountMonsterArmor(
    armor: armorClass
): number {
    return 10
        + armor.armorBonus + armor.shieldBonus
        + armor.sizeBonus + armor.dextrityBonus
        + armor.naturalArmor + armor.deflectionBonuses
        + armor.dodgeBonus
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

export interface inCharArmor {
    id: number,
    value: number,
    text: string
}

export function CountInCharArmor(
    charArmor: armorClass,
    charInventory: Inventory
): inCharArmor[] {
    let inCharArmor: inCharArmor[] = [];

    let idN: number = 0;

    let arm: number
    charInventory.armor.enchantment ?
        arm = charArmor.armorBonus + charInventory.armor.armorClass
        + charInventory.armor.enchantment.enchantment
        : arm = charArmor.armorBonus + charInventory.armor.armorClass;

    let shi: number
    charInventory.shield.enchantment ?
        shi = charArmor.shieldBonus + charInventory.shield.armorClass
        + charInventory.shield.enchantment.enchantment
        : shi = charArmor.shieldBonus + charInventory.shield.armorClass
    const dex: number = charArmor.dextrityBonus;
    const def: number = charArmor.deflectionBonuses;
    const nat: number = charArmor.naturalArmor;
    const dod: number = charArmor.dodgeBonus;

    if (arm !== 0) {
        inCharArmor.push({
            id: idN,
            value: arm,
            text: "armor"
        })
        idN++
    }
    if (shi !== 0) {
        inCharArmor.push({
            id: idN,
            value: shi,
            text: "shield"
        })
        idN++
    }
    if (dex !== 0) {
        inCharArmor.push({
            id: idN,
            value: dex,
            text: "dextrity"
        })
        idN++
    }
    if (def !== 0) {
        inCharArmor.push({
            id: idN,
            value: def,
            text: "deflection"
        })
        idN++
    }
    if (nat !== 0) {
        inCharArmor.push({
            id: idN,
            value: nat,
            text: "natural"
        })
        idN++
    }
    if (dod !== 0) {
        inCharArmor.push({
            id: idN,
            value: dod,
            text: "dodge"
        })
        idN++
    }

    return inCharArmor;
}

export function OnlyEnchantedName(
    enchantment: number
): string {
    if (enchantment < 0) {
        return "pft"
    } else if (enchantment === 0) {
        return "-"
    }
    return "+" + enchantment
}

export function EnchantedName(
    item: any
): string {
    let itemName: string = '';
    if (item.enchantment?.enchantment < 0) {
        itemName = 'pft ' + item.name
    } else if (item.enchantment?.enchantment === 0) {
        itemName = item.name
    } else {
        itemName = item.name + '+' + item.enchantment?.enchantment
    }
    return itemName;
}

export function CostOfEnchant(
    enchantment: number,
    type: string
): number {
    if (type === 'Armor') {
        switch (enchantment) {
            case -1: return 150
            case 1: return 1150
            case 2: return 4150
            case 3: return 9150
            case 4: return 16150
            case 5: return 25150
        }
    }
    if (type === 'Weapn') {
        switch (enchantment) {
            case -1: return 300
            case 1: return 2300
            case 2: return 8300
            case 3: return 18300
            case 4: return 32300
            case 5: return 50300
        }
    }
    return 0;
}

export function EnchantmentCost(
    items: Armor []| Shield []| Weapon []
): number {
    let total: number = 0
    if (items)
    items.forEach(item => {
        if (item.enchantment) if(item.itemType === 'ARMOR' || item.itemType === 'SHIELD') {
            total += item.cost + CostOfEnchant(item.enchantment.enchantment, 'Armor')
        } else {
            total += item.cost + CostOfEnchant(item.enchantment.enchantment, 'Weapn')
        }}

    )
    return total;
}

export function NameEnchanted(
    item: any
): string {
    if (item.enchantment?.enchantment < 0) { return 'pft ' + item.name }
    if (item.enchantment?.enchantment > 0) { return item.name + '+' + item.enchantment?.enchantment }
    return item.name
}

export function ItemNoEnchanted(
    item: any
): boolean {
    if (
        item.armorName === 'NO_ARMOR' ||
        item.shieldName === 'NO_SHIELD' ||
        item.weaponName === 'UNARMED_STRIKE'
    ) { return false }
    return true;
}

export function ItemEnchantedAndNoEnchanted(
    item: any
): boolean {
    if (
        item.enchantment?.enchantment === 0 &&
        ItemNoEnchanted(item)
    ) { return true }
    return false
}

export function SpellsFilter(
    pgClass: string
): string {

    if (pgClass === "WIZARD" || pgClass === "SORCERER") {
        return "SORCERER_WIZARD"
    }

    return pgClass;

}

export function AllSpell(
    num: number | null
): string | number {
    if (num === null) return "all"
    return num;
}

export function SortedBooks(
    books: Book[]
): Book[] {
    return books.sort((a, b) => a.caster.localeCompare(b.caster));
}

export function updateEnchantment(item: Armor | Shield | Weapon, newEnchantment: Enchantment): Armor | Shield | Weapon {
    return {
        ...item,
        enchantment: newEnchantment
    };
}

export interface itemInDrop {
    name: string
    item: any
}

export function addToDrop(options: any[], text: string): itemInDrop[] {
    if (text === "class") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: o.className,
                    item: o as ClassPc
                }
            }
        )
        return list
    }
    if (text === "items") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: o.name,
                    item: o as Armor | Shield | Weapon | WonderousItem
                }
            }
        )
        return list
    }
    if (text === "enchant") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: OnlyEnchantedName(o.enchantment),
                    item: o as Enchantment
                }
            }
        )
        return list
    }
    return []
}