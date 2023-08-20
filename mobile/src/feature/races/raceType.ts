export interface IListOfRaces{
    item: {
        raceName: string,
        avatarRaceUrl: string,
        subRaces: Array<ISubRace>
    }
}

export interface ISubRace {
    item:{
        id: number,
        subRacesName: string,
        avatarUrl: string,
        raceAbilitys: null | Array<IRaceAbilitys>,
        raceSkills: null | Array<IRaceSkills>,
        armorClass: null | Array<IArmorClass>,
        levelAdjustment: number
    }
}

export interface IRaceAbilitys {
    item:{
        streght: number,
        dextrity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number
    }
}

export interface IRaceSkills {
    nameSkill: string,
    skillRank: number
}

export interface IArmorClass {
    sizeBonus: number,
    armorBonus: number,
    shildBonus: number,
    enhancementBonuses: number,
    deflectionBonuses: number,
    naturalArmor: number,
    dodgeBonus: number
}