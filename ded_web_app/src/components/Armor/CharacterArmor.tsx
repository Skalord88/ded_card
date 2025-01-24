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

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {listOfArmor.map((armor, index) => {
          const textIcon = "rpgui-icon " + armor.text;
          return armor.signNum.number ? (
            <>
              <div
                className="rpgui-container-framed-grey"
                style={{ display: "grid" }}
                key={index}
              >
                <div className={textIcon} style={{ gridColumn: 1 }}></div>
                <div style={{ gridColumn: 2 }}>
                  <p>
                    {index === 0 ? null : armor.signNum.sign}
                    {armor.signNum.number} {armor.text}
                  </p>
                  <p>{armor.item}</p>
                </div>
              </div>
            </>
          ) : null;
        })}
      
        <Failure inventory={char.inventory} key={"failure"} />
        <FlatFooted armorList={listOfArmor} key={"flatFooted"} />
        <Contact armorList={listOfArmor} key={"contact"} />
        
      {(char.armor.target.length > 0 || char.armor.composed.length > 0) && (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <TargetAC target={char.armor.target} composed={char.armor.composed} />
        </div>
        
        
      )}
      </div>
    </>
  );
};
