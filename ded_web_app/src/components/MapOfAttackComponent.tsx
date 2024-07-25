import { CharProps } from "./CharacterData";
import { SignAndCount } from "./functions";
import { D20Popup } from "./Popup/DicePopup/D20Popup";

export const MapOfAttackComponent: React.FC<CharProps> = ({ char }) => {
  return (
    <>
      <div
        className="rpgui-container-framed-grey"
        style={{
          gridColumn: "1 / span 2",
          gridRow: "6 / span 2"
        }}
      >
        <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
        <div style={{ display: "grid" }}>
          <div style={{ gridColumn: "1 / span 2", gridRow: 1 }}>
            <p>set I</p>
          </div>
          <p style={{ gridColumn: 1, gridRow: 2 }}>
            <D20Popup
              text={char.attacks.firstAttackSetOne.name}
              value={char.bab}
              critic={true}
            />
            {" "}{SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <p style={{ gridColumn: 2, gridRow: 2 }}>
            <D20Popup
              text={char.attacks.secondAttackSetOne.name}
              value={char.bab}
              critic={true}
            />
            {" "}{SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <p style={{ gridColumn: 1, gridRow: 3 }}>
            <D20Popup
              text={char.attacks.additionalAttackSetOne.name}
              value={char.bab}
              critic={true}
            />
            {" "}{SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <div style={{ gridColumn: 1, gridRow: 4 }}>
            <p>set II</p>
          </div>
          <p style={{ gridColumn: 1, gridRow: 5 }}>
            <D20Popup
              text={char.attacks.firstAttackSetTwo.name}
              value={char.bab}
              critic={true}
            />
            {" "}{SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <p style={{ gridColumn: 2, gridRow: 5 }}>
            <D20Popup
              text={char.attacks.secondAttackSetTwo.name}
              value={char.bab}
              critic={true}
            />
            {" "}{SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
          <p style={{ gridColumn: 1, gridRow: 6 }}>
            <D20Popup
              text={char.attacks.additionalAttackSetTwo.name}
              value={char.bab}
              critic={true}
            />
            {" "}{SignAndCount([char.bab]).sign}
            {char.bab}
          </p>
        </div>
      </div>
    </>
  );
};
