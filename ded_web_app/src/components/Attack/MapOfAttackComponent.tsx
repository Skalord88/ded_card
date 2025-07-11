import { abilityBackgroundColor } from "../Abilitys/Colors";
import { DiceText } from "../Dice/Functions";
import { SignNumber } from "../functions";
import { D20PopupWeapon } from "../Popup/DicePopup/D20PopupWeapon";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { AttackElement, DisplayAttType } from "./function";

export type MapOfAttackComponentProps = {
  char: CharToModify;
};

export const MapOfAttackComponent: React.FC<MapOfAttackComponentProps> = ({
  char
}) => {
  const buckler: boolean = char.inventory.shield.itemId === 95;
  return char.displayAttType ? (
    <AttackGrid key={"attacks"} attack={char.displayAttType} buckler={buckler} />
  ) : (
    <p>...loading...</p>
  );
};

export type AttackGridProps = {
  attack: AttackElement;
  buckler?: boolean;
};

export const AttackGrid: React.FC<AttackGridProps> = ({ attack, buckler }) => {
  const chceckBuckler = (type: string, show: DisplayAttType) => {
    if (
      type === "melee" &&
      show[0].show &&
      show[1].show &&
      show[2].show &&
      show[3].show
    ) {
      return buckler ? -1 : 0;
    }
    if (type === "melTwoHand") {
      return buckler ? -1 : 0;
    }
    return 0;
  };
  const styleDiv = (type: string): string => {
    return type.includes("dis")
      ? abilityBackgroundColor(false, "DEXTERITY")
      : abilityBackgroundColor(false, "STRENGTH");
  };
  return (
    <>
      <h2 className="rpgui-container-framed golden-2">Attacks</h2>
      <div style={{ display: "grid" }}>
        <h2
          // className="rpgui-container-framed-grey"
          style={{ gridColumn: "1 / span 2", gridRow: 1 }}
        >
          {attack.titleOne}
        </h2>
        {attack.setOne &&
          attack.setOne.map((weapon, index) => (
            <div
              key={index}
              style={
                index === 0
                  ? { gridColumn: 1, gridRow: 2 }
                  : index === 1
                  ? { gridColumn: 2, gridRow: 2 }
                  : { gridColumn: 1, gridRow: 3 }
              }
            >
              <div>
                <p>{weapon.stat.weapon.name}</p>
                {weapon.display.map(
                  (dis, index) =>
                    dis.show && (
                      <div key={index} className={styleDiv(dis.type)}>
                        <p>
                          <D20PopupWeapon
                          key={dis.type + "." + weapon.stat.weapon.name}
                            type={dis.type}
                            weapon={weapon.stat.weapon}
                            bab={dis.att}
                            dmg={dis.dmg}
                            bucklerMls={chceckBuckler(dis.type, weapon.display)}
                            targetMod={attack.targetMod}
                          />
                          :
                          {dis.att.map((att) => (
                            <span>
                              {SignNumber(
                                att + chceckBuckler(dis.type, weapon.display)
                              )}
                              {Math.floor(
                                att + chceckBuckler(dis.type, weapon.display)
                              )}{" "}
                            </span>
                          ))}
                          <span>
                            {weapon.stat.weapon.damage}
                            {SignNumber(dis.dmg)}
                            {dis.dmg}
                          </span>
                          <span> {DiceText(weapon.stat.weapon.critical)}</span>
                        </p>
                      </div>
                    )
                )}
              </div>
              {/* <BucklerOn index={index} check={buckler? true : false} /> */}
            </div>
          ))}
        <h2
          // className="rpgui-container-framed-grey"
          style={{ gridColumn: "1 / span 2", gridRow: 4 }}
        >
          {attack.titleTwo}
        </h2>
        {attack.setTwo &&
          attack.setTwo.map((weapon, index) => (
            <div
              key={index}
              style={
                index === 0
                  ? { gridColumn: 1, gridRow: 5 }
                  : index === 1
                  ? { gridColumn: 2, gridRow: 5 }
                  : { gridColumn: 1, gridRow: 6 }
              }
            >
              <div>
                <p>{weapon.stat.weapon.name}</p>
                {weapon.display.map(
                  (dis) =>
                    dis.show && (
                      <div className={styleDiv(dis.type)}>

                          <D20PopupWeapon
                            key={dis.type + "." + weapon.stat.weapon.name}
                            type={dis.type}
                            weapon={weapon.stat.weapon}
                            bab={dis.att}
                            dmg={dis.dmg}
                            bucklerMls={chceckBuckler(dis.type, weapon.display)}
                            targetMod={attack.targetMod}
                          />
                          :
                          {dis.att.map((att) => (
                            <span>
                              {SignNumber(
                                att + chceckBuckler(dis.type, weapon.display)
                              )}
                              {Math.floor(
                                att + chceckBuckler(dis.type, weapon.display)
                              )}{" "}
                            </span>
                          ))}
                          <span>
                            {weapon.stat.weapon.damage}
                            {SignNumber(dis.dmg)}
                            {dis.dmg}
                          </span>
                          <span> {DiceText(weapon.stat.weapon.critical)}</span>

                      </div>
                    )
                )}
              </div>
              {/* <BucklerOn index={index} check={buckler? true : false} /> */}
            </div>
          ))}
      </div>
    </>
  );
};

export type BucklerOnProps = {
  index: number;
  check: boolean;
};

export const BucklerOn: React.FC<BucklerOnProps> = ({ index, check }) => {
  if (index === 1 && check) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <span>
          <input
            type="checkbox"
            id={`golden-checkbox-${index}`} // ID unico per evitare conflitti
            className="rpgui-checkbox golden"
            checked={check}
            onChange={() => {}}
          />
          <label htmlFor={`golden-checkbox-${index}`}></label>
        </span>
        <span>buckler</span>
      </div>
    );
  }
  return null;
};

//   return (
//   <>
//     <h2 className="rpgui-container-framed golden-2">Attacks</h2>
//     <>
//       <div style={{ display: "grid" }}>
//         <div style={{ gridColumn: 1, gridRow: 1 }}>
//           <p style={{ backgroundColor: "grey" }}>set I</p>
//         </div>
//         <p style={{ gridColumn: 2, gridRow: 2 }}>
//           {char.attacks.firstAttackSetOne && (
//             <>
//               I.1 {char.attacks.firstAttackSetOne.name}
//               <MapBab
//                 key={"I.1"}
//                 bab={char.bab}
//                 adjBab={adjBab}
//                 strenght={strenghtMod}
//                 weapon={char.attacks.firstAttackSetOne}
//                 strenghtAtt={specBns(strenghtAtt, char.attacks.firstAttackSetOne)}
//                 dexterityAtt={specBns(dexterityAtt, char.attacks.firstAttackSetOne)}
//                 position={{
//                   pose: true,
//                   twoHanded: weaponTwoHanded(char.attacks.firstAttackSetOne),
//                   light: weaponLight(char.attacks.secondAttackSetOne!)
//                 }}
//                 modifiers={{ attackRoll: [...char.attackRoll.target, ...(char.attacks.firstAttackSetOne.modifiers?.attackRoll ? [char.attacks.firstAttackSetOne.modifiers.attackRoll] : [])] }}
//               />
//             </>
//           )}
//         </p>
//         <p style={{ gridColumn: 3, gridRow: 2 }}>
//           {char.attacks.firstAttackSetOne &&
//           weaponTwoHanded(char.attacks.firstAttackSetOne) ? (
//             <>I.2 ---</>
//           ) : (
//             char.attacks.secondAttackSetOne && (
//               <>
//                 I.2 {char.attacks.secondAttackSetOne.name}
//                 <MapBab
//                   key={"I.2"}
//                   bab={char.bab}
//                 adjBab={adjBab}
//                   strenght={strenghtMod}
//                   weapon={char.attacks.secondAttackSetOne}
//                   strenghtAtt={specBns(strenghtAtt, char.attacks.secondAttackSetOne)}
//                   dexterityAtt={specBns(dexterityAtt, char.attacks.secondAttackSetOne)}
//                   position={{
//                     pose: false,
//                     twoHanded: weaponTwoHanded(
//                       char.attacks.firstAttackSetOne!
//                     ),
//                     light: weaponLight(char.attacks.secondAttackSetOne)
//                   }}
//                   modifiers={{ attackRoll: char.attackRoll.target }}
//                 />
//               </>
//             )
//           )}
//         </p>
//         <p style={{ gridColumn: 2, gridRow: 3 }}>
//           {char.attacks.additionalAttackSetOne &&
//           weaponTwoHanded(char.attacks.additionalAttackSetOne) ? (
//             <>I.11 ---</>
//           ) : (
//             char.attacks.additionalAttackSetOne && (
//               <>
//                 I.11 {char.attacks.additionalAttackSetOne.name}
//                 <MapBab
//                   key={"I.11"}
//                   bab={char.bab}
//                 adjBab={adjBab}
//                   strenght={strenghtMod}
//                   strenghtAtt={specBns(strenghtAtt, char.attacks.additionalAttackSetOne)}
//                   dexterityAtt={specBns(dexterityAtt, char.attacks.additionalAttackSetOne)}
//                   weapon={char.attacks.additionalAttackSetOne}
//                   position={{
//                     pose: true,
//                     twoHanded: weaponTwoHanded(
//                       char.attacks.firstAttackSetOne!
//                     ),
//                     light: weaponLight(char.attacks.secondAttackSetOne!)
//                   }}
//                   modifiers={{ attackRoll: char.attackRoll.target }}
//                 />
//               </>
//             )
//           )}
//         </p>

//         <div style={{ gridColumn: 1, gridRow: 4 }}>
//           <p style={{ backgroundColor: "grey" }}>set II</p>
//         </div>
//         <p style={{ gridColumn: 2, gridRow: 5 }}>
//           {char.attacks.firstAttackSetTwo && (
//             <>
//               II.1 {char.attacks.firstAttackSetTwo.name}
//               <MapBab
//                 key={"II.1"}
//                 bab={char.bab}
//                 adjBab={adjBab}
//                 strenght={strenghtMod}
//                 strenghtAtt={specBns(strenghtAtt, char.attacks.firstAttackSetTwo)}
//                 dexterityAtt={specBns(dexterityAtt, char.attacks.firstAttackSetTwo)}
//                 weapon={char.attacks.firstAttackSetTwo}
//                 position={{
//                   pose: true,
//                   twoHanded: weaponTwoHanded(char.attacks.firstAttackSetTwo),
//                   light: weaponLight(char.attacks.secondAttackSetTwo!)
//                 }}
//                 modifiers={{ attackRoll: char.attackRoll.target }}
//               />
//             </>
//           )}
//         </p>
//         <p style={{ gridColumn: 3, gridRow: 5 }}>
//           {char.attacks.firstAttackSetTwo &&
//           weaponTwoHanded(char.attacks.firstAttackSetTwo) ? (
//             <>II.2 ---</>
//           ) : (
//             char.attacks.secondAttackSetTwo && (
//               <>
//                 II.2 {char.attacks.secondAttackSetTwo.name}
//                 <MapBab
//                   key={"II.2"}
//                   weapon={char.attacks.secondAttackSetTwo}
//                   bab={char.bab}
//                 adjBab={adjBab}
//                   strenght={strenghtMod}
//                   strenghtAtt={specBns(strenghtAtt, char.attacks.secondAttackSetTwo)}
//                   dexterityAtt={specBns(dexterityAtt, char.attacks.secondAttackSetTwo)}
//                   position={{
//                     pose: false,
//                     twoHanded: weaponTwoHanded(
//                       char.attacks.firstAttackSetTwo!
//                     ),
//                     light: weaponLight(char.attacks.secondAttackSetTwo)
//                   }}
//                   modifiers={{ attackRoll: char.attackRoll.target }}
//                 />
//               </>
//             )
//           )}
//         </p>
//         <p style={{ gridColumn: 2, gridRow: 6 }}>
//           {char.attacks.additionalAttackSetTwo &&
//           !weaponTwoHanded(char.attacks.additionalAttackSetTwo) ? (
//             <>
//               II.11 {char.attacks.additionalAttackSetTwo.name}
//               <MapBab
//                 key={"II.11"}
//                 bab={char.bab}
//                 adjBab={adjBab}
//                 strenght={strenghtMod}
//                 strenghtAtt={specBns(strenghtAtt, char.attacks.additionalAttackSetTwo)}
//                 dexterityAtt={specBns(dexterityAtt, char.attacks.additionalAttackSetTwo)}
//                 weapon={char.attacks.additionalAttackSetTwo}
//                 position={{
//                   pose: true,
//                   twoHanded: weaponTwoHanded(char.attacks.firstAttackSetTwo!),
//                   light: weaponLight(char.attacks.secondAttackSetTwo!)
//                 }}
//                 modifiers={{ attackRoll: char.attackRoll.target }}
//               />
//             </>
//           ) : (
//             <>II.11 ---</>
//           )}
//         </p>
//       </div>
//     </>
//   </>
// );
// };
