import { useState, useEffect } from "react";
import {
  Inventory,
  Item,
  Armor,
  Shield,
  Weapon,
  WonderousItem,
  ItemsList
} from "../../interfaces";
import { noneArmor, noneShield, noneWeapon, noneItem } from "../../variables";
import { BuyBackpack } from "./BuyBackpack";
import { BuyEnchantedItemInventory } from "./BuyEnchantedItemInventory";
import { BuyItemInventory } from "./BuyItemInventory";
import { BuyRings } from "./BuyRing";
import { FilterNoItem } from "../Functions/Functions";

export type CharInventory = {
  inventory: Inventory;
  items: ItemsList;
  actual: number;
  updateInventory: (newInventory: Inventory) => void;
};

export const MapOfInventory: React.FC<CharInventory> = ({
  inventory,
  items,
  actual,
  updateInventory
}) => {
  const [equipment, setEquipment] = useState<Inventory>(inventory);
  const actualTresure = actual;

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
      if (type === "hands0") {
        let zaino = equipment.hands;
        zaino[0] = e as Item;
        setEquipment((updateInventory) => ({
          ...updateInventory,
          backpack: zaino
        }));
      }
      if (type === "hands1") {
        let zaino = equipment.hands;
        zaino[1] = e as Item;
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
    // console.log(equipment)
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

    if (type === "hands0") {
      let ring = equipment.hands;

      ring[0] = noneItem;

      setEquipment((updateInventory) => ({
        ...updateInventory,
        backpack: ring as WonderousItem[]
      }));
    }
    if (type === "hands1") {
      let ring = equipment.hands;

      ring[1] = noneItem;

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
  // console.log(equipment)
  };

  return (
    <>
      <div
        style={{
          display: "grid"
        }}
      >
        <div style={{ gridRow: 1, gridColumn: 2 }}>
          <BuyItemInventory
            key={"Head"}
            item={equipment.head}
            items={FilterNoItem(items.wonderousItems)}
            type={"head"}
            text={"Head:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 2, gridColumn: 2 }}>
          <BuyItemInventory
            key={"Neck"}
            item={equipment.neck}
            items={FilterNoItem(items.wonderousItems)}
            type={"neck"}
            text={"Neck:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 3, gridColumn: 2 }}>
          <BuyEnchantedItemInventory
            key="Armor"
            item={equipment.armor}
            items={items.armorsList}
            type={"armor"}
            text={"Armor:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 3, gridColumn: 3 }}>
          <BuyEnchantedItemInventory
            key={"Shield"}
            item={equipment.shield}
            items={items.shieldList}
            type={"shield"}
            text={"Shield:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 1, gridColumn: 1 }}>
          <BuyEnchantedItemInventory
            key={"Weapon I"}
            item={equipment.weaponOne}
            items={items.weaponsList}
            type={"one"}
            text={"Weapon I:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 2, gridColumn: 1 }}>
          <BuyEnchantedItemInventory
            key={"Weapon II"}
            item={equipment.weaponTwo}
            items={items.weaponsList}
            type={"two"}
            text={"Weapon II:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 3, gridColumn: 1 }}>
          <BuyEnchantedItemInventory
            key={"Weapon III"}
            item={equipment.weaponThree}
            items={items.weaponsList}
            type={"three"}
            text={"Weapon III:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 4, gridColumn: 1 }}>
          <BuyEnchantedItemInventory
            key={"Weapon IV"}
            item={equipment.weaponFour}
            items={items.weaponsList}
            type={"four"}
            text={"Weapon IV:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 5, gridColumn: 1 }}>
          <BuyEnchantedItemInventory
            key={"Weapon V"}
            item={equipment.weaponFive}
            items={items.weaponsList}
            type={"five"}
            text={"Weapon V:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>

        <div style={{ gridRow: 6, gridColumn: "1 / span 3" }}>
          <BuyBackpack
            key={"Backpack"}
            item={equipment.backpack}
            items={FilterNoItem(items.wonderousItems)}
            type={"backpack"}
            text={"Backpack:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 2, gridColumn: 3 }}>
          <BuyItemInventory
            key={"Arms"}
            item={equipment.arms}
            items={FilterNoItem(items.wonderousItems)}
            type={"arms"}
            text={"Arms:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 4, gridColumn: 3 }}>
          <BuyRings
            key={"Hands"}
            item={equipment.hands}
            items={FilterNoItem(items.wonderousItems)}
            type={"hands"+0}
            text={"Hands:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 5, gridColumn: 3 }}>
          <BuyRings
            key={"Hands"}
            item={equipment.hands}
            items={FilterNoItem(items.wonderousItems)}
            type={"hands"+1}
            text={"Hands:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 4, gridColumn: 2 }}>
          <BuyItemInventory
            key={"Cloth"}
            item={equipment.cloth}
            items={FilterNoItem(items.wonderousItems)}
            type={"cloth"}
            text={"Cloth:"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div style={{ gridRow: 5, gridColumn: 2 }}>
          <BuyItemInventory
            key={"Legs"}
            item={equipment.legs}
            items={FilterNoItem(items.wonderousItems)}
            type={"legs"}
            text="Legs"
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
      </div>
    </>
  );
};
