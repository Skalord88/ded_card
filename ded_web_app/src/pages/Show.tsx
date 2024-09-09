import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AbilitysComponent } from "../components/AbilitysComponent";
import { CharacterArmor } from "../components/Armor/CharacterArmor";
import { MapOfAttackComponent } from "../components/Attack/MapOfAttackComponent";
import {
  BaseAttack,
  CharacterData,
  ClassExpGold
} from "../components/CharacterData";
import { DeleteButton } from "../components/DeleteButton";
import { HpComponent } from "../components/HpComponent";
import { Initiative } from "../components/Initiative/Initiative";
import {
  CharacterPc
} from "../components/interfaces";
import { SavingThrowComponent } from "../components/SavingThrowComponent";
import { SkillShowComponent } from "../components/Skills/Show/SkillShowComponent";
import { SpeedComponent } from "../components/SpeedComponent";
import { urlChar } from "../components/url";
import { characterEmpty } from "../components/variables";
import { AbilitysAndModifiers } from "../components/Abilitys/Functions";
import { Abilitys } from "../components/Abilitys/Interface";
import { InitiativeAndModifiers } from "../components/Modifiers/Initiative.tsx/Function";

export function Show() {
  let { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>(characterEmpty);
  const abilitys: Abilitys = AbilitysAndModifiers(char)
  const initiative: number = InitiativeAndModifiers(char)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        setChar(resURL.data);
        // setSkills(resURL.data.skillsList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const skStudy: SkillProps[] = skills.filter(
  //     (sk) => Object.entries(sk.fieldOfStudy).length > 0
  //   );
  //   const skNoStudy: SkillProps[] = skills.filter(
  //     (sk) => ![6, 17, 21].includes(sk.idSkill)
  //   );

  //   const mapStudy: MapOfSkills = { skills: skStudy };
  //   setSkillsStudy(mapStudy);

  //   const mapNoStudy: MapOfSkills = { skills: skNoStudy };
  //   setSkillsNoStudy(mapNoStudy);
  // }, [skills]);

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
          <AbilitysComponent abilitys={abilitys} />
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
          <BaseAttack char={char} abilitys={abilitys} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 2,
            gridRow: 4
          }}
        >
          <Initiative abilitys={abilitys} initiative={initiative} />
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
            char={char}
          />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 3",
            gridRow: 7
          }}
        >
          {/* <MapOfAttackComponent char={char} /> */}
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 2",
            gridRow: 8
          }}
        >
          <p>
            <SkillShowComponent key={"skillsTable"} char={char} />
          </p>
        </div> 
      </div>
    </>
  );
}
