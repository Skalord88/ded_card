import { CharacterPc } from "../interfaces";
import { ArmorList, ArmorModifiers } from "./ArmorInterface";
import { Contact } from "./Contact";
import { Failure } from "./Failure";
import { FlatFooted } from "./FlatFooted";
import { CalculateArmorInChar } from "./Function";
import { SmallTotalArmor, TotalArmor } from "./TotalArmor";

export type CharacterArmorProps = {
  char: CharacterPc;
  armorModifiers: ArmorModifiers;
};
export const CharacterArmor: React.FC<CharacterArmorProps> = ({
  char,
  armorModifiers
}) => {
  const listOfArmor: ArmorList = CalculateArmorInChar(char, armorModifiers);

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Class Armor</h2>
      {window.innerWidth <= 768 ? (
        <>
        <div>
          <p>
          <SmallTotalArmor armorModifiers={armorModifiers} />
          {listOfArmor.map((ar, index) =>
            ar.bonus === 0 ? null : (
              <div key={index}>
                {ar.text}: {ar.bonus} {ar.item}
              </div>
            )
          )}
          </p>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "flex" }}>
            <TotalArmor armorModifiers={armorModifiers} />
            {listOfArmor.map((ar, index) => {
              return ar.bonus > 0 ? (
                <div key={index} className="rpgui-container-framed-grey">
                  <p style={{ flex: 1 }}>
                    {ar.sign}
                    {ar.bonus}
                  </p>
                  <p style={{ flex: 1 }}>{ar.text}</p>
                  <p style={{ flex: 1 }}>{ar.item}</p>
                </div>
              ) : null;
            })}

            <div className="rpgui-container-framed-grey">
              <p style={{ flex: 1 }}></p>
            </div>
            <Failure inventory={char.inventory} />
            <FlatFooted armorModifiers={armorModifiers} />
            <Contact armorModifiers={armorModifiers} />
          </div>
        </>
      )}
    </>
  );
};
