export interface characterPc {
  id: number;
  characterName: string;
  playerName: string;
  classPcList: ClassPc[];
  size: string;
  race: string;
  subRace: string;
  vitality: vitality;
  speed: number;
  armorClass: armorClass;
  bab: number;
  specialAttacks: specialAttacks;
  savingThrows: savingThrows;
  abilitys: Abilitys;
  skillPoints: number;
  skillsList: MapOfSkills;
  featsList: feat[];
  levelFeatsList: feat[];
  items: Item[];
  inventoryId: number;
  inventory: Inventory;
  magicPerDay: {};
  magicKnown: {};
  spellsKnown: [];
  levelAdjustment: number;
  effectiveCharacterLv: number;
  experience: number;
  treasure: number;
}

export interface character {
  characterId: number;
  characterName: string;
  playerName: string;
}

export type ClassPc = {
  id: number;
  className: number;
  level: number;
}

export interface vitality {
  life: number;
  hitDices: {
    key: number;
    value: number;
  };
  hitPoints: number;
}

export interface specialAttacks {
  bullRush: number;
  charge: number;
  disarm: number;
  grapple: number;
  overrun: number;
  sunder: number;
}

export interface armorClass {
  dextrityBonus: number;
  sizeBonus: number;
  armorBonus: number;
  shieldBonus: number;
  enhancementBonuses: number;
  deflectionBonuses: number;
  naturalArmor: number;
  dodgeBonus: number;
}

export interface savingThrows {
  fortitude: number;
  reflex: number;
  will: number;
}

export type Abilitys = {
  streght: number;
  dextrity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export type MapStudy = {
  mapStudy: { [name: string]: any };
};

export type SkillProps = {

  idSkill: number,
  nameSkill: string,
  fieldOfStudy: Study[],
  classSkill: boolean,
  skillRank: number,
  skillAbility: number,
  skillBonus: number,

}

export type Study = {
  idStudy: number,
  idSkill: number,
  study: string,
  rank: number,
}

export type AddStudy = {
  idSkill: number,
  study: string
}

export type MapOfSkills = {
  skills: SkillProps[];
}

export type StudyUp = {
  idSkill: number, idStudy: number
}

export type MapUpdateSkills = {
  skills: SkillProps[];
  studyAdd: StudyUp;
  studyDel: StudyUp;
  onRankAdd: (
    newStudy: StudyUp) => void;
  onRankDel: (
    newStudy: StudyUp) => void;
}

export interface skillToServer {
  skillDTO: SkillProps[];
  skillPoints: number;
}

export interface feat {
  characterFeatName: string;
  characterFeatSpecial: string;
  characterFeatDescription: string;
}

export interface serverFeat {
  id: number;
  featName: string;
  featsType: string;
  prerequisite: Prerequisite;
  description: string;
}

export type Prerequisite = {
  ability: Abilitys;
  armorClass: armorClass;
  bab: number;
  classSkills: object;
  feats: string[];
  race: string;
  savingThrow: savingThrows;
}

export type FeatsId = {
  id: number
}

export type ChosenRace = {
  id: number,
  subRacesName: string
}

export interface races {
  raceName: string;
  avatarRaceUrl: string;
  subRaces: subRaces[];
}

export type subRaces = {
  id: number;
  subRacesName: string;
  avatarUrl: string;
  raceAbilitys: Abilitys;
  raceSkills: SkillProps[];
  armorClass: armorClass;
  levelAdjustment: number;
};

export type serverSkill = {
  skillDTO: SkillProps[];
  skillRank: number;
};

export type ItemsList = {
  armorsList: Armor[];
  shieldList: Shield[];
  weaponsList: Weapon[];
  wonderousItems: WonderousItem[];
}

export type Item = {
  id: number;
  name: string;
  cost: number;
  weight: number;
  description: string;
  itemType: string;
}

export interface Armor extends Item {
  armorName: string;
  armorClass: number;
  armorType: string;
  maxDex: number;
  penality: number;
  failure: number;
}

export interface Shield extends Item {
  shieldName: string;
  armorClass: number;
  armorType: string;
  maxDex: number;
  penality: number;
  failure: number;
}

export interface Weapon extends Item {
  weaponName: string;
  damage: string;
  critical: string;
  range: number;
  type: string[];
  specialAttacks: string;
}

export interface WonderousItem extends Item {}

export type Inventory = {
  armor: Armor;
  shield: Shield;
  weaponOne: Weapon;
  weaponTwo: Weapon;
  weaponThree: Weapon;
  weaponFour: Weapon;
  weaponFive: Weapon;
  backpack: Item[];
  head: WonderousItem;
  neck: WonderousItem;
  arms: WonderousItem;
  hands: Item[];
  cloth: WonderousItem;
  legs: WonderousItem;
  characterAttacks: number[];
}

export type AttacksList = {
  characterAttacks: number[]
}

export type Attacks = {
  baseAttackBonus: number,
  setOne: {
    firstHand: Weapon,
    secondHand: Weapon,
    additionalWeapon: Weapon
  },
  setTwo: {
    firstHand: Weapon,
    secondHand: Weapon,
    additionalWeapon: Weapon  
  }
}

export type CharInventory = {
  inventory: Inventory
  items: ItemsList
  actual: number
  updateInventory: (
    newInventory: Inventory,
    ) => void;
}

export type ItemToBuy = {
  item: Item,
  items: Item[],
  type: string,
  buyItem: (
    newItem: Item,
    type: string ) => void;
  sellItem: (
    newItem: Item,
    type: string ) => void;
}

export type Rings = {
  item: Item[],
  items: Item[],
  type: string,
  buyItem: (
    newItem: Item,
    type: string ) => void;
  sellItem: (
    newItem: Item,
    type: string ) => void;
}

export type Backpack = {
  item: Item[],
  items: Item[],
  type: string,
  buyItem: (
    newItem: Item,
    type: string ) => void;
  sellItem: (
    newItem: Item,
    type: string ) => void;
}

export type CharAttack = {
  inventory: Inventory,
  bab: number,
  ability: Abilitys,
  weapons: Weapon[],
  setListOfAttack: (
    newList: number[]
  ) => void
}

export type CharBab = {
  bab: number,
  ability: Abilitys,
  weapon: Weapon,
  position: Position
}

export type Position = {
  pose: boolean,
  twoHanded: boolean,
  light: boolean
}

export type SelectWeapon = {
  inventory: Inventory,
  where: string,
  selectWeapon: (
    newWeapon: Weapon,
    where: string
  ) => void
}