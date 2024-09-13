import { WeaponLight, WeaponTwoHanded } from "../functions";
import { CharacterPc } from "../interfaces";
import { Modifiers } from "../Modifiers/ModifierInterface";
import { MapBab } from "./Bab/MapBab";

export type MapOfAttackComponentProps = {
  char: CharacterPc;
  bab: number;
  strenghtAtt: number;
  dextrityAtt: number;
  specific: Modifiers[]
};

export const MapOfAttackComponent: React.FC<MapOfAttackComponentProps> = ({
  char,
  bab,
  strenghtAtt,
  dextrityAtt,
  specific
}) => {
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
      <div style={{ display: "grid" }}>
        <div style={{ gridColumn: 1, gridRow: 1 }}>
          <p>set I</p>
        </div>
        <p style={{ gridColumn: 1, gridRow: 2 }}>
          I.1 {char.attacks.firstAttackSetOne.name}
          <MapBab
            bab={bab}
            weapon={char.attacks.firstAttackSetOne}
            strenghtAtt={strenghtAtt}
            dextrityAtt={dextrityAtt}
            position={{
              pose: true,
              twoHanded: WeaponTwoHanded(char.attacks.firstAttackSetOne),
              light: WeaponLight(char.attacks.secondAttackSetOne)
            }}
            specific={specific}
          />
        </p>
        <p style={{ gridColumn: 2, gridRow: 2 }}>
          {WeaponTwoHanded(char.attacks.firstAttackSetOne) ? (
            <>I.2 ---</>
          ) : (
            <>
              I.2 {char.attacks.secondAttackSetOne.name}
              <MapBab
                bab={bab}
                weapon={char.attacks.secondAttackSetOne}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                position={{
                  pose: false,
                  twoHanded: WeaponTwoHanded(char.attacks.firstAttackSetOne),
                  light: WeaponLight(char.attacks.secondAttackSetOne)
                }}
                specific={specific}
              />
            </>
          )}
        </p>
        <p style={{ gridColumn: 1, gridRow: 3 }}>
          I.11 {char.attacks.additionalAttackSetOne.name}
          <MapBab
            bab={bab}
            strenghtAtt={strenghtAtt}
            dextrityAtt={dextrityAtt}
            weapon={char.attacks.additionalAttackSetOne}
            position={{
              pose: true,
              twoHanded: WeaponTwoHanded(char.attacks.firstAttackSetOne),
              light: WeaponLight(char.attacks.secondAttackSetOne)
            }}
            specific={specific}
          />
        </p>


        <div style={{ gridColumn: 1, gridRow: 4 }}>
          <p>set II</p>
        </div>
        <p style={{ gridColumn: 1, gridRow: 5 }}>
          II.1 {char.attacks.firstAttackSetTwo.name}
          <MapBab
            bab={bab}
            strenghtAtt={strenghtAtt}
            dextrityAtt={dextrityAtt}
            weapon={char.attacks.firstAttackSetTwo}
            position={{
              pose: true,
              twoHanded: WeaponTwoHanded(char.attacks.firstAttackSetTwo),
              light: WeaponLight(char.attacks.secondAttackSetTwo)
            }}
            specific={specific}
          />
        </p>
        <p style={{ gridColumn: 2, gridRow: 5 }}>
          {WeaponTwoHanded(char.attacks.firstAttackSetTwo) ? (
            <>II.2 ---</>
          ) : (
            <>
              II.2 {char.attacks.secondAttackSetTwo.name}
              <MapBab
                weapon={char.attacks.secondAttackSetTwo}
                bab={bab}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                position={{
                  pose: false,
                  twoHanded: WeaponTwoHanded(char.attacks.firstAttackSetTwo),
                  light: WeaponLight(char.attacks.secondAttackSetTwo)
                }}
                specific={specific}
              />
            </>
          )}
        </p>
        <p style={{ gridColumn: 1, gridRow: 6 }}>
          II.11 {char.attacks.additionalAttackSetTwo.name}
          <MapBab
            bab={bab}
            strenghtAtt={strenghtAtt}
            dextrityAtt={dextrityAtt}
            weapon={char.attacks.additionalAttackSetTwo}
            position={{
              pose: true,
              twoHanded: WeaponTwoHanded(char.attacks.firstAttackSetTwo),
              light: WeaponLight(char.attacks.secondAttackSetTwo)
            }}
            specific={specific}
          />
        </p>
      </div>
    </>
  );
};
