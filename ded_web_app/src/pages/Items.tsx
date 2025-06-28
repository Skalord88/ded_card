import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { addToDrop, itemInDrop } from "../components/functions";
import { InventoryIcon, InventoryIcons } from "../components/Icon/icons";
import {
  Armor,
  CharacterPc,
  Enchantment,
  Inventory,
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
  createItemsInInventory
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
import { PageLayout } from "./AppLayout";
import { enchantedName } from "../components/Enchantment/Functions/EnchantmentFunctions";

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

        const newInv: (Armor | Shield | Weapon | Item | WonderousItem)[] = [
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
    <PageLayout
      title={"Inventory"}
      onAction={handleConfirm}
      buttons={{
        next: { text: "attacks", link: "/attack/" + charId, change: true },
        back: { text: "feats", link: "/feat/" + charId }
      }}
    >
      <div className="rpgui-container-framed grey">
        {/* {char && inventory && (
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
      )} */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
            gridTemplateRows: "600px"
          }}
        >
          <InventoryIcons>
            <InventoryIcon area="empty" />
            <InventoryIcon
              classe="head"
              area="head"
              onAction={() => scrollToItem(7)}
            />
            <InventoryIcon
              classe={"neck"}
              area={"neck"}
              onAction={() => scrollToItem(8)}
            />
            <InventoryIcon
              classe={"armor"}
              area={"armor"}
              onAction={() => scrollToItem(0)}
            />
            <InventoryIcon
              classe={"shield"}
              area={"shield"}
              onAction={() => scrollToItem(1)}
            />
            <InventoryIcon
              classe={"cloth"}
              area={"cloth"}
              onAction={() => scrollToItem(12)}
            />
            <InventoryIcon
              classe={"arms"}
              area={"arms"}
              onAction={() => scrollToItem(9)}
            />
            <InventoryIcon
              onAction={() => scrollToItem(10)}
              classe={"hands0"}
              area={"hands0"}
            />
            <InventoryIcon
              classe={"hands1"}
              area={"hands1"}
              onAction={() => scrollToItem(11)}
            />
            <InventoryIcon
              classe={"cloak"}
              area={"cloak"}
              onAction={() => scrollToItem(13)}
            />
            <InventoryIcon
              classe={"belt"}
              area={"belt"}
              onAction={() => scrollToItem(14)}
            />
            <InventoryIcon
              classe={"backpack"}
              area={"backpack"}
              onAction={() => scrollToItem(inventory.length)}
            />
            <InventoryIcon
              classe={"legs"}
              area={"legs"}
              onAction={() => scrollToItem(15)}
            />
            <InventoryIcon
              classe={"sword"}
              area={"I"}
              onAction={() => scrollToItem(2)}
            />
            <InventoryIcon
              classe={"sword"}
              area={"II"}
              onAction={() => scrollToItem(3)}
              text={"II"}
            />
            <InventoryIcon
              classe={"sword"}
              area={"III"}
              onAction={() => scrollToItem(4)}
              text={"III"}
            />
            <InventoryIcon
              classe="sword"
              area={"IV"}
              onAction={() => scrollToItem(5)}
              text={"IV"}
            />
            <InventoryIcon
              area={"V"}
              classe={"sword"}
              onAction={() => scrollToItem(6)}
              text={"V"}
            />
          </InventoryIcons>

          <div
            ref={inventoryListRef}
            className="rpgui-container-framed-grey"
            style={{
              overflowY: "scroll"
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
                      key={"item." + index}
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
                      key={"backpack"}
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
            tresure: {tresure}
            {", actual: "}
            {tresure - inventoryTotal - backpackTotal}
          </p>
        </div>
      </div>
    </PageLayout>
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
  >(item);

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
        enchantmentBonus: option,
        enchantment: option <= 0 ? [] : theItem.enchantment
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

  const numerini: string[] = ["I", "II", "III", "IV", "V"];

  if (!theItem) {
    return (
      <div>
        <p>...loading item...</p>
      </div>
    );
  } else {
    return (
      <div className="rpgui-container-framed">
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
            {"itemType" in theItem && (
              <ItemTheItemComponent
                filtro={specificFiltro}
                itemName={enchantedName(theItem)}
                setTheItem={handleNewItems}
              />
            )}
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
          {"enchantment" in theItem &&
            theItem.enchantmentBonus &&
            theItem.enchantmentBonus > 0 && (
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
