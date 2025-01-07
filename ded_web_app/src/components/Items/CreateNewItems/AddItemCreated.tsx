import { useCallback, useState } from "react";
import { enchantedName } from "../../Enchantment/Functions/EnchantmentFunctions";
import { Armor, ItemsList, Shield, Weapon } from "../../interfaces";
import { emptyItemsList } from "../../variables";
import { ListOfNewItems } from "./ListOfNewItems";

export interface AddItemCreatedProps {
  item: Armor | Shield | Weapon;
}

export const AddItemCreated: React.FC<AddItemCreatedProps> = ({ item }) => {
  const [newItems, setNewItems] = useState<ItemsList>(emptyItemsList);

  const createItems = useCallback((e: Armor | Shield | Weapon) => {
    setNewItems((prevItems) => {
      const updatedItems = { ...prevItems };
  
      const itemExists: boolean = 
        updatedItems.armorsList.some(item => enchantedName(item) === enchantedName(e)) ||
        updatedItems.shieldList.some(item => enchantedName(item) === enchantedName(e)) ||
        updatedItems.weaponsList.some(item => enchantedName(item) === enchantedName(e));
  
      if (itemExists) return updatedItems;
  
      switch (e.itemType) {
        case "ARMOR":
          updatedItems.armorsList.push(e as Armor);
          break;
        case "SHIELD":
          updatedItems.shieldList.push(e as Shield);
          break;
        case "WEAPON":
          updatedItems.weaponsList.push(e as Weapon);
          break;
        default:
          break;
      }
  
      return updatedItems;
    });
  }, []);

  return (
    <>
      <button className="rpgui-button" onClick={() => createItems(item)}>
        <p>abb</p>
      </button>
      
        <ListOfNewItems newItemsList={newItems} />
        
    </>
  );
};
