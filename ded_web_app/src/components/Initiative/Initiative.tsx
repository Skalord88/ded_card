import { BonusAbilities, SignAndCount } from "../functions";
import { D12Popup } from "../Popup/DicePopup/D12Popup";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";

export type InitiativeProps = {
  char: CharToModify
};

export const Initiative: React.FC<InitiativeProps> = ({
  char
}) => {
  const initiativeDex: number = BonusAbilities(char.abilitys, "DEX")
  const initiativeMod: number = char.initiative
  const totInit: number = initiativeDex + initiativeMod;

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Initiative</h2>
      <div style={{ display: "flex" }}>
        <div key={"tot"}>
          <p style={{ flex: 1 }}>
            <D12Popup textOrWeapon="tot:" value={totInit} modifiers={{attackRoll: null, specialAttacks: null, savingThrow: null}} />
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
