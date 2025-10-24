import { ItemToSend } from "../pages/Items";
import { Abilitys } from "./Abilitys/Interface";
import { ArmorClass } from "./Armor/interface/ArmorInterface";
import { ClassPc } from "./ClassPc/Interface/ClassPcLevel";
import { FeatPc } from "./Feats/Interface/FeatInterface";
import { Prerequisite } from "./Prerequisite/interface/Prerequisite";
import { Archetype, SubRace } from "./Race/Interfaces";
import { SkillCharacter, SkillProps } from "./Skills/interface/SkillsInterface";
import { HitDices } from "./Vita/Functions";

export type CharacterPc = {
  id: number;
  characterName: string;
  playerName: string;
  classPcList: ClassPc[];
  race: SubRace;
  archetypes: Archetype[]
  abilitys: Abilitys;
  skillsCharacter: SkillCharacter[];
  featsList: FeatPc[];
  items: Item[];
  inventory: Inventory;
  attacks: Attacks;
  magicPerDay: MagicClass;
  magicKnown: MagicClass;
  books: Book[];
  experience: number;
  treasure: number;
}

export type CharProps = {
  char: CharacterPc;
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
  armorClass: ArmorClass;
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



export type MagicClass = {
  [key: string]: number[]
}

export interface vitality {
  life: number;
  hitDices: HitDices[];
  hitPoints: number;
}

export type SpecialAttacks = {
  bullRush: number;
  charge: number;
  disarm: number;
  grapple: number;
  overrun: number;
  sunder: number;
  vsBullRush: number;
  vsCharge: number;
  vsDisarm: number;
  vsGrapple: number;
  vsOverrun: number;
  vsSunder: number;
  special: string
}

export interface savingThrows {
  fortitude: number;
  reflex: number;
  will: number;
}

export type AbilitysFromChar = {
  abilitys: Abilitys
}

export type FeatsId = {
  id: number
}

export type subRaces = {
  id: number;
  subRacesName: string;
  avatarUrl: string;
  raceAbilitys: Abilitys;
  raceSkills: SkillProps[];
  armorClass: ArmorClass;
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
  id: number | null;
  name: string;
  itemType: string;
  cost: number;
  weight: number;
  description: string;
}

export interface Armor extends Item {
  // public int id;
  // public String name;
  itemId: number | null;
  // public ItemTypeEnum itemType;
  armorName: string;
  modifiers: Prerequisite | null;
  // itemType: string;
  armorType: string;
  // public double cost;
  // public BigDecimal weight;
  maxDex: number;
  penality: number;
  failure: number;
  material?: string;
  // public String description;
  enchantmentBonus?: number;
  enchantment?: Enchantment[]

}

export interface Shield extends Item {
  shieldName: string;
  itemId: number | null;
  modifiers: Prerequisite | null;
  armorType: string;
  // maxDex: number;
  penality: number;
  failure: number;
  material?: string;
  enchantmentBonus?: number;
  enchantment?: Enchantment[]
}

export interface Weapon extends Item {
  itemId: number;
  weaponName: string;
  damage: string;
  critical: string;
  range: number;
  type: string[];
  size: string;
  modifiers: Prerequisite | null;
  specialAttacks?: string;
  material?: string;
  enchantmentBonus?: number;
  enchantment?: Enchantment[]
}

export type EnchantedItem = {
  id: number | null;
  item: Armor | Shield | Weapon
  name?: string
  enchantment?: Enchantment[]
  material?: string
  cost?: number
  enchantmentBonus?: number;
  description?: string
}

export interface WonderousItem extends Item {
  wondrousType: string;
  modifiers: Prerequisite | null;
}

export type Inventory = {
  armor: Armor; // 0
  shield: Shield; // 1
  weaponOne: Weapon; // 2
  weaponTwo: Weapon; // 3
  weaponThree: Weapon; // 4
  weaponFour: Weapon; // 5
  weaponFive: Weapon; // 6
  backpack: WonderousItem[]; // 7
  head: WonderousItem; // 8
  neck: WonderousItem; // 9
  arms: WonderousItem; // 10
  ringOne: WonderousItem; // 11
  ringTwo: WonderousItem; // 12
  cloth: WonderousItem; // 13
  cloak: WonderousItem; // 14
  belt: WonderousItem; // 15
  legs: WonderousItem; // 16

  // hands: WonderousItem[]; // 11
}

export type InventoryOfItemsToSend = {
  backpack : ItemToSend[],
  inventory : ItemToSend[]
}


// export type InventoryToSend = {
//   armor?: ItemToSend;
//   shield?: ItemToSend;
//   weaponOne?: ItemToSend;
//   weaponTwo?: ItemToSend;
//   weaponThree?: ItemToSend;
//   weaponFour?: ItemToSend;
//   weaponFive?: ItemToSend;
//   backpack?: ItemToSend[];
//   head?: ItemToSend;
//   neck?: ItemToSend;
//   arms?: ItemToSend;
//   hands?: ItemToSend[];
//   cloth?: ItemToSend;
//   legs?: ItemToSend;
// }

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
  charArmor: ArmorClass,
  charInventory: Inventory
}

export type SignAndNumber = {
  sign: string,
  number: number
}

export type ModifierBonus = {
  modifier: string,
  bonus: number
}

export type Enchantment = {
  id: number,
  ability: string,
  text: string,
  itemType: string,
  modifiers: Prerequisite | null,
  cost: number
}

export type SpellLevel = {
  level: number,
  classDomain: string
}

export type Spell = {
  id: number,
  name: string,
  school: string | null,
  subschool: string | null,
  descriptor: string | null,
  level: SpellLevel[] | null,
  components: string | null,
  castingTime: string | null,
  targetEffectArea: string | null,
  range: string | null,
  target: string | null,
  area: string | null,
  effect: string | null,
  duration: string | null,
  savingThrow: string | null,
  spellResistance: string | null,
  descriptiveText: string | null
  materialComponent: string | null
  focus: string | null
  xpCost: string | null
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
  knowDay: string,
  spellsBook: (Spell | null)[] | boolean
}

export type BooksFromChar = {
  books: Book[]
}