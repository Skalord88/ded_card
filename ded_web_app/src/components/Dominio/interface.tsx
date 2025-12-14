import { Spell } from "../interfaces";

export type Dominio = {
    id: number;
    domain: string;
    grantedPower: string;
    domainSpells: DomainSpell[]
}

export type DomainSpell = {
    spell: Spell;
    level: number;
}