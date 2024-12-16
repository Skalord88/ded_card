import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AbilitysComponent } from "../components/AbilitysComponent";
import {
  CharacterData,
  ClassExpGold
} from "../components/CharacterData";
import { DeleteButton } from "../components/DeleteButton";
import { Initiative } from "../components/Initiative/Initiative";
import { CharacterPc } from "../components/interfaces";

import { urlChar } from "../components/url";
import { emptyAbilitys } from "../components/variables";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";
import { CharToModify, modifyCharacter } from "../components/Prerequisite/functions/modifyCharacter";
import { BaseAttack } from "../components/Attack/BaseAttack/BaseAttack";

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

  if (!char) return <>...character loading...</>;

  // const feats: FeatsToShow[] = GroupAllFeats([
  //   ...char.featsList, //FeatPc
  //   ...char.race.raceFeats, //Feat
  //   ...char.archetypes.flatMap((ar) => ar.archetypeFeats), //Feat
  //   ...char.classPcList //ClassPc
  // ]);

  // const onlyModification: Modifiers[] = [...char.race.size.modifiers, ...char.race.modifiers, ...char.race.race.modifiers]

  // const modificationFromFeats: Modifiers[] = feats.flatMap(feat => feat.modifiers)
  // const modifications: Modifiers[] = [...onlyModification, ...modificationFromFeats]

  // let mod = [
    // ...char.featsList.flatMap(f => f.selected),
  //   ...char.race.raceFeats.flatMap(f => f.modifiers),
  //   ...char.archetypes.flatMap(f => f.modifiers)
  // ];

  let modChar: CharToModify = {
    abilitys: emptyAbilitys,
    bab: 0,
    attackRoll: [],
    specialAttacks: [],
    initiative : 0
  };
  let modif: Prerequisite[] = [];

  if(char.race.size.modifiers !== null){
    modif.push(char.race.size.modifiers)
    modChar = modifyCharacter(char, modif);
  }
  if(char.race.modifiers !== null){
    modif.push(char.race.modifiers)
    modChar = modifyCharacter(char, modif);
  }
  if(char.race.race.modifiers !== null){
    modif.push(char.race.race.modifiers)
    modChar = modifyCharacter(char, modif);
  }
  char.featsList.forEach(f => {
    if(f.selected !== null) {
      modif.push(f.selected)
      modChar = modifyCharacter(char, modif)
    }
  })

  // console.log(modChar.abilitys);
  // console.log(modChar.race.modifiers?.abilitys);
  // console.log(modChar.race.race.modifiers?.abilitys);

  // const abilitys: Abilitys = ModifyAbilitys(char.abilitys, modifications);
  // const strenght: number = BonusAbilities(abilitys, "STR");
  // const dexterity: number = BonusAbilities(abilitys, "DEX");
  // const initiativeMod: number = ModifyInitiative(char.abilitys, modifications)
  // // FindInOneLengthModifier(
  // //   modifications,
  // //   "INITIATIVE"
  // // );
  // const specificBab: Modifiers[] = FindInMoreLengthModifier(modifications, [
  //   "ATTACK_ROLL",
  //   "WEAPON_FOUS"
  // ]);

  

  // const specificDmg: Modifiers[] = FindInMoreLengthModifier(modifications, [
  //   "WEAPON_SPECIALIZATION"
  // ]);
  // const specificCrit: Modifiers[] = FindInMoreLengthModifier(modifications, [
  //   "IMPROVED_CRITICAL"
  // ]);
  // const specificFavEnemy: Modifiers[] = FindInMoreLengthModifier(
  //   modifications,
  //   "FAVORED_ENEMY"
  // );

  // const specificFghFeats: number[] = FindFightingFeats(char.featsList);
  // const grapple: number =
  //   adjBab + strenght + FindInOneLengthModifier(modifications, "GRAPPLE");
  // const strenghtAtt: number = adjBab + strenght;
  // const dexterityAtt: number = adjBab + dexterity;
  // const speed: number = FindInOneLengthModifier(modifications, "SPEED");

  // const armorModifiers: ArmorModifiers = {
  //   size: FindInOneLengthModifier(modifications, "ARMOR_SIZE"),
  //   armor: char.inventory.armor ?
  //     FindInOneLengthModifier(modifications, "ARMOR_BONUS") +
  //     (char.inventory.armor.enchantmentList !== null?
  //       char.inventory.armor.enchantmentList.reduce(
  //       (tot, ench) => 
  //         tot + ench.ability === null? 0 : ench.enchantment
  //       , 0
  //     ) : 0) : 0,
  //   shiled: char.inventory.shield ?
  //     FindInOneLengthModifier(modifications, "SHIELD_BONUS") +
  //     (char.inventory.shield.enchantmentList !== null?
  //     char.inventory.shield.enchantmentList.reduce(
  //       (tot, ench) => 
  //         tot + ench.ability === null? 0 : ench.enchantment
  //       , 0
  //     ) : 0) : 0,
  //   dexterity: char.inventory.armor ? MaxdexterityCount(
  //     BonusAbilities(abilitys, "DEX"),
  //     char.inventory.armor.maxDex
  //   ) : 0,
  //   dodge: FindInOneLengthModifier(modifications, "DODGE_BONUS"),
  //   natural: FindInOneLengthModifier(modifications, "NATURAL_ARMOR_BONUS"),
  //   deflection: FindInOneLengthModifier(modifications, "DEFLECTION_BONUS")
  // };
  
  // const inventory: Inventory = {
  //   ...char.inventory,
  //   armor: char.inventory.armor && "armorName" in char.inventory.armor ? 
  //   reSizeArmor(char.race.size, char.inventory.armor) as Armor : noneArmor,

  //   shield: char.inventory.shield && "shieldName" in char.inventory.shield ?
  //   reSizeArmor(char.race.size, char.inventory.shield) as Shield : noneShield,

  //   weaponOne: char.inventory.weaponOne
  //   //  ? char.inventory.weaponOne : noneWeapon,
  //   ? reSizeWeapon(char.race.size, char.inventory.weaponOne)
  //   : reSizeWeapon(char.race.size, noneWeapon),
  //   weaponTwo: char.inventory.weaponTwo
  //   //  ? char.inventory.weaponTwo : noneWeapon,
  //   ? reSizeWeapon(char.race.size, char.inventory.weaponTwo)
  //   : reSizeWeapon(char.race.size, noneWeapon),
  //   weaponThree: char.inventory.weaponThree
  //   //  ? char.inventory.weaponThree : noneWeapon,
  //   ? reSizeWeapon(char.race.size, char.inventory.weaponThree)
  //   : reSizeWeapon(char.race.size, noneWeapon),
  //   weaponFour: char.inventory.weaponFour
  //   //  ? char.inventory.weaponFour : noneWeapon,
  //   ? reSizeWeapon(char.race.size, char.inventory.weaponFour)
  //   : reSizeWeapon(char.race.size, noneWeapon),
  //   weaponFive: char.inventory.weaponFive
  //   //  ? char.inventory.weaponFive : noneWeapon
  //   ? reSizeWeapon(char.race.size, char.inventory.weaponFive)
  //   : reSizeWeapon(char.race.size, noneWeapon)
  //   ,
  //   backpack: [noneItem, noneItem, noneItem],
  //   head: noneItem,
  //   neck: noneItem,
  //   arms: noneItem,
  //   hands: [noneItem, noneItem],
  //   cloth: noneItem,
  //   legs: noneItem
  // };
  // const weight: number = CalculateInventoryWeight(inventory);
  // const carrying: [string, number] = CalculateWeight(
  //   abilitys.strength,
  //   char.race.size.id,
  //   weight
  // );
  // const attacks: Attacks = {
  //   ...char.attacks,
  //   firstAttackSetOne: char.attacks.firstAttackSetOne ? reSizeWeapon(
  //     char.race.size,
  //     char.attacks.firstAttackSetOne
  //   ) : reSizeWeapon(char.race.size, noneWeapon),
  //   secondAttackSetOne: char.attacks.secondAttackSetOne ? reSizeWeapon(
  //     char.race.size,
  //     char.attacks.secondAttackSetOne
  //   ) : reSizeWeapon(char.race.size, noneWeapon),
  //   additionalAttackSetOne: char.attacks.additionalAttackSetOne ? reSizeWeapon(
  //     char.race.size,
  //     char.attacks.additionalAttackSetOne
  //   ) : reSizeWeapon(char.race.size, noneWeapon),
  //   firstAttackSetTwo: char.attacks.firstAttackSetTwo ? reSizeWeapon(
  //     char.race.size,
  //     char.attacks.firstAttackSetTwo
  //   ) : reSizeWeapon(char.race.size, noneWeapon),
  //   secondAttackSetTwo: char.attacks.secondAttackSetTwo?  reSizeWeapon(
  //     char.race.size,
  //     char.attacks.secondAttackSetTwo
  //   ) : reSizeWeapon(char.race.size, noneWeapon),
  //   additionalAttackSetTwo: char.attacks.additionalAttackSetTwo ? reSizeWeapon(
  //     char.race.size,
  //     char.attacks.additionalAttackSetTwo
  //   ) : reSizeWeapon(char.race.size, noneWeapon)
  // };

  return (
    <>
      {window.innerWidth <= 768 ? (
        <>
          <DeleteButton url={urlChar} />
          <CharacterData char={char} />
          <AbilitysComponent abilitys={modChar.abilitys} />
          <ClassExpGold char={char} />
          <BaseAttack
            char={modChar}
          />
          <Initiative char={modChar} />
          {/* <SavingThrowComponent
            char={char}
            abilitys={abilitys}
            modifications={modifications}
          />
          <HpComponent char={char} abilitys={abilitys} />
          <CharacterArmor char={char} armorModifiers={armorModifiers} />
          <MapOfAttackComponent
            attacks={attacks}
            bab={adjBab}
            strenght={strenght}
            strenghtAtt={strenghtAtt}
            dexterityAtt={dexterityAtt}
            specific={[
              specificBab,
              specificDmg,
              specificCrit,
              specificFavEnemy
            ]}
            specificFghFeats={specificFghFeats}
          />
          <InventoryComponent inventory={inventory} carrying={carrying} />
          <SkillShowComponent
            key={"skillsTable"}
            char={char}
            abilitys={abilitys}
            modifications={modifications}
          />
          <SpeedComponent speed={speed} />
          <FeatsComponent feats={feats} titolo=""/> */}
          </>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              justifyContent: "center",
              gridTemplateColumns: "25% 40% 35%"
            }}
          >
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 1
              }}
            ></div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 3,
                gridRow: 1
              }}
            >
              <DeleteButton url={urlChar} />
            </div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 2
              }}
            >
              <CharacterData char={char} />
            </div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 3,
                gridRow: "2 / span 3"
              }}
            >
              <AbilitysComponent abilitys={modChar.abilitys} />
            </div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 1,
                gridRow: "3 / span 2"
              }}
            >
              <ClassExpGold char={char} />
            </div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 2,
                gridRow: 3
              }}
            >
              <BaseAttack
                char={modChar}
              />
            </div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 2,
                gridRow: 4
              }}
            >
              <Initiative
                char={modChar}
              />
            </div>
            {/* <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: 5
              }}
            >
              <SavingThrowComponent
                char={char}
                abilitys={abilitys}
                modifications={modifications}
              />
            </div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 3,
                gridRow: 5
              }}
            >
              <HpComponent char={char} abilitys={abilitys} />
            </div>

            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 3",
                gridRow: 6
              }}
            >
              <CharacterArmor char={char} armorModifiers={armorModifiers} />
            </div>
            <div
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 3",
                gridRow: 7
              }}
            >
              <MapOfAttackComponent
                attacks={attacks}
                bab={adjBab}
                strenght={strenght}
                strenghtAtt={strenghtAtt}
                dexterityAtt={dexterityAtt}
                specific={[
                  specificBab,
                  specificDmg,
                  specificCrit,
                  specificFavEnemy
                ]}
                specificFghFeats={specificFghFeats}
              />
            </div>
            <div
              key="inventory"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 3",
                gridRow: 8
              }}
            >
              {inventory? <InventoryComponent inventory={inventory} carrying={carrying} /> : null}
            </div>
            <div
              key="skills"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 2",
                gridRow: "9 / span 2"
              }}
            >
                <SkillShowComponent
                  char={char}
                  abilitys={abilitys}
                  modifications={modifications}
                />
            </div>
            <div
              key="speed"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: 3,
                gridRow: 9
              }}
            >
              <SpeedComponent speed={speed} />
            </div>
            <div
              key="feats"
              className="rpgui-container-framed-grey"
              style={{
                gridColumn: "1 / span 3",
                gridRow: 11
              }}
            >
              <FeatsComponent feats={feats} titolo=""/> 
            </div> */}
          </div>
        </>
      )}
    </>
  );
};
