import { useState } from "react";
import { DropdownComponent } from "../../DropDown/DropDown";
import {
  EnchantedName,
  EnchantmentCost,
  FilterZeroEnchantment,
  SetEnchantemtOnItem
} from "../../Enchantment/Functions/EnchantmentFunctions";
import { addToDrop, itemInDrop } from "../../functions";
import {
  Armor,
  Enchantment,
  ItemsList,
  Shield,
  Weapon
} from "../../interfaces";
import { enchantItems } from "../../variables";
import { AddItemCreated } from "./AddItemCreated";

export interface CreateNewItemsProps {
  options: ItemsList;
}

export const CreateNewItems: React.FC<CreateNewItemsProps> = ({ options }) => {
  const [selected, setSelected] = useState<itemInDrop[]>([]);
  const [item, setItem] = useState<Armor | Shield | Weapon>();

  const handleFilter = (list: Armor[] | Shield[] | Weapon[]) => {
    setSelected(addToDrop(list, "items"));
  };

  const handleEnchantem = (e: Enchantment) => {
    if (item) setItem(SetEnchantemtOnItem(e, item));
  };

  const filter = [
    { text: "armor", list: FilterZeroEnchantment(options.armorsList) },
    { text: "shield", list: FilterZeroEnchantment(options.shieldList) },
    { text: "weapon", list: FilterZeroEnchantment(options.weaponsList) }
  ];
  const enchantments = addToDrop(enchantItems, "enchant");

  return (
    <>
      <div style={{ display: "grid" }}>
        <div style={{ gridColumn: 1 }}>
          <DropdownComponent
            options={addToDrop(filter, "list")}
            onAction={handleFilter}
          />
        </div>
        <div style={{ gridColumn: "2 / span 1" }}>
          <DropdownComponent options={selected} onAction={setItem} />
        </div>
        <div style={{ gridColumn: 3 }}>
          <DropdownComponent
            options={enchantments}
            onAction={handleEnchantem}
          />
        </div>
        {item ? (
          <>
            <div style={{ gridRow: 2, gridColumn: "1 / span 3" }}>
              <p>
                {EnchantedName(item)} / {EnchantmentCost([item])} gp
              </p>
            </div>
            <div style={{ gridRow: 3, gridColumn: "1 / span 3" }}>
            <AddItemCreated item={item} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
