import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AbilitysAndModifiers,
  findAbility
} from "../components/Abilitys/Functions";
import { Abilitys } from "../components/Abilitys/Interface";
import { DropdownComponent } from "../components/DropDown/DropDown";
import {
  addToDrop,
  BonusAbilities,
  signAndCount,
  signAndCountAbility,
  SignNumber
} from "../components/functions";
import { CharacterPc, SignAndNumber } from "../components/interfaces";
import { modifiedCharacter } from "../components/ModifiedCharacter/functions/ModifiedCharacter";
import { Popup } from "../components/Popup/Popup";
import { ModifierEnum } from "../components/Prerequisite/interface/ModifierEnum";
import { AllSkillsAxios } from "../components/Skills/Skills/Const";
import { urlAb, urlChar } from "../components/url";
import { PageLayout } from "./AppLayout";
import { SummaryChar } from "../components/ModifiedCharacter/SummaryChar";
import {
  ModifiedCharacter,
  ModifierAbilityResult
} from "../components/ModifiedCharacter/interface/ModifiedCharacter";
import {
  BonusResultMap,
  TargetBonus
} from "../components/ModifiedCharacter/functions/GetBonusResult";
import { validate } from "webpack";
import { signAndCountString } from "../components/Sign/Function";

export const abilitisBaseValue: number[] = [15, 14, 13, 12, 10, 8];

export function Ability() {
  const { charId } = useParams();

  const [abilitys, setAbilitys] = useState<Abilitys>();
  const [char, setChar] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<ModifiedCharacter>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const charData: CharacterPc = resChar.data;
        setAbilitys(charData.abilitys);
        setChar(charData);

        const modChar: ModifiedCharacter = modifiedCharacter(charData);
        setModChar(modChar);
        // setAbilitys(modChar.abilitys);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (char && abilitys) {
      const newModChar: ModifiedCharacter = modifiedCharacter(char, abilitys);
      setModChar(newModChar);
    }
  }, [char, abilitys]);

  const handleData = (
    option: number,
    ability: keyof Omit<Abilitys, "string">
  ) => {
    if (abilitys) {
      setAbilitys({
        ...abilitys,
        [ability]: option
      });
    }
  };

  const handleSubmit = () => {
    // console.log(abilitys);
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
          {/* <div key={"abilitisBaseValue"}> */}
          <p>
            {abilitisBaseValue.map((value, index) => (
              <>
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
                <span>{index < abilitisBaseValue.length - 1 ? ", " : ""}</span>
              </>
            ))}
          </p>
          {/* </div> */}
          {abilitys && (
            <div
              key={"abilitys"}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
                gap: "10px"
              }}
            >
              {modChar &&
                Object.entries(abilitys).map(
                  ([key, value]) =>
                    (value as number) && (
                      <AbilityLayout
                        key={key}
                        abilityText={key.toUpperCase()}
                        abilityNumber={value as number}
                        modChar={modChar}
                        // abilitysModifiers={modChar?.abilitysMod}
                      >
                        <DropdownComponent
                          key={"drop." + key}
                          options={addToDrop(abilitisBaseValue, "number")}
                          onAction={(option) =>
                            handleData(
                              option,
                              key as keyof Omit<Abilitys, "string">
                            )
                          }
                        />
                      </AbilityLayout>
                    )
                )}
            </div>
          )}
          {modChar && (
            <SummaryChar modCharacter={modChar as ModifiedCharacter} />
          )}
        </div>
      )}
    </PageLayout>
  );
}

export type AbilityLayoutProps = {
  abilityText?: string;
  abilityNumber?: number;
  modChar: ModifiedCharacter;
  // abilitysModifiers?: BonusResultMap;
  children?: React.ReactNode;
};

export const AbilityLayout: React.FC<AbilityLayoutProps> = ({
  abilityText,
  abilityNumber,
  modChar,
  children
}) => {
  const tot: string = abilityText
    ? findAbility(modChar.abilitys, abilityText).toString()
    : "0";
  const bonus: string = abilityText
    ? signAndCountString([BonusAbilities(modChar.abilitys, abilityText)])
    : "+" + 0;
  const ab: number = abilityNumber ? abilityNumber : 0;

  return (
    <div className="rpgui-container-framed golden">
      <h4>{abilityText}</h4>
      <div>
        <p>{bonus}</p>
        <span style={{ color: "orange" }}>{tot}</span>
        <span>{" : "}</span>

        <span style={{ color: "yellow" }}>{ab}</span>
        {modChar.abilitysMod &&
          Object.entries(modChar.abilitysMod).map(([key, value]) => {
            // const tot = value.reduce((tot, v) => tot + v.bonus, 0)
            return (
              <>
                {value.map((v) => {
                  const signNum: string = signAndCountString([v.bonus]);
                  // const text: string = ", " + (v.source as TargetBonus)? v.source
                  if (v.text.toUpperCase() === abilityText)
                    return (
                      <Popup text={signNum} popText={key + ", " + v.text} />
                    );
                })}
              </>
            );
          })}
        {children}
      </div>
    </div>
  );
};

export type BaseAbilitysWithModsProps = {
  charAb: number;
  abText: string;
  mods: BonusResultMap;
};

// export const BaseAbilitysWithMods: React.FC<BaseAbilitysWithModsProps> = ({
//   charAb,
//   abText,
//   mods
// }) => {
//   const valueAndText: { index: string; value: number; text: string }[] =
//     Object.entries(mods).map(([key, v], index) => {
//       const entity = v as ModifierAbilityResult;
//       const value: number = findAbility(entity.abilitys, abText);
//       const text: string = entity.sources[index].text + ", " + key;
//       return { index: abText + "." + key, value: value, text: text };
//     });
//   const totValue: number =
//     valueAndText.reduce((tot, v) => (tot += v.value), 0) + charAb;
//   return (
//     <div
//       style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
//     >
//       <div>
//         <span style={{ color: "orange" }}>{totValue}</span>
//         <span>{" = "}</span>
//         <span style={{ color: "yellow" }}>{charAb}</span>
//         {valueAndText.map(
//           (vT) =>
//             vT.value !== 0 && (
//               <Popup
//                 key={vT.index}
//                 text={SignNumber(vT.value) + vT.value}
//                 popText={vT.text}
//               />
//             )
//         )}
//       </div>
//       <div>
//         <p>{signAndCountAbility([totValue])}</p>
//       </div>
//     </div>
//   );
// };

// export const AbilitySaveString: React.FC<AbilityLayoutProps> = ({
//   ability
// }) => {
//   const saveThrow: string =
//     ability === "DEXTERITY"
//       ? "REFLEX"
//       : ability === "CONSTITUTION"
//         ? "FORTITUDE"
//         : ability === "WISDOM"
//           ? "WILL"
//           : "---";

//   return (
//     <div style={{ margin: "10px" }}>
//       <p style={{ wordBreak: "break-word" }}>{saveThrow}</p>
//     </div>
//   );
// };

// export const AbilitySkillsString: React.FC<AbilityLayoutProps> = ({
//   ability
// }) => {
//   const skills = AllSkillsAxios();
//   const abilitySkillsString = skills
//     .filter((skill) => skill.ability === ability?.toUpperCase())
//     .map((skill) => skill.skillName.text)
//     .join(", ");
//   return (
//     <div style={{ margin: "10px" }}>
//       <p>{abilitySkillsString}</p>
//     </div>
//   );
// };
