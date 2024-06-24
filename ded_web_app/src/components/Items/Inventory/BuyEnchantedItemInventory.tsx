import { useState } from "react";
import { DropdownComponent } from "../../DropDown/DropDown";
import { EnchantedName } from "../../Enchantment/Functions/EnchantmentFunctions";
import { addToDrop } from "../../functions";
import { Armor, ArmorWeaponToBuy, Shield, Weapon } from "../../interfaces";
import "../../../css/style.css";
import { Popup } from "../../Popup/Popup";

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
    buyItem(option, type);
    setSelected(option);
  };
  const deselect = (option: Armor | Shield | Weapon) => {
    sellItem(option, type);
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
            <div onClick={() => deselect(selected as any)}>
              <Popup
                text={EnchantedName(selected)}
                popText={selected.description}
              />
            </div>
            <div style={{ gridRow: 2, gridColumn: 2 }}>
              <DropdownComponent options={listOfItems} onAction={selectItem} />
            </div>
            {type === "armor" ? (
              <div style={{ gridRow: 2 }} className="rpgui-icon armor"></div>
            ) : type === "shield" ? (
              <div style={{ gridRow: 2 }} className="rpgui-icon shield"></div>
            ) : (
              <div style={{ gridRow: 2 }} className="rpgui-icon sword"></div>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
