import axios from "axios";
import { MapOfAttack } from "../components/MyComponents";
import { urlAttacks, urlChar } from "../components/url";
import { useEffect, useState } from "react";
import { Attacks, CharacterPc } from "../components/interfaces";
import { useParams } from "react-router-dom";
import { emptyAttacks } from "../components/variables";

export function Attack() {

  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>()
  const [attack, setAttack] = useState<Attacks>(emptyAttacks)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        setAttack(resChar.data.attacks)

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if(char?.attacks.firstAttackSetOne.name){
  //     console.log(char?.attacks.firstAttackSetOne)
  //     setAttack(char.attacks)
  //   }
  // },[char?.attacks])

  const setAttackInDB = (newAttacks: Attacks) => {
    setAttack(newAttacks);
  }

  const confirmAttack = () => {
    axios.post(urlAttacks + charId, attack);
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
              <button onClick={confirmAttack}>set Attacks</button>
              {char?.inventory?
                <MapOfAttack
                inventory={char?.inventory}
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
