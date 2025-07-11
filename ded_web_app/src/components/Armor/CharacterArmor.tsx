import { SignAndNumber } from "../interfaces";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { Contact } from "./Contact";
import { Failure } from "./Failure";
import { FlatFooted } from "./FlatFooted";
import { calculateArmorInChar } from "./function";
import { ArmorList } from "./interface/ArmorInterface";

export type CharacterArmorProps = {
  char: CharToModify;
};
export const CharacterArmor: React.FC<CharacterArmorProps> = ({ char }) => {
  const listOfArmor: ArmorList = calculateArmorInChar(char);

  return (
    <div>
      <h2 className="rpgui-container-framed golden-2">Class Armor</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 2fr 1fr",
          // gridTemplateRows: "1fr 1fr 1fr",
          gap: "0.5rem",
          gridTemplateAreas: `
        "ar0        ar1 ar2 ar3"
        "flatFooted ar4 ar5 ar6"
        "contact    ar7 ar8 failure"
        `
        }}
      >
        {listOfArmor.map((armor, index) => (
          <ArmorElement
            key={index + "." + armor.text}
            styl={"ar" + index}
            signNum={armor.signNum}
            text={armor.text}
            item={armor.item}
            icon={armor.icon}
          />
        ))}
        <Failure inventory={char.inventory} key={"failure"} />
        <FlatFooted armorList={listOfArmor} key={"flatFooted"} />
        <Contact armorList={listOfArmor} key={"contact"} />
      </div>
    </div>
  );
};

export const ArmorElement: React.FC<{
  styl: string;
  armrorName?: string;
  signNum: SignAndNumber;
  text: string;
  item: string;
  icon?: string;
}> = ({ styl, armrorName, signNum, text, item, icon }) => {
  return (
    <div className="rpgui-container-framed" style={{ gridArea: styl }}>
      <div className={icon}></div>
      <p>{text}</p>
      <p>{armrorName}</p>
      <p>
        {signNum.sign}
        {signNum.number}
      </p>
      <p>{item}</p>
    </div>
  );
};
