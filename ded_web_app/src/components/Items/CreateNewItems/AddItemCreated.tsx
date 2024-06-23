import { useState } from "react";
import { Armor, ItemsList, Shield, Weapon } from "../../interfaces";
import { emptyItemsList } from "../../variables";
import { ListOfNewItems } from "./ListOfNewItems";

export interface AddItemCreatedProps {
  item: Armor | Shield | Weapon;
}

export const AddItemCreated: React.FC<AddItemCreatedProps> = ({ item }) => {
  const [newItems, setNewItems] = useState<ItemsList>(emptyItemsList);

  const createItems = (e: any) => {
    setNewItems((prevItems) => {
      const updatedItems = { ...prevItems };

      if (e.itemType === "ARMOR") updatedItems.armorsList.push(e as Armor);
      if (e.itemType === "SHIELD") updatedItems.shieldList.push(e as Shield);
      if (e.itemType === "WEAPON") updatedItems.weaponsList.push(e as Weapon);

      return updatedItems;
    });
  };

  return (
    <>
    <div style={{ gridRow: 2, gridColumn: 4 }}>
      <button className="rpgui-button" onClick={() => createItems(item)}>
        <p>abb</p>
      </button>
      <br></br>
      </div>
      
        <ListOfNewItems newItemsList={newItems} />
        
    </>
  );
};
