import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item, ItemsList, characterPc } from "../components/interfaces";
import { urlChar, urlItems } from "../components/url";

export function Items() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();

  const [items, setItems] = useState<ItemsList>();

  const [equipment, setEquipment] = useState<Item[]>([]);
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

  useEffect(() => {

    if(char?.items) setEquipment(char.items)

    if(char?.treasure) setTresure(char?.treasure);
  },[char])

  const handleBuy = (e: [number, Item]) => {

    setTresure(tresure - e[0]);

    let equip: Item[] = equipment;
    equip.push(e[1])
    setEquipment(equip);

  }

  return (
    <>
    <div>quanti soldi ho? {tresure}</div>
      <div className="container">
        
        <div className="column">
          Armors:
          {equipment.map(item => {
            return(
              <>
              <div>{item.itemType === "ARMOR"?
            item.name
            :
            <>...select an armor...</>  
            }</div>
              </>
            )
          })}
          {items?.armorsList.map((armor) => {
            return (
              <>
                <div>
                  <button
                  onClick={() => handleBuy([armor.cost, armor])}
                  >+</button>{armor.name} / {armor.itemType} / {armor.description}
                </div>
              </>
            );
          })}
        </div>
        <div className="column">
          Weapons:
          {items?.weaponsList.map((weapon) => {
            return (
              <>
                <div>
                  {weapon.name} / {weapon.description}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
