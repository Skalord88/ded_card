import axios from "axios";
import { useEffect, useState } from "react";
import { EnchantedName, EnchantmentCost } from "../../Enchantment/Functions/EnchantmentFunctions";
import { Armor, ItemsList, Shield, Weapon } from "../../interfaces";
import { urlItemsBuy } from "../../url";

export interface AddedNewItemsProns {
  newItemsList: ItemsList;
}

export const ListOfNewItems: React.FC<AddedNewItemsProns> = ({
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
    
      <div style={{ display: "flex" }}>
      {listNewItems.armorsList.length > 0 ? (
        <>
          <div style={{flex:1}}>
            <p>New Armors:</p>
          {listNewItems.armorsList.map((item) => {
            return (
              <div className="rpgui-list-imp" style={{height:100}} key={item.id}>
                <li onClick={() => remove(item)}>
                  {EnchantedName(item)} {EnchantmentCost([item])}gp
                </li>
              </div>
            );
          })}
          </div>
        </>
      ) : (
        <></>
      )}
      {listNewItems.shieldList.length > 0 ? (
        <>
          <div style={{flex:1}}>
            <p>New Shields:</p>
          {listNewItems.shieldList.map((item) => {
            return (
              <div className="rpgui-list-imp" style={{height:100}} key={item.id}>
                <li onClick={() => remove(item)}>
                {EnchantedName(item)} {EnchantmentCost([item])}gp
                </li>
              </div>
            );
          })}
          </div>
        </>
      ) : (
        <></>
      )}
      {listNewItems.weaponsList.length > 0 ? (
        <>
          <div style={{flex:1}}>
            <p>New Weapon:</p>
          {listNewItems.weaponsList.map((item) => {
            return (
              <div className="rpgui-list-imp" style={{height:100}} key={item.id}>
                <li onClick={() => remove(item)}>
                {EnchantedName(item)} {EnchantmentCost([item])}gp
                </li>
              </div>
            );
          })}
          </div>
        </>
      ) : (
        <></>
      )}
      </div>
      {
        listNewItems.armorsList.length > 0
        || listNewItems.shieldList.length > 0
        || listNewItems.weaponsList.length > 0  ?
        <div>
          <button className="rpgui-button" onClick={createItems}>
            <p>addNewItems</p>
          </button>
        </div>
        :
        <></>
      }
    </>
  );
};
