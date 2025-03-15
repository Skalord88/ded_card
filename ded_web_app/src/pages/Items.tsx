import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Armor,
  CharacterPc,
  EnchantedItem,
  Inventory,
  Item,
  ItemsList,
  Shield,
  Weapon,
  WonderousItem,
  InventoryToSend,
  ItemToSend
} from "../components/interfaces";
import { urlChar, urlItems, urlItemsBuy } from "../components/url";
import { emptyItemsList } from "../components/variables";
import { CreateNewItems } from "../components/Items/CreateNewItems/CreateNewItems";
import { MapOfInventory } from "../components/Items/Inventory/MapOfInventory";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import {
  calculateCost,
  modifyInventory
} from "../components/Items/Inventory/function";
import { reWeightItem } from "../components/Size/function";
import {
  reMaterialArmType,
  reMaterialFailure,
  reMaterialMaxDex,
  reMaterialPerfectPenality,
  reMaterialWeight
} from "../components/Items/Material/function";
import { InventoryIcon, InventoryIcons } from "../components/Icon/icons";

export type FiltroItems = {
  armors: itemInDrop[];
  shields: itemInDrop[];
  weapons: itemInDrop[];
};

export const Items = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [filtroList, setFiltroList] = useState<FiltroItems>();
  const [inventory, setInventory] = useState<
    (Armor | Shield | Weapon | Item | WonderousItem)[]
  >([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const charDb: CharacterPc = resChar.data;
        setChar(charDb);

        const resItems = await axios.get(urlItems);
        const allItems: ItemsList = await resItems.data;

        if (allItems) {
          const a = allItems.armorsList;
          const s = allItems.shieldList;
          const w = allItems.weaponsList;

          const filtro: FiltroItems = {
            armors: addToDrop(a, "items"),
            shields: addToDrop(s, "items"),
            weapons: addToDrop(w, "items")
          };

          setFiltroList(filtro);
        }

        const moddedInventory = modifyInventory(
          charDb.race.size.id,
          charDb.inventory
        );

        setInventory([
          moddedInventory.armor,
          moddedInventory.shield,
          moddedInventory.weaponOne,
          moddedInventory.weaponTwo,
          moddedInventory.weaponThree,
          moddedInventory.weaponFour,
          moddedInventory.weaponFive
        ]);
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
          const newAr: Armor = i as Armor
          newInventory[n] = newAr;
        }
        if (n === 1) {
          const newSh: Shield = i as Shield
          newInventory[n] = newSh;
        }
        if ([2, 3, 4, 5, 6].includes(n)) {
          const newWe: Weapon = i as Weapon
          newInventory[n] = newWe;
        }
        return newInventory;
      }
      return prevInventory;
    });
  };

  const [choosen, setChoosen] = useState<
    | { n: number; item: Armor }
    | { n: number; item: Shield }
    | { n: number; item: Weapon }
    | { n: number; item: Item }
  >();

  const handleChangeChoosen = (
    num: number,
    i: Armor | Shield | Weapon | Item
  ) => {
    if (i) {
      setChoosen({ n: num, item: { ...i } });
    }
  };

  const handleConfirm = () => {
    // axios.post(urlFeats + "/" + charId, [...list, ...listBonus]);
    // window.location.reload();
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
          <button onClick={handleConfirm}>
            <p>confirm</p>
          </button>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            width: "100%"
          }}
        >
          <div className="rpgui-container-framed-grey">
            <InventoryIcons>
              <InventoryIcon classe={"head"} text={"head"} left={30} />
              <InventoryIcon classe={"neck"} text={"neck"} left={70} />
              <InventoryIcon
                classe={"cloth"}
                text={"cloth"}
                top={20}
                left={30}
              />
              <div onClick={() => handleChangeChoosen(0, inventory[0])}>
                <InventoryIcon
                  classe={"armor"}
                  text={"armor"}
                  top={20}
                  left={70}
                />
              </div>
              <div onClick={() => handleChangeChoosen(1, inventory[1])}>
                <InventoryIcon
                  classe={"shield"}
                  text={"shield"}
                  top={40}
                  left={70}
                />
              </div>
              <InventoryIcon classe={"arms"} text={"arms"} top={40} left={30} />
              <InventoryIcon
                classe={"hands0"}
                text={"ring"}
                top={60}
                left={30}
              />
              <InventoryIcon
                classe={"hands1"}
                text={"ring"}
                top={60}
                left={70}
              />
              <InventoryIcon classe={"legs"} text={"legs"} top={80} left={70} />
              <div onClick={() => handleChangeChoosen(2, inventory[2])}>
                <InventoryIcon classe={"sword"} text={"I"} left={10} />
              </div>
              <div onClick={() => handleChangeChoosen(3, inventory[3])}>
                <InventoryIcon
                  classe={"sword"}
                  text={"II"}
                  left={10}
                  top={20}
                />
              </div>
              <div onClick={() => handleChangeChoosen(4, inventory[4])}>
                <InventoryIcon
                  classe={"sword"}
                  text={"III"}
                  left={10}
                  top={40}
                />
              </div>
              <div onClick={() => handleChangeChoosen(5, inventory[5])}>
                <InventoryIcon
                  classe={"sword"}
                  text={"IV"}
                  left={10}
                  top={60}
                />
              </div>
              <div onClick={() => handleChangeChoosen(6, inventory[6])}>
                <InventoryIcon classe={"sword"} text={"V"} left={10} top={80} />
              </div>
            </InventoryIcons>
          </div>

          <div
            className="rpgui-container-framed-grey"
            style={{
              overflowY: "auto"
            }}
          >
            {char && filtroList && choosen && (
              <div>
                <ItemInventoryComponent
                  n={choosen.n}
                  item={choosen.item}
                  sizeId={char?.race.size.id}
                  filtro={filtroList}
                  onAction={handleChangeItem}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export type ItemInventoryProps = {
  n: number;
  item: Item | Armor | Shield | Weapon | WonderousItem;
  sizeId: number;
  filtro: FiltroItems;
  onAction: (
    n: number,
    item: Item | Armor | Shield | Weapon | WonderousItem
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
  const [failureItem, setFailureItem] = useState<number | null>();

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
    setFailureItem(
      "failure" in item && item.failure
        ? reMaterialFailure(
            item.material ? item.material : "",
            item.failure ? item.failure : 0
          )
        : null
    );
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
    if (theItem && ("armorName" in theItem || "shieldName" in theItem))
      setCostItem(
        calculateCost(
          "Armor",
          theItem.cost,
          enchantmentBonusItem ?? 0,
          materialItem ?? "",
          weightItem ?? 0,
          theItem.armorType
        )
      );
    if (theItem && "weaponName" in theItem)
      setCostItem(
        calculateCost(
          "Weapon",
          theItem.cost,
          enchantmentBonusItem ?? 0,
          materialItem ?? "",
          theItem.weight ?? 0,
          theItem.itemType
        )
      );
  }, [theItem, enchantmentBonusItem, materialItem, weightItem]);

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
        setNewItem({...itemToSend});
      }
      // if (theItem as WonderousItem) {
      //   const itemToSend: Item | WonderousItem = { ...theItem };
      //   setNewItem({...itemToSend});
      // }
    }
  }, [enchantmentBonusItem, materialItem, theItem]);

  const confirmItem = () => {
    if (newItem) onAction(n, newItem);
  };

  const numerini: string[] = ["I", "II", "III", "IV", "V"];

  return (
    <div>
      {theItem && (
        <h2>
          {"armorName" in theItem ? "ARMOR" : null}
          {"shieldName" in theItem ? "SHIELD" : null}
          {"weaponName" in theItem ? "WEAPON " + numerini[n - 2] : null}
        </h2>
      )}
      <div>
        <div>
          <DropdownComponent
            options={
              n === 0
                ? filtro.armors
                : n === 1
                ? filtro.shields
                : filtro.weapons
            }
            onAction={handleNewItems}
          />
          <p>
            <span style={{ color: "yellow" }}>name: </span>
            {theItem &&
              ((theItem as Armor).armorName ||
                (theItem as Shield).shieldName ||
                (theItem as Weapon).weaponName)}
          </p>
        </div>
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
            {enchantmentBonusItem === -1 ? " pft" : " " + enchantmentBonusItem}
          </p>
        </div>
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
          {theItem &&
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
