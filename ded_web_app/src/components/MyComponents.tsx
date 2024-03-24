import React, { useEffect, useState } from "react";
import {
  Armor,
  CharInventory,
  Inventory,
  Item,
  ItemToBuy,
  Shield,
  Weapon
} from "./interfaces";
import { noneArmor, noneShield, noneWeapon } from "./variables";

export const BuyItemInventory: React.FC<ItemToBuy> = ({
  item,
  type,
  items,
  buyItem,
  sellItem
}) => {
  const selectItem = (i: Item, type: string) => {
    buyItem(i, type);
  };
  const deselect = (i: Item, type: string) => {
    sellItem(i, type);
  };
  return (
    <>
      <div>
        {item.name}
        <button onClick={() => deselect(item, type)}>-</button>
      </div>
      <div>{item.description}</div>
      <div></div>
      <div>
        {items.map((it) => {
          return (
            <div>
              {it.name} {it.cost}
              <button onClick={() => selectItem(it, type)}>+</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const MapOfInventory: React.FC<CharInventory> = ({
  inventory,
  items,
  updateInventory
}) => {
  const [equipment, setEquipment] = useState<Inventory>(inventory);
  const [tresure, setTresure] = useState<number>(0);

  useEffect(() => {
    updateInventory(equipment, tresure);
  }, [equipment, tresure]);

  const handleBuyItem = (e: Item, type: string) => {
    
    if (type === "armor") {
      // setTresure(+ equipment.armor.cost - e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        armor: e as Armor
      }))
    }
    if (type === "shield") {
      console.log(e)
      // setTresure(tresure + equipment.shield.cost - e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        shield: e as Shield
      }))
    }
    if (type === "one") {
      // setTresure(+ equipment.weaponOne.cost - e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponOne: e as Weapon
      }))
    }
    if (type === "two") {
      // setTresure(+ equipment.weaponTwo.cost - e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponTwo: e as Weapon
      }))
    }
    if (type === "three") {
      // setTresure(+ equipment.weaponThree.cost - e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponThree: e as Weapon
      }))
    }
    if (type === "four") {
      // setTresure(+ equipment.weaponFour.cost - e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponFour: e as Weapon
      }))
    }
    if (type === "five") {
      // setTresure(+ equipment.weaponFive.cost - e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponFive: e as Weapon
      }))
    }
  };
  const handleSellItem = (e: Item, type: string) => {
    if (type === "armor") {

      // setTresure(+e.cost)
      setEquipment(updateInventory => ({
        ...updateInventory,
        armor: noneArmor
      }))
    }

    if (type === "shield") {
      // setTresure(+e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        shield: noneShield
      }))
    }

    if (type === "one") {
      // setTresure(+e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponOne: noneWeapon
      }))
    }

    if (type === "two") {
      // setTresure(+e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponTwo: noneWeapon
      }))
    }

    if (type === "three") {
      // setTresure(+e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponThree: noneWeapon
      }))
    }

    if (type === "four") {
      // setTresure(+e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponFour: noneWeapon
      }))
    }

    if (type === "five") {
      // setTresure(+e.cost);
      setEquipment(updateInventory => ({
        ...updateInventory,
        weaponFive: noneWeapon
      }))
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-item">
          ---Armor:
          <BuyItemInventory
            item={equipment.armor}
            items={items.armorsList}
            type={"armor"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">---Shield:
        <BuyItemInventory
          item={equipment.shield}
          items={items.shieldList}
          type={'shield'}
          buyItem={handleBuyItem}
          sellItem={handleSellItem}
        />
        </div>
      </div>
      <div className="container">
        <div className="container-item">
          ---Weapon I:
          <BuyItemInventory
            item={equipment.weaponOne}
            items={items.weaponsList}
            type={"one"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">
          ---Weapon II:
          <BuyItemInventory
            item={equipment.weaponTwo}
            items={items.weaponsList}
            type={"two"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">
          ---Weapon III:
          <BuyItemInventory
            item={equipment.weaponThree}
            items={items.weaponsList}
            type={"three"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">
          ---Weapon IV:
          <BuyItemInventory
            item={equipment.weaponFour}
            items={items.weaponsList}
            type={"four"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">
          ---Weapon V:
          <BuyItemInventory
            item={equipment.weaponFive}
            items={items.weaponsList}
            type={"five"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
      </div>
      <div className="container">
        <div className="container-item">
          Head:
          <BuyItemInventory
            item={equipment.head}
            items={items.wonderousItems}
            type={"head"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
          </div>
      </div>
    </>
  );
};
