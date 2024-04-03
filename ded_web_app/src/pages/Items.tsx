import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapOfInventory } from "../components/MyComponents";
import { CharacterPc, Inventory, Item, ItemsList } from "../components/interfaces";
import { urlChar, urlInventory, urlItems, urlItemsBuy } from "../components/url";
import {
  emptyItemsList
} from "../components/variables";

export function Items() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [items, setItems] = useState<ItemsList>(emptyItemsList);
  const [itemsToBuy, setitemsToBuy] = useState<ItemsList>(emptyItemsList);
  const [equipment, setEquipment] = useState<Inventory>();
  const [tresure, setTresure] = useState<number>(0);
  const [actualTresure, setActualTresure] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resItems = await axios.get(urlItems);
        setItems(resItems.data);

        const resInventory = await axios.get(
          urlInventory + charId
        );
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
    let gold = 0
    if(equipment){
      gold =
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
    }

    setActualTresure(tresure + gold)

  }, [tresure, equipment])

  useEffect(() => {
    let updatedItems: ItemsList = items;
  
    updatedItems = {
      armorsList: items.armorsList.filter(item => item.cost <= actualTresure),
      shieldList: items.shieldList.filter(item => item.cost <= actualTresure),
      weaponsList: items.weaponsList.filter(item => item.cost <= actualTresure),
      wonderousItems: items.wonderousItems.filter(item => item.cost <= actualTresure)
    }

    setitemsToBuy(updatedItems);

  },[items, actualTresure])

  const handleInventory = (newInventory: Inventory) => {
    setEquipment(newInventory);
  };

  useEffect(() => {
    if (char?.treasure) setTresure(char.treasure);
  }, [char]);

  const confirmItems = () => {

    axios.post(urlItemsBuy + charId, equipment);

    window.location.reload();
  }


  return (
    <>
      <div className="container">
        <div className="container-item">
          {actualTresure}gp / {tresure}gp
          <div>
            <button onClick={confirmItems}>set Items</button>
          </div>
        </div>
        <div className="container-item">
          <div>
            <button>
              <Link to={'/attack/'+ charId}>to Attack</Link>
            </button></div>
        </div>
      </div>
      <div>
        {equipment?
        <>
        <MapOfInventory
          inventory={equipment}
          items={itemsToBuy}
          actual={actualTresure}
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
