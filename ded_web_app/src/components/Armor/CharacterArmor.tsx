import { CharProps } from "../interfaces";
import { ArmorList } from "./ArmorInterface";
import { CalculateArmorInChar } from "./Function";

export const CharacterArmor: React.FC<CharProps> = ({ char }) => {
  const listOfArmor: ArmorList = CalculateArmorInChar(char);

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Class Armor</h2>
      <div style={{ display: "flex" }}>
        {listOfArmor.map((ar) => {
          return (
            <>
              <div className="rpgui-container-framed-grey">
                <p style={{ flex: 1 }}>
                  {ar.sign}
                  {ar.bonus}
                </p>
                <p style={{ flex: 1 }}>{ar.text}</p>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
