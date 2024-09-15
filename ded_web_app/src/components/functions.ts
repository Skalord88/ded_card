import { BonusAbilities } from "./Abilitys/Functions";
import { EnchantedName, OnlyEnchantedName } from "./Enchantment/Functions/EnchantmentFunctions";
import { feat, serverFeat } from "./Feats/Interface/FeatInterface";
import { Armor, Book, ClassPc, Enchantment, Inventory, Position, Shield, SignAndNumber, Weapon, WonderousItem, armorClass, subRaces } from "./interfaces";

export function SignNumber(
    number: number
): string {
    if (number < 0) { return "" }
    return "+";
}
export function SignNumberEnchant(
    number: number
): string {
    switch(number){
        case -2: return ""
        case -1: return "prf"
        case 0: return ""
        default: return "+" + number
    }
}

export function SignAndCount(
    numbers: number[]
): SignAndNumber {

    const num: number = numbers.reduce(
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

export function WeaponRanged(weapon: Weapon): boolean {
    return weapon.type.includes("RANGED");
}

export function WeaponThrown(weapon: Weapon): boolean {
    return weapon.type.includes("THROWN");
}

export function WeaponTwoHanded(weapon: Weapon): boolean {
    return weapon.type.includes("TWO_HANDED");
}

export function ListOneHand(weapons: Weapon[]) {
    weapons.filter(weapon => !WeaponTwoHanded(weapon))
}

export function AttackMelee(
    weapon: Weapon,
    bab: number,
    position: Position,
    nAtt: number
): number | false {
    // se l'arma e' a distanza
    if (WeaponRanged(weapon)) { return false }
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
    // torna strAtt/dexAtt - n. attacchi
    const result = bab - nAtt;
    return result;
}

export function AttackRanged(
    weapon: Weapon,
    bab: number,
    position: Position,
    nAtt: number
): number | false {
    // se l'arma e' a distanza
    if (!WeaponRanged(weapon) && !WeaponThrown(weapon)) return false;
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
    // torna strAtt/dexAtt - n. attacchi
    const result = bab - nAtt;
    return result;
}

export function AttackIIMelee(
    weapon: Weapon,
    bab: number,
    position: Position,
    nAtt: number
): number | false {
    // se l'arma e' a distanza
    if (WeaponRanged(weapon)) { return false }
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
    // se l'arma e' a 2 mani
    if (position.twoHanded) { return false }
    // torna strAtt/dexAtt - n. attacchi
    let result: number = 0;
    if (position.pose && position.light) {result = bab - nAtt - 4}
    if (position.pose && !position.light) {result = bab - nAtt - 6}
    if (!position.pose && position.light) {result = bab - nAtt - 8}
    if (!position.pose && !position.light) {result = bab - nAtt - 10}
    
    return result;
}

export function AttackIIRanged(
    weapon: Weapon,
    bab: number,
    position: Position,
    nAtt: number
): number | false {
    // se l'arma e' a distanza
    if (!WeaponRanged(weapon) && !WeaponThrown(weapon)) return false;
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
    // se l'arma e' a 2 mani
    if (position.twoHanded) { return false }
    // torna strAtt/dexAtt - n. attacchi
    let result: number = 0;
    if (position.pose && position.light) {result = bab - nAtt - 4}
    if (position.pose && !position.light) {result = bab - nAtt - 6}
    if (!position.pose && position.light) {result = bab - nAtt - 8}
    if (!position.pose && !position.light) {result = bab - nAtt - 10}
    
    return result;
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

// export function CountArmor(
//     armor: armorClass,
//     inventory: Inventory
// ): number {
//     return 10
//         + armor.armorBonus + armor.shieldBonus
//         + armor.sizeBonus + armor.dextrityBonus
//         + armor.naturalArmor + armor.deflectionBonuses
//         + armor.dodgeBonus + inventory.armor.armorClass
//         + inventory.shield.armorClass
// }

export interface inCharArmor {
    id: number,
    value: number,
    text: string
}

// export function CountInCharArmor(
//     charArmor: armorClass,
//     charInventory: Inventory
// ): inCharArmor[] {
//     let inCharArmor: inCharArmor[] = [];

//     let idN: number = 0;

//     let arm: number
//     charInventory.armor.enchantment ?
//         arm = charArmor.armorBonus + charInventory.armor.armorClass
//         + charInventory.armor.enchantment.enchantment
//         : arm = charArmor.armorBonus + charInventory.armor.armorClass;

//     let shi: number
//     charInventory.shield.enchantment ?
//         shi = charArmor.shieldBonus + charInventory.shield.armorClass
//         + charInventory.shield.enchantment.enchantment
//         : shi = charArmor.shieldBonus + charInventory.shield.armorClass
//     const dex: number = charArmor.dextrityBonus;
//     const def: number = charArmor.deflectionBonuses;
//     const nat: number = charArmor.naturalArmor;
//     const dod: number = charArmor.dodgeBonus;

//     if (arm !== 0) {
//         inCharArmor.push({
//             id: idN,
//             value: arm,
//             text: "armor"
//         })
//         idN++
//     }
//     if (shi !== 0) {
//         inCharArmor.push({
//             id: idN,
//             value: shi,
//             text: "shield"
//         })
//         idN++
//     }
//     if (dex !== 0) {
//         inCharArmor.push({
//             id: idN,
//             value: dex,
//             text: "dextrity"
//         })
//         idN++
//     }
//     if (def !== 0) {
//         inCharArmor.push({
//             id: idN,
//             value: def,
//             text: "deflection"
//         })
//         idN++
//     }
//     if (nat !== 0) {
//         inCharArmor.push({
//             id: idN,
//             value: nat,
//             text: "natural"
//         })
//         idN++
//     }
//     if (dod !== 0) {
//         inCharArmor.push({
//             id: idN,
//             value: dod,
//             text: "dodge"
//         })
//         idN++
//     }

//     return inCharArmor;
// }

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

export interface itemInDrop {
    name: string
    item: any
}

export function addToDrop(options: any[], text: string): itemInDrop[] {
    if (text === "list") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: o.text,
                    item: o.list
                }
            }
        )
        return list
    }
    if (text === "feat") {
        let list: itemInDrop[] = options.map(
            o => {
                const nameFeat = (o as serverFeat).featName || (o as feat).characterFeatName;
                const feat = o as serverFeat | feat;
                return {
                    name: nameFeat,
                    item: feat
                }
            }
        )
        return list
    }
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
    if (text === "race") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: o.raceName,
                    item: o as subRaces
                }
            }
        )
        return list
    }
    if (text === "items") {
        let list: itemInDrop[] = options.map(

            o => {
                return {
                    name: EnchantedName(o),
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
    if (text === "normal") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: o.name,
                    item: o as WonderousItem
                }
            }
        )
        return list
    }
    return []
}

export { BonusAbilities };
