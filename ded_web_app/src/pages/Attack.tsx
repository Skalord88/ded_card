import axios from "axios";
import { urlAttacks, urlChar } from "../components/url";
import { useEffect, useState } from "react";
import { Attacks, CharacterPc, Weapon } from "../components/interfaces";
import { useParams } from "react-router-dom";
import {
  emptyAbilitys,
  emptyAttacks,
  noneWeapon
} from "../components/variables";
import {
  addToDrop,
  itemInDrop,
  SetSetWeaponListFromDB,
  weaponRanged
} from "../components/functions";
import { CountBabFromClassPc } from "../components/Attack/Bab/Functions";
import { MapOfAttack } from "../components/Attack/MapOfAttack";
import {
  AttackGrid,
  MapOfAttackComponent
} from "../components/Attack/MapOfAttackComponent";
import {
  CharToModify,
  modifyCharacter
} from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { Dropdown } from "react-bootstrap";
import { DropdownComponent } from "../components/DropDown/DropDown";
import {
  AttackElement,
  createAttackDisplay,
  getAttacksData
} from "../components/Attack/function";

export function Attack() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();
  const [attackElement, setAttackElement] = useState<AttackElement>();
  const [listFromDB, setListFromDB] = useState<itemInDrop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);
        const moddedChar = createModChar(resChar.data);
        setModChar(moddedChar);
        setListFromDB(
          addToDrop(
            SetSetWeaponListFromDB(resChar.data.inventory, moddedChar),
            "items"
          )
        );
        setAttackElement(
          createAttackDisplay(getAttacksData(moddedChar), moddedChar.attacks)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleWeaponAttack = (index: string, option: Weapon) => {
    if (index === "1.1") {
      
    }
  };

  const confirmAttack = () => {
    // axios.post(urlAttacks + charId, attack);
    window.location.reload();
  };

  return (
    <div>
      {attackElement && (
        <div
          className="rpgui-container-framed-grey"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr",
            gridTemplateRows: "auto auto auto",
            gridTemplateAreas: `
            "el0 el1"
            "el2 ."
            "el3 el4"
            "el5 ."
            `
          }}
        >
          {attackElement.setOne.map((wS1, index) => (
            <div>
              <div
                key={index}
                className="rpgui-container-framed-grey"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr",
                  gridTemplateAreas: `
                "drop name"
                ". melee"
                ". range"
                ". meleeTwo"
                ". rangeTwo"
                `,
                  gap: "10px",
                  gridArea: "el" + index
                }}
              >
                <div style={{ gridArea: "drop" }}>
                  <DropdownComponent
                    options={listFromDB}
                    onAction={(option) =>
                      handleWeaponAttack(index + ".1", option as Weapon)
                    }
                  />
                </div>

                <div style={{ gridArea: "name", justifySelf: "start" }}>
                  <div>
                    <p>{wS1.stat.weapon.weaponName}</p>
                  </div>
                  {wS1.display.map((wS1D, index) => (
                    <div key={index + wS1D.type}>
                      {wS1D.show && (
                        <p>
                          {wS1D.type}:{" "}
                          {wS1D.att.map((a) => (
                            <>
                              {a >= 0 ? " +" : " "}
                              {a}
                            </>
                          ))}{" "}
                          {wS1.stat.weapon.damage}
                          {wS1D.dmg >= 0 ? " +" + wS1D.dmg : " " + wS1D.dmg}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
