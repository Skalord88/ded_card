import axios from "axios";
import { MapOfAttack } from "../components/MyComponents";
import { urlAttacks, urlChar } from "../components/url";
import { useEffect, useState } from "react";
import { CharacterPc } from "../components/interfaces";
import { useParams } from "react-router-dom";

export function Attack() {

  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const setAttackInDB = (e: number[]) => {
    axios.post(urlAttacks + char?.id, {attacksDTO: e});
  }

  return (
    <>
      <div className="container">
            <div className="container-item">
              {char?
              <>
              <div>{char?.characterName}</div>
              <div>bab: +{char?.bab}</div>
              <div>armor: {char?.inventory.armor.name}</div>
              <div>shield: {char?.inventory.shield.name}</div>
              <div>I: {char?.inventory.weaponOne.name}</div>
              <div>II: {char?.inventory.weaponTwo.name}</div>
              <div>III: {char?.inventory.weaponThree.name}</div>
              <div>IV: {char?.inventory.weaponFour.name}</div>
              <div>V: {char?.inventory.weaponFive.name}</div>
              </>
              :
              <>...loading character...</>  
            }
            </div>
            <div className="container-item">
              {char?.inventory?
                <MapOfAttack
                inventory={char?.inventory}
                bab={char?.bab}
                ability={char?.abilitys}
                setListOfAttack={setAttackInDB}
                />
              :
              <>...loading inventory...</>
              }
            </div>
      </div>
    </>
  );
}
