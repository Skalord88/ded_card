import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Armor, Inventory, Item, ItemsList, characterPc } from "../components/interfaces";
import { urlChar, urlInventory, urlItems, urlItemsBuy } from "../components/url";
import {
  characterEmpty,
  emptyInventory,
  emptyItemsList
} from "../components/variables";
import { MapOfInventory } from "../components/MyComponents";

export function Items() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();
  const [items, setItems] = useState<ItemsList>(emptyItemsList);
  const [itemsToBuy, setitemsToBuy] = useState<ItemsList>(emptyItemsList);
  const [equipment, setEquipment] = useState<Inventory>();
  const [tresure, setTresure] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resItems = await axios.get(urlItems);
        setItems(resItems.data);

        const resInventory = await axios.get(urlInventory + '1');

        setEquipment(resInventory.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const sizeAndGold = (e: Item[]) => {
    let gold = 0
    if(e.length > 0){
    gold = e.reduce(
      (total, item) => total + item.cost,
      0
    ) } else {
      return gold;
    }
    return gold;
  }

  useEffect(() => {
    equipment?
    setTresure(
      tresure
      - equipment.armor.cost
      - equipment.weaponOne.cost
      - equipment.weaponTwo.cost
      - equipment.weaponThree.cost
      - equipment.weaponFour.cost
      - equipment.weaponFive.cost
      - sizeAndGold(equipment.backpack)
      - equipment.head.cost
      - equipment.neck.cost
      - equipment.arms.cost
      - sizeAndGold(equipment.hands)
      - equipment.cloth.cost
      - equipment.legs.cost
      )
    :
    setTresure(tresure)
  },[equipment])

  useEffect(() => {
    let updatedItems: ItemsList = items;
  
    updatedItems = {
      armorsList: items.armorsList.filter(item => item.cost <= tresure),
      shieldList: items.shieldList.filter(item => item.cost <= tresure),
      weaponsList: items.weaponsList.filter(item => item.cost <= tresure),
      wonderousItems: items.wonderousItems.filter(item => item.cost <= tresure)
    }

    setitemsToBuy(updatedItems);

  },[items, tresure])

  const handleInventory = (newInventory: Inventory, newGold: number) => {
    setEquipment(newInventory);
    setTresure(tresure + newGold);
  };

  useEffect(() => {
    if (char?.treasure) setTresure(char.treasure);
  }, [char]);

  const confirmItems = () => {

    console.log(equipment)

    axios.post(urlItemsBuy + charId, equipment);

    window.location.reload();
  }

  return (
    <>
      <div className="container">
        <div className="container-item">
          {tresure} gp
          <div>
            <button onClick={confirmItems}>set Items</button>
          </div>
        </div>
      </div>
      <div>
        {equipment?
        <>
        <MapOfInventory
          inventory={equipment}
          items={itemsToBuy}
          updateInventory={handleInventory}
        />
        </>
        :
        <>...loading equipment...</>
        }
      </div>
    </>
  );
}
