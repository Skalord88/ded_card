import { useState } from "react";
import { DropdownComponent } from "../../DropDown/DropDown";
import { EnchantedName } from "../../Enchantment/Functions/EnchantmentFunctions";
import { addToDrop } from "../../functions";
import { Armor, ArmorWeaponToBuy, Shield, Weapon } from "../../interfaces";
import "../../../css/style.css";

export const BuyEnchantedItemInventory: React.FC<ArmorWeaponToBuy> = ({
  item,
  items,
  text,
  type,
  buyItem,
  sellItem
}) => {
  const [selected, setSelected] = useState<Armor | Shield | Weapon>(item);
  const selectItem = (option: Armor | Shield | Weapon) => {
    buyItem(option, option.itemType);
    setSelected(option);
  };
  const deselect = (option: Armor | Shield | Weapon) => {
    sellItem(option, option.itemType);
  };

  const listOfItems = addToDrop(items, "items");

  return (
    <>
      {selected ? (
        <>
          <div
            className="rpgui-container-framed-grey"
            style={{ display: "grid" }}
          >
            <div>
              <p>{text}</p>
            </div>
            <div>
              <p onClick={() => deselect(selected as any)}>
                {EnchantedName(selected)}
              </p>
            </div>
            <div style={{ gridRow: 2, gridColumn: 2 }}>
              <DropdownComponent options={listOfItems} onAction={selectItem} />
            </div>
            {type === "armor" ? (
              <div style={{ gridRow: 2 }} className="rpgui-icon armor"></div>
            ) : (
              type === "shield"? (<div style={{ gridRow: 2 }} className="rpgui-icon shield"></div>

              ) : (
              <div style={{ gridRow: 2 }} className="rpgui-icon sword"></div>)
              
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
