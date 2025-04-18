import axios from "axios";
import { urlAttacks, urlChar } from "../components/url";
import { useEffect, useState } from "react";
import { Attacks, CharacterPc, Weapon } from "../components/interfaces";
import { useParams } from "react-router-dom";
import { emptyAttacks } from "../components/variables";
import { SetSetWeaponListFromDB } from "../components/functions";
import { CountBabFromClassPc } from "../components/Attack/Bab/Functions";
import { MapOfAttack } from "../components/Attack/MapOfAttack";
import { MapOfAttackComponent } from "../components/Attack/MapOfAttackComponent";
import { CharToModify, modifyCharacter } from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";

export function Attack() {

  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>()
  const [modChar, setModChar] = useState<CharToModify>()
  const [attack, setAttack] = useState<Attacks>(emptyAttacks)
  const [listFromDB, setListFromDB] = useState<Weapon[]>([])
  const [bab, setBab] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);
        setModChar(createModChar(resChar.data))
        // setAttack(resChar.data.attacks);
        // setListFromDB(SetSetWeaponListFromDB(resChar.data.inventory));
        // setBab(CountBabFromClassPc(resChar.data))

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
      <div className="rpgui-container-framed-grey">
        {modChar && <MapOfAttackComponent char={modChar} />}

      </div>
    </>
  );
}
