import {  abilitys, subRaces, armorClass, serverSkill, characterPc, Study, AddStudy, Armor, Weapon, WonderousItem, Shild, Inventory } from '../components/interfaces'

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
        shildBonus: 0,
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
    skillsList: {skills: []},
    featsList: [],
    levelFeatsList: [],
    items: [],
    magicPerDay: {},
    magicKnown: {},
    spellsKnown: [],
    levelAdjustment: 0,
    effectiveCharacterLv: 0,
    experience: 0,
    treasure: 0

}

export const abilitysEmpty: abilitys = {

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
    shildBonus: 0,
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
    idSkill : 0,
    skillRank : -1
}

export const studyEmpty: AddStudy = {
    idSkill : 0,
    study: ""
}

export const noneArmor: Armor = {
    id: 0,
    name: "none",
    cost: 0,
    weight: 0,
    description: "no armor",
    itemType: "none",
    armorName: "none",
    armorClass: 0,
    armorType: "none",
    maxDex: 100,
    penality: 0,
    failure: 0
  }

  export const noneShild: Shild = {
    id: 0,
    name: "none",
    cost: 0,
    weight: 0,
    description: "no armor",
    itemType: "none",
    shildName: "none",
    armorClass: 0,
    armorType: "none",
    maxDex: 100,
    penality: 0,
    failure: 0
  }

  export const noneWeapon: Weapon = {
    id: 0,
    name: "none",
    cost: 0,
    weight: 0,
    description: "no armor",
    itemType: "none",
    damage: "none",
    critical: "none",
    range: 0,
    type: [],
    specialAttacks: "none"
  }

  export const noneItem: WonderousItem = {
      id: 0,
      name: 'none',
      cost: 0,
      weight: 0,
      description: 'no item',
      itemType: 'none'
  }

  export const emptyInventory: Inventory = {
    armor: noneArmor,
    shild: noneShild,
    weaponOne: noneWeapon,
    weaponTwo: noneWeapon,
    weaponThree: noneWeapon,
    weaponFour: noneWeapon,
    weaponFive: noneWeapon,
    weaponList: [],
    body: {
      head: noneItem,
      arms: noneItem,
      hands: [noneItem,noneItem],
      neck: noneItem,
      cloth: noneItem,
      legs: noneItem
    },
    backpack: []
  }