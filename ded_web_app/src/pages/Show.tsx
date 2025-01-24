import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AbilitysComponent } from "../components/AbilitysComponent";
import { CharacterData, ClassExpGold } from "../components/CharacterData";
import { DeleteButton } from "../components/DeleteButton";
import { Initiative } from "../components/Initiative/Initiative";
import { CharacterPc } from "../components/interfaces";

import { urlChar } from "../components/url";
import {
  emptyAbilitys,
  emptyAttacks,
  emptyInventory,
  emptySize
} from "../components/variables";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";
import {
  CharToModify,
  modifyCharacter
} from "../components/Prerequisite/functions/modifyCharacter";
import { BaseAttack } from "../components/Attack/BaseAttack/BaseAttack";
import { SavingThrowComponent } from "../components/SavingThrowComponent";
import { HpComponent } from "../components/HpComponent";
import { CharacterArmor } from "../components/Armor/CharacterArmor";
import { MapOfAttackComponent } from "../components/Attack/MapOfAttackComponent";
import {
  createAttackDisplay,
  modifyAttacks
} from "../components/Attack/function";
import { InventoryComponent } from "../components/Items/Inventory/InventoryComponent/InventoryComponent";
import { SkillShowComponent } from "../components/Skills/Show/SkillShowComponent";
import { SpeedComponent } from "../components/SpeedComponent";
import { FeatsComponent } from "../components/Feats/FeatsComponent";
import { SpecialAbilitiesComponent } from "../components/SpecialAbilities/SpecialAbilitiesComponent";
import { MagicComponent } from "../components/Magic/MagicComponent";

export const Show = () => {
  let { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        setChar(resURL.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [charId]);

  if (!char) return <p>...character loading...</p>;

  let modChar: CharToModify = {
    abilitys: emptyAbilitys,
    size: emptySize,
    // race: { hD: 0, numHD: 0},
    bab: 0,
    adjBonus: { bab: 0, savingThrow: 0, adjLv: 0 },
    classesLv: 0,
    attackRoll: { mono: [], target: [], composed: [] },
    damageBonus: { mono: [], target: [], composed: [] },
    specialAttacks: [],
    initiative: 0,
    baseSave: { fortitude: 0, reflex: 0, will: 0 },
    savingThrow: [],
    listHitDices: [],
    armor: { mono: [], target: [], composed: [] },
    inventory: emptyInventory,
    attacks: emptyAttacks,
    skills: { mono: [], target: [] },
    skillsList: [],
    feats: { feats: [], classFeats: [], pcFeats: [] },
    speed: {
      foot: 0,
      fly: 0,
      climb: 0,
      swim: 0,
      special: ""
    },
    specialAbilities: [],
    spellsPerDay: [],
    spellsKnown: [],
    books: []
  };
  let modif: Prerequisite[] = [];

  // archetype
  char.archetypes.forEach(arch =>
    arch.modifiers && modif.push(arch.modifiers) 
  )

  // size
  char.race.size.modifiers && modif.push(char.race.size.modifiers);
  // race
  char.race.modifiers && modif.push(char.race.modifiers);
  // subRace
  char.race.subRaceFeats &&
    char.race.subRaceFeats.forEach(
      (f) => f.modifiers && modif.push(f.modifiers)
    );
  // subRace
  char.race.race.modifiers && modif.push(char.race.race.modifiers);
  // subRace
  char.race.race.raceFeats &&
    char.race.race.raceFeats.forEach((f) => {
      f.modifiers && modif.push(f.modifiers);
    });

  const createModifierSelected = (
    modif: Prerequisite,
    select: Prerequisite
  ): Prerequisite => {
    return {
      attackRoll: modif.attackRoll,
      damageBonus: modif.damageBonus,
      items: select.items
    };
  };

  // feats
  char.featsList.forEach((f) => {
    f.feat.modifiers && f.selected
      ? modif.push(createModifierSelected(f.feat.modifiers, f.selected))
      : f.selected && modif.push(f.selected);
  });
  // feats
  char.classPcList.forEach((cl) => {
    cl &&
      cl.classCharacter.classFeats.forEach((f) => {
        if (f && f.level <= cl.level) {
          f.modifiers && modif.push(f.modifiers);
        }
      });
  });
  modChar = modifyCharacter(char, modif);

  modChar.attacks = modifyAttacks(modChar);
  modChar.displayAttType = createAttackDisplay(modChar);

  return (
    <>
      {window.innerWidth <= 768 ? (
        <>
          <DeleteButton url={urlChar} />
          <CharacterData char={char} />
          <AbilitysComponent abilitys={modChar.abilitys} />
          <ClassExpGold char={char} />
          <BaseAttack char={modChar} />
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
        </>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "25% 25% 25% 25%"
            }}
          >
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "3 / span 2",
                gridRow: 1
              }}
            >
              <DeleteButton url={urlChar} />
            </div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: "1 / span 2"
              }}
            >
              <CharacterData char={char} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 3,
                gridRow: "2 / span 2"
              }}
            >
              <ClassExpGold char={char} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 4,
                gridRow: "2 / span 2"
              }}
            >
              <AbilitysComponent abilitys={modChar.abilitys} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 5
              }}
            >
              <HpComponent char={modChar} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 3
              }}
            >
              <BaseAttack char={modChar} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 4
              }}
            >
              <SpecialAbilitiesComponent char={modChar} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "3 / span 2",
                gridRow: 5
              }}
            >
              <SavingThrowComponent char={modChar} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "3 / span 2",
                gridRow: 4
              }}
            >
              <Initiative char={modChar} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 4",
                gridRow: 8
              }}
            >
              <CharacterArmor char={modChar} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 3",
                gridRow: 9
              }}
            >
              <MapOfAttackComponent char={modChar} />
            </div>

            <div
              key="inventory"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 4",
                gridRow: 11
              }}
            >
              <InventoryComponent char={modChar} />
            </div>
            <div
              key="skills"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "3 / span 2",
                gridRow: "12 / span 3"
              }}
            >
              <SkillShowComponent char={modChar} />
            </div>
            <div
              key="speed"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 4,
                gridRow: 9
              }}
            >
              <SpeedComponent char={modChar} />
            </div>
            <div
              key="feats"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 12
              }}
            >
              <FeatsComponent char={modChar} />
            </div>
            <div
              key="feats"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 13
              }}
            >
              <MagicComponent char={modChar} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
