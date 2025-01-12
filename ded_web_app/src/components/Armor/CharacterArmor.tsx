import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { Contact } from "./Contact";
import { Failure } from "./Failure";
import { FlatFooted } from "./FlatFooted";
import { calculateArmorInChar } from "./function";
import { ArmorList } from "./interface/ArmorInterface";
import { TargetAC } from "./TargetAC";

export type CharacterArmorProps = {
  char: CharToModify;
};
export const CharacterArmor: React.FC<CharacterArmorProps> = ({ char }) => {
  const listOfArmor: ArmorList = calculateArmorInChar(char);

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Class Armor</h2>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
        {listOfArmor.map((armor, index) =>
          armor.signNum.number ? (
            <div className="rpgui-container-framed-grey" key={index}>
              <p>
                {index === 0 ? null : armor.signNum.sign}
                {armor.signNum.number} {armor.text}
              </p>
              <p>{armor.item}</p>
            </div>
          ) : null
        )}
        <Failure inventory={char.inventory} key={"failure"} />
        <FlatFooted armorList={listOfArmor} key={"flatFooted"} />
        <Contact armorList={listOfArmor} key={"contact"} />
      </div>
      {(char.armor.target.length > 0 || char.armor.composed.length > 0) && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TargetAC target={char.armor.target} composed={char.armor.composed} />
        </div>
      )}
    </>
  );
};
