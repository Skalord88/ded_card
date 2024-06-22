import { useEffect, useState } from "react";
import { EnchantedName, EnchantmentCost } from "./functions";
import { Armor, ItemsList, Shield, Weapon } from "./interfaces";
import { urlItemsBuy } from "./url";
import axios from "axios";

export interface AddedNewItemsProns {
  newItemsList: ItemsList;
}

export const AddedNewItems: React.FC<AddedNewItemsProns> = ({
  newItemsList
}) => {
  const [listNewItems, setListNewItems] = useState<ItemsList>(newItemsList);

  const remove = (e: Armor | Shield | Weapon) => {
    setListNewItems((prevItems) => {
    const updatedItems = { ...prevItems };

    if (e.itemType === "ARMOR")
      updatedItems.armorsList = listNewItems.armorsList.filter((item) => {
        return item.armorName !== e.name && item.enchantment !== e.enchantment;
      });
    if (e.itemType === "SHIELD")
      updatedItems.shieldList = listNewItems.shieldList.filter((item) => {
        return item.shieldName !== e.name && item.enchantment !== e.enchantment;
      });
    if (e.itemType === "WEAPON")
      updatedItems.weaponsList = listNewItems.weaponsList.filter((item) => {
        return item.weaponName !== e.name && item.enchantment !== e.enchantment;
      });

    return updatedItems;
    })
  };

  const createItems = () => {
    axios.post(urlItemsBuy + "change", listNewItems);
  window.location.reload();
  };

  useEffect(() => {
    setListNewItems(listNewItems)
  },[listNewItems])

  return (
    <>
      {listNewItems.armorsList.length > 0 ? (
        <>
          {listNewItems.armorsList.map((item) => {
            return (
              <div key={item.id}>
                <p onClick={() => remove(item)}>
                  {EnchantedName(item)} {EnchantmentCost([item])} gp
                </p>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
      {listNewItems.shieldList.length > 0 ? (
        <>
          {listNewItems.shieldList.map((item) => {
            return (
              <div key={item.id}>
                <p onClick={() => remove(item)}>
                  {EnchantedName(item)} {EnchantmentCost([item])} gp
                </p>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
      {listNewItems.weaponsList.length > 0 ? (
        <>
          {listNewItems.weaponsList.map((item) => {
            return (
              <div key={item.id}>
                <p onClick={() => remove(item)}>
                  {EnchantedName(item)} {EnchantmentCost([item])} gp
                </p>
              </div>
            );
          })}
        </>
      ) : (
        <></>
      )}
      {
        listNewItems.armorsList.length > 0
        || listNewItems.shieldList.length > 0
        || listNewItems.weaponsList.length > 0  ?
        <div><button onClick={createItems}>addNewItems</button></div>
        :
        <></>
      }
      
    </>
  );
};
