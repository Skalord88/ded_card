import { CharProps } from "../CharacterData";
import { SignAndCount } from "../functions";
import { D20Popup } from "../Popup/DicePopup/D20Popup";

export const MapOfAttackComponent: React.FC<CharProps> = ({ char }) => {
  return (
    <>
      
        <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
        <div style={{ display: "grid" }}>
          <div style={{ gridColumn: 1, gridRow: 1 }}>
            <h2>set I</h2>
          </div>
          <p style={{ gridColumn: 1, gridRow: 2 }}>
            I.1{" "}
            <D20Popup
              key={"I.1"}
              textOrWeapon={char.attacks.firstAttackSetOne}
              value={char.bab}
            />{" "}
            {SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <p style={{ gridColumn: 2, gridRow: 2 }}>
            I.2{" "}
            <D20Popup
              key={"I.2"}
              textOrWeapon={char.attacks.secondAttackSetOne}
              value={char.bab}
            />{" "}
            {SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <p style={{ gridColumn: 1, gridRow: 3 }}>
            I.11{" "}
            <D20Popup
              key={"I.11"}
              textOrWeapon={char.attacks.additionalAttackSetOne}
              value={char.bab}
            />{" "}
            {SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <div style={{ gridColumn: 1, gridRow: 4 }}>
            <h2>set II</h2>
          </div>
          <p style={{ gridColumn: 1, gridRow: 5 }}>
            II.1{" "}
            <D20Popup
              key={"II.1"}
              textOrWeapon={char.attacks.firstAttackSetTwo}
              value={char.bab}
            />{" "}
            {SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <p style={{ gridColumn: 2, gridRow: 5 }}>
            II.2{" "}
            <D20Popup
              key={"II.2"}
              textOrWeapon={char.attacks.secondAttackSetTwo}
              value={char.bab}
            />{" "}
            {SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <p style={{ gridColumn: 1, gridRow: 6 }}>
            II.11{" "}
            <D20Popup
              key={"II.11"}
              textOrWeapon={char.attacks.additionalAttackSetTwo}
              value={char.bab}
            />{" "}
            {SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
        </div>
    </>
  );
};
