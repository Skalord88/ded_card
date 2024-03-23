import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Armor, Inventory, ItemsList, characterPc } from "../components/interfaces";
import { urlChar, urlInventory, urlItems } from "../components/url";
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
  const [equipment, setEquipment] = useState<Inventory>(emptyInventory);
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

  useEffect(() => {
    // let inv: Inventory = emptyInventory;
    // console.log(char?.inventory)

    // setEquipment(currentInventory => {
    //   currentInventory.armor = char?.inventory.armor as Armor
    //   return currentInventory;
    // })
  },[char])

  const handleInventory = (newInventory: Inventory, newGold: number) => {
    setEquipment(newInventory);
    setTresure(tresure + newGold);
  };

  useEffect(() => {
    if (char?.treasure) setTresure(char.treasure);
  }, [char]);

  return (
    <>
      <div className="container">
        <div className="container-item">{tresure} gp</div>
      </div>
      <div>
        <MapOfInventory
          inventory={equipment}
          items={items}
          updateInventory={handleInventory}
        />
      </div>
    </>
  );
}
