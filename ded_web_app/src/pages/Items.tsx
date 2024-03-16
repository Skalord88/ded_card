import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Inventory, ItemsList, characterPc } from "../components/interfaces";
import { urlChar, urlItems } from "../components/url";
import {
  characterEmpty,
  emptyInventory,
  emptyItemsList
} from "../components/variables";
import { MapOfInventory } from "../components/MyComponents";

export function Items() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>(characterEmpty);

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleInventory = (newInventory: Inventory, newGold: number) => {
    setEquipment(newInventory)
    setTresure(tresure + newGold)
  }

  useEffect(() => {
    if (char?.items.length !== 0) setEquipment(char.inventory);
    if (char?.treasure) setTresure(char.treasure);
  }, [char]);

  return (
    <div>
      {tresure} gp
      <div className="container">
        <MapOfInventory
        inventory={equipment}
        items={items}
        updateInventory={handleInventory}
        />
      </div>
    </div>
  );
}
