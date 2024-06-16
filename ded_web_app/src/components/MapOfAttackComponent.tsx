import { CharProps } from "./CharacterData";

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
          <div style={{ gridColumn: 1, gridRow: 2 }}>
            {char.attacks.firstAttackSetOne.name} {char.bab}
          </div>
          <div style={{ gridColumn: 2, gridRow: 2 }}>
          {char.attacks.secondAttackSetOne.name} {char.bab}
          </div>
          <div style={{ gridColumn: 1, gridRow: 3 }}>
          {char.attacks.additionalAttackSetOne.name} {char.bab}
          </div>
          <div style={{ gridColumn: 1, gridRow: 4 }}>
          <p>set II</p>
          </div>
          <div style={{ gridColumn: 1, gridRow: 5 }}>
            {char.attacks.firstAttackSetTwo.name} {char.bab}
          </div>
          <div style={{ gridColumn: 2, gridRow: 5 }}>
            {char.attacks.secondAttackSetTwo.name} {char.bab}
          </div>
          <div style={{ gridColumn: 1, gridRow: 6 }}>
            {char.attacks.additionalAttackSetTwo.name} {char.bab}
          </div>
        </div>
      </div>
    </>
  );
};
