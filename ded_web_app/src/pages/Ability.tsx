import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { findAbility } from "../components/Abilitys/Functions";
import { Abilitys } from "../components/Abilitys/Interface";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { FormattingText } from "../components/Formatting/Function";
import { addToDrop, BonusAbilities, SignNumber } from "../components/functions";
import { CharacterPc } from "../components/interfaces";
import {
  AbilitysEntry,
  AllModifiers,
  ModifiedCharacter,
  modifiedCharacter,
  ModifierAbilityResult
} from "../components/Prerequisite/functions/modifiedCharacter";
import { ModifierEnum } from "../components/Prerequisite/interface/ModifierEnum";
import { AllSkills, AllSkillsAxios } from "../components/Skills/Skills/Const";
import { urlAb, urlChar } from "../components/url";
import { PageLayout } from "./AppLayout";
import { Popup } from "../components/Popup/Popup";
// import { PageAndSummaryLayout } from "./AppLayout";

export const abilitisBaseValue: number[] = [15, 14, 13, 12, 10, 8];

export function Ability() {
  const { charId } = useParams();

  const [abilitys, setAbilitys] = useState<Abilitys>();
  const [modChar, setModChar] = useState<ModifiedCharacter>();
  // const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const charData: CharacterPc = resChar.data;
        setAbilitys(charData.abilitys);

        const modChar: ModifiedCharacter = modifiedCharacter(charData);
        setModChar(modChar);
        // setAbilitys(modChar.abilitys)
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
        modifierBonus: prevAbilities?.modifierBonus as ModifierEnum,
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
        next: {
          text: "Class",
          link: "/class/" + charId,
          change:
            abilitys &&
            abilitisBaseValue.every((value) =>
              Object.values(abilitys).includes(value)
            )
        }
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
          {abilitys && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: "10px"
              }}
            >
              {abilitys && (
                <AbilityLayout
                  key={"ab.strength"}
                  number={abilitys.strength}
                  ability="STRENGTH"
                  value={{ abilities: abilitys, text: "STR" }}
                  abilitysModifiers={modChar?.abilitysMod}
                >
                  <DropdownComponent
                    key={"ab.strength"}
                    options={addToDrop(abilitisBaseValue, "number")}
                    onAction={(option) => handleData(option, "strength")}
                  />
                </AbilityLayout>
              )}
              <AbilityLayout
                key={"ab.dexterity"}
                number={abilitys.dexterity}
                ability="DEXTERITY"
                value={{ abilities: abilitys, text: "DEX" }}
                abilitysModifiers={modChar?.abilitysMod}
              >
                <DropdownComponent
                  key={"ab.dexterity"}
                  options={addToDrop(abilitisBaseValue, "number")}
                  onAction={(option) => handleData(option, "dexterity")}
                />
              </AbilityLayout>
              <AbilityLayout
                key={"ab.constitution"}
                number={abilitys.constitution}
                ability="CONSTITUTION"
                value={{ abilities: abilitys, text: "CON" }}
                abilitysModifiers={modChar?.abilitysMod}
              >
                <DropdownComponent
                  key={"ab.constitution"}
                  options={addToDrop(abilitisBaseValue, "number")}
                  onAction={(option) => handleData(option, "constitution")}
                />
              </AbilityLayout>
              <AbilityLayout
                key={"ab.intelligence"}
                number={abilitys.intelligence}
                ability="INTELLIGENCE"
                value={{ abilities: abilitys, text: "INT" }}
                abilitysModifiers={modChar?.abilitysMod}
              >
                <DropdownComponent
                  key={"ab.intelligence"}
                  options={addToDrop(abilitisBaseValue, "number")}
                  onAction={(option) => handleData(option, "intelligence")}
                />
              </AbilityLayout>
              <AbilityLayout
                key={"ab.wisdom"}
                number={abilitys.wisdom}
                ability="WISDOM"
                value={{ abilities: abilitys, text: "WIS" }}
                abilitysModifiers={modChar?.abilitysMod}
              >
                <DropdownComponent
                  key={"ab.wisdom"}
                  options={addToDrop(abilitisBaseValue, "number")}
                  onAction={(option) => handleData(option, "wisdom")}
                />
              </AbilityLayout>
              <AbilityLayout
                key={"ab.charisma"}
                number={abilitys.charisma}
                ability="CHARISMA"
                value={{ abilities: abilitys, text: "CHA" }}
                abilitysModifiers={modChar?.abilitysMod}
              >
                <DropdownComponent
                  key={"ab.charisma"}
                  options={addToDrop(abilitisBaseValue, "number")}
                  onAction={(option) => handleData(option, "charisma")}
                />
              </AbilityLayout>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
}

export type AbilityLayoutProps = {
  ability?: string;
  number?: number;
  abilitysModifiers?: AllModifiers;
  children?: React.ReactNode;
  value?: { abilities: Abilitys; text: string };
};

export const AbilityLayout: React.FC<AbilityLayoutProps> = ({
  ability,
  number,
  abilitysModifiers,
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
      {number && ability && abilitysModifiers && (
        <BaseAbilitysWithMods
          charAb={number}
          abText={ability}
          mods={abilitysModifiers as AllModifiers}
        />
      )}
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

export type BaseAbilitysWithModsProps = {
  charAb: number;
  abText: string;
  mods: AllModifiers;
};

export const BaseAbilitysWithMods: React.FC<BaseAbilitysWithModsProps> = ({
  charAb,
  abText,
  mods
}) => {
  const valueAndText: { index: string; value: number; text: string }[] =
    Object.entries(mods).map(([key, v], index) => {
      const entity = v as ModifierAbilityResult;
      const value: number = findAbility(entity.abilitys, abText);
      const text: string = entity.sources[index].text + ", " + key;
      return { index: abText + "." + key, value: value, text: text };
    });
  const totValue: number =
    valueAndText.reduce((tot, v) => (tot += v.value), 0) + charAb;
  return (
    <div>
      <span>{"(" + totValue + "):"}</span>
      <span>{charAb}</span>
      {valueAndText.map(
        (vT) =>
          vT.value !== 0 && (
            <span key={vT.index}>
              <Popup text={SignNumber(vT.value) + vT.value} popText={vT.text} />
            </span>
          )
      )}
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
  const skills = AllSkillsAxios();
  const abilitySkillsString = skills
    .filter((skill) => skill.ability === ability?.toUpperCase())
    .map((skill) => skill.skillName.text)
    .join(", ");
    // console.log("abilitySkillsString:", abilitySkillsString)
  return (
    <div style={{ margin: "10px" }}>
      <p>{abilitySkillsString}</p>
    </div>
  );
};
