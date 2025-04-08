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
  const [inventory, setInventory] = useState<
    (Armor | Shield | Weapon | Item | WonderousItem)[]
  >([]);
  const [backpack, setBackpack] = useState<WonderousItem[]>([]);
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

        const moddedInventory = modifyInventory(
          charDb.race.size.id,
          charDb.inventory
        );

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

  const handleChangeItem = (
    n: number,
    i: Item | Armor | Shield | Weapon | WonderousItem
  ) => {
    setInventory((prevInventory) => {
      if (prevInventory) {
        const newInventory = [...prevInventory];
        if (n === 0) {
          newInventory[n] = { ...(i as Armor) };
        }
        if (n === 1) {
          newInventory[n] = { ...(i as Shield) };
        }
        if ([2, 3, 4, 5, 6].includes(n)) {
          newInventory[n] = { ...(i as Weapon) };
        }
        if ([7, 8, 9, 10, 11, 12, 13, 14, 15].includes(n)) {
          newInventory[n] = { ...(i as WonderousItem) };
        }

        return newInventory;
      }
      return prevInventory;
    });
  };

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

  useEffect(() => {
    let totalCost = 0;
    if (inventory) {
      totalCost = inventory.reduce((tot, item) => {
        if (item && "cost" in item) {
          return tot + (item as Item).cost;
        }
        return tot;
      }, 0);
    }
    if (backpack) {
      totalCost += backpack.reduce((tot, item) => {
        if (item && "cost" in item) {
          return tot + (item as Item).cost;
        }
        return tot;
      }, 0);
    }
    setTotalCost(tresure - totalCost);
  }, [inventory, backpack]);

  const handleConfirm = () => {
    const inventoryToSend = sendItemsInInventory(inventory);
    console.log(inventoryToSend);

    axios.post(urlItemsBuy + charId, inventoryToSend);
    window.location.reload();
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
            actual: {totalCost}
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
                    // key={currentIndex}
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
                    // key={currentIndex}
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
    item: (Item | Armor | Shield | Weapon | WonderousItem) | WonderousItem
  ) => void;
};

export const ItemInventoryComponent: React.FC<ItemInventoryProps> = ({
  n,
  item,
  sizeId,
  filtro,
  onAction
}) => {
  const metal = ["METAL", "MITHRAL", "ADAMANTINE"];
  const wood = ["WOOD", "DARKWOOD"];
  const enchantments = [0, -1, 1, 2, 3, 4, 5];

  const memoizedItem = useMemo(() => item, [item]);

  const [theItem, setTheItem] = useState<
    Item | Armor | Shield | Weapon | WonderousItem
  >(memoizedItem);
  const [materialItem, setMaterialItem] = useState<string | null>(
    item && "material" in item ? item.material ?? null : null
  );
  const [armorTypeItem, setArmorTypeItem] = useState<string | null>(
    item && "armorType" in item ? item.armorType : null
  );
  const [costItem, setCostItem] = useState<number | null>();

  const [weightItem, setWeightItem] = useState<number | null>(
    item && "weight" in item ? item.weight : null
  );
  const [penalityItem, setPenalityItem] = useState<number | null>(
    item && "penality" in item ? item.penality : null
  );
  const [maxDexItem, setMaxDexItem] = useState<number | null>(
    item && "maxDex" in item ? item.maxDex : null
  );
  const [enchantmentBonusItem, setEnchantmentBonusItem] = useState<
    number | null
  >(
    item && "enchantmentBonus" in item && item.enchantmentBonus
      ? item.enchantmentBonus
      : null
  );
  const [enchantmentItem, setEnchantmentItem] = useState<Enchantment[] | null>(
    item && "enchantment" in item && item.enchantment
      ? [...item.enchantment]
      : null
  );
  const [failureItem, setFailureItem] = useState<number | null>(
    item && "failure" in item && item.failure
      ? reMaterialFailure(
          item.material ? item.material : "",
          item.failure ? item.failure : 0
        )
      : null
  );

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

  useEffect(() => {
    if (!theItem) return;

    let costo: number = 0;
    if ("armorName" in theItem || "shieldName" in theItem) {
      costo = calculateCost(
        "Armor",
        theItem.cost,
        enchantmentItem?.flatMap((en) => en.cost) ?? [],
        enchantmentBonusItem ?? 0,
        materialItem ?? "",
        weightItem ?? 0,
        theItem.armorType
      );
    }
    if ("weaponName" in theItem) {
      costo = calculateCost(
        "Weapon",
        theItem.cost,
        enchantmentItem?.flatMap((en) => en.cost) ?? [],
        enchantmentBonusItem ?? 0,
        materialItem ?? "",
        weightItem ?? 0,
        theItem.itemType
      );
    }
    if ("wondrousType" in theItem) {
      costo = theItem.cost;
    }

    setCostItem(costo);
    onAction(n, {
      ...theItem,
      cost: costo,
      material: materialItem ?? undefined,
      enchantment: enchantmentItem ?? undefined,
      enchantmentBonus: enchantmentBonusItem ?? undefined
    });
  }, [
    enchantmentBonusItem,
    materialItem,
    weightItem,
    enchantmentItem,
    theItem,
    n
  ]);

  const handleNewItems = (
    optionItem?: Item | Armor | Shield | Weapon | WonderousItem | undefined,
    optionMaterial?: string
  ) => {
    if (optionItem && typeof optionItem === "object") {
      if ("armorName" in optionItem) {
        setMaterialItem(optionItem.material ?? null);
        setArmorTypeItem(optionItem.armorType);
        setPenalityItem(optionItem.penality);
        setEnchantmentBonusItem(
          optionItem.enchantmentBonus ? optionItem.enchantmentBonus : 0
        );
        setMaxDexItem(optionItem.maxDex);
        setFailureItem(optionItem.failure);
      }
      if ("shieldName" in optionItem) {
        setEnchantmentBonusItem(
          optionItem.enchantmentBonus ? optionItem.enchantmentBonus : 0
        );
      }
      if ("weaponName" in optionItem) {
        setArmorTypeItem(null);

        setEnchantmentBonusItem(
          optionItem.enchantmentBonus ? optionItem.enchantmentBonus : 0
        );
      }

      setTheItem(optionItem);
      setWeightItem(optionItem.weight);
    }

    if (theItem && optionMaterial && typeof optionMaterial === "string") {
      setMaterialItem(optionMaterial);
      setEnchantmentBonusItem(0);
      if ("armorType" in theItem) {
        setArmorTypeItem(reMaterialArmType(optionMaterial, theItem.armorType));
        setPenalityItem(
          reMaterialPerfectPenality(
            optionMaterial,
            theItem.penality,
            theItem.enchantmentBonus !== 0 ? true : false
          )
        );
        if ("maxDex" in theItem)
          setMaxDexItem(reMaterialMaxDex(optionMaterial, theItem.maxDex));
        setFailureItem(reMaterialFailure(optionMaterial, theItem.failure));
      }

      if ("weight" in theItem) {
        setWeightItem(reMaterialWeight(optionMaterial, theItem.weight));
      }
    }
  };

  const handlePlusEnchantmentBonus = () => {
    if (theItem && "enchantmentBonus" in theItem) {
      let findIndexEnchant: number =
        enchantmentBonusItem !== null
          ? enchantments.findIndex(
              (enchantment) => enchantment === enchantmentBonusItem
            )
          : -1;

      if (findIndexEnchant !== -1) {
        let enchInIndex: number = 0;
        if (
          findIndexEnchant + 1 === 1 &&
          materialItem &&
          !["WOOD", "METAL"].includes(materialItem)
        ) {
          enchInIndex = enchantments[findIndexEnchant + 2];
        } else {
          enchInIndex =
            enchantments[findIndexEnchant + 1] < 6
              ? enchantments[findIndexEnchant + 1]
              : enchantments[findIndexEnchant];
        }
        setEnchantmentBonusItem(enchInIndex);

        if (penalityItem && "penality" in theItem && materialItem)
          setPenalityItem(
            reMaterialPerfectPenality(
              materialItem,
              (theItem as Armor | Shield).penality
                ? (theItem as Armor | Shield).penality
                : 0,
              enchInIndex !== 0 ? true : false
            )
          );
      }
    }
  };
  const handleMinEnchantmentBonus = () => {
    if (theItem && "enchantmentBonus" in theItem) {
      let findIndexEnchant: number =
        enchantmentBonusItem !== null
          ? enchantments.findIndex(
              (enchantment) => enchantment === enchantmentBonusItem
            )
          : -1;
      if (findIndexEnchant !== -1) {
        let enchInIndex: number = 0;
        if (
          findIndexEnchant - 1 === 1 &&
          materialItem &&
          !["WOOD", "METAL"].includes(materialItem)
        ) {
          enchInIndex = enchantments[findIndexEnchant - 2];
        } else {
          enchInIndex =
            enchantments[findIndexEnchant - 1] > -2
              ? enchantments[findIndexEnchant - 1]
              : enchantments[findIndexEnchant];
        }
        setEnchantmentBonusItem(enchInIndex);

        if (penalityItem && "penality" in theItem && materialItem)
          setPenalityItem(
            reMaterialPerfectPenality(
              materialItem,
              (theItem as Armor | Shield).penality
                ? (theItem as Armor | Shield).penality
                : 0,
              enchInIndex !== 0 ? true : false
            )
          );
      }
    }
  };

  const handleAddEnchantment = (option: Enchantment) => {
    setEnchantmentItem((prev) => (prev ? [...prev, option] : [option]));
  };

  const handleDelEnchantment = (n: number) => {
    setEnchantmentItem((prev) =>
      prev ? prev.filter((_, index) => index !== n) : []
    );
  };

  const droppItem = () => {
    const emptyItemmo = droppItemsToNonItem(theItem);
    if (emptyItemmo.item) {
      setTheItem(emptyItemmo.item);
    }
    setEnchantmentBonusItem(null);
    setEnchantmentItem(null);
    setArmorTypeItem(emptyItemmo.armorType);
    setCostItem(0);
    setWeightItem(0);
    setPenalityItem(null);
    setMaxDexItem(null);
    setMaterialItem(null);
    setFailureItem(null);
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
            <DropdownComponent
              options={specificFiltro}
              onAction={handleNewItems}
            />
            <p onClick={droppItem}>
              <span style={{ color: "yellow" }}>name: </span>
              {(theItem as Armor).armorName ||
                (theItem as Shield).shieldName ||
                (theItem as Weapon).weaponName ||
                (theItem as WonderousItem).name}
            </p>
          </div>
          {"enchantment" in theItem ? (
            <div>
              <p>
                <span style={{ color: "yellow" }}>enchantment: </span>
                <span>
                  <button
                    className="rpgui-button-grey-mini"
                    onClick={handlePlusEnchantmentBonus}
                  >
                    +
                  </button>
                  <button
                    className="rpgui-button-grey-mini"
                    onClick={handleMinEnchantmentBonus}
                  >
                    -
                  </button>
                </span>
                {enchantmentBonusItem === -1
                  ? " pft"
                  : " " + enchantmentBonusItem}
              </p>
            </div>
          ) : null}
          {"enchantment" in theItem && (
            <div>
              {enchantmentItem && enchantmentItem.length > 0 ? (
                <p style={{ color: "yellow" }}>Powers:</p>
              ) : null}
              {enchantmentItem?.map((e, index) => (
                <p key={index}>
                  <span
                    style={{ color: "yellow" }}
                    onClick={() => handleDelEnchantment(index)}
                  >
                    {FormattingText(e.ability)}:
                  </span>
                  <span> {e.text}</span>
                </p>
              ))}
            </div>
          )}
          {filtroEnchantment && "enchantment" in theItem && (
            <div>
              <DropdownComponent
                options={filtroEnchantment}
                onAction={handleAddEnchantment}
              />
            </div>
          )}

          <div>
            <p>
              <span style={{ color: "yellow" }}>description: </span>
              {theItem.description}
            </p>
          </div>

          {!("wondrousType" in theItem) && (
            <div>
              <p>
                <span style={{ color: "yellow" }}>{"material: "}</span>
                {materialItem}
              </p>

              <DropdownComponent
                options={addToDrop(
                  metal.includes(
                    (theItem && (theItem as Armor | Shield | Weapon))
                      .material as string
                  )
                    ? metal
                    : wood,
                  "filter"
                )}
                onAction={(option) => handleNewItems(undefined, option)}
              />
            </div>
          )}

          {!("wondrousType" in theItem) && "armorType" in theItem && (
            <div>
              <p>
                <span style={{ color: "yellow" }}>armor type: </span>
                {armorTypeItem}
              </p>
            </div>
          )}
          <div>
            <p>
              <span style={{ color: "yellow" }}>cost: </span>
              {costItem}
            </p>
          </div>
          {"weight" in theItem && (
            <div>
              <p>
                <span style={{ color: "yellow" }}>weight: </span>
                {weightItem}
              </p>
            </div>
          )}
          {!("wondrousType" in theItem) && "penality" in theItem && (
            <div>
              <p>
                <span style={{ color: "yellow" }}>penality: </span>
                {penalityItem}
              </p>
            </div>
          )}
          {!("wondrousType" in theItem) && "maxDex" in theItem && (
            <div>
              <p>
                <span style={{ color: "yellow" }}>max dex: </span>
                {maxDexItem}
              </p>
            </div>
          )}
          {!("wondrousType" in theItem) && "failure" in theItem && (
            <div>
              <p>
                <span style={{ color: "yellow" }}>failure: </span>
                {failureItem}%
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
};
