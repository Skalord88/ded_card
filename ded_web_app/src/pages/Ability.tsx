import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Abilitys } from "../components/Abilitys/Interface";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { FormattingText } from "../components/Formatting/Function";
import { addToDrop, BonusAbilities, SignNumber } from "../components/functions";
import { CharacterPc } from "../components/interfaces";
import { AllSkills } from "../components/Skills/Skills/Const";
import { urlAb, urlChar } from "../components/url";
import { PageLayout } from "./AppLayout";
// import { PageAndSummaryLayout } from "./AppLayout";

export const abilitisBaseValue: number[] = [15, 14, 13, 12, 10, 8];

export function Ability() {
  const { charId } = useParams();

  const [abilitys, setAbilitys] = useState<Abilitys>();
  // const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const charData: CharacterPc = resChar.data;
        setAbilitys(charData.abilitys);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleData = (option: number, ability: string) => {
    if (abilitys) {
      setAbilitys((prevAbilities) => ({
        strength: prevAbilities?.strength ?? 0,
        dexterity: prevAbilities?.dexterity ?? 0,
        constitution: prevAbilities?.constitution ?? 0,
        intelligence: prevAbilities?.intelligence ?? 0,
        wisdom: prevAbilities?.wisdom ?? 0,
        charisma: prevAbilities?.charisma ?? 0,
        [ability]: option
      }));
    }
  };

  const handleSubmit = () => {
    console.log(abilitys);
    axios.post(urlAb + charId, abilitys).then((response) => {
      console.log(response.data);
    });
    window.location.reload();
    // setChange(true);
  };

  return (
    <PageLayout
      title="Abilities"
      buttons={{
        next: { text: "Class", link: "/class/" + charId, change: abilitys &&
          abilitisBaseValue.every(value => Object.values(abilitys).includes(value)) }
      }}
      onAction={handleSubmit}
    >
      {abilitys && (
        <div>
          <div>
            <p>
              {abilitisBaseValue.map((value, index) => (
                <span>
                  <span
                    style={{
                      color: Object.values(abilitys).includes(value)
                        ? "yellow"
                        : "white"
                    }}
                    key={index}
                  >
                    {value}
                  </span>
                  <span>
                    {index < abilitisBaseValue.length - 1 ? ", " : ""}
                  </span>
                </span>
              ))}
            </p>
          </div>
          {abilitys && 
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "10px" }}>
            <AbilityLayout
              number={abilitys.strength}
              ability="STRENGTH" 
              value={{ abilities: abilitys, text: "STR" }}>
            <DropdownComponent
              options={addToDrop(abilitisBaseValue, "number")}
              onAction={(option) => handleData(option, "strength")}
            />
            </AbilityLayout>
            <AbilityLayout
              number={abilitys.dexterity}
              ability="DEXTERITY" 
              value={{ abilities: abilitys, text: "DEX" }}>
            <DropdownComponent
              options={addToDrop(abilitisBaseValue, "number")}
              onAction={(option) => handleData(option, "dexterity")}
            />
            </AbilityLayout>
            <AbilityLayout
              number={abilitys.constitution}
              ability="CONSTITUTION" 
              value={{ abilities: abilitys, text: "CON" }}>
            <DropdownComponent
              options={addToDrop(abilitisBaseValue, "number")}
              onAction={(option) => handleData(option, "constitution")}
            />
            </AbilityLayout>
            <AbilityLayout
              number={abilitys.intelligence}
              ability="INTELLIGENCE" 
              value={{ abilities: abilitys, text: "INT" }}>
            <DropdownComponent
              options={addToDrop(abilitisBaseValue, "number")}
              onAction={(option) => handleData(option, "intelligence")}
            />
            </AbilityLayout>
            <AbilityLayout
              number={abilitys.wisdom}
              ability="WISDOM" 
              value={{ abilities: abilitys, text: "WIS" }}>
            <DropdownComponent
              options={addToDrop(abilitisBaseValue, "number")}
              onAction={(option) => handleData(option, "wisdom")}
            />
            </AbilityLayout>
            <AbilityLayout
              number={abilitys.charisma}
              ability="CHARISMA" 
              value={{ abilities: abilitys, text: "CHA" }}>
            <DropdownComponent
              options={addToDrop(abilitisBaseValue, "number")}
              onAction={(option) => handleData(option, "charisma")}
            />
            </AbilityLayout>
            </div>
          }
        </div>
      )}
    </PageLayout>
  );
}

export type AbilityLayoutProps = {
  ability?: string;
  number?: number;
  children?: React.ReactNode;
  value?: { abilities: Abilitys; text: string };
};

export const AbilityLayout: React.FC<AbilityLayoutProps> = ({
  ability,
  number,
  children,
  value
}) => {
  return (
    <div
      className="rpgui-container-framed golden"
      style={{
        placeItems: "center"
      }}
    >

        <h4>{ability}</h4>
        <p>{number && number}</p>
        {children}
      <div>
        <p>
          {value && SignNumber(BonusAbilities(value?.abilities, value?.text))}
          {value && BonusAbilities(value?.abilities, value?.text)}
        </p>
      </div>
      <AbilitySaveString ability={ability} />
      <AbilitySkillsString ability={ability} />
    </div>
  );
};

export const AbilitySaveString: React.FC<AbilityLayoutProps> = ({
  ability
}) => {
  const saveThrow: string =
    ability === "DEXTERITY"
      ? "REFLEX"
      : ability === "CONSTITUTION"
        ? "FORTITUDE"
        : ability === "WISDOM"
          ? "WILL"
          : "---";

  return (
    <div style={{ margin: "10px" }}>
      <p style={{ wordBreak: "break-word" }}>{saveThrow}</p>
    </div>
  );
};

export const AbilitySkillsString: React.FC<AbilityLayoutProps> = ({
  ability
}) => {
  const skills = AllSkills();
  const abilitySkillsString: string = skills
    .filter((skill) => skill.ability === ability?.toUpperCase())
    .map((skill) => FormattingText(skill.skillName))
    .join(", ");
  return (
    <div style={{ margin: "10px" }}>
      <p>{abilitySkillsString}</p>
    </div>
  );
};
