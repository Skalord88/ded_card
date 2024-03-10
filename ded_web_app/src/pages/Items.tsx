import { useParams } from "react-router-dom";
import { Armor, Item, Weapon, characterPc } from "../components/interfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { urlChar, urlItems } from "../components/url";

export function Items() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();

  const [items, setItems] = useState<Item[]>([]);
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

  return (
    <>
      <div className="container">
        <div>{char?.characterName}</div>
        <div>
          Armors:
          {armors.map((armor) => {
            return <ul>{armor.name}</ul>;
          })}
        </div>
        <div>
          Weapons:
          {weapons.map((weapon) => {
            return <ul>{weapon.name}</ul>;
          })}
        </div>
        <div>
          All items:
          {items.map((item) => {
            return (
              <>
                <ul>---{item.name}</ul>
                <div>{item.description}</div>
                <div>Price:{item.cost}</div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
