import React, { useEffect, useState } from "react";
import {
  Armor,
  Attacks,
  Backpack,
  CharAttack,
  CharBab,
  CharInventory,
  Inventory,
  Item,
  ItemToBuy,
  Rings,
  SelectOffWeapon,
  SelectWeapon,
  Shield,
  Weapon,
  WonderousItem
} from "./interfaces";
import { noneArmor, noneItem, noneShield, noneWeapon } from "./variables";
import {
  AttackIIMelee,
  AttackIIRanged,
  AttackMelee,
  AttackRanged,
  SetSetWeaponListFromDB,
  SetWeaponNotOne,
  WeaponLight,
  WeaponTwoHanded
} from "./functions";

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
            <div key={it.id}>
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
            <div key={it.id}>
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
          <button onClick={() => deselect(item[0], type + "0")}>-</button>
          <div>
            {items.map((it) => {
              return (
                <div key={it.id}>
                  {it.name} {it.cost}
                  <button onClick={() => selectItem(it, type + "0")}>+</button>
                </div>
              );
            })}
          </div>
        </ul>
        <ul>
          {item[1]?.name}
          <button onClick={() => deselect(item[1], type + "1")}>-</button>
          <div>
            {items.map((it) => {
              return (
                <div key={it.id}>
                  {it.name} {it.cost}
                  <button onClick={() => selectItem(it, type + "1")}>+</button>
                </div>
              );
            })}
          </div>
        </ul>
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

export const MapOfAttack: React.FC<CharAttack> = ({
  inventory,
  bab,
  ability,
  setListOfAttack
}) => {
  const [equip, setEquip] = useState<Inventory>(inventory);
  const [attack, setAttack] = useState<Attacks>({
    baseAttackBonus: bab,
    setOne: {
      firstHand: noneWeapon,
      secondHand: noneWeapon,
      additionalWeapon: noneWeapon
    },
    setTwo: {
      firstHand: noneWeapon,
      secondHand: noneWeapon,
      additionalWeapon: noneWeapon
    }
  });
  console.log(equip.characterAttacks);

  const listOfAttacks = () => {
    setListOfAttack(equip.characterAttacks);
  };

  const setAttackInSet = (newWeapon: Weapon, where: string) => {
    let att = { ...attack };
    let attackList = { ...equip };

    switch (where) {
      case "set11":
        att.setOne.firstHand = newWeapon;
        attackList.characterAttacks[0] = newWeapon.id;
        if (WeaponTwoHanded(newWeapon)) attackList.characterAttacks[1] = 1;
        break;
      case "set12":
        att.setOne.secondHand = newWeapon;
        attackList.characterAttacks[1] = newWeapon.id;
        break;
      case "set13":
        att.setOne.additionalWeapon = newWeapon;
        attackList.characterAttacks[2] = newWeapon.id;
        break;
      case "set21":
        att.setTwo.firstHand = newWeapon;
        attackList.characterAttacks[3] = newWeapon.id;
        if (WeaponTwoHanded(newWeapon)) attackList.characterAttacks[4] = 1;
        break;
      case "set22":
        att.setTwo.secondHand = newWeapon;
        attackList.characterAttacks[4] = newWeapon.id;
        break;
      case "set23":
        att.setTwo.additionalWeapon = newWeapon;
        attackList.characterAttacks[5] = newWeapon.id;
        break;
    }
    setAttack(att);
    setEquip(attackList);
  };

  return (
    <>
      <div>
        {equip.characterAttacks ? (
          <>
            <>{equip.characterAttacks.map((id) => "/" + id)}</>
            <button onClick={() => listOfAttacks()}>set Attacks</button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="container-item">
        Set I
        <div className="container">
          <div>
            first hand: {attack.setOne.firstHand.name}
            <MapBab
              weapon={attack.setOne.firstHand}
              bab={attack.baseAttackBonus}
              ability={ability}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.setOne.firstHand),
                light: WeaponLight(attack.setOne.secondHand)
              }}
            />
            <ListOfWeapons
              inventory={equip}
              where={"set11"}
              selectWeapon={setAttackInSet}
            />
          </div>
          <div>
            {WeaponTwoHanded(attack.setOne.firstHand) ? (
              <>second hand: ---</>
            ) : (
              <>second hand: {attack.setOne.secondHand.name}</>
            )}
            <MapBab
              weapon={attack.setOne.secondHand}
              bab={attack.baseAttackBonus}
              ability={ability}
              position={{
                pose: false,
                twoHanded: WeaponTwoHanded(attack.setOne.firstHand),
                light: WeaponLight(attack.setOne.secondHand)
              }}
            />
            {WeaponTwoHanded(attack.setOne.firstHand) ? (
              <></>
            ) : (
              <ListOfOneHandWeapons
                inventory={equip}
                where={"set12"}
                WeaponOne={attack.setOne.firstHand}
                selectWeapon={setAttackInSet}
              />
            )}
          </div>
          <div></div>
          <div>
            additional weapon: {attack.setOne.additionalWeapon.name}
            <MapBab
              bab={attack.baseAttackBonus}
              ability={ability}
              weapon={attack.setOne.additionalWeapon}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.setOne.firstHand),
                light: WeaponLight(attack.setOne.secondHand)
              }}
            />
            <ListOfOneHandWeapons
              inventory={equip}
              where={"set13"}
              WeaponOne={attack.setOne.firstHand}
              selectWeapon={setAttackInSet}
            />
          </div>
        </div>
      </div>
      <div className="container-item">
        Set II
        <div className="container">
          <div>
            first hand: {attack.setTwo.firstHand.name}
            <MapBab
              bab={attack.baseAttackBonus}
              ability={ability}
              weapon={attack.setTwo.firstHand}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.setOne.firstHand),
                light: WeaponLight(attack.setTwo.secondHand)
              }}
            />
            <ListOfWeapons
              inventory={equip}
              where={"set21"}
              selectWeapon={setAttackInSet}
            />
          </div>
          <div>
            {WeaponTwoHanded(attack.setTwo.firstHand) ? (
              <>second hand: ---</>
            ) : (
              <>second hand: {attack.setTwo.secondHand.name}</>
            )}
            <MapBab
              weapon={attack.setTwo.secondHand}
              bab={attack.baseAttackBonus}
              ability={ability}
              position={{
                pose: false,
                twoHanded: WeaponTwoHanded(attack.setTwo.firstHand),
                light: WeaponLight(attack.setTwo.secondHand)
              }}
            />
            {WeaponTwoHanded(attack.setTwo.firstHand) ? (
              <></>
            ) : (
              <ListOfOneHandWeapons
                inventory={equip}
                where={"set22"}
                WeaponOne={attack.setTwo.firstHand}
                selectWeapon={setAttackInSet}
              />
            )}
          </div>
          <div></div>
          <div>
            additional weapon: {attack.setTwo.additionalWeapon.name}
            <MapBab
              bab={attack.baseAttackBonus}
              ability={ability}
              weapon={attack.setTwo.additionalWeapon}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.setOne.firstHand),
                light: WeaponLight(attack.setTwo.secondHand)
              }}
            />
            <ListOfOneHandWeapons
              inventory={equip}
              where={"set23"}
              WeaponOne={attack.setTwo.firstHand}
              selectWeapon={setAttackInSet}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const MapBab: React.FC<CharBab> = ({
  bab,
  ability,
  weapon,
  position
}) => {
  return (
    <>
      {bab > 15 ? (
        <>
          <div className="container-table">
            <div>melee: </div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 10)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 15)}</div>
            <div></div>
            <div>distance: </div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 0)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 5)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 10)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 15)}</div>
            <div></div>
            <div>melee two hands: </div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div>
              {AttackIIMelee(weapon, bab, position, ability, "STR", 10)}
            </div>
            <div>
              {AttackIIMelee(weapon, bab, position, ability, "STR", 15)}
            </div>
            <div></div>
            <div>distance two hands: </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : bab > 10 ? (
        <>
          <div className="container-table">
            <div>melee: </div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 10)}</div>
            <div></div>
            <div></div>
            <div>distance: </div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 0)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 5)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 10)}</div>
            <div></div>
            <div></div>
            <div>melee two hands: </div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div>
              {AttackIIMelee(weapon, bab, position, ability, "STR", 10)}
            </div>
            <div></div>
            <div></div>
            <div>distance two hands: </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : bab > 5 ? (
        <>
          <div className="container-table">
            <div>melee: </div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div>distance: </div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 0)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 5)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div>melee two hands: </div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div>distance two hands: </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <div className="container-table">
            <div>melee: </div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>distance: </div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 0)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>melee two hands: </div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>distance two hands: </div>
            <div>
              {AttackIIRanged(weapon, bab, position, ability, "DEX", 0)}
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
};

export const ListOfWeapons: React.FC<SelectWeapon> = ({
  inventory,
  where,
  selectWeapon
}) => {
  const [selected, setSelected] = useState<Weapon>(noneWeapon);

  const select = (w: Weapon) => {
    setSelected(w);
  };

  useEffect(() => {
    selectWeapon(selected, where);
  }, [selected]);
  return (
    <>
      <div>
        {inventory.weaponOne.name}
        <button onClick={() => select(inventory.weaponOne)}>+</button>
      </div>
      <div>
        {inventory.weaponTwo.name}
        <button onClick={() => select(inventory.weaponTwo)}>+</button>
      </div>
      <div>
        {inventory.weaponThree.name}
        <button onClick={() => select(inventory.weaponThree)}>+</button>
      </div>
      <div>
        {inventory.weaponFour.name}
        <button onClick={() => select(inventory.weaponFour)}>+</button>
      </div>
      <div>
        {inventory.weaponFive.name}
        <button onClick={() => select(inventory.weaponFive)}>+</button>
      </div>
    </>
  );
};

export const ListOfOneHandWeapons: React.FC<SelectOffWeapon> = ({
  inventory,
  where,
  WeaponOne,
  selectWeapon
}) => {
  const [selected, setSelected] = useState<Weapon>(noneWeapon);
  const [listOfWeapons, setListOfWeapons] = useState<Weapon[]>(
    SetWeaponNotOne(SetSetWeaponListFromDB(inventory), WeaponOne.id)
  );

  const select = (w: Weapon) => {
    setSelected(w);
  };

  useEffect(() => {
    selectWeapon(selected, where);
  }, [selected]);

  return listOfWeapons ? (
    <>
      {listOfWeapons.map((w) =>
        w.id !== WeaponOne.id && !WeaponTwoHanded(w) ? (
          <div>
            {w.name}
            <button onClick={() => select(w)}>+</button>
          </div>
        ) : (
          <></>
        )
      )}
    </>
  ) : (
    <></>
  );
};
