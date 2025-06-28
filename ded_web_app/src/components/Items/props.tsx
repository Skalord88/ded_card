import { itemInDrop } from "../functions";
import { Armor, Enchantment, Item, Shield, Weapon, WonderousItem } from "../interfaces";

export type ItemPartProps = {
  filtro?: itemInDrop[];
  itemName?: string;
  itemTypeItem?: string;
  materialItem?: string;
  enchantmentBonusItem?: number;
  enchantmentItem?: Enchantment[];
  armorTypeItem?: string;
  costItem?: number;
  weightItem?: number;
  penalityItem?: number;
  failureItem?: number;
  maxDexItem?: number;
  perfectItem?: boolean;
  onAction?: () => void;
  setTheItem?: (item: Item | Armor | Shield | Weapon | WonderousItem) => void;
  setMaterialItem?: (material: string) => void;
  setEnchantmentBonusItem?: (enchantmentBonus: number) => void;
  setEnchantmentItem?: (enchantment: Enchantment[]) => void;
  setCostItem?: (cost: number) => void;
  setArmorTypeItem?: (armorType: string) => void;
};