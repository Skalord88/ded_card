import { Armor, Attacks, CharacterPc, EnchantedItem, Inventory, ItemsList, Shield, SpecialAttacks, Weapon, WonderousItem, armorClass, serverSkill } from '../components/interfaces'
import { Abilitys } from './Abilitys/Interface'
import { ClassCharacter, ClassPc } from './ClassPc/Interface/ClassPcLevel'
import { Prerequisite } from './Prerequisite/interface/Prerequisite'
import { AddStudy } from './Skills/interface/SkillsInterface'

export const noneArmor: Armor = {
    id: 2,
    name: "No Armor",
    cost: 0,
    weight: 0,
    description: "Naked",
    itemType: "ARMOR",
    armorName: "NO_ARMOR",
    modifiers: null,
    armorType: "NO_ARMOR",
    maxDex: 100,
    penality: 0,
    failure: 0,
    material: null,
    enchantmentList: []
}

export const noneShield: Shield = {
    id: 3,
    name: "No Shield",
    cost: 0,
    weight: 0,
    description: "Naked",
    itemType: "SHIELD",
    shieldName: "NO_SHIELD",
    modifiers: null,
    armorType: "SHIELD",
    maxDex: 100,
    penality: 0,
    failure: 0,
    material: null,
    enchantmentList: []
}

export const noneWeapon: Weapon = {
    id: 1,
    name: "Unarmed strike",
    itemType: "WEAPON",
    weaponName: "UNARMED_STRIKE",
    cost: 0,
    weight: 0,
    size: 'MEDIUM',
    modifiers: null,
    description: "A Medium character deals 1d3 points of nonlethal damage with an unarmed strike. A Small character deals 1d2 points of nonlethal damage. A monk or any character with the Improved Unarmed Strike feat can deal lethal or nonlethal damage with unarmed strikes, at her option. The damage from an unarmed strike is considered weapon damage for the purposes of effects that give you a bonus on weapon damage rolls. An unarmed strike is always considered a light weapon. Therefore, you can use the Weapon Finesse feat to apply your Dexterity modifier instead of your Strength modifier to attack rolls with an unarmed strike.",
    damage: "D3",
    critical: "X2",
    range: 0,
    type: ['BLUDGEONING', 'SIMPLE', 'UNARMED'],
    specialAttacks: null,
    material: null,
    enchantmentList: []
}

export const noneItem: WonderousItem = {
    id: 4,
    name: 'No item',
    cost: 0,
    weight: 0,
    description: '',
    itemType: 'WONDROUS_ITEM'
}

export const emptyEnchanted: EnchantedItem = {
    id: 0,
    item: noneWeapon,
    name: noneWeapon.name,
    enchantmentList: [],
    material: "",
    modifiers: null,
    cost: 0,
    description: ""
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

export const abilitysEmpty: Abilitys = {

    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10

}

export const armorClassEmpty: armorClass = {
    dexterityBonus: 0,
    sizeBonus: 0,
    armorBonus: 0,
    shieldBonus: 0,
    enhancementBonuses: 0,
    deflectionBonuses: 0,
    naturalArmor: 0,
    dodgeBonus: 0
}

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

export const emptyClassCharacter: ClassCharacter = {
    id: 0,
    classType: "",
    className: "",
    avatarUrl: "",
    hitDice: 0,
    classBab: 0,
    savingThrow: "",
    skillPoints: 0,
    classSkill: [],
    classStudy: [],
    classFeats: []
}

export const emptyClass: ClassPc = {
    // id: -1,
    // classType: -1,
    // className: "",
    level: 0,
    firstClass: false,
    classCharacter: emptyClassCharacter
    // hitDice: 0,
    // classBab: 0,
    // savingThrow: 'lll',
    // skillPoints: 0,
    // feats: []
}

export const emptyAbilitys: Abilitys = {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0
}

export const emptySpecialAttacks: SpecialAttacks = {
    bullRush: 0,
    charge: 0,
    disarm: 0,
    grapple: 0,
    overrun: 0,
    sunder: 0
}

export const emptyPrerequisite: Prerequisite = {
    id: 0,
    abilitys: emptyAbilitys,
    feats: [],
    caster: [],
    bab: 0,
    attackRoll: {
        target: null,
        bonus: 0
    },
    initiative: 0,
    speed: {
        foot: 0,
        fly: 0,
        climb: 0,
        swim: 0,
        special: ''
    },
    savingThrow: {
        fortitude: 0,
        reflex: 0,
        will: 0,
        resistance: {
            type: '',
            target: [],
            bonus: 0
        }
    },
    prerequisiteSkillsStudy: [],
    armorClass: armorClassEmpty,
    armorType: [],
    weaponType: [],
    schools: [],
    classPc: [],
    items: [],
    text: '',
    specialAttacks: emptySpecialAttacks
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
            modifiers: null,
            raceFeats: []
        },
        subRacesName: '',
        avatarUrl: '',
        modifiers: null,
        subRaceFeats: [],
        levelAdjustment: 0,
        size: {
            id:0,
            size: '',
            modifiers: null
        },
        availableRegions: []
    },
    archetypes: [],
    abilitys: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    },
    
    skillsCharacter: [],
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
