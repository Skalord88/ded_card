import { WeaponLight, WeaponTwoHanded } from "../functions";
import { Attacks, CharacterPc } from "../interfaces";
import { Modifiers } from "../Modifiers/ModifierInterface";
import { MapBab } from "./Bab/MapBab";

export type MapOfAttackComponentProps = {
  attacks: Attacks;
  bab: number;
  strenghtAtt: number;
  dextrityAtt: number;
  specific: Modifiers[];
};

export const MapOfAttackComponent: React.FC<MapOfAttackComponentProps> = ({
  attacks,
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
          I.1 {attacks.firstAttackSetOne.name}
          <MapBab
            key={"I.1"}
            bab={bab}
            weapon={attacks.firstAttackSetOne} //firstAttackSetOne
            strenghtAtt={strenghtAtt}
            dextrityAtt={dextrityAtt}
            position={{
              pose: true,
              twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
              light: WeaponLight(attacks.secondAttackSetOne)
            }}
            specific={specific}
          />
        </p>
        <p style={{ gridColumn: 2, gridRow: 2 }}>
          {WeaponTwoHanded(attacks.firstAttackSetOne) ? (
            <>I.2 ---</>
          ) : (
            <>
              I.2 {attacks.secondAttackSetOne.name}
              <MapBab
                key={"I.2"}
                bab={bab}
                weapon={attacks.secondAttackSetOne}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                position={{
                  pose: false,
                  twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                  light: WeaponLight(attacks.secondAttackSetOne)
                }}
                specific={specific}
              />
            </>
          )}
        </p>
        <p style={{ gridColumn: 1, gridRow: 3 }}>
          {WeaponTwoHanded(attacks.additionalAttackSetOne) ? (
            <>I.11 ---</>
          ) : (
            <>
              I.11 {attacks.additionalAttackSetOne.name}
              <MapBab
                key={"I.11"}
                bab={bab}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                weapon={attacks.additionalAttackSetOne}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                  light: WeaponLight(attacks.secondAttackSetOne)
                }}
                specific={specific}
              />
            </>
          )}
        </p>

        <div style={{ gridColumn: 1, gridRow: 4 }}>
          <p>set II</p>
        </div>
        <p style={{ gridColumn: 1, gridRow: 5 }}>
          II.1 {attacks.firstAttackSetTwo.name}
          <MapBab
            key={"II.1"}
            bab={bab}
            strenghtAtt={strenghtAtt}
            dextrityAtt={dextrityAtt}
            weapon={attacks.firstAttackSetTwo}
            position={{
              pose: true,
              twoHanded: WeaponTwoHanded(attacks.firstAttackSetTwo),
              light: WeaponLight(attacks.secondAttackSetTwo)
            }}
            specific={specific}
          />
        </p>
        <p style={{ gridColumn: 2, gridRow: 5 }}>
          {WeaponTwoHanded(attacks.firstAttackSetTwo) ? (
            <>II.2 ---</>
          ) : (
            <>
              II.2 {attacks.secondAttackSetTwo.name}
              <MapBab
                key={"II.2"}
                weapon={attacks.secondAttackSetTwo}
                bab={bab}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                position={{
                  pose: false,
                  twoHanded: WeaponTwoHanded(attacks.firstAttackSetTwo),
                  light: WeaponLight(attacks.secondAttackSetTwo)
                }}
                specific={specific}
              />
            </>
          )}
        </p>
        <p style={{ gridColumn: 1, gridRow: 6 }}>
          {WeaponTwoHanded(attacks.additionalAttackSetTwo) ? (
            <>II.11 ---</>
          ) : (
            <>
              II.11 {attacks.additionalAttackSetTwo.name}
              <MapBab
                key={"II.11"}
                bab={bab}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                weapon={attacks.additionalAttackSetTwo}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attacks.firstAttackSetTwo),
                  light: WeaponLight(attacks.secondAttackSetTwo)
                }}
                specific={specific}
              />
            </>
          )}
        </p>
      </div>
    </>
  );
};
