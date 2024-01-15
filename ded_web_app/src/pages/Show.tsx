import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapOfStudy } from "../components/MyComponents";
import { characterPc, SkillProps } from "../components/interfaces";
import { urlChar } from "../components/url";
import { characterEmpty, emptySkill } from "../components/variables";

export function Show() {
  let { charId } = useParams();

  const [char, setChar] = useState<characterPc>(characterEmpty);
  const [skills, setSkills] = useState<SkillProps[]>([emptySkill]);
  const [skillsNoStudy, setSkillsNoStudy] = useState<SkillProps[]>([]);
  // const [know, setKnow] = useState<SkillProps | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);

        if(char.id>0){
        setChar(resURL.data)};
        if(Array.isArray(resURL.data.skillsList)){
          const skillData = resURL.data.skillsList;
          setSkills(skillData);
        }

        console.log(skills)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {

    // const skNoStudy = skills.filter((s) => s.skill && ![6, 17].includes(s.skill.idSkill));
    // setSkillsNoStudy(skNoStudy);

    // const kn = skills.find((k) => k.skill.idSkill === 17);
    // setKnow(kn);
  // }, [char, skills]);

  const grapple = char.bab + Math.floor((char.abilitys.streght - 10) / 2);

  return (
    <>
      <p>
        name: {char.characterName} / player: {char.playerName}
      </p>
      <p>
        race: {char.race}, {char.subRace}
      </p>
      <p>
        size: {char.size}, speed: {char.speed} ft. / {char.speed / 5} squares
      </p>
      <p>
        base attack bonus: +{char.bab}, grapple: {grapple > 0 ? "+" : ""}
        {grapple}
      </p>
      <p>
        abilitys:{" "}
        {char.abilitys ? (
          <>
            <li>
              STR: {char.abilitys.streght}{" "}
              {Math.floor((char.abilitys.streght - 10) / 2) >= 0
                ? "+" + Math.floor((char.abilitys.streght - 10) / 2)
                : Math.floor((char.abilitys.streght - 10) / 2)}
            </li>
            <li>
              DEX: {char.abilitys.dextrity}{" "}
              {Math.floor((char.abilitys.dextrity - 10) / 2) >= 0
                ? "+" + Math.floor((char.abilitys.dextrity - 10) / 2)
                : Math.floor((char.abilitys.dextrity - 10) / 2)}
            </li>
            <li>
              CON: {char.abilitys.constitution}{" "}
              {Math.floor((char.abilitys.constitution - 10) / 2) >= 0
                ? "+" + Math.floor((char.abilitys.constitution - 10) / 2)
                : Math.floor((char.abilitys.constitution - 10) / 2)}
            </li>
            <li>
              INT: {char.abilitys.intelligence}{" "}
              {Math.floor((char.abilitys.intelligence - 10) / 2) >= 0
                ? "+" + Math.floor((char.abilitys.intelligence - 10) / 2)
                : Math.floor((char.abilitys.intelligence - 10) / 2)}
            </li>
            <li>
              WIS: {char.abilitys.wisdom}{" "}
              {Math.floor((char.abilitys.wisdom - 10) / 2) >= 0
                ? "+" + Math.floor((char.abilitys.wisdom - 10) / 2)
                : Math.floor((char.abilitys.wisdom - 10) / 2)}
            </li>
            <li>
              CHA: {char.abilitys.charisma}{" "}
              {Math.floor((char.abilitys.charisma - 10) / 2) >= 0
                ? "+" + Math.floor((char.abilitys.charisma - 10) / 2)
                : Math.floor((char.abilitys.charisma - 10) / 2)}
            </li>
          </>
        ) : (
          <>...loading abilitys...</>
        )}
      </p>
      <p>
        ecl: {char.effectiveCharacterLv}{" "}
        {char.classPcList ? (
          <>
            {char.classPcList.map((c, index) => {
              return (
                <li key={index}>
                  {c.className} {c.level}
                </li>
              );
            })}
          </>
        ) : (
          <>...loading class...</>
        )}
      </p>
      <p>
        hit dice:{" "}
        {char.vitality?.hitDices ? (
          <>
            {Object.entries(char.vitality.hitDices).map(([k, v]) => {
              return (
                <>
                  {v}d{k}
                  {char.abilitys.constitution >= 0 ? "+" : "-"}
                  {Math.floor(
                    v * ((char.abilitys.constitution - 10) / 2)
                  )},{" "}
                </>
              );
            })}
            life: {char.vitality.life}, hp: {char.vitality.hitPoints}
          </>
        ) : (
          <p>...loading vitality...</p>
        )}
      </p>
      <p>
        AC: 10
        {char.armorClass.dextrityBonus > 0
          ? " + dextrity " + char.armorClass.dextrityBonus
          : ""}
        {char.armorClass.sizeBonus > 0
          ? " + size " + char.armorClass.sizeBonus
          : ""}
        {char.armorClass.armorBonus > 0
          ? " + armor " + char.armorClass.armorBonus
          : ""}
        {char.armorClass.shildBonus > 0
          ? " + shild " + char.armorClass.shildBonus
          : ""}
        {char.armorClass.enhancementBonuses > 0
          ? " + enhancement " + char.armorClass.enhancementBonuses
          : ""}
        {char.armorClass.deflectionBonuses > 0
          ? " + deflection " + char.armorClass.deflectionBonuses
          : ""}
        {char.armorClass.naturalArmor > 0
          ? " + natural " + char.armorClass.naturalArmor
          : ""}
        {char.armorClass.dodgeBonus > 0
          ? " + dodge " + char.armorClass.dodgeBonus
          : ""}
      </p>
      <p>
        saving throw:{" "}
        {char.savingThrows ? (
          <>
            fort: {char.savingThrows.fortitude}, ref: {char.savingThrows.reflex}
            , will: {char.savingThrows.will}
          </>
        ) : (
          <>...loading saving throw...</>
        )}
      </p>
      <div className="container">
        {char.featsList ? (
          <div className="row">
            feats:
            {char.featsList.map((f, index) => {
              return (
                <div className="column" key={index}>
                  {f.characterFeatName}{" "}
                  {f.characterFeatSpecial === null ? (
                    <></>
                  ) : (
                    f.characterFeatSpecial
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <>...loading feats...</>
        )}
        <div className="row">
          skills:
          <>{skills.length > 0 ? <></> : <>loading skill...</>}</>
          {skillsNoStudy.map((s, index) => {
            return (
              <div className="column" key={index}>
                {s.skill.classSkill ? "x" : "o"} {s.skill.nameSkill}{" "}
                {s.skill.skillRank}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
