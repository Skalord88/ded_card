import { useEffect, useState } from "react";
import { calculateCost } from "../Inventory/function";
import { ItemPartProps } from "../props";

export const ItemCostComponent: React.FC<ItemPartProps> = ({
  costItem,
  itemTypeItem,
  enchantmentItem,
  enchantmentBonusItem,
  weightItem,
  armorTypeItem,
  materialItem
}) => {
  const [cost, setCost] = useState<number>(0);

  useEffect(() => {
    if (costItem) {
      if (materialItem && weightItem) {
        if (
          itemTypeItem &&
          ["ARMOR", "SHIELD"].includes(itemTypeItem) &&
          armorTypeItem
        ) {
          const costo = calculateCost(
            "Armor",
            costItem,
            enchantmentItem?.flatMap((en) => en.cost) ?? [],
            enchantmentBonusItem ?? 0,
            materialItem,
            weightItem,
            armorTypeItem
          );
          setCost(costo);
        }
        if (itemTypeItem && itemTypeItem === "WEAPON") {
          const costo = calculateCost(
            "Weapon",
            costItem,
            enchantmentItem?.flatMap((en) => en.cost) ?? [],
            enchantmentBonusItem ?? 0,
            materialItem,
            weightItem,
            itemTypeItem
          );
          setCost(costo);
        }
      } else {
        const costo = costItem;
        setCost(costo);
      }
    }
  }, [
    armorTypeItem,
    costItem,
    enchantmentBonusItem,
    enchantmentItem,
    itemTypeItem,
    materialItem,
    weightItem
  ]);

  return (
    <div>
      <p>
        <span style={{ color: "yellow" }}>{"cost: "}</span>
        <span>{cost}</span>
      </p>
    </div>
  );
};
