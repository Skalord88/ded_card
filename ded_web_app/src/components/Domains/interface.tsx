import { Spell } from "../interfaces";

export type Domains = {
    id: number;
    domain: string;
    grantedPower: string;
    domainSpells: DomainSpell[]
}

export type DomainSpell = {
    spell: Spell;
    level: number;
}