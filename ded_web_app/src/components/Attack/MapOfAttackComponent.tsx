import { WeaponLight, WeaponTwoHanded } from "../functions";
import { Attacks } from "../interfaces";
import { Modifiers } from "../Modifiers/ModifierInterface";
import { MapBab } from "./Bab/MapBab";

export type MapOfAttackComponentProps = {
  attacks: Attacks;
  bab: number;
  strenght: number;
  strenghtAtt: number;
  dextrityAtt: number;
  specific: Modifiers[][];
  specificFghFeats: number[];
};

export const MapOfAttackComponent: React.FC<MapOfAttackComponentProps> = ({
  attacks,
  bab,
  strenght,
  strenghtAtt,
  dextrityAtt,
  specific,
  specificFghFeats
}) => {
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
      {window.innerWidth <= 768 ? (
        <>
          <div key={"attacks"} style={{ fontSize: "80%" }}>
            <p> set 1 </p>
            <p>
              I.1 {attacks.firstAttackSetOne.name}
              <MapBab
                key={"I.1"}
                bab={bab}
                strenght={strenght}
                weapon={attacks.firstAttackSetOne}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                  light: WeaponLight(attacks.secondAttackSetOne)
                }}
                specific={specific}
                specificFghFeats={specificFghFeats}
              />
            </p>
            <p>
              {WeaponTwoHanded(attacks.firstAttackSetOne) ? (
                <>I.2 ---</>
              ) : (
                <>
                  I.2 {attacks.secondAttackSetOne.name}
                  <MapBab
                    key={"I.2"}
                    bab={bab}
                    strenght={strenght}
                    weapon={attacks.secondAttackSetOne}
                    strenghtAtt={strenghtAtt}
                    dextrityAtt={dextrityAtt}
                    position={{
                      pose: false,
                      twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                      light: WeaponLight(attacks.secondAttackSetOne)
                    }}
                    specific={specific}
                    specificFghFeats={specificFghFeats}
                  />
                </>
              )}
            </p>
            <p>
              {WeaponTwoHanded(attacks.additionalAttackSetOne) ? (
                <>I.11 ---</>
              ) : (
                <>
                  I.11 {attacks.additionalAttackSetOne.name}
                  <MapBab
                    key={"I.11"}
                    bab={bab}
                    strenght={strenght}
                    strenghtAtt={strenghtAtt}
                    dextrityAtt={dextrityAtt}
                    weapon={attacks.additionalAttackSetOne}
                    position={{
                      pose: true,
                      twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                      light: WeaponLight(attacks.secondAttackSetOne)
                    }}
                    specific={specific}
                    specificFghFeats={specificFghFeats}
                  />
                </>
              )}
            </p>
            <p> set 2 </p>
            <p>
              {WeaponTwoHanded(attacks.additionalAttackSetOne) ? (
                <>I.11 ---</>
              ) : (
                <>
                  I.11 {attacks.additionalAttackSetOne.name}
                  <MapBab
                    key={"I.11"}
                    bab={bab}
                    strenght={strenght}
                    strenghtAtt={strenghtAtt}
                    dextrityAtt={dextrityAtt}
                    weapon={attacks.additionalAttackSetOne}
                    position={{
                      pose: true,
                      twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                      light: WeaponLight(attacks.secondAttackSetOne)
                    }}
                    specific={specific}
                    specificFghFeats={specificFghFeats}
                  />
                </>
              )}
            </p>
            <p>
              II.1 {attacks.firstAttackSetTwo.name}
              <MapBab
                key={"II.1"}
                bab={bab}
                strenght={strenght}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                weapon={attacks.firstAttackSetTwo}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attacks.firstAttackSetTwo),
                  light: WeaponLight(attacks.secondAttackSetTwo)
                }}
                specific={specific}
                specificFghFeats={specificFghFeats}
              />
            </p>
            <p>
              {WeaponTwoHanded(attacks.firstAttackSetTwo) ? (
                <>II.2 ---</>
              ) : (
                <>
                  II.2 {attacks.secondAttackSetTwo.name}
                  <MapBab
                    key={"II.2"}
                    weapon={attacks.secondAttackSetTwo}
                    bab={bab}
                    strenght={strenght}
                    strenghtAtt={strenghtAtt}
                    dextrityAtt={dextrityAtt}
                    position={{
                      pose: false,
                      twoHanded: WeaponTwoHanded(attacks.firstAttackSetTwo),
                      light: WeaponLight(attacks.secondAttackSetTwo)
                    }}
                    specific={specific}
                    specificFghFeats={specificFghFeats}
                  />
                </>
              )}
            </p>
          </div>
        </>
      ) : (
        <>
          <div style={{ display: "grid" }}>
            <div style={{ gridColumn: 1, gridRow: 1 }}>
              <p style={{ backgroundColor: "grey" }}>set I</p>
            </div>
            <p style={{ gridColumn: 2, gridRow: 2 }}>
              I.1 {attacks.firstAttackSetOne.name}
              <MapBab
                key={"I.1"}
                bab={bab}
                strenght={strenght}
                weapon={attacks.firstAttackSetOne}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                  light: WeaponLight(attacks.secondAttackSetOne)
                }}
                specific={specific}
                specificFghFeats={specificFghFeats}
              />
            </p>
            <p style={{ gridColumn: 3, gridRow: 2 }}>
              {WeaponTwoHanded(attacks.firstAttackSetOne) ? (
                <>I.2 ---</>
              ) : (
                <>
                  I.2 {attacks.secondAttackSetOne.name}
                  <MapBab
                    key={"I.2"}
                    bab={bab}
                    strenght={strenght}
                    weapon={attacks.secondAttackSetOne}
                    strenghtAtt={strenghtAtt}
                    dextrityAtt={dextrityAtt}
                    position={{
                      pose: false,
                      twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                      light: WeaponLight(attacks.secondAttackSetOne)
                    }}
                    specific={specific}
                    specificFghFeats={specificFghFeats}
                  />
                </>
              )}
            </p>
            <p style={{ gridColumn: 2, gridRow: 3 }}>
              {WeaponTwoHanded(attacks.additionalAttackSetOne) ? (
                <>I.11 ---</>
              ) : (
                <>
                  I.11 {attacks.additionalAttackSetOne.name}
                  <MapBab
                    key={"I.11"}
                    bab={bab}
                    strenght={strenght}
                    strenghtAtt={strenghtAtt}
                    dextrityAtt={dextrityAtt}
                    weapon={attacks.additionalAttackSetOne}
                    position={{
                      pose: true,
                      twoHanded: WeaponTwoHanded(attacks.firstAttackSetOne),
                      light: WeaponLight(attacks.secondAttackSetOne)
                    }}
                    specific={specific}
                    specificFghFeats={specificFghFeats}
                  />
                </>
              )}
            </p>

            <div style={{ gridColumn: 1, gridRow: 4 }}>
              <p style={{ backgroundColor: "grey" }}>set II</p>
            </div>
            <p style={{ gridColumn: 2, gridRow: 5 }}>
              II.1 {attacks.firstAttackSetTwo.name}
              <MapBab
                key={"II.1"}
                bab={bab}
                strenght={strenght}
                strenghtAtt={strenghtAtt}
                dextrityAtt={dextrityAtt}
                weapon={attacks.firstAttackSetTwo}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attacks.firstAttackSetTwo),
                  light: WeaponLight(attacks.secondAttackSetTwo)
                }}
                specific={specific}
                specificFghFeats={specificFghFeats}
              />
            </p>
            <p style={{ gridColumn: 3, gridRow: 5 }}>
              {WeaponTwoHanded(attacks.firstAttackSetTwo) ? (
                <>II.2 ---</>
              ) : (
                <>
                  II.2 {attacks.secondAttackSetTwo.name}
                  <MapBab
                    key={"II.2"}
                    weapon={attacks.secondAttackSetTwo}
                    bab={bab}
                    strenght={strenght}
                    strenghtAtt={strenghtAtt}
                    dextrityAtt={dextrityAtt}
                    position={{
                      pose: false,
                      twoHanded: WeaponTwoHanded(attacks.firstAttackSetTwo),
                      light: WeaponLight(attacks.secondAttackSetTwo)
                    }}
                    specific={specific}
                    specificFghFeats={specificFghFeats}
                  />
                </>
              )}
            </p>
            <p style={{ gridColumn: 2, gridRow: 6 }}>
              {WeaponTwoHanded(attacks.additionalAttackSetTwo) ? (
                <>II.11 ---</>
              ) : (
                <>
                  II.11 {attacks.additionalAttackSetTwo.name}
                  <MapBab
                    key={"II.11"}
                    bab={bab}
                    strenght={strenght}
                    strenghtAtt={strenghtAtt}
                    dextrityAtt={dextrityAtt}
                    weapon={attacks.additionalAttackSetTwo}
                    position={{
                      pose: true,
                      twoHanded: WeaponTwoHanded(attacks.firstAttackSetTwo),
                      light: WeaponLight(attacks.secondAttackSetTwo)
                    }}
                    specific={specific}
                    specificFghFeats={specificFghFeats}
                  />
                </>
              )}
            </p>
          </div>
        </>
      )}
    </>
  );
};
