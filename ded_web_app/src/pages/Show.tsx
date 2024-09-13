import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AbilitysComponent } from "../components/AbilitysComponent";
import { CharacterArmor } from "../components/Armor/CharacterArmor";
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
  Inventory,
  Item
} from "../components/interfaces";
import { SavingThrowComponent } from "../components/SavingThrowComponent";
import { SkillShowComponent } from "../components/Skills/Show/SkillShowComponent";
import { SpeedComponent } from "../components/SpeedComponent";
import { urlChar } from "../components/url";
import { characterEmpty } from "../components/variables";
import { AbilitysAndModifiers, BonusAbilities } from "../components/Abilitys/Functions";
import { CheckInAllModifications, FindInMoreLengthModifier, FindInOneLengthModifier } from "../components/Modifiers/Function";
import { Modifiers } from "../components/Modifiers/ModifierInterface";
import { Abilitys } from "../components/Abilitys/Interface";
import { CountBabFromClassPc } from "../components/Attack/Bab/Functions";
import { ArmorModifiers } from "../components/Armor/ArmorInterface";
import { MapOfAttackComponent } from "../components/Attack/MapOfAttackComponent";
import { MaxDextrityCount } from "../components/Armor/Function";
import { reSizeWeapon } from "../components/Size/Function";

export function Show() {
  let { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>(characterEmpty);
  const modifications: Modifiers[] = CheckInAllModifications(char)
  const abilitys: Abilitys = AbilitysAndModifiers(char, modifications)
  const initiativeDex: number = BonusAbilities(abilitys, 'DEX')
  const initiativeMod: number = FindInOneLengthModifier(modifications, 'INITIATIVE')
  const bab: number = CountBabFromClassPc(char) + FindInOneLengthModifier(modifications, "BAB");
  const specificBab: Modifiers[] = FindInMoreLengthModifier(modifications, "BAB");
  const grapple: number = bab + BonusAbilities(char.abilitys, "STR") + FindInOneLengthModifier(modifications, "GRAPPLE");
  const strenghtAtt: number = bab + BonusAbilities(abilitys, 'STR')
  const dextrityAtt: number = bab + BonusAbilities(abilitys, 'DEX')
  const speed: number = FindInOneLengthModifier(modifications, 'SPEED')
  const armorModifiers: ArmorModifiers = {
    size: FindInOneLengthModifier(modifications, 'ARMOR_SIZE'),
    armor: FindInOneLengthModifier(modifications, 'ARMOR_BONUS') + char.inventory.armor.enchantment.enchantment,
    shiled: FindInOneLengthModifier(modifications, 'SHIELD_BONUS') + char.inventory.shield.enchantment.enchantment,
    dextrity: MaxDextrityCount(BonusAbilities(abilitys, 'DEX'), char.inventory.armor.maxDex),
    dodge: FindInOneLengthModifier(modifications, 'DODGE_BONUS'),
    natural: FindInOneLengthModifier(modifications, 'NATURAL_ARMOR_BONUS'),
    deflection: FindInOneLengthModifier(modifications, 'DEFLECTION_BONUS'),
  }
  const inventory: Inventory = {...char.inventory,
    weaponOne: reSizeWeapon(char.race.size, char.inventory.weaponOne),
    weaponTwo: reSizeWeapon(char.race.size, char.inventory.weaponTwo),
    weaponThree: reSizeWeapon(char.race.size, char.inventory.weaponThree),
    weaponFour: reSizeWeapon(char.race.size, char.inventory.weaponFour),
    weaponFive: reSizeWeapon(char.race.size, char.inventory.weaponFive),
  }
  const attacks: Attacks = {
    ...char.attacks,
    firstAttackSetOne: reSizeWeapon(char.race.size, char.attacks.firstAttackSetOne),
    secondAttackSetOne: reSizeWeapon(char.race.size, char.attacks.secondAttackSetOne),
    additionalAttackSetOne: reSizeWeapon(char.race.size, char.attacks.additionalAttackSetOne),

    firstAttackSetTwo: reSizeWeapon(char.race.size, char.attacks.firstAttackSetTwo),
    secondAttackSetTwo: reSizeWeapon(char.race.size, char.attacks.secondAttackSetTwo),
    additionalAttackSetTwo: reSizeWeapon(char.race.size, char.attacks.additionalAttackSetTwo),
  }

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

  return (
    <>
      <div style={{ display: "grid", scale: '95%', justifyContent: 'center' }}>
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
          <BaseAttack bab={bab} grapple={grapple} strenghtAtt={strenghtAtt} dextrityAtt={dextrityAtt} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 2,
            gridRow: 4
          }}
        >
          <Initiative initiativeDex={initiativeDex} initiativeMod={initiativeMod} />
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
          <CharacterArmor
            char={char}
            armorModifiers={armorModifiers}
          />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 3",
            gridRow: 7
          }}
        >
          <MapOfAttackComponent attacks={attacks} bab={bab} strenghtAtt={strenghtAtt} dextrityAtt={dextrityAtt} specific={specificBab} />
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: "1 / span 2",
            gridRow: "8 / span 2"
          }}
        >
          <p>
            <SkillShowComponent key={"skillsTable"} char={char} abilitys={abilitys} modifications={modifications} />
          </p>
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 3,
            gridRow: 8
          }}
        >
          <SpeedComponent speed={speed} />
        </div>
      </div>
    </>
  );
}
