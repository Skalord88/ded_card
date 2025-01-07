import axios from "axios";
import { useCallback, useState } from "react";
import { enchantedName } from "../../Enchantment/Functions/EnchantmentFunctions";
import { ListOfSomething } from "../../List/List";
import { addToDrop } from "../../functions";
import { Armor, ItemsList, Shield, Weapon } from "../../interfaces";
import { urlItemsBuy } from "../../url";

export interface AddedNewItemsProns {
  newItemsList: ItemsList;
}

export const ListOfNewItems: React.FC<AddedNewItemsProns> = ({
  newItemsList
}) => {
  const [listNewItems, setListNewItems] = useState<ItemsList>(newItemsList);

  const remove = useCallback((e: Armor | Shield | Weapon) => {
    setListNewItems((prevItems) => {
      const updatedItems = { ...prevItems };
  
      switch (e.itemType) {
        case "ARMOR":
          updatedItems.armorsList = prevItems.armorsList.filter(item => enchantedName(item) !== enchantedName(e));
          break;
        case "SHIELD":
          updatedItems.shieldList = prevItems.shieldList.filter(item => enchantedName(item) !== enchantedName(e));
          break;
        case "WEAPON":
          updatedItems.weaponsList = prevItems.weaponsList.filter(item => enchantedName(item) !== enchantedName(e));
          break;
        default:
          break;
      }
  
      return updatedItems;
    });
  }, []);

  const createItems = async () => {
    try {
      await axios.post(urlItemsBuy + 'change', listNewItems);
      window.location.reload();
    } catch (error) {
      console.error('Error creating items:', error);
    }
  };

  const hasItems = listNewItems.armorsList.length > 0 ||
    listNewItems.shieldList.length > 0 ||
    listNewItems.weaponsList.length > 0;

  return (
    <>
      <div style={{ display: "flex" }}>
        <ListOfSomething
          items={addToDrop(listNewItems.armorsList, "item")}
          text="New Armors:"
          onSelect={remove}
        />
        <ListOfSomething
          items={addToDrop(listNewItems.shieldList, "item")}
          text="New Shields:"
          onSelect={remove}
        />
        <ListOfSomething
          items={addToDrop(listNewItems.weaponsList, "item")}
          text="New Weapon:"
          onSelect={remove}
        />
      </div>
      {hasItems && (
        <div>
          <button className="rpgui-button" onClick={createItems}>
            <p>addNewItems</p>
          </button>
        </div>
      )}
    </>
  );
};

