import { FormattingText } from "../../Formatting/Function";
import {
  Armor,
  EnchantedItem,
  Enchantment,
  Shield,
  Weapon
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

// export function FilterZeroEnchantment(
//   list: (Enchantment)[]
// ): (Enchantment)[] {
//   return list.filter(enchantment => enchantment.id === 0);
// }

export const enchantedName = (item: Armor | Shield | Weapon): string => {
  let itemName: string = item.name;
  if (item) {
    if (item.enchantment) {
      item.enchantment.forEach((ench) =>
        ench.ability !== null
          ? itemName + " " + FormattingText(ench.ability)
          : ""
      );
      // item.enchantment.forEach((ench) => {
      //   if (ench.ability === null && ench.enchantment !== null && ench.enchantment.bonus < 0)
      //     return itemName + " pft";
      //   else if (ench.ability === null && ench.enchantment !== null && ench.enchantment.bonus > 0)
      //     return itemName + " +" + ench.enchantment;
      // });
    }
  }
  return itemName;
}

export const onlyEnchantedName = (enchantment: number): string => {
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

// export function EnchantmentCost(items: Armor | Shield | Weapon): number {
//   let total: number = 0;
//   items.forEach((item) => {
//     if (item.cost && item.enchantmentList) {
//       if (item.item.itemType === "ARMOR" || item.item.itemType === "SHIELD") {
//         total +=
//           item.cost +
//           CostOfEnchant(
//             item.enchantmentList.reduce(
//               (tot, ench) => tot + ench.enchantment,
//               0
//             ),
//             "Armor"
//           );
//       } else {
//         total +=
//           item.cost +
//           CostOfEnchant(
//             item.enchantmentList.reduce(
//               (tot, ench) => tot + ench.enchantment,
//               0
//             ),
//             "Weapn"
//           );
//       }
//     } else {
//       total += item.cost;
//     }
//   });
//   return total;
// }
