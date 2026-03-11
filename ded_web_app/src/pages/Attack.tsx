import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AttackElement,
  createAttackDisplay,
  // getAttacksData
} from "../components/Attack/function";
import { DropdownComponent } from "../components/DropDown/DropDown";
import {
  addToDrop,
  itemInDrop,
  SetSetWeaponListFromDB
} from "../components/functions";
import { Attacks, Weapon } from "../components/interfaces";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { urlAttacks, urlChar } from "../components/url";
import { PageLayout } from "./AppLayout";
import { enchantedName } from "../components/Enchantment/Functions/EnchantmentFunctions";

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
          addToDrop(SetSetWeaponListFromDB(moddedChar.inventory), "items")
        );
        setAttack(moddedChar.attacks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   if (modChar && attack) {
  //     setAttackElement(createAttackDisplay(getAttacksData(modChar), attack));
  //   }
  // }, [attack]);

  const handleWeaponAttack = (index: string, option: Weapon) => {
    const weapon = option as Weapon;
    console.log(weapon);
    if (attack) {
      const newAttack: Attacks = {
        ...attack,
        firstAttackSetOne: index === "0.1" ? weapon : attack.firstAttackSetOne,
        secondAttackSetOne:
          index === "1.1" ? weapon : attack.secondAttackSetOne,
        additionalAttackSetOne:
          index === "2.1" ? weapon : attack.additionalAttackSetOne,
        firstAttackSetTwo: index === "0.2" ? weapon : attack.firstAttackSetTwo,
        secondAttackSetTwo:
          index === "1.2" ? weapon : attack.secondAttackSetTwo,
        additionalAttackSetTwo:
          index === "2.2" ? weapon : attack.additionalAttackSetTwo
      };
      // console.log(newAttack)
      setAttack(newAttack);
      // setAttackElement(createAttackDisplay(getAttacksData(modChar), newAttack));
    }
  };

  const confirmAttack = () => {
    const attackToSend = {
      firstAttackSetOne: attack?.firstAttackSetOne.id
        ? { id: attack?.firstAttackSetOne.id }
        : null,
      secondAttackSetOne: attack?.secondAttackSetOne.id
        ? { id: attack?.secondAttackSetOne.id }
        : null,
      additionalAttackSetOne: attack?.additionalAttackSetOne.id
        ? { id: attack?.additionalAttackSetOne.id }
        : null,
      firstAttackSetTwo: attack?.firstAttackSetTwo.id
        ? { id: attack?.firstAttackSetTwo.id }
        : null,
      secondAttackSetTwo: attack?.secondAttackSetTwo.id
        ? { id: attack?.secondAttackSetTwo.id }
        : null,
      additionalAttackSetTwo: attack?.additionalAttackSetTwo.id
        ? { id: attack?.additionalAttackSetTwo.id }
        : null
    };
    console.log("confirmAttack", attackToSend);
    axios.post(urlAttacks + charId, attackToSend);
    // window.location.reload();
  };

  return (
    <PageLayout
      title={"Attacks"}
      onAction={confirmAttack}
      buttons={{
        next: { text: "Magic", link: "/magic/" + charId, change: true },
        back: { text: "Inventory", link: "/item/" + charId }
      }}
    >
      {attackElement && (
        <AttackTemplateElements>
          {attackElement.setOne.map((wS1, index) => {
            return (
              <AttackTemplateSubElements
                key={`set1-${index}`}
                realIndex={index}
                title={enchantedName(wS1.stat.weapon)}
              >
                <DropdownComponent
                  options={listFromDB}
                  onAction={(option) =>
                    handleWeaponAttack(`${index}.1`, option as Weapon)
                  }
                />
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
              </AttackTemplateSubElements>
            );
          })}

          {attackElement.setTwo.map((wS2, index) => {
            const realIndex = index + attackElement.setOne.length; // per evitare duplicati
            return (
              <AttackTemplateSubElements
                key={`set2-${index}`}
                realIndex={realIndex}
                title={enchantedName(wS2.stat.weapon)}
              >
                <DropdownComponent
                  options={listFromDB}
                  onAction={(option) =>
                    handleWeaponAttack(`${index}.2`, option as Weapon)
                  }
                />
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
              </AttackTemplateSubElements>
            );
          })}
        </AttackTemplateElements>
      )}
    </PageLayout>
  );
}

export type AttacksTemplateProps = {
  children?: React.ReactNode;
  realIndex?: number;
  title?: string;
};

export const AttackTemplateElements: React.FC<AttacksTemplateProps> = ({
  children
}) => {
  return (
    <div
      className="rpgui-container-framed-grey"
      style={{
        display: "grid",
        gridTemplateAreas: `
              "el0 el1"
              "el2 ."
              "el3 el4"
              "el5 ."
            `
      }}
    >
      {children}
    </div>
  );
};

export const AttackTemplateSubElements: React.FC<AttacksTemplateProps> = ({
  children,
  realIndex,
  title
}) => {
  return (
    <div
      className="rpgui-container-framed grey"
      style={{
        // border: "2px solid white",
        display: "grid",
        // gridTemplateColumns: "min-content",
        // gridTemplateAreas: `
        //             "drop"
        //             "melee"
        //             "range"
        //             "meleeTwo"
        //             "rangeTwo"
        //           `,
        // gap: "4px",
        gridArea: "el" + realIndex
      }}
    >
      <h4>{title}</h4>
      {children}
    </div>
  );
};
