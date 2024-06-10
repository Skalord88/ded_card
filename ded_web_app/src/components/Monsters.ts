import { Monster } from "./interfaces";

export const SzithMorcaneSentryOne: Monster = {
    id: 1,
  characterName: "Szith Morcane Sentry 1",
  classPcList: [{lv:5, hd:10}],
  size: "M",
  race: "elf",
  subRace: "drow",
  speed: 30,
  initiative: 2,
  armorClass: {
    dextrityBonus: 2,
  sizeBonus: 0,
  armorBonus: 5,
  shieldBonus: 2,
  enhancementBonuses: 0,
  deflectionBonuses: 0,
  naturalArmor: 0,
  dodgeBonus: 0,
},
    attacks: [
        {attack: [9], weapon: "rapier+1/dagger*", damage: "1d6+4/1d4+3", critic: "18-20/19-20"},
        {attack: [7], weapon: "hand crossbow*", damage: "1d4", critic: "19-20"}
    ],
  savingThrows: {fortitude: 6, reflex: 4, will: 2},
  abilitys: {
    streght: 16,
  dextrity: 15,
  constitution: 12,
  intelligence: 14,
  wisdom: 10,
  charisma: 10,
  },
  skillsList: [
    {sk: "listen", pnt: 4},
    {sk: "spot", pnt: 4}
],
  featsList: ["Allertnes","Dodge","Mobility","Spring Attack","Stelthy"],
  items: ["mithral shirt+1","bucker+1","rapier+1"],
  spellResistence: 16,
  effectiveCharacterLv: 6
}

export const SzithMorcaneSentryTwo: Monster = {
    id: 2,
  characterName: "Szith Morcane Sentry 2",
  classPcList: [{lv:5, hd:10}],
  size: "M",
  race: "elf",
  subRace: "drow",
  speed: 30,
  initiative: 2,
  armorClass: {
    dextrityBonus: 2,
  sizeBonus: 0,
  armorBonus: 5,
  shieldBonus: 0,
  enhancementBonuses: 0,
  deflectionBonuses: 0,
  naturalArmor: 0,
  dodgeBonus: 0,
},
    attacks: [
        {attack: [10], weapon: "glaive*", damage: "1d10+5", critic: "19-20"},
        {attack: [9], weapon: "short sword*", damage: "1d6+3", critic: "19-20"},
        {attack: [7], weapon: "light crossbow", damage: "1d8", critic: "19-20"}
    ],
  savingThrows: {fortitude: 5, reflex: 3, will: 1},
  abilitys: {
    streght: 16,
  dextrity: 15,
  constitution: 12,
  intelligence: 14,
  wisdom: 10,
  charisma: 10,
  },
  skillsList: [
    {sk: "listen", pnt: 4},
    {sk: "spot", pnt: 2}
],
  featsList: ["Dodge","Mobility","Spring Attack","Weapon Focus(glaive)","Weapon Specialization(glaive)"],
  items: ["mithral breastplate*","bucker+1","rapier+1"],
  spellResistence: 16,
  effectiveCharacterLv: 6
}

export const SzithMorcaneSentryThree: Monster = {
    id: 3,
  characterName: "Szith Morcane Sentry 3",
  classPcList: [{lv:5, hd:10}],
  size: "M",
  race: "elf",
  subRace: "drow",
  speed: 30,
  initiative: 2,
  armorClass: {
    dextrityBonus: 2,
  sizeBonus: 0,
  armorBonus: 5,
  shieldBonus: 0,
  enhancementBonuses: 0,
  deflectionBonuses: 0,
  naturalArmor: 0,
  dodgeBonus: 0,
},
    attacks: [
        {attack: [7], weapon: "short sword", damage: "1d6+2", critic: "19-20"},
        {attack: [10], weapon: "short composite bow[+2]*, arrow+1", damage: "1d8+5", critic: "x3"}
    ],
    savingThrows: {fortitude: 6, reflex: 4, will: 2},
  abilitys: {
    streght: 15,
  dextrity: 16,
  constitution: 12,
  intelligence: 14,
  wisdom: 10,
  charisma: 10,
  },
  skillsList: [
    {sk: "listen", pnt: 4},
    {sk: "spot", pnt: 4}
],
  featsList: ["Allertnes","Point Blanck Shot","Stealthy","Weapon Focus(composite shortbow)","Weapon Specialization(composite shortbow)"],
  items: ["mithral shirt+1","composite shortbow*[+2]","25 arrows+1"],
  spellResistence: 16,
  effectiveCharacterLv: 6
}