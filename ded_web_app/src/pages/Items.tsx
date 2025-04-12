import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { FormattingText } from "../components/Formatting/Function";
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
import {
  charTresurePerLevel,
  sendItemsInInventory
} from "../components/Items/Functions/function";
import {
  calculateCost,
  droppItemsToNonItem,
  modifyInventory,
  notEmptyInventory,
  specificFilter
} from "../components/Items/Inventory/function";
import {
  reMaterialArmType,
  reMaterialFailure,
  reMaterialMaxDex,
  reMaterialPerfectPenality,
  reMaterialWeight
} from "../components/Items/Material/function";
import {
  urlChar,
  urlEnchanted,
  urlEnchants,
  urlItems,
  urlItemsBuy
} from "../components/url";
import { CharSummary } from "../components/Summary/CharSummary";
import { noneItem } from "../components/variables";
import { on } from "events";
import { ItemPartProps } from "../components/Items/props";
import { ItemMaterialComponent } from "../components/Items/Components/ItemMaterialComponent";
import { ItemEnchantmentBonusComponent } from "../components/Items/Components/ItemEnchantmentBonusComponent";
import { ItemArmorTypeComponent } from "../components/Items/Components/ItemArmorTypeComponent";
import { ItemTheItemComponent } from "../components/Items/Components/ItemTheItemComponent";
import { ItemEnchantmentsComponent } from "../components/Items/Components/ItemEnchantmentComponent";
import { ItemWeightComponent } from "../components/Items/Components/ItemWeightComponent";
import { ItemFailureComponent } from "../components/Items/Components/ItemFailureComponent";
import { ItemPenalityComponent } from "../components/Items/Components/ItemPenalityComponent";
import { ItemMaxDexComponent } from "../components/Items/Components/ItemMaxDexComponent";
import { ItemCostComponent } from "../components/Items/Components/ItemCostComponent";

export type FiltroItems = {
  armors: itemInDrop[];
  shields: itemInDrop[];
  weapons: itemInDrop[];
  wonderous: itemInDrop[];
  enchantments: itemInDrop[];
  magic: itemInDrop[];
};

export const Items = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [filtroList, setFiltroList] = useState<FiltroItems>();
  const [inventory, setInventory] =
    useState<(Armor | Shield | Weapon | Item | WonderousItem)[]>();
  const [inventoryTotal, setInventoryTotal] = useState<number>(0);
  const [backpack, setBackpack] = useState<WonderousItem[]>([]);
  const [backpackTotal, setBackpackTotal] = useState<number>(0);
  const [tresure, setTresure] = useState<number>(0);
  const [totalCost, setTotalCost] = useState(0);

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

        setInventory((prevInventory) => {
          return [
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
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChangeItem = (n: number, updatedItem: Item, cost: number) => {
    const itemWithCost = {
      ...updatedItem,
      cost: cost
    };

    if (inventory) {
      setInventory((prev) => {
        if (prev) {
          const updated = [...prev];
          updated[n] = itemWithCost;

          // if(n === 6){
          // console.log("prev: ", prev.flatMap((i) => i.cost));
          // console.log("updated: ", updated.flatMap((i) => i.cost));
          // console.log("updated.reduce: ", updated.reduce(
          //   (tot, item) => tot + (item.cost || 0),
          //   0
          // ));
          // }
          const total = updated.reduce(
            (tot, item) => tot + (item.cost || 0),
            0
          );
          setInventoryTotal(total);
          return updated;
        }
      });
    }
  };

  // useEffect(() => {
  //   if (inventory) {
  //     const total = inventory.reduce((tot, item) => tot + (item.cost || 0), 0);
  //     setInventoryTotal(total);
  //   }
  // }, [inventory]);

  // useEffect(() => {
  //   if (inventory) {
  //     console.log("Inventory updated!", inventory[0].cost);
  //   }
  // }, [inventory]);

  const handleChangeBackpack = (
    n: number,
    i: Item | Armor | Shield | Weapon | WonderousItem
  ) => {
    setBackpack((prevBackpack) => {
      if (prevBackpack) {
        let newBackpack = [...prevBackpack];

        newBackpack[n] = { ...(i as WonderousItem) };

        // Rimuovi tutti gli item con id === 4
        newBackpack = newBackpack.filter((item) => item.id !== 4);

        // Aggiungi 'noneItem' (o un altro item con id === 4) in fondo
        newBackpack.push(noneItem);

        return newBackpack;
      }

      return prevBackpack;
    });
  };

  const handleConfirm = () => {
    if (inventory && inventory.length > 0) {
      const inventoryToSend = sendItemsInInventory(inventory);
      console.log(inventoryToSend);

      axios.post(urlItemsBuy + charId, inventoryToSend);
      window.location.reload();
    }
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
          <span>{inventoryTotal}</span>
          <span>
            <button className="rpgui-button" onClick={handleConfirm}>
              <p>confirm</p>
            </button>
          </span>
          <span className="rpgui-container-framed-grey">
            tresure: {tresure}
          </span>
          <span className="rpgui-container-framed-grey">
            actual: {inventoryTotal + backpackTotal}
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
          <span>{inventoryTotal}</span>
          <span>
            <button className="rpgui-button" onClick={handleConfirm}>
              <p>confirm</p>
            </button>
          </span>
          <span className="rpgui-container-framed-grey">
            tresure: {tresure}
          </span>
          <span className="rpgui-container-framed-grey">
            actual: {totalCost}
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
  onAction: (
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


  // useEffect(() => {
  //   if (theItem && costItem) {
  //     onAction(
  //       n,
  //       {
  //         ...theItem,
  //         cost: costItem,
  //         material: materialItem ?? undefined,
  //         enchantment: enchantmentItem ?? undefined
  // enchantmentBonus: enchantmentBonusItem ?? undefined
  //       },
  //       cotItem
  //     );
  //   }
  // }, [costItsem]);

  const handleNewItems = (
    optionItem?: Item | Armor | Shield | Weapon | WonderousItem
  ) => {
    if (optionItem) {
      setTheItem(optionItem);
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
    if (theItem) {
      const updatedItem = {
        ...theItem,
        cost: option
      };
      setTheItem({ ...theItem, ...updatedItem });
    }
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
              materialItem={"material" in theItem ? theItem.material : undefined}
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

          {"armorType" in theItem && (
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
          )}
          {"weaponName" in theItem && (
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
          )}
          {"wondrousType" in theItem && (
            <ItemCostComponent
              costItem={theItem.cost}
              setCostItem={handleCost}
            />
          )}
        </div>
      </div>
    );
  }
};
