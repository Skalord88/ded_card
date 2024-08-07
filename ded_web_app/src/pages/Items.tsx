import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EnchantmentCost } from "../components/Enchantment/Functions/EnchantmentFunctions";
import {
  CharacterPc,
  Inventory,
  Item,
  ItemsList
} from "../components/interfaces";
import { urlChar, urlItems, urlItemsBuy } from "../components/url";
import { emptyItemsList } from "../components/variables";
import { CreateNewItems } from "../components/Items/CreateNewItems/CreateNewItems";
import { MapOfInventory } from "../components/Items/Inventory/MapOfInventory";

export const Items = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [items, setItems] = useState<ItemsList>(emptyItemsList);
  const [equipment, setEquipment] = useState<Inventory>();
  const [tresure, setTresure] = useState<number>(0);

  // in base ai soldi attuali, calcola cosa puoi comprare
  const [itemsToBuy, setItemsToBuy] = useState<ItemsList>(emptyItemsList);
  // in base a cosa hai comprato, calcola quanti soldi hai
  const [actualTresure, setActualTresure] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resItems = await axios.get(urlItems);
        setItems(resItems.data);
        setEquipment(resChar.data.inventory);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const sizeAndGold = (e: Item[]) => {
    let gold = 0;
    if (e.length > 0) {
      gold = e.reduce((total, item) => total + item.cost, 0);
    } else {
      return gold;
    }
    return gold;
  };

  // in base a cosa hai comprato, calcola quanti soldi hai
  useEffect(() => {
    let gold = 0;
    if (equipment) {
      gold =
        -EnchantmentCost([
          equipment.armor,
          equipment.shield,
          equipment.weaponOne,
          equipment.weaponTwo,
          equipment.weaponThree,
          equipment.weaponFour,
          equipment.weaponFive
        ])
        -sizeAndGold(equipment.backpack) -
        equipment.head.cost -
        equipment.neck.cost -
        equipment.arms.cost
        -sizeAndGold(equipment.hands) -
        equipment.cloth.cost -
        equipment.legs.cost;
    }

    setActualTresure(tresure + gold);
  }, [tresure, equipment]);

  // in base ai soldi attuali, calcola cosa puoi comprare
  useEffect(() => {
    let updatedItems: ItemsList = items;

    updatedItems = {
      armorsList: items.armorsList.filter((item) => EnchantmentCost([item]) <= actualTresure),
      shieldList: items.shieldList.filter((item) => EnchantmentCost([item]) <= actualTresure),
      weaponsList: items.weaponsList.filter(
        (item) => EnchantmentCost([item]) <= actualTresure
      ),
      wonderousItems: items.wonderousItems.filter(
        (item) => item.cost <= actualTresure
      )
    };

    setItemsToBuy(updatedItems);
  }, [items, actualTresure]);

  const handleInventory = (newInventory: Inventory) => {
    setEquipment(newInventory);
  };

  useEffect(() => {
    if (char?.treasure) setTresure(char.treasure);
  }, [char]);

  const confirmItems = () => {
    axios.post(urlItemsBuy + charId, equipment);
    window.location.reload();
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <p>
            {actualTresure}gp / {tresure}gp
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <button className="rpgui-button" onClick={confirmItems}>
            <p>set Items</p>
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <button className="rpgui-button">
            <Link to={"/attack/" + charId}>to Attack</Link>
          </button>
        </div>
      </div>
      
      <CreateNewItems options={items} />

      {equipment ? (
        <>
          <MapOfInventory
            inventory={equipment}
            items={itemsToBuy}
            actual={actualTresure}
            updateInventory={handleInventory}
          />
        </>
      ) : (
        <>...loading equipment...</>
      )}
    </>
  );
};
