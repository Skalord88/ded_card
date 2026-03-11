import { Inventory, SignAndNumber } from "../../interfaces";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";

export type ArmorList = {
  signNum: SignAndNumber;
  text: string;
  item: string;
  icon?: string;
}[];

export type ArmorModifiers = {
  size: number;
  armor: number;
  shiled: number;
  dexterity: number;
  natural: number;
  dodge: number;
  deflection: number;
  modifierBonus: ModifierEnum;
};

export type InventoryProps = {
  inventory: Inventory;
};

export type ArmorClass = {
  // sizeBonus: number;
  // armorBonus: number;
  // shieldBonus: number;
  // enhancementBonuses: number;
  // deflectionBonuses: number;
  // naturalArmor: number;
  // dodgeBonus: number;

  bonus: number,

  modifierBonus?: ModifierEnum;

  target: string[],

  special?: string

  
};
