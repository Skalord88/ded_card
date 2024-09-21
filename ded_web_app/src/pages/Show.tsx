import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AbilitysAndModifiers,
  BonusAbilities
} from "../components/Abilitys/Functions";
import { Abilitys } from "../components/Abilitys/Interface";
import { AbilitysComponent } from "../components/AbilitysComponent";
import { ArmorModifiers } from "../components/Armor/ArmorInterface";
import { CharacterArmor } from "../components/Armor/CharacterArmor";
import { MaxDextrityCount } from "../components/Armor/Function";
import { CountBabFromClassPc } from "../components/Attack/Bab/Functions";
import { MapOfAttackComponent } from "../components/Attack/MapOfAttackComponent";
import {
  BaseAttack,
  CharacterData,
  ClassExpGold
} from "../components/CharacterData";
import { DeleteButton } from "../components/DeleteButton";
import { HpComponent } from "../components/HpComponent";
import { Initiative } from "../components/Initiative/Initiative";
import {
  Attacks,
  CharacterPc,
  Inventory
} from "../components/interfaces";
import { InventoryComponent } from "../components/Items/Inventory/InventoryComponent/InventoryComponent";
import {
  CheckInAllModifications,
  FindInMoreLengthModifier,
  FindInOneLengthModifier
} from "../components/Modifiers/Function";
import { Modifiers } from "../components/Modifiers/ModifierInterface";
import { SavingThrowComponent } from "../components/SavingThrowComponent";
import { SkillShowComponent } from "../components/Skills/Show/SkillShowComponent";
import { SpeedComponent } from "../components/SpeedComponent";
import { urlChar } from "../components/url";
import { reSizeWeapon } from "../components/Size/Function";
import { noneWeapon } from "../components/variables";
import { CalculateInventoryWeight, CalculateWeight } from "../components/Items/Inventory/Function";

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

  const modifications: Modifiers[] = CheckInAllModifications(char);
  const abilitys: Abilitys = AbilitysAndModifiers(char.abilitys, modifications);
  const strenght: number = BonusAbilities(abilitys, "STR");
  const dextrity: number = BonusAbilities(abilitys, "DEX");
  const initiativeMod: number = FindInOneLengthModifier(
    modifications,
    "INITIATIVE"
  );
  const bab: number =
    CountBabFromClassPc(char) + FindInOneLengthModifier(modifications, "BAB");
  const specificBab: Modifiers[] = FindInMoreLengthModifier(
    modifications,
    "BAB"
  );
  const grapple: number =
    bab +
    BonusAbilities(char.abilitys, "STR") +
    FindInOneLengthModifier(modifications, "GRAPPLE");
  const strenghtAtt: number = bab + BonusAbilities(abilitys, "STR");
  const dextrityAtt: number = bab + BonusAbilities(abilitys, "DEX");
  const speed: number = FindInOneLengthModifier(modifications, "SPEED");
  const armorModifiers: ArmorModifiers = {
    size: FindInOneLengthModifier(modifications, "ARMOR_SIZE"),
    armor:
      FindInOneLengthModifier(modifications, "ARMOR_BONUS") +
      char.inventory.armor.enchantment.enchantment,
    shiled:
      FindInOneLengthModifier(modifications, "SHIELD_BONUS") +
      char.inventory.shield.enchantment.enchantment,
    dextrity: MaxDextrityCount(
      BonusAbilities(abilitys, "DEX"),
      char.inventory.armor.maxDex
    ),
    dodge: FindInOneLengthModifier(modifications, "DODGE_BONUS"),
    natural: FindInOneLengthModifier(modifications, "NATURAL_ARMOR_BONUS"),
    deflection: FindInOneLengthModifier(modifications, "DEFLECTION_BONUS")
  };
  const inventory: Inventory = {
    ...char.inventory,
    armor: char.inventory.armor,
    weaponOne: char.inventory.weaponOne? reSizeWeapon(char.race.size, char.inventory.weaponOne) : reSizeWeapon(char.race.size, noneWeapon),
    weaponTwo: char.inventory.weaponTwo? reSizeWeapon(char.race.size, char.inventory.weaponTwo) : reSizeWeapon(char.race.size, noneWeapon),
    weaponThree: char.inventory.weaponThree? reSizeWeapon(char.race.size, char.inventory.weaponThree) : reSizeWeapon(char.race.size, noneWeapon),
    weaponFour: char.inventory.weaponFour? reSizeWeapon(char.race.size, char.inventory.weaponFour) : reSizeWeapon(char.race.size, noneWeapon),
    weaponFive: char.inventory.weaponFive? reSizeWeapon(char.race.size, char.inventory.weaponFive) : reSizeWeapon(char.race.size, noneWeapon),
  };
  const weight: number = CalculateInventoryWeight(inventory);
  const carrying: [string, number] = CalculateWeight(abilitys.strength, char.race.size.id, weight)
  const attacks: Attacks = {
    ...char.attacks,
    firstAttackSetOne: reSizeWeapon(
      char.race.size,
      char.attacks.firstAttackSetOne
    ),
    secondAttackSetOne: reSizeWeapon(
      char.race.size,
      char.attacks.secondAttackSetOne
    ),
    additionalAttackSetOne: reSizeWeapon(
      char.race.size,
      char.attacks.additionalAttackSetOne
    ),
    
    firstAttackSetTwo: reSizeWeapon(
      char.race.size,
      char.attacks.firstAttackSetTwo
    ),
    secondAttackSetTwo: reSizeWeapon(
      char.race.size,
      char.attacks.secondAttackSetTwo
    ),
    additionalAttackSetTwo: reSizeWeapon(
      char.race.size,
      char.attacks.additionalAttackSetTwo
    )
  };

  return (
    <>
    {char?<>
      <div
        style={{
          display: "grid",
          justifyContent: "center"
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
          <AbilitysComponent abilitys={abilitys} />
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
            bab={bab}
            grapple={grapple}
            strenghtAtt={strenghtAtt}
            dextrityAtt={dextrityAtt}
          />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 2,
            gridRow: 4
          }}
        >
          <Initiative initiativeDex={dextrity} initiativeMod={initiativeMod} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 2",
            gridRow: 5
          }}
        >
          <SavingThrowComponent char={char} modifications={modifications} />
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
            bab={bab}
            strenght={strenght}
            strenghtAtt={strenghtAtt}
            dextrityAtt={dextrityAtt}
            specific={specificBab}
          />
        </div>
        <div
          key="inventory"
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 3",
            gridRow: 8
          }}
        ><InventoryComponent inventory={inventory} carrying={carrying} /></div>
        <div
          key="skills"
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 2",
            gridRow: "9 / span 2"
          }}
        >
          <p>
            <SkillShowComponent
              key={"skillsTable"}
              char={char}
              abilitys={abilitys}
              modifications={modifications}
            />
          </p>
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
      </div>
      </>:<></>}
    </>
  );
}
