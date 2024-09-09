import { Abilitys } from "../Abilitys/Interface";
import { BonusAbilities, SignAndCount } from "../functions";
import { D12Popup } from "../Popup/DicePopup/D12Popup";

export type InitiativeProps = {
  abilitys: Abilitys,
  initiative: number
}

export const Initiative: React.FC<InitiativeProps> = ({ abilitys, initiative }) => {
  const init: string = 
    SignAndCount([BonusAbilities(abilitys, "DEX")]).sign +
    (BonusAbilities(abilitys, "DEX") + initiative)
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Initiative</h2>
      <p style={{ textAlign: "center"}}>
        dex: <D12Popup text={init} value={BonusAbilities(abilitys, "DEX")} />{" "}
        bonus: {initiative}
      </p>
    </>
  );
};
