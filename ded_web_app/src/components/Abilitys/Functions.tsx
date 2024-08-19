import { Abilitys } from "../interfaces";

export function AbilityAbbreviation(ability: string): string {
    switch(ability){
        case 'STRENGHT': return 'STR';
        case 'DEXTERITY': return 'DEX';
        case 'CONSTITUTION': return 'COS';
        case 'INTELLIGENCE': return 'INT';
        case 'WISDOM': return 'WIS';
        case 'CHARISMA': return 'CHA';
        default: return '';}
}

export function BonusAbilities(ab: Abilitys, which: string) {
    switch (which) {
        case 'STR': return Math.floor((ab.strength - 10) / 2);
        case 'DEX': return Math.floor((ab.dextrity - 10) / 2);
        case 'COS': return Math.floor((ab.constitution - 10) / 2);
        case 'INT': return Math.floor((ab.intelligence - 10) / 2);
        case 'WIS': return Math.floor((ab.wisdom - 10) / 2);
        case 'CHA': return Math.floor((ab.charisma - 10) / 2);
        default: return 0;
    }
}

