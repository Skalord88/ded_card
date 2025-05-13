import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToDrop, itemInDrop } from "../components/functions";
import { InventoryIcon, InventoryIcons } from "../components/Icon/icons";
import {
  Armor,
  CharacterPc,
  Enchantment,
  Item,
  ItemsList,
  Shield,
  Weapon,
  WonderousItem
} from "../components/interfaces";
import { ItemArmorTypeComponent } from "../components/Items/Components/ItemArmorTypeComponent";
import { ItemCostComponent } from "../components/Items/Components/ItemCostComponent";
import { ItemEnchantmentBonusComponent } from "../components/Items/Components/ItemEnchantmentBonusComponent";
import { ItemEnchantmentsComponent } from "../components/Items/Components/ItemEnchantmentComponent";
import { ItemFailureComponent } from "../components/Items/Components/ItemFailureComponent";
import { ItemMaterialComponent } from "../components/Items/Components/ItemMaterialComponent";
import { ItemMaxDexComponent } from "../components/Items/Components/ItemMaxDexComponent";
import { ItemPenalityComponent } from "../components/Items/Components/ItemPenalityComponent";
import { ItemTheItemComponent } from "../components/Items/Components/ItemTheItemComponent";
import { ItemWeightComponent } from "../components/Items/Components/ItemWeightComponent";
import {
  charTresurePerLevel,
  createItemsInInventory,
  sendItemsInInventory
} from "../components/Items/Functions/function";
import {
  notEmptyInventory,
  specificFilter
} from "../components/Items/Inventory/function";
import { CharSummary } from "../components/Summary/CharSummary";
import {
  urlChar,
  urlEnchanted,
  urlEnchants,
  urlItems,
  urlItemsBuy
} from "../components/url";
import {
  noneArmor,
  noneItem,
  noneShield,
  noneWeapon
} from "../components/variables";

export type FiltroItems = {
  armors: itemInDrop[];
  shields: itemInDrop[];
  weapons: itemInDrop[];
  wonderous: itemInDrop[];
  enchantments: itemInDrop[];
  magic: itemInDrop[];
};

export type ItemToSend = {
  id: number;
  itemId?: number;
  material?: string;
  enchantment?: { id: number }[];
  enchantmentBonus?: number;
};

export const Items = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [filtroList, setFiltroList] = useState<FiltroItems>();
  const [inventory, setInventory] =
    useState<(Armor | Shield | Weapon | Item | WonderousItem)[]>();
  const [backpack, setBackpack] = useState<WonderousItem[]>([]);
  const [inventoryToSend, setInventoryToSend] = useState<ItemToSend[]>([]);
  const [backpackToSend, setBackpackToSend] = useState<ItemToSend[]>([]);

  const [inventoryCost, setInventoryCost] = useState<number[]>([]);
  const [backpackCost, setBackpackCost] = useState<number[]>([]);

  const [inventoryTotal, setInventoryTotal] = useState<number>(0);
  const [backpackTotal, setBackpackTotal] = useState<number>(0);

  const [tresure, setTresure] = useState<number>(0);
  // const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const charDb: CharacterPc = resChar.data;
        setChar(charDb);

        const actualTresure: number = charTresurePerLevel(
          charDb.classPcList.reduce((tot, lv) => tot + lv.level, 0)
        );
        setTresure(actualTresure);

        const resItems = await axios.get(urlItems);
        const allItems: ItemsList = await resItems.data;

        const resEnchants = await axios.get(urlEnchants);
        const allEnchants: Enchantment[] = await resEnchants.data;
        const resEnchanted = await axios.get(urlEnchanted);
        const allEnchanted: (Armor | Shield | Weapon)[] =
          await resEnchanted.data;

        if (allItems) {
          const a = allItems.armorsList;
          const s = allItems.shieldList;
          const w = allItems.weaponsList;
          const wo = allItems.wonderousItems;
          const e = allEnchants;
          const ed = allEnchanted;

          const filtro: FiltroItems = {
            armors: addToDrop(a, "items"),
            shields: addToDrop(s, "items"),
            weapons: addToDrop(w, "items"),
            wonderous: addToDrop(wo, "items"),
            enchantments: addToDrop(e, "enchant"),
            magic: addToDrop(ed, "items")
          };

          setFiltroList(filtro);
        }

        const moddedInventory = notEmptyInventory(charDb.inventory);

        setBackpack(
          moddedInventory.backpack && moddedInventory.backpack.length > 0
            ? moddedInventory.backpack
            : []
        );

        const newInv = [
          moddedInventory.armor,
          moddedInventory.shield,
          moddedInventory.weaponOne,
          moddedInventory.weaponTwo,
          moddedInventory.weaponThree,
          moddedInventory.weaponFour,
          moddedInventory.weaponFive,
          moddedInventory.head,
          moddedInventory.neck,
          moddedInventory.arms,
          moddedInventory.ringOne,
          moddedInventory.ringTwo,
          moddedInventory.cloth,
          moddedInventory.cloak,
          moddedInventory.belt,
          moddedInventory.legs
        ];

        setInventory(newInv);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChangeItem = (
    n: number,
    updatedItem: Item | Armor | Shield | Weapon | WonderousItem,
    cost: number
  ) => {
    const inv: number[] = inventoryCost;
    inv[n] = cost;

    const tot = inv.reduce((tot, i) => tot + i, 0);
    setInventoryTotal(tot);

    const updateItem = createItemsInInventory(updatedItem);
    const newInv = inventoryToSend;
    newInv[n] = updateItem;
    setInventoryToSend(newInv);
  };

  const handleChangeBackpack = (
    n: number,
    updatedItem: Item | Armor | Shield | Weapon | WonderousItem,
    cost: number
  ) => {
    const inv: number[] = backpackCost;
    inv[n] = cost;
    const tot = inv.reduce((tot, i) => tot + i, 0);
    setBackpackTotal(tot);

    const updateItem = createItemsInInventory(updatedItem);
    const newInv = backpackToSend;
    newInv[n] = updateItem;
    setBackpackToSend(newInv);

    const updated = [...backpack];
    updated[n] = updatedItem as WonderousItem;
    setBackpack(updated);
  };

  useEffect(() => {
    const countNone = backpack.filter((item) => item.id === 4).length;

    if (countNone > 1) {
      let cleaned = backpack.filter((item) => item.id !== 4);
      cleaned = [...cleaned, noneItem];
      setBackpack(cleaned);
    } else if (countNone === 0) {
      setBackpack((prev) => [...prev, noneItem]);
    }
  }, [backpack]);

  const handleConfirm = () => {
    const itemsToSend = {
      backpack: backpackToSend,
      inventory: inventoryToSend
    };

    console.log(itemsToSend);
    axios
      .post(urlItemsBuy + charId, itemsToSend)
      .then((response) => {
        // success: update UI accordingly
        console.log("Inventory updated!", response.data);
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          alert(
            "Inventory was modified by another user. Please refresh and try again."
          );
          // optionally: trigger a reload or re-fetch of character data
        } else {
          console.error("Error updating inventory:", error);
          alert("An unexpected error occurred.");
        }
      });
    // window.location.reload();
  };

  const inventoryListRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Funzione per scorrere fino alla parte selezionata dell'inventario
  const scrollToItem = (index: number) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  };

  let globalIndex = 0;

  if (!inventory) {
    return (
      <div>
        <p>...loading inventory...</p>
      </div>
    );
  }

  return (
    <div>
      {char && inventory && (
        <CharSummary
          character={char}
          inventory={{
            armor: inventory[0] as Armor,
            shield: inventory[1] as Shield,
            weaponOne: inventory[2] as Weapon,
            weaponTwo: inventory[3] as Weapon,
            weaponThree: inventory[4] as Weapon,
            weaponFour: inventory[5] as Weapon,
            weaponFive: inventory[6] as Weapon,
            backpack: backpack,
            head: inventory[7] as WonderousItem,
            neck: inventory[8] as WonderousItem,
            arms: inventory[9] as WonderousItem,
            ringOne: inventory[10] as WonderousItem,
            ringTwo: inventory[11] as WonderousItem,
            cloth: inventory[12] as WonderousItem,
            cloak: inventory[13] as WonderousItem,
            belt: inventory[14] as WonderousItem,
            legs: inventory[15] as WonderousItem
          }}
        />
      )}
      <p></p>
      <h1 className="rpgui-container-framed-golden-2">Inventory</h1>
      <div>
        <p>
          <span>
            <button className="rpgui-button" onClick={handleConfirm}>
              <p>confirm</p>
            </button>
          </span>
          <span className="rpgui-container-framed-grey">
            tresure: {tresure}
          </span>
          <span className="rpgui-container-framed-grey">
            actual: {tresure - inventoryTotal - backpackTotal}
          </span>
          <span>
            <button className="rpgui-button">
              <Link to={"/attack/" + charId}>to attacks</Link>
            </button>
          </span>
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "40% 60%"
        }}
      >
        <div className="rpgui-container-framed-grey" style={{ maxHeight: 780 }}>
          <InventoryIcons>
            <div onClick={() => scrollToItem(7)}>
              <InventoryIcon classe={"head"} text={"head"} top={5} left={20} />
            </div>
            <div onClick={() => scrollToItem(8)}>
              <InventoryIcon classe={"neck"} text={"neck"} top={5} left={70} />
            </div>
            <div onClick={() => scrollToItem(0)}>
              <InventoryIcon
                classe={"armor"}
                text={"armor"}
                top={20}
                left={30}
              />
            </div>
            <div onClick={() => scrollToItem(1)}>
              <InventoryIcon
                classe={"shield"}
                text={"shield"}
                top={35}
                left={70}
              />
            </div>
            <div onClick={() => scrollToItem(12)}>
              <InventoryIcon
                classe={"cloth"}
                text={"cloth"}
                top={20}
                left={70}
              />
            </div>
            <div onClick={() => scrollToItem(9)}>
              <InventoryIcon classe={"arms"} text={"arms"} top={35} left={30} />
            </div>
            <div onClick={() => scrollToItem(10)}>
              <InventoryIcon
                classe={"hands0"}
                text={"ring"}
                top={50}
                left={30}
              />
            </div>
            <div onClick={() => scrollToItem(11)}>
              <InventoryIcon
                classe={"hands1"}
                text={"ring"}
                top={50}
                left={70}
              />
            </div>
            <div onClick={() => scrollToItem(13)}>
              <InventoryIcon
                classe={"cloak"}
                text={"cloak"}
                top={65}
                left={30}
              />
            </div>
            <div onClick={() => scrollToItem(14)}>
              <InventoryIcon classe={"belt"} text={"belt"} top={65} left={70} />
            </div>
            <div onClick={() => scrollToItem(inventory.length)}>
              <InventoryIcon
                classe={"backpack"}
                text={"bag"}
                top={80}
                left={30}
              />
            </div>
            <div onClick={() => scrollToItem(15)}>
              <InventoryIcon classe={"legs"} text={"legs"} top={80} left={70} />
            </div>
            <div onClick={() => scrollToItem(2)}>
              <InventoryIcon classe={"sword"} text={"I"} left={5} top={20} />
            </div>
            <div onClick={() => scrollToItem(3)}>
              <InventoryIcon classe={"sword"} text={"II"} left={5} top={35} />
            </div>
            <div onClick={() => scrollToItem(4)}>
              <InventoryIcon classe={"sword"} text={"III"} left={5} top={50} />
            </div>
            <div onClick={() => scrollToItem(5)}>
              <InventoryIcon classe={"sword"} text={"IV"} left={5} top={65} />
            </div>
            <div onClick={() => scrollToItem(6)}>
              <InventoryIcon classe={"sword"} text={"V"} left={5} top={80} />
            </div>
          </InventoryIcons>
        </div>

        <div
          ref={inventoryListRef}
          className="rpgui-container-framed-grey"
          style={{
            maxHeight: 780,
            overflowY: "auto"
          }}
        >
          {inventory &&
            filtroList &&
            char &&
            inventory.map((i, index) => {
              const currentIndex = globalIndex++;
              return (
                <div
                  key={currentIndex}
                  ref={(el) => (itemRefs.current[currentIndex] = el)}
                  className="rpgui-container-framed-grey"
                >
                  <ItemInventoryComponent
                    n={index}
                    item={i}
                    sizeId={0}
                    filtro={filtroList}
                    onAction={handleChangeItem}
                  />
                </div>
              );
            })}
          {backpack &&
            filtroList &&
            backpack.map((i, index) => {
              const currentIndex = globalIndex++;
              return (
                <div
                  key={currentIndex}
                  ref={(el) => (itemRefs.current[currentIndex] = el)}
                  className="rpgui-container-framed-grey"
                >
                  {<h2>backpack</h2>}
                  <ItemInventoryComponent
                    n={index}
                    item={i}
                    sizeId={0}
                    filtro={filtroList.wonderous}
                    onAction={handleChangeBackpack}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <p>
          <span>
            <button className="rpgui-button" onClick={handleConfirm}>
              <p>confirm</p>
            </button>
          </span>
          <span className="rpgui-container-framed-grey">
            tresure: {tresure}
          </span>
          <span className="rpgui-container-framed-grey">
            actual: {tresure - inventoryTotal - backpackTotal}
          </span>
          <span>
            <button className="rpgui-button">
              <Link to={"/attack/" + charId}>to attacks</Link>
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

export type ItemInventoryProps = {
  n: number;
  item: (Item | Armor | Shield | Weapon | WonderousItem) | WonderousItem;
  sizeId: number;
  filtro: FiltroItems | itemInDrop[];
  onAction?: (
    n: number,
    item: (Item | Armor | Shield | Weapon | WonderousItem) | WonderousItem,
    cost: number
  ) => void;
};

export const ItemInventoryComponent: React.FC<ItemInventoryProps> = ({
  n,
  item,
  sizeId,
  filtro,
  onAction
}) => {
  const [theItem, setTheItem] = useState<
    Item | Armor | Shield | Weapon | WonderousItem
  >();

  useEffect(() => {
    setTheItem(item);
  }, []);

  const filtroEnchantment =
    "magic" in filtro
      ? filtro.enchantments.filter(
          (e) =>
            item &&
            (((e.item as Enchantment).itemType === "ARMOR_SHIELD" &&
              ("armorName" in item || "shieldName" in item)) ||
              (e.item as Enchantment).itemType === item.itemType)
        )
      : [];
  const specificFiltro =
    "magic" in filtro ? specificFilter(n, filtro) : (filtro as itemInDrop[]);

  const handleNewItems = (
    optionItem?: Item | Armor | Shield | Weapon | WonderousItem
  ) => {
    if (optionItem) {
      setTheItem({ ...theItem, ...optionItem });
    }
  };

  const handleNewMaterial = (option: string) => {
    if (theItem && "material" in theItem) {
      const updatedItem = {
        ...theItem,
        material: option
      };
      setTheItem({ ...theItem, ...updatedItem });
    }
  };
  const handleNewEnchantmentBonus = (option: number) => {
    if (theItem && "enchantmentBonus" in theItem) {
      const updatedItem = {
        ...theItem,
        enchantmentBonus: option
      };
      setTheItem({ ...theItem, ...updatedItem });
    }
  };
  const handleEnchantment = (option: Enchantment[]) => {
    if (theItem && "enchantment" in theItem) {
      const updatedItem = {
        ...theItem,
        enchantment: option
      };
      setTheItem({ ...theItem, ...updatedItem });
    }
  };
  const handleCost = (option: number) => {
    if (onAction && theItem) onAction(n, theItem, option);
  };

  const handleNoneItem = () => {
    if (theItem && n === 0 && "armorName" in theItem)
      setTheItem({ ...theItem, ...noneArmor });
    if (theItem && n === 0 && !("armorName" in theItem))
      setTheItem({ ...theItem, ...noneItem });
    if (theItem && n === 1 && "shieldName" in theItem) setTheItem(noneShield);
    if (theItem && n === 1 && !("shieldName" in theItem)) setTheItem(noneItem);
    if (theItem && [2, 3, 4, 5, 6].includes(n) && "weaponName" in theItem)
      setTheItem(noneWeapon);
    if (theItem && [2, 3, 4, 5, 6].includes(n) && !("weaponName" in theItem))
      setTheItem(noneItem);
    if ([7, 8, 9, 10, 11, 12, 13, 14, 15].includes(n)) setTheItem(noneItem);
  };

  const numerini: string[] = ["I", "II", "III", "IV", "V"];

  if (!theItem) {
    return (
      <div>
        <p>...loading item...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>
          {"armorName" in theItem ? "armor" : null}
          {"shieldName" in theItem ? "shield" : null}
          {"weaponName" in theItem ? "weapon " + numerini[n - 2] : null}
          {n === 7 ? "head" : null}
          {n === 8 ? "neck" : null}
          {n === 9 ? "arms" : null}
          {n === 10 ? "ring" : null}
          {n === 11 ? "ring" : null}
          {n === 12 ? "cloth" : null}
          {n === 13 ? "cloak" : null}
          {n === 14 ? "belt" : null}
          {n === 15 ? "legs" : null}
        </h2>
        <div>
          <div>
            <ItemTheItemComponent
              filtro={specificFiltro}
              nameItem={
                (theItem as Armor).armorName ||
                (theItem as Shield).shieldName ||
                (theItem as Weapon).weaponName ||
                (theItem as WonderousItem).name
              }
              onAction={handleNoneItem}
              setTheItem={handleNewItems}
            />
          </div>
          {"enchantmentBonus" in theItem && (
            <ItemEnchantmentBonusComponent
              materialItem={theItem.material}
              enchantmentBonusItem={theItem.enchantmentBonus}
              setEnchantmentBonusItem={handleNewEnchantmentBonus}
            />
          )}
          <div>
            <p>
              <span style={{ color: "yellow" }}>description: </span>
              {theItem.description}
            </p>
          </div>
          {"material" in theItem && theItem.material !== null && (
            <ItemMaterialComponent
              materialItem={theItem.material}
              setMaterialItem={handleNewMaterial}
            />
          )}
          {"armorType" in theItem && theItem.armorType !== null && (
            <ItemArmorTypeComponent
              armorTypeItem={theItem.armorType}
              materialItem={theItem.material}
            />
          )}
          {"enchantment" in theItem && theItem.enchantment !== null && (
            <ItemEnchantmentsComponent
              filtro={filtroEnchantment}
              enchantmentItem={theItem.enchantment}
              setEnchantmentItem={handleEnchantment}
            />
          )}
          {"weight" in theItem && (
            <ItemWeightComponent
              weightItem={theItem.weight}
              materialItem={
                "material" in theItem ? theItem.material : undefined
              }
            />
          )}
          {"penality" in theItem && (
            <ItemPenalityComponent
              penalityItem={theItem.penality}
              materialItem={theItem.material}
              enchantmentBonusItem={theItem.enchantmentBonus}
            />
          )}
          {"maxDex" in theItem && (
            <ItemMaxDexComponent
              maxDexItem={theItem.maxDex}
              materialItem={theItem.material}
            />
          )}
          {"failure" in theItem && (
            <ItemFailureComponent
              failureItem={theItem.failure}
              materialItem={theItem.material}
            />
          )}

          {"armorType" in theItem ? (
            <ItemCostComponent
              costItem={theItem.cost}
              itemTypeItem={theItem.itemType}
              enchantmentItem={theItem.enchantment}
              enchantmentBonusItem={theItem.enchantmentBonus}
              weightItem={theItem.weight}
              armorTypeItem={theItem.armorType}
              materialItem={theItem.material}
              setCostItem={handleCost}
            />
          ) : "weaponName" in theItem ? (
            <ItemCostComponent
              costItem={theItem.cost}
              itemTypeItem={theItem.itemType}
              enchantmentItem={theItem.enchantment}
              enchantmentBonusItem={theItem.enchantmentBonus}
              weightItem={theItem.weight}
              armorTypeItem={theItem.itemType}
              materialItem={theItem.material}
              setCostItem={handleCost}
            />
          ) : (
            "wondrousType" in theItem && (
              <ItemCostComponent
                costItem={theItem.cost}
                setCostItem={handleCost}
              />
            )
          )}
        </div>
      </div>
    );
  }
};
