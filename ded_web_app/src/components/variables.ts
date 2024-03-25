import { AddStudy, Armor, Attacks, Inventory, Shield, Weapon, WonderousItem, Abilitys, armorClass, characterPc, serverSkill, subRaces } from '../components/interfaces'

export const noneArmor: Armor = {
    id: 2,
    name: "No Armor",
    cost: 0,
    weight: 0,
    description: "Naked",
    itemType: "ARMOR",
    armorName: "NO_ARMOR",
    armorClass: 0,
    armorType: "NO_ARMOR",
    maxDex: 100,
    penality: 0,
    failure: 0
}

export const noneShield: Shield = {
    id: 3,
    name: "No Shield",
    cost: 0,
    weight: 0,
    description: "Naked",
    itemType: "SHIELD",
    shieldName: "NO_SHIELD",
    armorClass: 0,
    armorType: "SHIELD",
    maxDex: 100,
    penality: 0,
    failure: 0
}

export const noneWeapon: Weapon = {
    id: 1,
    name: "Unarmed strike",
    itemType: "WEAPON",
    weaponName: "UNARMED_STRIKE",
    cost: 0,
    weight: 0,
    description: "A Medium character deals 1d3 points of nonlethal damage with an unarmed strike. A Small character deals 1d2 points of nonlethal damage. A monk or any character with the Improved Unarmed Strike feat can deal lethal or nonlethal damage with unarmed strikes, at her option. The damage from an unarmed strike is considered weapon damage for the purposes of effects that give you a bonus on weapon damage rolls. An unarmed strike is always considered a light weapon. Therefore, you can use the Weapon Finesse feat to apply your Dexterity modifier instead of your Strength modifier to attack rolls with an unarmed strike.",
    damage: "D3",
    critical: "X2",
    range: 0,
    type: ['BLUDGEONING','SIMPLE','UNARMED'],
    specialAttacks: ''
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

export const characterEmpty: characterPc = {

    id: 0,
    characterName: '',
    playerName: '',
    classPcList: [],
    size: '',
    race: '',
    subRace: '',
    vitality: {
        life: 0,
        hitDices: {
            key: 0,
            value: 0
        },
        hitPoints: 0
    },
    speed: 0,
    armorClass: {
        dextrityBonus: 0,
        sizeBonus: 0,
        armorBonus: 0,
        shieldBonus: 0,
        enhancementBonuses: 0,
        deflectionBonuses: 0,
        naturalArmor: 0,
        dodgeBonus: 0
    },
    bab: 0,
    specialAttacks: {
        bullRush: 0,
        charge: 0,
        disarm: 0,
        grapple: 0,
        overrun: 0,
        sunder: 0
    },
    savingThrows: {
        fortitude: 0,
        reflex: 0,
        will: 0
    },
    abilitys: {
        streght: 0,
        dextrity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    },
    skillPoints: 0,
    skillsList: { skills: [] },
    featsList: [],
    levelFeatsList: [],
    items: [],
    inventoryId: 0,
    inventory: emptyInventory,
    magicPerDay: {},
    magicKnown: {},
    spellsKnown: [],
    levelAdjustment: 0,
    effectiveCharacterLv: 0,
    experience: 0,
    treasure: 0

}

export const abilitysEmpty: Abilitys = {

    streght: 10,
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

export const emptySubRaces: subRaces = {
    id: 0,
    subRacesName: '',
    avatarUrl: '',
    raceAbilitys: abilitysEmpty,
    raceSkills: [],
    armorClass: armorClassEmpty,
    levelAdjustment: 0
}

export const skillEmpty: serverSkill = {
    skillDTO: [],
    skillRank: -1
}

export const studyEmpty: AddStudy = {
    idSkill: 0,
    study: ""
}

export const emptyItemsList = {
    armorsList: [],
    shieldList: [],
    weaponsList: [],
    wonderousItems: []
}

export const emptyAttack: Attacks = {
    baseAttackBonus: 0,
    setOne: {
        firstHand: noneWeapon,
        secondHand: noneWeapon,
        additionalWeapon: noneWeapon
    },
    setTwo: {
        firstHand: noneWeapon,
        secondHand: noneWeapon,
        additionalWeapon: noneWeapon
    }
}



