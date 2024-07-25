import { feat } from "./Feats/Interface/FeatInterface";

export type CharacterPc = {
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
  skillsList: SkillProps[];
  featsList: feat[];
  levelFeatsList: feat[];
  items: Item[];
  inventoryId: number;
  inventory: Inventory;
  attacksId: number;
  attacks: Attacks;
  magicPerDay: MagicClass;
  magicKnown: MagicClass;
  books: Book[];
  levelAdjustment: number;
  effectiveCharacterLv: number;
  experience: number;
  treasure: number;
}

export type Monster = {
  id: number;
  characterName: string;
  classPcList: MonsterClass[];
  size: string;
  race: string;
  subRace: string;
  speed: number;
  initiative: number,
  armorClass: armorClass;
  attacks: MonsterAttack[];
  savingThrows: savingThrows;
  abilitys: Abilitys;
  skillsList: MonsterSkill[];
  featsList: string[];
  items: string[];
  spellResistence: number;
  effectiveCharacterLv: number;
}

export type MonsterAttack = {
  attack: number[], weapon: string, damage: string, critic: string
}

export type MonsterClass = {
  lv: number;
  hd: number;
}

export type MonsterSkill = {
  sk: string,
  pnt: number
}

export interface character {
  characterId: number;
  characterName: string;
  playerName: string;
}

export type ClassPc = {
  id: number;
  classType: number;
  className: number;
  level: number;
}

export type MagicClass = {
  [key: string]: number[]
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

export type AbilitysFromChar = {
  abilitys: Abilitys
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

export type OneSkill = {
  skill: SkillProps
}

export type OneSkillProps = {
  indexSkill: number
  skill: SkillProps
  indexStudy: number | null
  study: Study | null
  maxSkillsPoints: number
  spentSkillPnts: number
  maxToSpentPoints: number
  updateRank: (indexSkill: number, indexStudy: number | null, newRank: number) => void;
}

export type ShowOneSkillProps = {
  indexSkill: number
  skill: SkillProps
  indexStudy: number | null
  study: Study | null
}

export type Study = {
  idStudy: number,
  idSkill: number,
  study: string,
  rank: number,
}

export type OneStudy = {
  study: Study
  skillAbility: number
  skillBonus: number
}

export type AddStudy = {
  idSkill: number,
  study: string
}

// export type OneStudyProps = {
//   study: Study
//   skillAbility: number
//   skillBonus: number
//   maxSkillsPoints: number
//   spentSkillPnts: number
//   maxToSpentPoints: number
//   updateRank: (newRank: number) => void;
// }

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
  enchantment?: Enchantment;
  material: string | null
}

export interface Shield extends Item {
  shieldName: string;
  armorClass: number;
  armorType: string;
  maxDex: number;
  penality: number;
  failure: number;
  enchantment?: Enchantment;
  material: string | null
}

export interface Weapon extends Item {
  weaponName: string;
  damage: string;
  critical: string;
  range: number;
  type: string[];
  specialAttacks: string | null;
  enchantment?: Enchantment;
  material: string | null
}

export interface WonderousItem extends Item { }

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
}

export type Attacks = {
  firstAttackSetOne: Weapon,
  secondAttackSetOne: Weapon,
  additionalAttackSetOne: Weapon,
  firstAttackSetTwo: Weapon,
  secondAttackSetTwo: Weapon,
  additionalAttackSetTwo: Weapon
}

export type ArmorWeaponToBuy = {
  item: Armor | Shield | Weapon,
  items: Item[],
  type: string,
  text: string,
  buyItem: (
    newItem: Armor | Shield | Weapon,
    type: string) => void;
  sellItem: (
    newItem: Armor | Shield | Weapon,
    type: string) => void;
}

export type ItemToBuy = {
  item: Armor | Shield | Weapon | WonderousItem,
  items: Armor[] | Shield[] | Weapon[] | WonderousItem[],
  type: string,
  text: string,
  buyItem: (
    newItem: Item,
    type: string) => void;
  sellItem: (
    newItem: Item,
    type: string) => void;
}

export type Rings = {
  item: WonderousItem[],
  items: WonderousItem[],
  type: string,
  text: string,
  buyItem: (
    newItem: Item,
    type: string) => void;
  sellItem: (
    newItem: Item,
    type: string) => void;
}

export type ItemToChange = {
  list: ItemsList,
  createNew: (
    newItem: Item) => void;
}

export type CharAttack = {
  inventory: Weapon[],
  attacks: Attacks,
  bab: number,
  ability: Abilitys,
  setListOfAttack: (
    newAttacks: Attacks
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
  list: Weapon[],
  where: string,
  selectWeapon: (
    newWeapon: Weapon,
    where: string
  ) => void
}

export type SelectOffWeapon = {
  indexOne: number,
  list: Weapon[],
  where: string,
  selectWeapon: (
    newWeapon: Weapon,
    where: string
  ) => void
}

export type ArmorInCharacter = {
  charArmor: armorClass,
  charInventory: Inventory
}

export type SignAndNumber = {
  sign: string,
  number: number
}

export type Enchantment = {
  id: number, enchantment: number
}

export type SpellLevel = {
  level: number,
  classDomain: string
}

export type Spell = {
  id: number,
  name: string,
  school: string[],
  level: SpellLevel[] | null,
  components: string[] | null,
  castingTime: string | null,
  range: string | null,
  target: string | null,
  area: string | null,
  effect: string | null,
  duration: string | null,
  savingThrow: string | null,
  spellResistance: string | null,
  descriptiveText: string | null
}

export type SpellsList = {
  list: Spell[],
  lvSpell: number,
  pgClass: string
  selectSpell: (
    newSpell: Spell
  ) => void
}

export type Book = {
  caster: string,
  level: number,
  spells: Spell[]
}

export type BooksFromChar = {
  books: Book[]
}