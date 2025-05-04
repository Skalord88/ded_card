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

  const [modChar, setModChar] = useState<CharToModify>();
  const [attack, setAttack] = useState<Attacks>();
  const [attackElement, setAttackElement] = useState<AttackElement>();
  const [listFromDB, setListFromDB] = useState<itemInDrop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);

        const moddedChar = createModChar(resChar.data);
        setModChar(moddedChar);
        setListFromDB(
          addToDrop(
            SetSetWeaponListFromDB(moddedChar.inventory),
            "items"
          )
        );
        setAttack(moddedChar.attacks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (modChar && attack) {
      setAttackElement(createAttackDisplay(getAttacksData(modChar), attack));
    }
  }, [attack]);

  const handleWeaponAttack = (index: string, option: Weapon) => {
    const weapon = option as Weapon;
    if (attack) {
      const newAttack: Attacks = {
        ...attack,
        firstAttackSetOne:
          index === "0.1" ? weapon : attack.firstAttackSetOne,
        secondAttackSetOne:
          index === "1.1" ? weapon : attack.secondAttackSetOne,
        additionalAttackSetOne:
          index === "2.1" ? weapon : attack.additionalAttackSetOne,
        firstAttackSetTwo:
          index === "0.2" ? weapon : attack.firstAttackSetTwo,
        secondAttackSetTwo:
          index === "1.2" ? weapon : attack.secondAttackSetTwo,
        additionalAttackSetTwo:
          index === "2.2" ? weapon : attack.additionalAttackSetTwo
      };
      setAttack(newAttack);
      // setAttackElement(createAttackDisplay(getAttacksData(modChar), newAttack));
    }
  };

  const confirmAttack = () => {
    console.log("confirmAttack", attack);
    axios.post(urlAttacks + charId, attack);
    // window.location.reload();
  };

  return (
    <div>
      <button className="rpgui-button" onClick={confirmAttack}><p>confirm</p></button>
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
            <div key={`set1-${index}`}>
              <div
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
                      handleWeaponAttack(`${index}.1`, option as Weapon)
                    }
                  />
                </div>

                <div style={{ gridArea: "name", justifySelf: "start" }}>
                  <div>
                    <p>{wS1.stat.weapon.weaponName}</p>
                  </div>
                  {wS1.display.map((wS1D, dIndex) => {
                    const outerKey = `set1-${index}-${dIndex}-${wS1D.type}`;
                    const dmgDice =
                      wS1.stat.weapon.damage +
                      (wS1D.dmg >= 0 ? "+" + wS1D.dmg : wS1D.dmg);
                    return wS1D.show ? (
                      <div key={outerKey}>
                        <p>
                          {wS1D.type}:
                          {wS1D.att.map((a, i) => (
                            <span key={`${outerKey}-att-${i}`}>
                              {a >= 0 ? " +" : " "}
                              {a}
                            </span>
                          ))}{" "}
                          {dmgDice}
                        </p>
                      </div>
                    ) : (
                      <div key={outerKey + dIndex}>
                        <p>---</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}

          {attackElement.setTwo.map((wS2, index) => {
            const realIndex = index + attackElement.setOne.length; // per evitare duplicati
            const set2GridArea = `el${realIndex}`;

            return (
              <div key={`set2-${realIndex}`} style={{ gridArea: set2GridArea }}>
                <div
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
                    gap: "10px"
                  }}
                >
                  <div style={{ gridArea: "drop" }}>
                    <DropdownComponent
                      options={listFromDB}
                      onAction={(option) =>
                        handleWeaponAttack(`${index}.2`, option as Weapon)
                      }
                    />
                  </div>

                  <div style={{ gridArea: "name", justifySelf: "start" }}>
                    <p>{wS2.stat.weapon.weaponName}</p>
                    {wS2.display.map((wS2D, dIndex) => {
                      const outerKey = `set2-${realIndex}-${dIndex}-${wS2D.type}`;
                      const dmgDice =
                        wS2.stat.weapon.damage +
                        (wS2D.dmg >= 0 ? "+" + wS2D.dmg : wS2D.dmg);
                      return wS2D.show ? (
                        <div key={outerKey}>
                          <p>
                            {wS2D.type}:
                            {wS2D.att.map((a, i) => (
                              <span key={`${outerKey}-att-${i}`}>
                                {a >= 0 ? " +" : " "}
                                {a}
                              </span>
                            ))}{" "}
                            {dmgDice}
                          </p>
                        </div>
                      ) : (
                        <div key={outerKey + dIndex}>
                          <p>---</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
