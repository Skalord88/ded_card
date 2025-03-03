import { BonusAbilities } from "./Abilitys/Functions";
import { ArmorClass } from "./Armor/interface/ArmorInterface";
import { ClassCharacter, ClassPc } from "./ClassPc/Interface/ClassPcLevel";
import { enchantedName, onlyEnchantedName } from "./Enchantment/Functions/EnchantmentFunctions";
import { Feat, feat, serverFeat } from "./Feats/Interface/FeatInterface";
import { Armor, Book, CharacterPc, Enchantment, Inventory, Item, Position, Shield, SignAndNumber, subRaces, Weapon, WonderousItem } from "./interfaces";
import { SubRace } from "./Race/Interfaces";

export function SignNumber(
    number: number
): string {
    if (number < 0) { return "" }
    return "+";
}
export function SignNumberEnchant(
    number: number
): string {
    if (number === undefined) return ""
    switch (number) {
        case -2: return ""
        case -1: return "prf"
        case 0: return ""
        default: return "+" + number
    }
}

export const signAndCount = (
    numbers: number[]
): SignAndNumber => {

    const num: number = numbers.reduce(
        (total, n) => total + n,
        0
    )

    return {
        sign: SignNumber(num),
        number: num
    }
}

export function weaponLight(weapon: Weapon): boolean {
    return weapon !== null ? weapon.type.includes("LIGHT") : false;
}

export function weaponRanged(weapon: Weapon): boolean {
    return weapon !== null ? weapon.type.includes("RANGED") : false;
}

export function weaponThrown(weapon: Weapon): boolean {
    return weapon !== null ? weapon.type.includes("THROWN") : false;
}

export function weaponTwoHanded(weapon: Weapon): boolean {
    return weapon !== null ? weapon.type.includes("TWO_HANDED") : false;
}

export function listOneHand(weapons: Weapon[]) {
    weapons.filter(weapon => !weaponTwoHanded(weapon))
}

export function AttackMelee(
    weapon: Weapon,
    bab: number,
    position: Position,
    nAtt: number
): number | false {
    // se l'arma e' a distanza
    if (weaponRanged(weapon)) { return false }
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
    if (!weaponRanged(weapon) && !weaponThrown(weapon)) return false;
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
    nAtt: number,
    twoFeat: boolean
): number | false {
    // se l'arma e' a distanza
    if (weaponRanged(weapon)) { return false }
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
    // se l'arma e' a 2 mani
    if (position.twoHanded) { return false }
    // torna strAtt/dexAtt - n. attacchi
    if (!twoFeat) {
        if (position.pose && !position.light) { return bab - nAtt - 6 }
        if (!position.pose && !position.light) { return bab - nAtt - 10 }
        if (position.pose && position.light) { return bab - nAtt - 4 }
        if (!position.pose && position.light) { return bab - nAtt - 8 }
    } else {
        if (position.pose && position.light) { return bab - nAtt - 2 }
        if (!position.pose && !position.light) { return bab - nAtt - 4 }
        if (!position.pose && position.light) { return bab - nAtt - 2 }
    }
    return 0;
}

export function AttackIIRanged(
    weapon: Weapon,
    bab: number,
    position: Position,
    nAtt: number,
    twoFeat: boolean
): number | false {
    // se l'arma e' a distanza
    if (!weaponRanged(weapon) && !weaponThrown(weapon)) return false;
    // se la posizione e' seconda mano e l'arma 1 e' grande
    if (!position.pose && position.twoHanded) { return false }
    // se l'arma e' a 2 mani
    if (position.twoHanded) { return false }
    // torna strAtt/dexAtt - n. attacchi
    if (!twoFeat) {
        if (position.pose && !position.light) { return bab - nAtt - 6 }
        if (!position.pose && !position.light) { return bab - nAtt - 10 }
        if (position.pose && position.light) { return bab - nAtt - 4 }
        if (!position.pose && position.light) { return bab - nAtt - 8 }
    } else {
        if (position.pose && position.light) { return bab - nAtt - 2 }
        if (!position.pose && !position.light) { return bab - nAtt - 4 }
        if (!position.pose && position.light) { return bab - nAtt - 2 }
    }
    return 0;
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
                    (w => w.id && idList.includes(w.id)),
                secondHand: weaponsList.find
                    (w => w.id && idList.includes(w.id)),
                additionalWeapon: weaponsList.find
                    (w => w.id && idList.includes(w.id))
            },
            setTwo: {
                firstHand: weaponsList.find
                    (w => w.id && idList.includes(w.id)),
                secondHand: weaponsList.find
                    (w => w.id && idList.includes(w.id)),
                additionalWeapon: weaponsList.find
                    (w => w.id && idList.includes(w.id))
            }
        }
    } else {
        return undefined
    }
}

export function CountMonsterArmor(
    armor: ArmorClass
): number {
    return 10
        + armor.armorBonus + armor.shieldBonus
        + armor.sizeBonus
        + armor.naturalArmor + armor.deflectionBonuses
        + armor.dodgeBonus
}

// export function CountArmor(
//     armor: armorClass,
//     inventory: Inventory
// ): number {
//     return 10
//         + armor.armorBonus + armor.shieldBonus
//         + armor.sizeBonus + armor.dexterityBonus
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
//     const dex: number = charArmor.dexterityBonus;
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
//             text: "dexterity"
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
    item: string | Feat | ClassCharacter | SubRace | Item | Armor | Shield | Weapon | WonderousItem | Enchantment | CharacterPc | []
}

export const addToDrop = (options: any[], text: string): itemInDrop[] => {

    if (text === "filter") {
        let list: itemInDrop[] = options.map(
            o => {
                const nameFilter: string = o
                const filter: string = o as string
                return {
                    name: nameFilter,
                    item: filter
                }
            }
        )
        return list
    }
    if (text === "feat") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: (o as Feat).featName,
                    item: o as Feat
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
                    item: o as ClassCharacter
                }
            }
        )
        return list
    }
    if (text === "race") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: o.subRacesName,
                    item: o as SubRace
                }
            }
        )
        return list
    }
    if (text === "items") {
        let list: itemInDrop[] = options.map(

            o => {
                return {
                    name: (o as Item).name,
                    item: o as Item | Armor | Shield | Weapon | WonderousItem
                }
            }
        )
        return list
    }
    if (text === "enchant") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: onlyEnchantedName(o.enchantment),
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
    if (text === "char") {
        let list: itemInDrop[] = options.map(
            o => {
                return {
                    name: o.name,
                    item: o as CharacterPc
                }
            }
        )
        return list
    }
    return []

}

export { BonusAbilities };

