import { Armor, Enchantment, Shield, Weapon, WonderousItem } from "../../interfaces";

export function SetEnchantemtOnItem(
  enchantment: Enchantment,
  item: Armor | Shield | Weapon
): Armor | Shield | Weapon {
  return {
    ...item,
    enchantment: enchantment
  };
}

export function FilterZeroEnchantment(
  list: (Armor | Shield | Weapon)[]
): (Armor | Shield | Weapon)[] {
  return list.filter(item => item.enchantment && item.enchantment?.id === 0)
}

export function EnchantedName(item: Armor | Shield | Weapon ): string {
  let itemName: string = item.name;
  if (item) {
    if (item.enchantment) {
      if (item.enchantment.enchantment < 0) {
        return "pft " + itemName;
      } else if (item.enchantment.enchantment > 0) {
        return itemName + "+" + item.enchantment.enchantment;
      }
    }
  }
  return itemName;
}

export function OnlyEnchantedName(enchantment: number): string {
  if (enchantment < 0) {
    return "pft";
  } else if (enchantment === 0) {
    return "-";
  }
  return "+" + enchantment;
}

export function CostOfEnchant(enchantment: number, type: string): number {
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
      default:
        return 0;
    }
  }
  if (type === "Weapn") {
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
      default:
        return 0;
    }
  }
  return 0;
}

export function EnchantmentCost(items: (Armor | Shield | Weapon)[]): number {
  let total: number = 0;
  items.forEach((item) => {
    if (item.cost && item.enchantment) {
      if (item.itemType === "ARMOR" || item.itemType === "SHIELD") {
        total +=
          item.cost + CostOfEnchant(item.enchantment.enchantment, "Armor");
      } else {
        total +=
          item.cost + CostOfEnchant(item.enchantment.enchantment, "Weapn");
      }
    } else {
      total += item.cost;
    }
  });
  return total;
}
