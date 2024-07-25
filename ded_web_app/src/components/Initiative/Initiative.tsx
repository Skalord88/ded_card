import { CharProps } from "../CharacterData";
import { BonusAbilities, SignAndCount } from "../functions";
import { D12Popup } from "../Popup/DicePopup/D12Popup";

export const Initiative: React.FC<CharProps> = ({ char }) => {
  const init: string = SignAndCount([BonusAbilities(char.abilitys, "DEX")]).sign + BonusAbilities(char.abilitys, "DEX")
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Initiative</h2>
      <p style={{ textAlign: "center"}}>
        <D12Popup text={init} value={BonusAbilities(char.abilitys, "DEX")} />{" "}
      </p>
    </>
  );
};
