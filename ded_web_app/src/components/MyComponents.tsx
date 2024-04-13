import React, { useEffect, useState } from "react";
import {
  AbilitysFromChar,
  Armor,
  ArmorInCharacter,
  ArmorWeaponToBuy,
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
  BonusAbilities,
  EnchantedName,
  IndexWeaponOne,
  SignAndCount,
  WeaponLight,
  WeaponTwoHanded
} from "./functions";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

export const AbilitysComponent: React.FC<AbilitysFromChar> = ({ abilitys }) => {
  return (
    <div className="container">
      <div>
        <li>STR: </li>
      </div>
      <div>{abilitys.streght}</div>
      <div>
        {SignAndCount([abilitys.streght]).sign}
        {BonusAbilities(abilitys, "STR")}
      </div>
      <div>
        <li>DEX: </li>
      </div>
      <div>{abilitys.dextrity}</div>
      <div>
        {SignAndCount([abilitys.dextrity]).sign}
        {BonusAbilities(abilitys, "DEX")}
      </div>
      <div>
        <li>COS: </li>
      </div>
      <div>{abilitys.constitution}</div>
      <div>
        {SignAndCount([abilitys.constitution]).sign}
        {BonusAbilities(abilitys, "COS")}
      </div>
      <div>
        <li>INT: </li>
      </div>
      <div>{abilitys.intelligence}</div>
      <div>
        {SignAndCount([abilitys.intelligence]).sign}
        {BonusAbilities(abilitys, "INT")}
      </div>
      <div>
        <li>WIS: </li>
      </div>
      <div>{abilitys.wisdom}</div>
      <div>
        {SignAndCount([abilitys.wisdom]).sign}
        {BonusAbilities(abilitys, "WIS")}
      </div>
      <div>
        <li>CHA: </li>
      </div>
      <div>{abilitys.charisma}</div>
      <div>
        {SignAndCount([abilitys.charisma]).sign}
        {BonusAbilities(abilitys, "CHA")}
      </div>
    </div>
  );
};

export const BuyEnchantedItemInventory: React.FC<ArmorWeaponToBuy> = ({
  item,
  items,
  type,
  buyItem,
  sellItem,
  enchantItem
}) => {
  const selectItem = (i: Item, type: string) => {
    buyItem(i, type);
  };
  const deselect = (i: Item, type: string) => {
    sellItem(i, type);
  };
  const enchant = (i: Armor | Shield | Weapon, e: number, type: string) => {
    enchantItem(i, e, type);
  };

  return (
    <>
      {item? (
        <>
          <div>
            {item.name}
            <button onClick={() => deselect(item, type)}>-</button>
          </div>
          {"enchantment" in item ? (
            <Dropdown as={ButtonGroup}>
              <Button variant="succes">Enchantment</Button>

              <Dropdown.Toggle split variant="succes" id="enchantemt-drop">
                +
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    enchant(item as Armor | Shield | Weapon, -1, type)
                  }
                >
                  prf
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    enchant(item as Armor | Shield | Weapon, 0, type)
                  }
                >
                  0
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    enchant(item as Armor | Shield | Weapon, 1, type)
                  }
                >
                  1
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    enchant(item as Armor | Shield | Weapon, 2, type)
                  }
                >
                  2
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    enchant(item as Armor | Shield | Weapon, 3, type)
                  }
                >
                  3
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    enchant(item as Armor | Shield | Weapon, 4, type)
                  }
                >
                  4
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    enchant(item as Armor | Shield | Weapon, 5, type)
                  }
                >
                  5
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
          ) : (
            <></>
          )}
          <div>{item.description}</div>
        </>
      ) : (
        <></>
      )}

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

export const BuyItemInventory: React.FC<ItemToBuy> = ({
  item,
  items,
  type,
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
                <div>{i.name}</div>
                <div>
                  <button onClick={() => deselect(i, type)}>-</button>
                </div>
                <div>{i.description}</div>
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
  const handleEnchantItem = (
    e: Armor | Shield | Weapon,
    en: number,
    type: string
  ) => {
    if (type === "armor") {
      e.enchantment = en;

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
  };

  return (
    <>
      <div className="container">
        <div className="container-item">
          ---Armor:
          <BuyEnchantedItemInventory
            item={equipment.armor}
            items={items.armorsList}
            type={"armor"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
            enchantItem={handleEnchantItem}
          />
        </div>
        <div className="container-item">
          ---Shield:
          <BuyEnchantedItemInventory
            item={equipment.shield}
            items={items.shieldList}
            type={"shield"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
            enchantItem={handleEnchantItem}
          />
        </div>
      </div>
      <div className="container">
        <div className="container-item">
          ---Weapon I:
          <BuyEnchantedItemInventory
            item={equipment.weaponOne}
            items={items.weaponsList}
            type={"one"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
            enchantItem={handleEnchantItem}
          />
        </div>
        <div className="container-item">
          ---Weapon II:
          <BuyEnchantedItemInventory
            item={equipment.weaponTwo}
            items={items.weaponsList}
            type={"two"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
            enchantItem={handleEnchantItem}
          />
        </div>
        <div className="container-item">
          ---Weapon III:
          <BuyEnchantedItemInventory
            item={equipment.weaponThree}
            items={items.weaponsList}
            type={"three"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
            enchantItem={handleEnchantItem}
          />
        </div>
        <div className="container-item">
          ---Weapon IV:
          <BuyEnchantedItemInventory
            item={equipment.weaponFour}
            items={items.weaponsList}
            type={"four"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
            enchantItem={handleEnchantItem}
          />
        </div>
        <div className="container-item">
          ---Weapon V:
          <BuyEnchantedItemInventory
            item={equipment.weaponFive}
            items={items.weaponsList}
            type={"five"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
            enchantItem={handleEnchantItem}
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
  attacks,
  bab,
  ability,
  setListOfAttack
}) => {
  const [attack, setAttack] = useState<Attacks>(attacks);
  const [indexFirstSetOne, setIndexFirstSetOne] = useState<number>(-1);
  const [indexFirstSetTwo, setIndexFirstSetTwo] = useState<number>(-1);

  useEffect(() => {
    setListOfAttack(attack);
  }, [attack]);

  useEffect(() => {
    let indexOne = IndexWeaponOne(inventory, attack.firstAttackSetOne);
    setIndexFirstSetOne(indexOne);
    let indexTwo = IndexWeaponOne(inventory, attack.firstAttackSetTwo);
    setIndexFirstSetTwo(indexTwo);
  }, [attack.firstAttackSetOne, attack.firstAttackSetTwo]);

  const setAttackInSet = (newWeapon: Weapon, where: string) => {
    let att = { ...attack };

    switch (where) {
      case "set11":
        att.firstAttackSetOne = newWeapon;
        break;
      case "set12":
        att.secondAttackSetOne = newWeapon;
        break;
      case "set13":
        att.additionalAttackSetOne = newWeapon;
        break;
      case "set21":
        att.firstAttackSetTwo = newWeapon;
        break;
      case "set22":
        att.secondAttackSetTwo = newWeapon;
        break;
      case "set23":
        att.additionalAttackSetTwo = newWeapon;
        break;
    }
    setAttack(att);
  };

  return (
    <>
      <div className="container-item">
        Set I
        <div className="container">
          <div>
            <div>
              {attack.firstAttackSetOne ? (
                <>first hand: {attack.firstAttackSetOne.name}</>
              ) : (
                <>first hand: ...selsect weapon...</>
              )}
            </div>
            <MapBab
              weapon={attack.firstAttackSetOne}
              bab={bab}
              ability={ability}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                light: WeaponLight(attack.secondAttackSetOne)
              }}
            />
            <ListOfWeapons
              list={inventory}
              where={"set11"}
              selectWeapon={setAttackInSet}
            />
          </div>
          <div>
            {WeaponTwoHanded(attack.firstAttackSetOne) ? (
              <>second hand: ---</>
            ) : (
              <>
                {attack.secondAttackSetOne ? (
                  <>second hand: {attack.secondAttackSetOne.name}</>
                ) : (
                  <>second hand: ...selsect weapon... </>
                )}
              </>
            )}
            <MapBab
              weapon={attack.secondAttackSetOne}
              bab={bab}
              ability={ability}
              position={{
                pose: false,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                light: WeaponLight(attack.secondAttackSetOne)
              }}
            />
            {WeaponTwoHanded(attack.firstAttackSetOne) ? (
              <></>
            ) : (
              <ListOfOneHandWeapons
                indexOne={indexFirstSetOne}
                list={inventory}
                where={"set12"}
                selectWeapon={setAttackInSet}
              />
            )}
          </div>
          <div></div>
          <div>
            <>
              {attack.additionalAttackSetOne ? (
                <>additional weapon: {attack.additionalAttackSetOne.name}</>
              ) : (
                <>additional weapon: ...select weapon...</>
              )}
            </>
            <MapBab
              bab={bab}
              ability={ability}
              weapon={attack.additionalAttackSetOne}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                light: WeaponLight(attack.firstAttackSetOne)
              }}
            />
            <ListOfOneHandWeapons
              indexOne={indexFirstSetOne}
              list={inventory}
              where={"set13"}
              selectWeapon={setAttackInSet}
            />
          </div>
        </div>
      </div>
      <div className="container-item">
        Set II
        <div className="container">
          <div>
            <>
              {attack.secondAttackSetTwo ? (
                <>first hand: {attack.secondAttackSetTwo.name}</>
              ) : (
                <>first hand: ...selsect weapon...</>
              )}
            </>

            <MapBab
              bab={bab}
              ability={ability}
              weapon={attack.secondAttackSetTwo}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.secondAttackSetTwo),
                light: WeaponLight(attack.secondAttackSetTwo)
              }}
            />
            <ListOfWeapons
              list={inventory}
              where={"set21"}
              selectWeapon={setAttackInSet}
            />
          </div>
          <div>
            {WeaponTwoHanded(attack.secondAttackSetTwo) ? (
              <>second hand: ---</>
            ) : (
              <>
                {attack.secondAttackSetTwo ? (
                  <>second hand: {attack.secondAttackSetTwo.name}</>
                ) : (
                  <>second hand: ...select weapon...</>
                )}
              </>
            )}
            <MapBab
              weapon={attack.secondAttackSetTwo}
              bab={bab}
              ability={ability}
              position={{
                pose: false,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetTwo),
                light: WeaponLight(attack.secondAttackSetTwo)
              }}
            />
            {WeaponTwoHanded(attack.secondAttackSetTwo) ? (
              <></>
            ) : (
              <ListOfOneHandWeapons
                indexOne={indexFirstSetTwo}
                list={inventory}
                where={"set22"}
                selectWeapon={setAttackInSet}
              />
            )}
          </div>
          <div></div>
          <div>
            <>
              {attack.additionalAttackSetTwo ? (
                <>additional weapon: {attack.additionalAttackSetTwo.name}</>
              ) : (
                <>additional weapon: ...select weapon...</>
              )}
            </>

            <MapBab
              bab={bab}
              ability={ability}
              weapon={attack.additionalAttackSetTwo}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetTwo),
                light: WeaponLight(attack.secondAttackSetTwo)
              }}
            />
            <ListOfOneHandWeapons
              indexOne={indexFirstSetTwo}
              list={inventory}
              where={"set23"}
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
  list,
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
      {list.map((weapon, index) => {
        return (
          <div key={index}>
            {weapon.name}
            <button onClick={() => select(weapon)}>+</button>
          </div>
        );
      })}
    </>
  );
};

export const ListOfOneHandWeapons: React.FC<SelectOffWeapon> = ({
  indexOne,
  list,
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

  return list ? (
    <>
      {list.map((w, index) =>
        index !== indexOne && !WeaponTwoHanded(w) ? (
          <div key={index}>
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

export const CharacterArmor: React.FC<ArmorInCharacter> = ({
  charArmor,
  charInventory
}) => {
  return (
    <div className="container-table-ten">
      <div>AC</div>
      <div>10</div>
      <div>
        <div>
          {
            SignAndCount([charArmor.armorBonus, charInventory.armor.armorClass])
              .sign
          }
          {
            SignAndCount([charArmor.armorBonus, charInventory.armor.armorClass])
              .number
          }
        </div>
        <div>arm</div>
      </div>
      <div>
        <div>
          {
            SignAndCount([
              charArmor.shieldBonus,
              charInventory.shield.armorClass
            ]).sign
          }
          {
            SignAndCount([
              charArmor.shieldBonus,
              charInventory.shield.armorClass
            ]).number
          }
        </div>
        <div>shl</div>
      </div>
      <div>
        <div>
          {SignAndCount([charArmor.sizeBonus]).sign}
          {SignAndCount([charArmor.sizeBonus]).number}
        </div>
        <div>siz</div>
      </div>
      <div>
        <div>
          {SignAndCount([charArmor.dextrityBonus]).sign}
          {SignAndCount([charArmor.dextrityBonus]).number}
        </div>
        <div>dex</div>
      </div>
      <div>
        <div>
          {SignAndCount([charArmor.armorBonus]).sign}
          {SignAndCount([charArmor.armorBonus]).number}
        </div>
        <div>nat</div>
      </div>
      <div>
        <div>
          {SignAndCount([charArmor.deflectionBonuses]).sign}
          {SignAndCount([charArmor.deflectionBonuses]).number}
        </div>
        <div>def</div>
      </div>
      <div>
        <div>
          {SignAndCount([charArmor.dodgeBonus]).sign}
          {SignAndCount([charArmor.dodgeBonus]).number}
        </div>
        <div>ddg</div>
      </div>
      <div>
        <div>
          {SignAndCount([0]).sign}
          {SignAndCount([0]).number}
        </div>
        <div>oth</div>
      </div>
    </div>
  );
};
