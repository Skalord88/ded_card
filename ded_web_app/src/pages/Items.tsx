import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Armor, Inventory, Item, ItemsList, Weapon, characterPc } from "../components/interfaces";
import { urlChar, urlItems } from "../components/url";
import { emptyInventory, noneArmor, noneWeapon } from "../components/variables";

export function Items() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();

  const [items, setItems] = useState<ItemsList>();

  const [equipment, setEquipment] = useState<Inventory>();
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
    if (char?.items)
    {
      let charInventory: Inventory = emptyInventory;
      char.items.forEach(item => {
        if(item.itemType === "ARMOR"){
          charInventory.armor = item as Armor
        }
        if(charInventory.weaponOne.id === 0
           && item.itemType ==="WEAPON"){
          charInventory.weaponOne = item as Weapon
        }
      })
    setEquipment(charInventory);
}
    if (char?.treasure) setTresure(char?.treasure);
  }, [char]);

  // const handleBuyArmor = (e: Item) => {
  //   if (armor.id !== e.id) {
  //     setTresure(tresure + armor.cost - e.cost);
  //   }
  //   setArmor(e as Armor);
  // };

  const handleBuyWeapon = (e: Item) => {
    
    
  };

  return (
    <>
      <div>{tresure} gp</div>
      <div className="container">
        <div className="column">
          Armor:
          {armor?.armorName}
        
          {items?.armorsList.map((armor, index) => {
            return (
              <>
                <div key={index}>
                  <button onClick={() => handleBuyArmor(armor)}>+</button>
                  {armor.name} / {armor.itemType} / {armor.description}
                </div>
              </>
            );
          })}
        </div>
        <div className="column">
          Weapon:
          {items?.weaponsList.map((weapon, index) => {
            return (
              <>
                <div key={index}>
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
