import { SignAndCount } from "../functions";
import { D12Popup } from "../Popup/DicePopup/D12Popup";

export type InitiativeProps = {
  initiativeDex: number;
  initiativeMod: number;
};

export const Initiative: React.FC<InitiativeProps> = ({
  initiativeDex,
  initiativeMod
}) => {
  const totInit: number = initiativeDex + initiativeMod;
  const init: string =
    SignAndCount([initiativeDex, initiativeMod]).sign +
    (initiativeDex + initiativeMod);

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Initiative</h2>
      <div style={{ display: "flex" }}>
        <div className="rpgui-container-framed-grey">
          <p style={{ flex: 1 }}>
            <D12Popup textOrWeapon="tot:" value={totInit} modifiers={[]} /> {init}
          </p>
        </div>
        {initiativeDex !== 0 ? (
          <>
            <div className="rpgui-container-framed-grey">
              <p style={{ flex: 1 }}>
                dex: {SignAndCount([initiativeDex]).sign}
                {initiativeDex}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
        {initiativeMod !== 0 ? (
          <>
            <div className="rpgui-container-framed-grey">
              <p style={{ flex: 1 }}>
                bns: {SignAndCount([initiativeMod]).sign}
                {initiativeMod}
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
