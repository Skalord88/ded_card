export interface characterPc {
    id: number,
    characterName: string,
    playerName: string,
    classPcList: classPc[],
    size: string,
    race: string,
    subRace: string,
    vitality: vitality,
    speed: number,
    armorClass: armorClass,
    bab: number,
    specialAttacks: specialAttacks,
    savingThrows: savingThrows,
    abilitys: abilitys,
    skillPoints: number,
    skillsList: skill[],
    featsList: feat[],
    items: [],
    magicPerDay: {},
    magicKnown: {},
    spellsKnown: [],
    levelAdjustment: number,
    effectiveCharacterLv: number
}

export interface character {
    characterId: number,
    characterName: string,
    playerName: string
}

export interface classPc {
    id: number,
    className: number,
    level: number
}

export interface vitality {
    life: number,
    hitDices: {
        key: number,
        value: number
    },
    hitPoints: number
}

export interface specialAttacks {
    bullRush: number,
    charge: number,
    disarm: number,
    grapple: number,
    overrun: number,
    sunder: number
}

export interface armorClass {
    dextrityBonus: number,
    sizeBonus: number,
    armorBonus: number,
    shildBonus: number,
    enhancementBonuses: number,
    deflectionBonuses: number,
    naturalArmor: number,
    dodgeBonus: number
}

export interface savingThrows {
    fortitude: number,
    reflex: number,
    will: number
}

export interface abilitys {
    streght: number,
    dextrity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number
}

export type skill = {
    idSkill: number,
    nameSkill: string,
    fieldOfStudy: {
        key: string,
        value: number
    },
    classSkill: boolean,
    skillRank: number,
    skillAbility: number,
    skillBonus: number
}

export interface skillToServer {
    idSkill: number,
    skillRank: number
}

export interface feat {
    characterFeatName: string,
    characterFeatSpecial: string,
    characterFeatDescription: string
}

export interface races {
    raceName: string,
    avatarRaceUrl: string,
    subRaces: subRaces[]
}

export type subRaces = {
    id: number,
    subRacesName: string,
    avatarUrl: string,
    raceAbilitys: abilitys,
    raceSkills: skill[],
    armorClass: armorClass,
    levelAdjustment: number
}

export type serverSkill = {
    idSkill : number,
    skillRank : number
}

export type fieldOfStudy = {
    key: string,
    value: number
}