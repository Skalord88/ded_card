import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Armor,
  CharacterPc,
  EnchantedItems,
  Inventory,
  Item,
  ItemsList,
  Shield,
  Weapon,
  WonderousItem
} from "../components/interfaces";
import { urlChar, urlItems, urlItemsBuy } from "../components/url";
import { emptyItemsList } from "../components/variables";
import { CreateNewItems } from "../components/Items/CreateNewItems/CreateNewItems";
import { MapOfInventory } from "../components/Items/Inventory/MapOfInventory";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { modifyInventory } from "../components/Items/Inventory/function";
import { reWeightItem } from "../components/Size/function";
import {
  reMaterialArmType,
  reMaterialFailure,
  reMaterialMaxDex,
  reMaterialPerfectPenality,
  reMaterialWeight
} from "../components/Items/Material/function";
import { FormattingText } from "../components/Formatting/Function";

export type InventoryItems = (
  | { n: number; item: Armor }
  | { n: number; item: Shield }
  | { n: number; item: Weapon }
  | { n: number; item: Item }
)[];

export type FiltroItems = {
  armors: itemInDrop[];
  shields: itemInDrop[];
  weapons: itemInDrop[];
};

export const Items = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();
  const [filtroList, setFiltroList] = useState<FiltroItems>();
  const [inventory, setInventory] = useState<InventoryItems>();

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
          { n: 0, item: moddedInventory.armor },
          { n: 1, item: moddedInventory.shield },
          { n: 2, item: moddedInventory.weaponOne },
          { n: 3, item: moddedInventory.weaponTwo },
          { n: 4, item: moddedInventory.weaponThree },
          { n: 5, item: moddedInventory.weaponFour },
          { n: 6, item: moddedInventory.weaponFive }
        ]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChangeItem = (
    n: number,
    item: Armor | Shield | Weapon | Item
  ) => {
    if (item) {
      console.log(item);
      if (inventory) {
        const newInventory = inventory.map((i) => {
          if (i.n === n) {
            return { ...i, item: item };
          }
          return i;
        });
        setInventory(newInventory);
      }
    }
    // if (n === 0 && inventory) {

    //   const newItem: Armor = item as Armor;
    //   const newInventory = inventory.map((i) => {
    //     if (i.n === 0) {
    //       return { ...i, item: newItem };
    //     }
    //     return i;
    //   });

    //   console.log(n, item, newInventory);

    //   setInventory(newInventory);
    // }
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
        {char &&
          filtroList &&
          inventory
            .sort((i) => i.n)
            .map((item, index) => (
              <div className="rpgui-container-framed-grey" key={index}>
                <ItemInventoryComponent
                  n={item.n}
                  item={item.item}
                  sizeId={char?.race.size.id}
                  filtro={filtroList}
                  onAction={handleChangeItem}
                />
              </div>
            ))}
      </div>
    );
  }
};

export type ItemInventoryProps = {
  n: number;
  item: Armor | Shield | Weapon | Item;
  sizeId: number;
  filtro: FiltroItems;
  onAction: (n: number, item: Armor | Shield | Weapon | Item) => void;
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

  // const penalityInItem =
  //   "penality" in item
  //     ? reMaterialPerfectPenality(
  //         item.material ? item.material : "",
  //         item.penality ? item.penality : 0,
  //         item.enchantmentBonus !== 0 ? true : false
  //       )
  //     : null;

  // if (item.name === "elven chain +2")
  //   console.log("penalityInItem: " + item.name + ", " + penalityInItem);

  const [theItem, setTheItem] = useState<
    Item | Armor | Shield | Weapon | WonderousItem
  >(item);
  const [materialItem, setMaterialItem] = useState<string | null>(
    "material" in item ? item.material : null
  );
  const [armorTypeItem, setArmorTypeItem] = useState<string | null>(
    "armorType" in item ? item.armorType : null
  );
  const [costItem, setCostItem] = useState<number | null>(
    "cost" in item ? item.cost : null
  );
  const [weightItem, setWeightItem] = useState<number | null>(
    "weight" in item ? item.weight : null
  );
  const [penalityItem, setPenalityItem] = useState<number | null>(
    "penality" in item
      ? reMaterialPerfectPenality(
          item.material ? item.material : "",
          item.penality ? item.penality : 0,
          item.enchantmentBonus !== 0 ? true : false
        )
      : null
  );
  const [maxDexItem, setMaxDexItem] = useState<number | null>(
    "maxDex" in item
      ? reMaterialMaxDex(
          item.material ? item.material : "",
          item.maxDex ? item.maxDex : 0
        )
      : null
  );
  const [enchantmentBonusItem, setEnchantmentBonusItem] = useState<
    number | null
  >(
    "enchantmentBonus" in item && item.enchantmentBonus
      ? item.enchantmentBonus
      : null
  );
  const [failureItem, setFailureItem] = useState<
    number | null
  >(
    "failure" in item && item.failure
    ? reMaterialFailure(
      item.material ? item.material : "",
      item.failure ? item.failure : 0
    )
  : null
  );

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
        setFailureItem(optionItem.failure)
      }
      if ("shieldName" in optionItem) {
        setTheItem(optionItem);

        setEnchantmentBonusItem(
          optionItem.enchantmentBonus ? optionItem.enchantmentBonus : 0
        );
      }
      if ("weaponName" in optionItem) {
        setTheItem(optionItem);

        setEnchantmentBonusItem(
          optionItem.enchantmentBonus ? optionItem.enchantmentBonus : 0
        );
      }
      setCostItem(optionItem.cost);
      setWeightItem(optionItem.weight);
    }

    if (optionMaterial && typeof optionMaterial === "string") {
      if ("armorType" in theItem) {
        setMaterialItem(optionMaterial);
        setArmorTypeItem(reMaterialArmType(optionMaterial, theItem.armorType));
        setPenalityItem(
          reMaterialPerfectPenality(
            optionMaterial,
            theItem.penality,
            theItem.enchantmentBonus !== 0 ? true : false
          )
        );
        setMaxDexItem(reMaterialMaxDex(optionMaterial, theItem.maxDex));
        setFailureItem(reMaterialFailure(optionMaterial, theItem.failure))
      }

      if ("weight" in theItem) {
        setWeightItem(reMaterialWeight(optionMaterial, theItem.weight));
      }
    }
  };

  const handlePlusEnchantmentBonus = () => {
    if ("enchantmentBonus" in theItem) {
      let findIndexEnchant: number =
        enchantmentBonusItem !== null
          ? enchantments.findIndex(
              (enchantment) => enchantment === enchantmentBonusItem
            )
          : -1;

      if (findIndexEnchant !== -1) {
        const enchInIndex: number =
          enchantments[findIndexEnchant + 1] < 6
            ? enchantments[findIndexEnchant + 1]
            : enchantments[findIndexEnchant];
        setEnchantmentBonusItem(enchInIndex);
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
    if ("enchantmentBonus" in theItem) {
      let findIndexEnchant: number =
        enchantmentBonusItem !== null
          ? enchantments.findIndex(
              (enchantment) => enchantment === enchantmentBonusItem
            )
          : -1;

      if (findIndexEnchant !== -1) {
        const enchInIndex: number =
          enchantments[findIndexEnchant - 1] > -2
            ? enchantments[findIndexEnchant - 1]
            : enchantments[findIndexEnchant];
        setEnchantmentBonusItem(enchInIndex);

        if (penalityItem)
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

  return (
    <div>
      <h3>{theItem.name}</h3>
      <DropdownComponent
        options={
          n === 0 ? filtro.armors : n === 1 ? filtro.shields : filtro.weapons
        }
        onAction={handleNewItems}
      />
      <p>
        <span style={{ color: "yellow" }}>name: </span>
        {(theItem as Armor).armorName ||
          (theItem as Shield).shieldName ||
          (theItem as Weapon).weaponName}
      </p>
      <p>
        <span style={{ color: "yellow" }}>enchantment: </span>
        <span>
          <button
            className="rpgui-button-golden-mini"
            onClick={handlePlusEnchantmentBonus}
          >
            +
          </button>
          <button
            className="rpgui-button-golden-mini"
            onClick={handleMinEnchantmentBonus}
          >
            -
          </button>
        </span>
        {enchantmentBonusItem === -1 ? " pft" : " " + enchantmentBonusItem}
      </p>
      <p>
        <span style={{ color: "yellow" }}>description: </span>
        {theItem.description}
      </p>
      {materialItem ? (
        <p>
          <span style={{ color: "yellow" }}>{"material: "}</span>
          {materialItem}
        </p>
      ) : null}
      {(theItem as Armor | Shield | Weapon).material !== "LEATHER" ? (
        <DropdownComponent
          options={addToDrop(
            metal.includes(
              (theItem as Armor | Shield | Weapon).material as string
            )
              ? metal
              : wood,
            "filter"
          )}
          onAction={(option) => handleNewItems(undefined, option)}
        />
      ) : null}
      {armorTypeItem ? (
        <p>
          <span style={{ color: "yellow" }}>armor type: </span>
          {armorTypeItem}
        </p>
      ) : null}
      <p>
        <span style={{ color: "yellow" }}>cost: </span>
        {costItem}
      </p>
      {weightItem ? (
        <p>
          <span style={{ color: "yellow" }}>weight: </span>
          {weightItem}
        </p>
      ) : null}
      {penalityItem || penalityItem === 0 ? (
        <p>
          <span style={{ color: "yellow" }}>penality: </span>
          {penalityItem}
        </p>
      ) : null}
      {maxDexItem || maxDexItem === 0 ? (
        <p>
          <span style={{ color: "yellow" }}>max dex: </span>
          {maxDexItem}
        </p>
      ) : null}
      {failureItem || failureItem === 0 ? (
        <p>
          <span style={{ color: "yellow" }}>max dex: </span>
          {failureItem}%
        </p>
      ) : null}
    </div>
  );
};
