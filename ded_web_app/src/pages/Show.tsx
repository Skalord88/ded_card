import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { MapOfSkillsNoStudy, MapOfStudy } from "../components/MyComponents";
import {
  CharacterPc,
  Inventory,
  MapOfSkills,
  SkillProps
} from "../components/interfaces";
import { urlChar } from "../components/url";
import { characterEmpty, emptyInventory } from "../components/variables";

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

  const grapple = char.bab + Math.floor((char.abilitys.streght - 10) / 2);

  return (
    <>
      <div className="container">
        <div className="container-item">
          name: {char.characterName} / player: {char.playerName}
        </div>
        <div className="container-item">
          race: {char.race}, {char.subRace}
        </div>
        <div className="container-item">
          size: {char.size}, speed: {char.speed} ft. / {char.speed / 5} squares
        </div>
        <div className="container-item">
          base attack bonus: +{char.bab}, grapple: {grapple > 0 ? "+" : ""}
          {grapple}
        </div>

        <div className="container-item">
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
        </div>
        <div className="container-item">
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
        </div>
        <div className="container-item">
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
            <div className="container-item">...loading vitality...</div>
          )}
        </div>
        <div className="container-item">
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
          {char.armorClass.shieldBonus > 0
            ? " + shield " + char.armorClass.shieldBonus
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
        </div>
        <div className="container-item">
          saving throw:{" "}
          {char.savingThrows ? (
            <>
              fort: {char.savingThrows.fortitude}, ref:{" "}
              {char.savingThrows.reflex}, will: {char.savingThrows.will}
            </>
          ) : (
            <>...loading saving throw...</>
          )}
        </div>

        {char.featsList ? (
          <div className="container-item">
            feats:
            {char.featsList.map((f, index) => {
              return (
                <div key={index}>
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
        <div className="container-item">
          {/* <MapOfSkillsNoStudy skills={skillsNoStudy.skills} /> */}
        </div>
        <div className="container-item">
          {/* <MapOfStudy skills={skillsStudy.skills} /> */}
        </div>
        <div className="container-item">
          <div>
            armor: {inventory.armor.armorName} +{inventory.armor.armorClass}
          </div>
          <div>
            shield: {inventory.shield.shieldName} +{inventory.shield.armorClass}
          </div>{" "}
          <div>
            weapon I: {inventory.weaponOne.name} {inventory.weaponOne.damage}
          </div>
          <div>
            weapon II: {inventory.weaponTwo.name} {inventory.weaponTwo.damage}
          </div>
        </div>
      </div>
    </>
  );
}
