import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { MapOfSkillsNoStudy, MapOfStudy } from "../components/MyComponents";
import {
  CharacterPc,
  Inventory,
  MapOfSkills,
  SkillProps
} from "../components/interfaces";
import { urlChar } from "../components/url";
import { characterEmpty, emptyInventory } from "../components/variables";
import { CharacterArmor } from "../components/MyComponents";
import {
  BaseAttack,
  CharacterData,
  ClassExpGold,
  Initiative
} from "../components/CharacterData";
import { DeleteButton } from "../components/DeleteButton";
import { SpeedComponent } from "../components/SpeedComponent";
import { AbilitysComponent } from "../components/AbilitysComponent";
import { HpComponent } from "../components/HpComponent";
import { SavingThrowComponent } from "../components/SavingThrowComponent";

export function Show() {
  let { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>(characterEmpty);
  const [inventory, setInventory] = useState<Inventory>(emptyInventory);
  const [skills, setSkills] = useState<SkillProps[]>([]);
  const [skillsStudy, setSkillsStudy] = useState<MapOfSkills>({ skills });
  const [skillsNoStudy, setSkillsNoStudy] = useState<MapOfSkills>({ skills });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        setChar(resURL.data);
        setSkills(resURL.data.skillsList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const skStudy: SkillProps[] = skills.filter(
      (sk) => Object.entries(sk.fieldOfStudy).length > 0
    );
    const skNoStudy: SkillProps[] = skills.filter(
      (sk) => ![6, 17, 21].includes(sk.idSkill)
    );

    const mapStudy: MapOfSkills = { skills: skStudy };
    setSkillsStudy(mapStudy);

    const mapNoStudy: MapOfSkills = { skills: skNoStudy };
    setSkillsNoStudy(mapNoStudy);
  }, [skills]);

  useEffect(() => {}, [char.inventory]);

  return (
    <>
      <div style={{ display: "flex", position: "relative" }}>
        <div style={{ flex: 3 }}>
          <CharacterData char={char} />
          <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <ClassExpGold char={char} />
            </div>
            <div style={{ flex: 1 }}>
              <BaseAttack char={char} />
            </div>
          </div>

          <CharacterArmor
          charArmor={char.armorClass}
          charInventory={char.inventory}
        />
          <SavingThrowComponent char={char} />
        </div>
        <div style={{ flex: 1 }}>
          <DeleteButton url={urlChar} />
          <AbilitysComponent abilitys={char.abilitys} />
          <SpeedComponent char={char} />
          <HpComponent char={char} />
          <Initiative char={char} />
        </div>
      </div>

      <div className="container-item">
        
      </div>
    </>
  );
}
