import { Armor, Attacks, CharacterPc, ClassPc, Enchantment, Inventory, ItemsList, Shield, Weapon, WonderousItem, armorClass, serverSkill, subRaces } from '../components/interfaces'
import { Abilitys } from './Abilitys/Interface'
import { AddStudy } from './Skills/interface/SkillsInterface'

export const noneArmor: Armor = {
    id: 2,
    name: "No Armor",
    cost: 0,
    weight: 0,
    description: "Naked",
    itemType: "ARMOR",
    armorName: "NO_ARMOR",
    modifiers: [],
    // armorClass: 0,
    armorType: "NO_ARMOR",
    maxDex: 100,
    penality: 0,
    failure: 0,
    enchantment: { id: 0, enchantment: 0 },
    material: null
}

export const noneShield: Shield = {
    id: 3,
    name: "No Shield",
    cost: 0,
    weight: 0,
    description: "Naked",
    itemType: "SHIELD",
    shieldName: "NO_SHIELD",
    modifiers: [],
    armorType: "SHIELD",
    maxDex: 100,
    penality: 0,
    failure: 0,
    enchantment: { id: 0, enchantment: 0 },
    material: null
}

export const noneWeapon: Weapon = {
    id: 1,
    name: "Unarmed strike",
    itemType: "WEAPON",
    weaponName: "UNARMED_STRIKE",
    cost: 0,
    weight: 0,
    size: 'MEDIUM',
    modifiers: [],
    description: "A Medium character deals 1d3 points of nonlethal damage with an unarmed strike. A Small character deals 1d2 points of nonlethal damage. A monk or any character with the Improved Unarmed Strike feat can deal lethal or nonlethal damage with unarmed strikes, at her option. The damage from an unarmed strike is considered weapon damage for the purposes of effects that give you a bonus on weapon damage rolls. An unarmed strike is always considered a light weapon. Therefore, you can use the Weapon Finesse feat to apply your Dexterity modifier instead of your Strength modifier to attack rolls with an unarmed strike.",
    damage: "D3",
    critical: "X2",
    range: 0,
    type: ['BLUDGEONING', 'SIMPLE', 'UNARMED'],
    specialAttacks: null,
    enchantment: { id: -2, enchantment: -2 },
    material: null
}

export const noneItem: WonderousItem = {
    id: 4,
    name: 'No item',
    cost: 0,
    weight: 0,
    description: '',
    itemType: 'WONDROUS_ITEM'
}
export const emptyInventory: Inventory = {
    armor: noneArmor,
    shield: noneShield,
    weaponOne: noneWeapon,
    weaponTwo: noneWeapon,
    weaponThree: noneWeapon,
    weaponFour: noneWeapon,
    weaponFive: noneWeapon,
    backpack: [],
    head: noneItem,
    neck: noneItem,
    arms: noneItem,
    hands: [],
    cloth: noneItem,
    legs: noneItem
}

export const emptyAttacks: Attacks = {
    firstAttackSetOne: noneWeapon,
    secondAttackSetOne: noneWeapon,
    additionalAttackSetOne: noneWeapon,
    firstAttackSetTwo: noneWeapon,
    secondAttackSetTwo: noneWeapon,
    additionalAttackSetTwo: noneWeapon
}

export const characterEmpty: CharacterPc = {
    id: 0,
    characterName: '',
    playerName: '',
    classPcList: [],
    race: {
        id: 0,
        race: {
            id: 0,
            raceName: '',
            avatarRaceUrl: '',
            modifiers: []
        },
        subRacesName: '',
        avatarUrl: '',
        modifiers: [],
        raceFeats: [],
        levelAdjustment: 0,
        size: {
            id:0,
            size: '',
            modifiers: []
        },
        availableRegions: []
    },
    archetypes: [],
    abilitys: {
        strength: 0,
        dextrity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    },
    
    skillsList: [],
    featsList: [],
    items: [],
    inventory: emptyInventory,
    attacks: emptyAttacks,
    magicPerDay: {},
    magicKnown: {},
    books: [{
        caster: "",
        level: 0,
        spells: []
    }],
    experience: 0,
    treasure: 0
}

export const abilitysEmpty: Abilitys = {

    strength: 10,
    dextrity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10

}

export const armorClassEmpty: armorClass = {
    dextrityBonus: 0,
    sizeBonus: 0,
    armorBonus: 0,
    shieldBonus: 0,
    enhancementBonuses: 0,
    deflectionBonuses: 0,
    naturalArmor: 0,
    dodgeBonus: 0
}

// export const emptySubRaces: subRaces = {
//     id: 0,
//     subRacesName: '',
//     avatarUrl: '',
//     raceAbilitys: abilitysEmpty,
//     raceSkills: [],
//     armorClass: armorClassEmpty,
//     levelAdjustment: 0
// }

export const skillEmpty: serverSkill = {
    skillDTO: [],
    skillRank: -1
}

export const studyEmpty: AddStudy = {
    idSkill: 0,
    study: ""
}

export const emptyItemsList: ItemsList = {
    armorsList: [],
    shieldList: [],
    weaponsList: [],
    wonderousItems: []
}

export const emptyClass: ClassPc = {
    id: -1,
    classType: -1,
    className: -1,
    level: 0,
    firstClass: false,
    hitDice: 0,
    classBab: 0,
    savingThrow: 'lll',
    skillPoints: 0,
    feats: []
}

export const enchantItems: Enchantment[] = [

    { id: -1, enchantment: -1 },
    { id: 0, enchantment: 0 },
    { id: 1, enchantment: 1 },
    { id: 2, enchantment: 2 },
    { id: 3, enchantment: 3 },
    { id: 4, enchantment: 4 },
    { id: 5, enchantment: 5 },

];