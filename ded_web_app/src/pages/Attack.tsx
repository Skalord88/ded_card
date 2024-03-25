import { useParams } from "react-router-dom";
import { Inventory, characterPc } from "../components/interfaces";
import axios from "axios";
import { useState, useEffect } from "react";
import { urlChar, urlInventory } from "../components/url";
import { MapOfAttack } from "../components/MyComponents";

export function Attack() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();
  const [equipment, setEquipment] = useState<Inventory>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resInventory = await axios.get(urlInventory + charId);
        setEquipment(resInventory.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        {char ? (
          <>
            <div className="container-item">
              <div>{char.characterName}</div>
              <div>bab: +{char.bab}</div>
              <div>armor: {equipment?.armor.name}</div>
              <div>shield: {equipment?.shield.name}</div>
              <div>I: {equipment?.weaponOne.name}</div>
              <div>II: {equipment?.weaponTwo.name}</div>
              <div>III: {equipment?.weaponThree.name}</div>
              <div>IV: {equipment?.weaponFour.name}</div>
              <div>V: {equipment?.weaponFive.name}</div>
            </div>
            <div className="container-item">
              {equipment ? (
                <MapOfAttack
                inventory={equipment}
                bab={char.bab}
                ability={char.abilitys}
                />
              ) : (
                <>...loading equipment...</>
              )}
            </div>
          </>
        ) : (
          <>...loading character...</>
        )}
      </div>
    </>
  );
}
