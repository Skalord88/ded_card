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
  materialItem,
  setCostItem
}) => {
  const [cost, setCost] = useState<number>(0);

  useEffect(() => {
    // if (!costItem) return;

    let finalCost = costItem;

    if (materialItem && weightItem) {
      const enchantCosts = enchantmentItem?.flatMap((en) => en.cost) ?? [];
      const enchantBonus = enchantmentBonusItem ?? 0;

      if (itemTypeItem === "WEAPON") {
        finalCost = calculateCost(
          "Weapon",
          costItem?? 0,
          enchantCosts,
          enchantBonus,
          materialItem,
          weightItem,
          itemTypeItem
        );
      } else if (
        ["ARMOR", "SHIELD"].includes(itemTypeItem || "") &&
        armorTypeItem
      ) {
        finalCost = calculateCost(
          "Armor",
          costItem?? 0,
          enchantCosts,
          enchantBonus,
          materialItem,
          weightItem,
          armorTypeItem
        );
      }
    }

    setCost(finalCost?? 0);
    if(setCostItem) setCostItem(finalCost?? 0)
  }, [
    costItem,
    itemTypeItem,
    enchantmentItem,
    enchantmentBonusItem,
    materialItem,
    weightItem,
    armorTypeItem,
  ]);


  return (
    <div>
      <p>
        <span style={{ color: "yellow" }}>{"cost: "}</span>
        {<span>{cost}</span>}
      </p>
    </div>
  );
};
