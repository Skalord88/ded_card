import axios from "axios";
import { CharacterArmor, MapOfAttack } from "../components/MyComponents";
import { urlAttacks, urlChar } from "../components/url";
import { useEffect, useState } from "react";
import { Attacks, CharacterPc, Weapon } from "../components/interfaces";
import { useParams } from "react-router-dom";
import { emptyAttacks } from "../components/variables";
import { SetSetWeaponListFromDB } from "../components/functions";

export function Attack() {

  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>()
  const [attack, setAttack] = useState<Attacks>(emptyAttacks)
  const [listFromDB, setListFromDB] = useState<Weapon[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);
        setAttack(resChar.data.attacks);
        setListFromDB(SetSetWeaponListFromDB(resChar.data.inventory));

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const setAttackInDB = (newAttacks: Attacks) => {
    setAttack(newAttacks);
  }

  const confirmAttack = () => {
    axios.post(urlAttacks + charId, attack);
    window.location.reload();
  }

  return (
    <>
      <div className="container">
            <div className="container-item">
              {char?
              <>
              <div className="container-item">
              <div>{char?.characterName}</div>
              <div>bab: +{char?.bab}</div>
              <div>armor: {char?.inventory.armor.name}</div>
              <div>shield: {char?.inventory.shield.name}</div>
              <div>I: {char?.inventory.weaponOne.name}</div>
              <div>II: {char?.inventory.weaponTwo.name}</div>
              <div>III: {char?.inventory.weaponThree.name}</div>
              <div>IV: {char?.inventory.weaponFour.name}</div>
              <div>V: {char?.inventory.weaponFive.name}</div>
              </div>
              <div className="container-item">
                <CharacterArmor
                  charArmor={char.armorClass}
                  charInventory={char.inventory}
                />
              </div>
              </>
              :
              <>...loading character...</>  
            }
            </div>
            <div className="container-item">
              <button onClick={confirmAttack}>set Attacks</button>
              {char && attack?
                <MapOfAttack
                inventory={listFromDB}
                attacks={attack}
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
