import React, { useEffect, useState } from "react";
import {
  Armor,
  Backpack,
  CharInventory,
  Inventory,
  Item,
  ItemToBuy,
  Rings,
  Shield,
  Weapon,
  WonderousItem
} from "./interfaces";
import { noneArmor, noneItem, noneShield, noneWeapon } from "./variables";

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

export const BuyBackpack: React.FC<Backpack> = ({
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
        {item.map((i) => {
          return (
            <>
              <ul>
                {i.name}
                <button onClick={() => deselect(i, type)}>-</button>
                {i.description}
              </ul>
            </>
          );
        })}
      </div>
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

export const BuyRings: React.FC<Rings> = ({
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
        <ul>
          {item[0]?.name}
          <button onClick={() => deselect(item[0], type)}>-</button>
        </ul>
        <ul>
          {item[1]?.name}
          <button onClick={() => deselect(item[1], type)}>-</button>
        </ul>
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
      </div>
    </>
  );
};

export const MapOfInventory: React.FC<CharInventory> = ({
  inventory,
  items,
  actual,
  updateInventory
}) => {
  const [equipment, setEquipment] = useState<Inventory>(inventory);
  const [actualTresure, setActual] = useState<number>(actual);

  useEffect(() => {
    updateInventory(equipment);
  }, [equipment]);

  const handleBuyItem = (e: Item, type: string) => {
    if (actualTresure >= 0) {
      if (type === "armor") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          armor: e as Armor
        }));
      }
      if (type === "shield") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          shield: e as Shield
        }));
      }
      if (type === "one") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          weaponOne: e as Weapon
        }));
      }
      if (type === "two") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          weaponTwo: e as Weapon
        }));
      }
      if (type === "three") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          weaponThree: e as Weapon
        }));
      }
      if (type === "four") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          weaponFour: e as Weapon
        }));
      }
      if (type === "five") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          weaponFive: e as Weapon
        }));
      }
      if (type === "backpack") {
        let zaino = equipment.backpack;
        zaino.push(e as Item);
        setEquipment((updateInventory) => ({
          ...updateInventory,
          backpack: zaino
        }));
      }
      if (type === "head") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          head: e as Item
        }));
      }
      if (type === "neck") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          neck: e as Item
        }));
      }
      if (type === "arms") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          arms: e as Item
        }));
      }
      if (type === "hands") {
        let zaino = equipment.backpack;
        zaino.push(e as Item);
        setEquipment((updateInventory) => ({
          ...updateInventory,
          backpack: zaino
        }));
      }
      if (type === "cloth") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          cloth: e as Item
        }));
      }
      if (type === "legs") {
        setEquipment((updateInventory) => ({
          ...updateInventory,
          legs: e as Item
        }));
      }
    }
  };
  const handleSellItem = (e: Item, type: string) => {
    if (type === "armor") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        armor: noneArmor
      }));
    }

    if (type === "shield") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        shield: noneShield
      }));
    }

    if (type === "one") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        weaponOne: noneWeapon
      }));
    }

    if (type === "two") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        weaponTwo: noneWeapon
      }));
    }

    if (type === "three") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        weaponThree: noneWeapon
      }));
    }

    if (type === "four") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        weaponFour: noneWeapon
      }));
    }

    if (type === "five") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        weaponFive: noneWeapon
      }));
    }

    if (type === "backpack") {
      let zaino = equipment.backpack.filter((item) => item.id !== e.id);

      if (zaino.length === 0 || !zaino) {
        zaino.push(noneItem);
      }

      setEquipment((updateInventory) => ({
        ...updateInventory,
        backpack: zaino as WonderousItem[]
      }));
    }

    if (type === "head") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        head: noneItem
      }));
    }

    if (type === "neck") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        neck: noneItem
      }));
    }

    if (type === "arms") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        arms: noneItem
      }));
    }

    if (type === "hands") {
      let ring = equipment.backpack.filter((item) => item.id !== e.id);

      if (ring.length === 0 || !ring) {
        ring.push(noneItem);
      }

      setEquipment((updateInventory) => ({
        ...updateInventory,
        backpack: ring as WonderousItem[]
      }));
    }
    if (type === "cloth") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        cloth: noneItem
      }));
    }
    if (type === "legs") {
      setEquipment((updateInventory) => ({
        ...updateInventory,
        legs: noneItem
      }));
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
        <div className="container-item">
          ---Shield:
          <BuyItemInventory
            item={equipment.shield}
            items={items.shieldList}
            type={"shield"}
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
          ---Backpack:
          <BuyBackpack
            item={equipment.backpack}
            items={items.wonderousItems}
            type={"backpack"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
          ---Head:
          <BuyItemInventory
            item={equipment.head}
            items={items.wonderousItems}
            type={"head"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
          ---Neck:
          <BuyItemInventory
            item={equipment.neck}
            items={items.wonderousItems}
            type={"neck"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
          ---Arms:
          <BuyItemInventory
            item={equipment.arms}
            items={items.wonderousItems}
            type={"arms"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
          ---Hands:
          <BuyRings
            item={equipment.hands}
            items={items.wonderousItems}
            type={"hands"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
          ---Cloth:
          <BuyItemInventory
            item={equipment.cloth}
            items={items.wonderousItems}
            type={"cloth"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
          ---Legs:
          <BuyItemInventory
            item={equipment.legs}
            items={items.wonderousItems}
            type={"legs"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
      </div>
    </>
  );
};
