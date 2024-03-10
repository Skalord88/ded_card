import { useParams } from "react-router-dom";
import { Armor, Item, ItemsList, Weapon, characterPc } from "../components/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlChar, urlItems } from "../components/url";

export function Items() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();

  const [items, setItems] = useState<ItemsList>();
  const [armors, setArmors] = useState<Armor[]>([]);
  const [weapons, setWeapons] = useState<Weapon[]>([]);

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

    items?.armorsList !== undefined?
    setArmors(items?.armorsList)
    : setArmors([]);

  },[items])

  return (
    <>
      <div className="container">
        <div>{char?.characterName}</div>
        <div>{items?.armorsList.map(armor => {
          return(
            <>
            <div>{armor.name}</div>
            </>
          )
        })}</div>       
      </div>
    </>
  );
}
