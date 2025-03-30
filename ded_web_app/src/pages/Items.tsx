import axios from "axios";
import { useEffect, useRef, useState } from "react";
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
    (Armor | Shield | Weapon | Item | WonderousItem | WonderousItem[])[]
  >([]);
  const [tresure, setTresure] = useState<number>(0);
  const [totalCost, setTotalCost] = useState(0);
  const [itemCosts, setItemCosts] = useState<{ [key: number]: number }>({});

  const handleActualTresure = (index: number, cost: number) => {
    setItemCosts((prevCosts) => {
      const newCosts = { ...prevCosts, [index]: cost };
      const newTotal = Object.values(newCosts).reduce(
        (acc, curr) => acc + curr,
        0
      );
      setTotalCost(tresure - newTotal);
      return newCosts;
    });
  };

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

        const moddedInventoryList = [
          moddedInventory.armor,
          moddedInventory.shield,
          moddedInventory.weaponOne,
          moddedInventory.weaponTwo,
          moddedInventory.weaponThree,
          moddedInventory.weaponFour,
          moddedInventory.weaponFive,
          moddedInventory.backpack,
          moddedInventory.head,
          moddedInventory.neck,
          moddedInventory.arms,
          moddedInventory.ringOne,
          moddedInventory.ringTwo,
          moddedInventory.cloth,
          moddedInventory.belt,
          moddedInventory.legs
        ];

        setInventory(moddedInventoryList);
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
          const newAr: Armor = i as Armor;
          newInventory[n] = newAr;
        }
        if (n === 1) {
          const newSh: Shield = i as Shield;
          newInventory[n] = newSh;
        }
        if ([2, 3, 4, 5, 6].includes(n)) {
          const newWe: Weapon = i as Weapon;
          newInventory[n] = newWe;
        }
        return newInventory;
      }
      return prevInventory;
    });
  };

  const handleConfirm = () => {
    const inventoryToSend = sendItemsInInventory(inventory);

    axios.post(urlItemsBuy + charId, inventoryToSend);
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

  if (!inventory) {
    return (
      <div>
        <p>...loading inventory...</p>
      </div>
    );
  } else {
    return (
      <div>
        <p></p>
        <h1 className="rpgui-container-framed-golden-2">Inventory</h1>
        <div>
          <p>
            <span>
              <button onClick={handleConfirm}>
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
          <div
            className="rpgui-container-framed-grey"
            style={{ maxHeight: 780 }}
          >
            <InventoryIcons>
              <div onClick={() => scrollToItem(10)}>
                <InventoryIcon
                  classe={"head"}
                  text={"head"}
                  top={5}
                  left={20}
                />
              </div>
              <div onClick={() => scrollToItem(11)}>
                <InventoryIcon
                  classe={"neck"}
                  text={"neck"}
                  top={5}
                  left={70}
                />
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
              <div onClick={() => scrollToItem(1)}>
                <InventoryIcon
                  classe={"cloth"}
                  text={"cloth"}
                  top={20}
                  left={70}
                />
              </div>
              <div onClick={() => scrollToItem(1)}>
                <InventoryIcon
                  classe={"arms"}
                  text={"arms"}
                  top={35}
                  left={30}
                />
              </div>
              <div onClick={() => scrollToItem(1)}>
                <InventoryIcon
                  classe={"hands0"}
                  text={"ring"}
                  top={50}
                  left={30}
                />
              </div>
              <div onClick={() => scrollToItem(1)}>
                <InventoryIcon
                  classe={"hands1"}
                  text={"ring"}
                  top={50}
                  left={70}
                />
              </div>
              <div onClick={() => scrollToItem(1)}>
                <InventoryIcon
                  classe={"belt"}
                  text={"belt"}
                  top={65}
                  left={70}
                />
              </div>
              <div onClick={() => scrollToItem(4)}>
                <InventoryIcon
                  classe={"legs"}
                  text={"legs"}
                  top={80}
                  left={70}
                />
              </div>
              <div onClick={() => scrollToItem(2)}>
                <InventoryIcon classe={"sword"} text={"I"} left={5} top={20} />
              </div>
              <div onClick={() => scrollToItem(3)}>
                <InventoryIcon classe={"sword"} text={"II"} left={5} top={35} />
              </div>
              <div onClick={() => scrollToItem(4)}>
                <InventoryIcon
                  classe={"sword"}
                  text={"III"}
                  left={5}
                  top={50}
                />
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
              inventory.map((i, index) =>
                Array.isArray(i) ? (
                  <div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className="rpgui-container-framed-grey"
                  >
                    {index === 7 &&
                      i.map((element) => (
                        <ItemInventoryComponent
                          n={index}
                          item={element}
                          sizeId={0}
                          filtro={filtroList}
                          onAction={handleChangeItem}
                          onChange={(cost) => handleActualTresure(index, cost)}
                        />
                      ))}
                    {/* {index === 11 && (
                      <div>
                        <ItemInventoryComponent
                          n={index}
                          item={i[0]}
                          sizeId={0}
                          filtro={filtroList}
                          onAction={handleChangeItem}
                          onChange={(cost) => handleActualTresure(index, cost)}
                        />
                        <ItemInventoryComponent
                          n={index}
                          item={i[1]}
                          sizeId={0}
                          filtro={filtroList}
                          onAction={handleChangeItem}
                          onChange={(cost) => handleActualTresure(index, cost)}
                        />
                      </div>
                    )} */}
                  </div>
                ) : (
                  <div
                    key={index}
                    ref={(el) => (itemRefs.current[index] = el)}
                    className="rpgui-container-framed-grey"
                  >
                    <ItemInventoryComponent
                      n={index}
                      item={i}
                      sizeId={0}
                      filtro={filtroList}
                      onAction={handleChangeItem}
                      onChange={(cost) => handleActualTresure(index, cost)}
                    />
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    );
  }
};

{
  /* {char && filtroList && choosen && (
              <div>
                <ItemInventoryComponent
                  n={choosen.n}
                  item={choosen.item}
                  sizeId={char?.race.size.id}
                  filtro={filtroList}
                  onAction={handleChangeItem}
                  onChange={(cost) => handleActualTresure(choosen.n, cost)}
                />
              </div>
            )} */
}

export type ItemInventoryProps = {
  n: number;
  item: Item | Armor | Shield | Weapon | WonderousItem;
  sizeId: number;
  filtro: FiltroItems;
  onAction: (
    n: number,
    item: Item | Armor | Shield | Weapon | WonderousItem
  ) => void;
  onChange: (cost: number) => void;
};

export const ItemInventoryComponent: React.FC<ItemInventoryProps> = ({
  n,
  item,
  sizeId,
  filtro,
  onAction,
  onChange
}) => {
  const metal = ["METAL", "MITHRAL", "ADAMANTINE"];
  const wood = ["WOOD", "DARKWOOD"];
  const enchantments = [0, -1, 1, 2, 3, 4, 5];

  const [theItem, setTheItem] = useState<
    Item | Armor | Shield | Weapon | WonderousItem
  >();
  const [materialItem, setMaterialItem] = useState<string | null>();
  const [armorTypeItem, setArmorTypeItem] = useState<string | null>();
  const [costItem, setCostItem] = useState<number | null>();
  const [weightItem, setWeightItem] = useState<number | null>();
  const [penalityItem, setPenalityItem] = useState<number | null>();
  const [maxDexItem, setMaxDexItem] = useState<number | null>();
  const [enchantmentBonusItem, setEnchantmentBonusItem] = useState<
    number | null
  >();
  const [enchantmentItem, setEnchantmentItem] = useState<
    Enchantment[] | null
  >();
  const [failureItem, setFailureItem] = useState<number | null>();

  const [filtroEnchantment, setFiltroEnchantment] = useState<itemInDrop[]>();
  const specificFiltro: itemInDrop[] = specificFilter(n, filtro);

  useEffect(() => {
    setTheItem(item);
    setMaterialItem("material" in item ? item.material : null);
    setArmorTypeItem("armorType" in item ? item.armorType : null);
    setCostItem("cost" in item ? item.cost : null);
    setWeightItem("weight" in item ? item.weight : null);
    setPenalityItem(
      "penality" in item
        ? reMaterialPerfectPenality(
            item.material ? item.material : "",
            item.penality ? item.penality : 0,
            item.enchantmentBonus !== 0 ? true : false
          )
        : null
    );
    setMaxDexItem(
      "maxDex" in item
        ? reMaterialMaxDex(
            item.material ? item.material : "",
            item.maxDex ? item.maxDex : 0
          )
        : null
    );
    setEnchantmentBonusItem(
      "enchantmentBonus" in item && item.enchantmentBonus
        ? item.enchantmentBonus
        : null
    );
    setEnchantmentItem(
      "enchantment" in item && item.enchantment ? item.enchantment : null
    );
    setFailureItem(
      "failure" in item && item.failure
        ? reMaterialFailure(
            item.material ? item.material : "",
            item.failure ? item.failure : 0
          )
        : null
    );
    if (enchantmentBonusItem && enchantmentBonusItem > 0) {
      const specificFiltro: itemInDrop[] = filtro.enchantments.filter(
        (e) =>
          ((e.item as Enchantment).itemType === "ARMOR_SHIELD" &&
            ("armorName" in item || "shieldName" in item)) ||
          (e.item as Enchantment).itemType === item.itemType
      );
      setFiltroEnchantment(specificFiltro);
    }
  }, [item]);

  const [newItem, setNewItem] = useState<
    Item | Armor | Shield | Weapon | WonderousItem
  >();

  const handleNewItems = (
    optionItem?: Item | Armor | Shield | Weapon | WonderousItem | undefined,
    optionMaterial?: string
  ) => {
    if (optionItem && typeof optionItem === "object") {
      if ("armorName" in optionItem) {
        setTheItem(optionItem);
        setMaterialItem(optionItem.material);
        setArmorTypeItem(optionItem.armorType);
        setPenalityItem(optionItem.penality);
        setEnchantmentBonusItem(
          optionItem.enchantmentBonus ? optionItem.enchantmentBonus : 0
        );
        setMaxDexItem(optionItem.maxDex);
        setFailureItem(optionItem.failure);
      }
      if ("shieldName" in optionItem) {
        setTheItem(optionItem);

        setEnchantmentBonusItem(
          optionItem.enchantmentBonus ? optionItem.enchantmentBonus : 0
        );
      }
      if ("weaponName" in optionItem) {
        setTheItem(optionItem);
        setArmorTypeItem(null);

        setEnchantmentBonusItem(
          optionItem.enchantmentBonus ? optionItem.enchantmentBonus : 0
        );
      }
      if(optionItem.itemType === "WONDROUS_ITEM"){
        setTheItem(optionItem);
      }
      setCostItem(optionItem.cost);
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

  useEffect(() => {
    if (theItem && ("armorName" in theItem || "shieldName" in theItem)) {
      const costo: number = calculateCost(
        "Armor",
        theItem.cost,
        enchantmentItem?.flatMap((en) => en.cost) ?? [],
        enchantmentBonusItem ?? 0,
        materialItem ?? "",
        weightItem ?? 0,
        theItem.armorType
      );
      setCostItem(costo);
    }
    if (theItem && "weaponName" in theItem) {
      const costo: number = calculateCost(
        "Weapon",
        theItem.cost,
        enchantmentItem?.flatMap((en) => en.cost) ?? [],
        enchantmentBonusItem ?? 0,
        materialItem ?? "",
        weightItem ?? 0,
        theItem.itemType
      );
      setCostItem(costo);
    }
  }, [
    theItem,
    enchantmentBonusItem,
    materialItem,
    weightItem,
    enchantmentItem
  ]);

  useEffect(() => {
    if (costItem && costItem !== undefined) {
      onChange(costItem);
    }
  }, [costItem]);

  useEffect(() => {
    if (theItem) {
      if (
        "enchantmentBonus" in theItem &&
        "material" in theItem &&
        "itemId" in theItem
      ) {
        const itemToSend: Armor | Shield | Weapon = {
          ...theItem,
          itemId: theItem.id ?? 0, // Ensure itemId is always a number
          enchantmentBonus: enchantmentBonusItem ? enchantmentBonusItem : 0,
          material: materialItem ? materialItem : null
        };
        setNewItem({ ...itemToSend });
      }
      // if (theItem as WonderousItem) {
      //   const itemToSend: Item | WonderousItem = { ...theItem };
      //   setNewItem({...itemToSend});
      // }
    }
  }, [enchantmentBonusItem, materialItem, theItem, costItem]);

  const handleAddEnchantment = (option: Enchantment) => {
    if (enchantmentItem) {
      let enchantmentList: Enchantment[] = enchantmentItem;
      enchantmentList.push(option);
      setEnchantmentItem([...enchantmentItem]);
    }
  };

  const handleDelEnchantment = (n: number) => {
    if (enchantmentItem) {
      let enchantmentList: Enchantment[] = [...enchantmentItem];
      enchantmentList.splice(n, 1);
      setEnchantmentItem([...enchantmentList]);
    }
  };

  const confirmItem = () => {
    if (newItem) onAction(n, newItem);
  };

  const numerini: string[] = ["I", "II", "III", "IV", "V"];

  return (
    <div>
      {theItem && (
        <h2>
          {"armorName" in theItem ? "armor" : null}
          {"shieldName" in theItem ? "shield" : null}
          {"weaponName" in theItem ? "weapon " + numerini[n - 2] : null}
          {n === 7 ? "backpack" : null}
          {n === 8 ? "head" : null}
          {n === 9 ? "neck" : null}
          {n === 10 ? "arms" : null}
          {n === 11 ? "ring" : null}
          {n === 12 ? "ring" : null}
          {n === 13 ? "cloth" : null}
          {n === 14 ? "belt" : null}
          {n === 15 ? "legs" : null}
        </h2>
      )}
      <div>
        <div>
          <DropdownComponent
            options={
              specificFiltro
            }
            onAction={handleNewItems}
          />
          <p>
            <span style={{ color: "yellow" }}>name: </span>
            {theItem &&
              ((theItem as Armor).armorName ||
                (theItem as Shield).shieldName ||
                (theItem as Weapon).weaponName ||
                (theItem as WonderousItem).name)}
          </p>
        </div>
        {theItem && (theItem as WonderousItem).itemType !== "WONDROUS_ITEM" && <div>
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
            {enchantmentBonusItem === -1 ? " pft" : " " + enchantmentBonusItem}
          </p>
        </div>}
        {theItem && (theItem as WonderousItem).itemType !== "WONDROUS_ITEM" && <div>
          <p>Powers</p>
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
        </div>}
        {filtroEnchantment && (
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
            {theItem && theItem.description}
          </p>
        </div>
        <div>
          {materialItem ? (
            <p>
              <span style={{ color: "yellow" }}>{"material: "}</span>
              {materialItem}
            </p>
          ) : null}
          {theItem && (theItem as WonderousItem).itemType !== "WONDROUS_ITEM" &&
          (theItem as Armor | Shield | Weapon).material !== "LEATHER" ? (
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
          ) : null}
        </div>

        {armorTypeItem ? (
          <div>
            <p>
              <span style={{ color: "yellow" }}>armor type: </span>
              {armorTypeItem}
            </p>
          </div>
        ) : null}
        <div>
          <p>
            <span style={{ color: "yellow" }}>cost: </span>
            {costItem}
          </p>
        </div>
        {weightItem ? (
          <div>
            <p>
              <span style={{ color: "yellow" }}>weight: </span>
              {weightItem}
            </p>
          </div>
        ) : null}
        {penalityItem || penalityItem === 0 ? (
          <div>
            <p>
              <span style={{ color: "yellow" }}>penality: </span>
              {penalityItem}
            </p>
          </div>
        ) : null}
        {maxDexItem || maxDexItem === 0 ? (
          <div>
            <p>
              <span style={{ color: "yellow" }}>max dex: </span>
              {maxDexItem}
            </p>
          </div>
        ) : null}
        {failureItem || failureItem === 0 ? (
          <div>
            <p>
              <span style={{ color: "yellow" }}>failure: </span>
              {failureItem}%
            </p>
          </div>
        ) : null}
        <div>
          <button onClick={confirmItem}>
            <p>confirm</p>
          </button>
        </div>
      </div>
    </div>
  );
};
