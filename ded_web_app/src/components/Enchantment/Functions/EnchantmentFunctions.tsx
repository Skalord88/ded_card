import { FormattingText } from "../../Formatting/Function";
import {
  Armor,
  EnchantedItem,
  Enchantment,
  Item,
  Shield,
  Weapon,
  WonderousItem
} from "../../interfaces";

export function SetEnchantemtOnItem(
  enchantment: Enchantment[],
  item: EnchantedItem
): EnchantedItem {
  return {
    ...item,
    enchantment: enchantment
  };
}

export const enchantedName = (
  item: Item | Armor | Shield | Weapon | WonderousItem
): string => {
  return "enchantmentBonus" in item
    ? FormattingText(
        [
          "armorName" in item
            ? item.armorName
            : "shieldName" in item
            ? item.shieldName
            : item.name +
              onlyEnchantedName(item.enchantmentBonus) +
              (item.material ? item.material : "") +
              item.enchantment
            ? item.enchantment?.flatMap((ench) => ench.ability).join(", ")
            : ""
        ].join(" ")
      )
    : item.name;
};

export const onlyEnchantedName = (enchantment: number | undefined): string => {
  if (enchantment) {
    return enchantment > 0
      ? "+" + enchantment
      : enchantment === -1
      ? " pft"
      : "";
  }
  return "";
};

export function costOfEnchant(enchantment: number, type: string): number {
  if (type === "Armor") {
    switch (enchantment) {
      case -1:
        return 150;
      case 1:
        return 1150;
      case 2:
        return 4150;
      case 3:
        return 9150;
      case 4:
        return 16150;
      case 5:
        return 25150;
      case 6:
        return 36150;
      case 7:
        return 49150;
      case 8:
        return 64150;
      case 9:
        return 81150;
      case 10:
        return 100150;
      default:
        return 0;
    }
  }
  if (type === "Weapon") {
    switch (enchantment) {
      case -1:
        return 300;
      case 1:
        return 2300;
      case 2:
        return 8300;
      case 3:
        return 18300;
      case 4:
        return 32300;
      case 5:
        return 50300;
      case 6:
        return 72300;
      case 7:
        return 98300;
      case 8:
        return 128300;
      case 9:
        return 162300;
      case 10:
        return 200300;
      default:
        return 0;
    }
  }
  return 0;
}

export function costOfMaterial(
  material: string,
  type: string,
  weight: number
): number {
  if (material === "ADAMANTINE") {
    switch (type) {
      case "LIGHT_ARMOR":
        return 5000;
      case "MEDIUM_ARMOR":
        return 10000;
      case "HEAVY_ARMOR":
        return 15000;
      case "SHIELD":
        return 2000;
      case "WEAPON":
        return 3000;
      default:
        return 0;
    }
  }
  if (material === "DARKWOOD") {
    return weight * 10;
  }
  if (material === "MITHRAL") {
    switch (type) {
      case "LIGHT_ARMOR":
        return 1000;
      case "MEDIUM_ARMOR":
        return 4000;
      case "HEAVY_ARMOR":
        return 9000;
      case "SHIELD":
        return 1000;
      case "WEAPON":
        return weight * 500;
      default:
        return 0;
    }
  }
  return 0;
}
