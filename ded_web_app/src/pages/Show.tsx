import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AbilitysComponent } from "../components/AbilitysComponent";
import { MapOfAttackComponent } from "../components/Attack/MapOfAttackComponent";
import {
  BaseAttack,
  CharacterData,
  ClassExpGold
} from "../components/CharacterData";
import { HpComponent } from "../components/HpComponent";
import { Initiative } from "../components/Initiative/Initiative";
import {
  CharacterPc,
  Inventory,
  MapOfSkills,
  SkillProps
} from "../components/interfaces";
import { SavingThrowComponent } from "../components/SavingThrowComponent";
import { SpeedComponent } from "../components/SpeedComponent";
import { urlChar } from "../components/url";
import { characterEmpty, emptyInventory } from "../components/variables";
import { CharacterArmor } from "../components/Armor/CharacterArmor";
import { DeleteButton } from "../components/DeleteButton";

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
      <div style={{ display: "grid" }}>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 2",
            gridRow: 1
          }}
        ></div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 3,
            gridRow: 1
          }}
        >
          <DeleteButton url={urlChar} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 2",
            gridRow: 2
          }}
        >
          <CharacterData char={char} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 3,
            gridRow: "2 / span 3"
          }}
        >
          <AbilitysComponent abilitys={char.abilitys} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 1,
            gridRow: "3 / span 2"
          }}
        >
          <ClassExpGold char={char} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 2,
            gridRow: 3
          }}
        >
          <BaseAttack char={char} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 2,
            gridRow: 4
          }}
        >
          <Initiative char={char} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 2",
            gridRow: 5
          }}
        >
          <SavingThrowComponent char={char} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 3,
            gridRow: 5
          }}
        >
          <HpComponent char={char} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 3,
            gridRow: 6
          }}
        >
          <SpeedComponent char={char} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 2",
            gridRow: 6
          }}
        >
          <CharacterArmor
            charArmor={char.armorClass}
            charInventory={char.inventory}
          />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 3",
            gridRow: 7
          }}
        >
          <MapOfAttackComponent char={char} />
        </div>
      </div>
    </>
  );
}
