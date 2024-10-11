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

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Initiative</h2>
      <div style={{ display: "flex" }}>
        <div key={"tot"}>
          <p style={{ flex: 1 }}>
            <D12Popup textOrWeapon="tot:" value={totInit} modifiers={[]} />
          </p>
        </div>
        {initiativeDex !== 0 ? (
            <div key={"dex"}>
              <p style={{ flex: 1 }}>
                {SignAndCount([initiativeDex]).sign}
                {initiativeDex}{' dex'}
              </p>
            </div>
        ) : 
          null
        }
        {initiativeMod !== 0 ? (
            <div key={'bns'}>
              <p style={{ flex: 1 }}>
                {SignAndCount([initiativeMod]).sign}
                {initiativeMod}{' bns'}
              </p>
            </div>
        ) : 
          null
        }
      </div>
    </>
  );
};
