import { useParams } from "react-router-dom";
import { characterPc } from "../components/interfaces";
import axios from "axios";
import { useState, useEffect } from "react";
import { urlAttacks, urlChar } from "../components/url";
import { MapOfAttack } from "../components/MyComponents";
import { SetSetWeaponListFromDB } from "../components/functions";

export function Attack() {
  const { charId } = useParams();

  const [char, setChar] =useState<characterPc>();  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const setAttackInDB = (e: number[]) => {

    axios.post(urlAttacks + charId, {attacksDTO: e});

  }

  return (
    <>
      <div className="container">
        {char? (
          <>
            <div className="container-item">
              <div>{char.characterName}</div>
              <div>bab: +{char.bab}</div>
              <div>armor: {char?.inventory.armor.name}</div>
              <div>shield: {char?.inventory.shield.name}</div>
              <div>I: {char?.inventory.weaponOne.name}</div>
              <div>II: {char?.inventory.weaponTwo.name}</div>
              <div>III: {char?.inventory.weaponThree.name}</div>
              <div>IV: {char?.inventory.weaponFour.name}</div>
              <div>V: {char?.inventory.weaponFive.name}</div>
            </div>
            <div className="container-item">
              {char.inventory ? (
                <MapOfAttack
                inventory={char.inventory}
                bab={char.bab}
                ability={char.abilitys}
                weapons={SetSetWeaponListFromDB(char.inventory)}
                setListOfAttack={setAttackInDB}
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
