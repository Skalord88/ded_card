import { CountArmor, CountInCharArmor } from "../functions";
import { ArmorInCharacter } from "../interfaces";

export const CharacterArmor: React.FC<ArmorInCharacter> = ({
    charArmor,
    charInventory
  }) => {
    const tot = CountArmor(charArmor, charInventory);
  
    const armor = CountInCharArmor(charArmor, charInventory);
  
    return (
      <>
        <h2 className="rpgui-container-framed-golden-2">Class Armor</h2>
        <div style={{ display: "flex" }}>
          <div className="rpgui-container-framed-grey">
            <p style={{ flex: 1 }}>{tot}</p>
            <p style={{ flex: 1 }}>AC</p>
          </div>
          {armor.map((ar) => {
            return (
              <>
                <div key={ar.id} className="rpgui-container-framed-grey">
                  <p style={{ flex: 1 }}>{ar.value}</p>
                  <p style={{ flex: 1 }}>{ar.text}</p>
                </div>
              </>
            );
          })}
        </div>
        </>
    );
  };