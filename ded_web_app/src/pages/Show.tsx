import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AbilitysComponent } from "../components/AbilitysComponent";
import { CharacterData, ClassExpGold } from "../components/CharacterData";
import { DeleteButton } from "../components/DeleteButton";
import { Initiative } from "../components/Initiative/Initiative";
import { CharacterPc } from "../components/interfaces";

import { CharacterArmor } from "../components/Armor/CharacterArmor";
// import { BaseAttack } from "../components/Attack/BaseAttack/BaseAttack";
import { MapOfAttackComponent } from "../components/Attack/MapOfAttackComponent";
import { FeatsComponent } from "../components/Feats/FeatsComponent";
import { HpComponent } from "../components/HpComponent";
import { InventoryComponent } from "../components/Items/Inventory/InventoryComponent/InventoryComponent";
import { MagicComponent } from "../components/Magic/MagicComponent";
import {
  CharToModify
} from "../components/Prerequisite/functions/modifyCharacter";
import { SavingThrowComponent } from "../components/SavingThrowComponent";
import { SkillShowComponent } from "../components/Skills/Show/SkillShowComponent";
import { SpecialAbilitiesComponent } from "../components/SpecialAbilities/SpecialAbilitiesComponent";
import { SpeedComponent } from "../components/SpeedComponent";
import { urlChar } from "../components/url";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { PageLayoutBody } from "./AppLayout";

export const Show = () => {
  let { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (charId) {
          const resURL = await axios.get(urlChar + "/" + charId);
          const charData: CharacterPc = resURL.data;
          setChar(charData);

          // const modChar: CharToModify = createModChar(charData);

          // console.log(modChar);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charId]);

  if (!char) return <p>...character loading...</p>;

  const modChar: CharToModify = createModChar(char);
  
  return (
    <PageLayoutBody>
      {modChar && window.innerWidth <= 768 ? (
        <div>
          <DeleteButton url={""
            // urlChar
            } />
          <CharacterData char={char} />
          <AbilitysComponent abilitys={modChar.abilitys} />
          <ClassExpGold char={char} />
          {/* // <BaseAttack char={modChar} /> */}
          <Initiative char={modChar} />
          <SavingThrowComponent char={modChar} />
          <HpComponent char={modChar} />
          <CharacterArmor char={modChar} />
          <MapOfAttackComponent char={modChar} />
          <InventoryComponent char={modChar} />
          <SkillShowComponent char={modChar} />
          <SpeedComponent char={modChar} />
          <FeatsComponent char={modChar} />
          <MagicComponent char={modChar} />
        </div>
      ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "25% 25% 25% 25%"
            }}
          >
            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "3 / span 2",
                gridRow: 1
              }}
            >
              <DeleteButton url={""
                // urlChar
                } />
            </div>
            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: "1 / span 2"
              }}
            >
              <CharacterData char={char} />
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: 3,
                gridRow: "2 / span 2"
              }}
            >
              <ClassExpGold char={char} />
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: 4,
                gridRow: "2 / span 2"
              }}
            >
              <AbilitysComponent abilitys={modChar.abilitys} />
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 5
              }}
            >
              <HpComponent char={modChar} />
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 3
              }}
            >
              {/* <BaseAttack char={modChar} /> */}
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 4
              }}
            >
              <SpecialAbilitiesComponent char={modChar} />
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "3 / span 2",
                gridRow: 5
              }}
            >
              <SavingThrowComponent char={modChar} />
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "3 / span 2",
                gridRow: 4
              }}
            >
              <Initiative char={modChar} />
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 4",
                gridRow: 8
              }}
            >
              <CharacterArmor char={modChar} />
            </div>

            <div
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 3",
                gridRow: 9
              }}
            >
              <MapOfAttackComponent char={modChar} />
            </div>

            <div
              key="inventory"
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 4",
                gridRow: 11
              }}
            >
              <InventoryComponent char={modChar} />
            </div>
            <div
              key="skills"
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "3 / span 2",
                gridRow: "12 / span 3"
              }}
            >
              <SkillShowComponent char={modChar} />
            </div>
            <div
              key="speed"
              className="rpgui-container-framed grey"
              style={{
                gridColumn: 4,
                gridRow: 9
              }}
            >
              <SpeedComponent char={modChar} />
            </div>
            <div
              key="feats"
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 12
              }}
            >
              <FeatsComponent char={modChar} />
            </div>
            <div
              key="feats"
              className="rpgui-container-framed grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 13
              }}
            >
              <MagicComponent char={modChar} />
            </div>
          </div>
      )}
    </PageLayoutBody>
  );
};

