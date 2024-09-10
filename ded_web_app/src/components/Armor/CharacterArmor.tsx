import { Abilitys } from "../Abilitys/Interface";
import { CharacterPc, CharProps } from "../interfaces";
import { Modifiers } from "../Modifiers/ModifierInterface";
import { ArmorList, ArmorModifiers } from "./ArmorInterface";
import { Contact } from "./Contact";
import { Failure } from "./Failure";
import { FlatFooted } from "./FlatFooted";
import { CalculateArmorInChar } from "./Function";
import { TotalArmor } from "./TotalArmor";

export type CharacterArmorProps = {
  char: CharacterPc;
  abilitys: Abilitys;
  armorModifiers: ArmorModifiers;
};
export const CharacterArmor: React.FC<CharacterArmorProps> = ({
  char,
  abilitys,
  armorModifiers
}) => {
  const listOfArmor: ArmorList = CalculateArmorInChar(
    char,
    abilitys,
    armorModifiers
  );

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Class Armor</h2>
      <div style={{ display: "flex" }}>
        <TotalArmor armorModifiers={armorModifiers}/>
        {listOfArmor.map((ar) => {
          return (
            <>
              {ar.bonus > 0 ? (
                <>
                  <div className="rpgui-container-framed-grey">
                    <p style={{ flex: 1 }}>
                      {ar.sign}
                      {ar.bonus}
                    </p>
                    <p style={{ flex: 1 }}>{ar.text}</p>
                    <p style={{ flex: 1 }}>{ar.item}</p>
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          );
        })}
        <div style={{ display: "flex" }}>
          <Failure inventory={char.inventory} />
          <FlatFooted armorModifiers={armorModifiers} />
          <Contact armorModifiers={armorModifiers} />
        </div>
      </div>
    </>
  );
};
