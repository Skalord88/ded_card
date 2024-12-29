import { Inventory, SignAndNumber } from "../../interfaces";

export type ArmorList = {
  signNum: SignAndNumber;
  text: string;
  item: string;
}[];

export type ArmorModifiers = {
  size: number;
  armor: number;
  shiled: number;
  dexterity: number;
  natural: number;
  dodge: number;
  deflection: number;
};

export type InventoryProps = {
  inventory: Inventory;
};

export type ArmorClass = {
  sizeBonus: number;
  armorBonus: number;
  shieldBonus: number;
  enhancementBonuses: number;
  deflectionBonuses: number;
  naturalArmor: number;
  dodgeBonus: number;

  target: string[];

  special?: string;
};
