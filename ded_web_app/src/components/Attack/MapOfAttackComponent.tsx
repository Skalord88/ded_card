import { BonusAbilities, weaponLight, weaponTwoHanded } from "../functions";
import { Weapon } from "../interfaces";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { Prerequisite } from "../Prerequisite/interface/Prerequisite";
import { MapBab } from "./Bab/MapBab";

export type MapOfAttackComponentProps = {
  char: CharToModify;
};

export const MapOfAttackComponent: React.FC<MapOfAttackComponentProps> = ({
  char
}) => {
  const forAllAttackRoll: number = char.attackRoll.mono.reduce(
    (tot, at) => tot + Number(at.bonus),
    0
  );
  const adjBab: number = char.bab + forAllAttackRoll;
  const strenghtMod: number = BonusAbilities(char.abilitys, "STR");
  const strenghtAtt: number = adjBab + strenghtMod;

  const dexterityMod: number = BonusAbilities(char.abilitys, "DEX");
  const dexterityAtt: number = adjBab + dexterityMod;

  const checkComposeModifier = (
    prer: Prerequisite[],
    weapon: Weapon
  ): number => {
    return prer
    .filter(p => p.items?.filter(i => i.id === weapon.itemId))
    .reduce((max, p) => {
      const bonus = Number(p.attackRoll?.bonus ?? 0);
      return bonus > max ? bonus : max;
    }, 0);
  };

  const specBns = (abilityAtt: number, weapon: Weapon): number => {
    return abilityAtt + checkComposeModifier(char.attackRoll.composed, weapon)
  }

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
      <>
        <div style={{ display: "grid" }}>
          <div style={{ gridColumn: 1, gridRow: 1 }}>
            <p style={{ backgroundColor: "grey" }}>set I</p>
          </div>
          <p style={{ gridColumn: 2, gridRow: 2 }}>
            {char.attacks.firstAttackSetOne && (
              <>
                I.1 {char.attacks.firstAttackSetOne.name}
                <MapBab
                  key={"I.1"}
                  bab={char.bab}
                  adjBab={adjBab}
                  strenght={strenghtMod}
                  weapon={char.attacks.firstAttackSetOne}
                  strenghtAtt={specBns(strenghtAtt, char.attacks.firstAttackSetOne)}
                  dexterityAtt={specBns(dexterityAtt, char.attacks.firstAttackSetOne)}
                  position={{
                    pose: true,
                    twoHanded: weaponTwoHanded(char.attacks.firstAttackSetOne),
                    light: weaponLight(char.attacks.secondAttackSetOne!)
                  }}
                  modifiers={{ attackRoll: char.attackRoll.target }}
                />
              </>
            )}
          </p>
          <p style={{ gridColumn: 3, gridRow: 2 }}>
            {char.attacks.firstAttackSetOne &&
            weaponTwoHanded(char.attacks.firstAttackSetOne) ? (
              <>I.2 ---</>
            ) : (
              char.attacks.secondAttackSetOne && (
                <>
                  I.2 {char.attacks.secondAttackSetOne.name}
                  <MapBab
                    key={"I.2"}
                    bab={char.bab}
                  adjBab={adjBab}
                    strenght={strenghtMod}
                    weapon={char.attacks.secondAttackSetOne}
                    strenghtAtt={specBns(strenghtAtt, char.attacks.secondAttackSetOne)}
                    dexterityAtt={specBns(dexterityAtt, char.attacks.secondAttackSetOne)}
                    position={{
                      pose: false,
                      twoHanded: weaponTwoHanded(
                        char.attacks.firstAttackSetOne!
                      ),
                      light: weaponLight(char.attacks.secondAttackSetOne)
                    }}
                    modifiers={{ attackRoll: char.attackRoll.target }}
                  />
                </>
              )
            )}
          </p>
          <p style={{ gridColumn: 2, gridRow: 3 }}>
            {char.attacks.additionalAttackSetOne &&
            weaponTwoHanded(char.attacks.additionalAttackSetOne) ? (
              <>I.11 ---</>
            ) : (
              char.attacks.additionalAttackSetOne && (
                <>
                  I.11 {char.attacks.additionalAttackSetOne.name}
                  <MapBab
                    key={"I.11"}
                    bab={char.bab}
                  adjBab={adjBab}
                    strenght={strenghtMod}
                    strenghtAtt={specBns(strenghtAtt, char.attacks.additionalAttackSetOne)}
                    dexterityAtt={specBns(dexterityAtt, char.attacks.additionalAttackSetOne)}
                    weapon={char.attacks.additionalAttackSetOne}
                    position={{
                      pose: true,
                      twoHanded: weaponTwoHanded(
                        char.attacks.firstAttackSetOne!
                      ),
                      light: weaponLight(char.attacks.secondAttackSetOne!)
                    }}
                    modifiers={{ attackRoll: char.attackRoll.target }}
                  />
                </>
              )
            )}
          </p>

          <div style={{ gridColumn: 1, gridRow: 4 }}>
            <p style={{ backgroundColor: "grey" }}>set II</p>
          </div>
          <p style={{ gridColumn: 2, gridRow: 5 }}>
            {char.attacks.firstAttackSetTwo && (
              <>
                II.1 {char.attacks.firstAttackSetTwo.name}
                <MapBab
                  key={"II.1"}
                  bab={char.bab}
                  adjBab={adjBab}
                  strenght={strenghtMod}
                  strenghtAtt={specBns(strenghtAtt, char.attacks.firstAttackSetTwo)}
                  dexterityAtt={specBns(dexterityAtt, char.attacks.firstAttackSetTwo)}
                  weapon={char.attacks.firstAttackSetTwo}
                  position={{
                    pose: true,
                    twoHanded: weaponTwoHanded(char.attacks.firstAttackSetTwo),
                    light: weaponLight(char.attacks.secondAttackSetTwo!)
                  }}
                  modifiers={{ attackRoll: char.attackRoll.target }}
                />
              </>
            )}
          </p>
          <p style={{ gridColumn: 3, gridRow: 5 }}>
            {char.attacks.firstAttackSetTwo &&
            weaponTwoHanded(char.attacks.firstAttackSetTwo) ? (
              <>II.2 ---</>
            ) : (
              char.attacks.secondAttackSetTwo && (
                <>
                  II.2 {char.attacks.secondAttackSetTwo.name}
                  <MapBab
                    key={"II.2"}
                    weapon={char.attacks.secondAttackSetTwo}
                    bab={char.bab}
                  adjBab={adjBab}
                    strenght={strenghtMod}
                    strenghtAtt={specBns(strenghtAtt, char.attacks.secondAttackSetTwo)}
                    dexterityAtt={specBns(dexterityAtt, char.attacks.secondAttackSetTwo)}
                    position={{
                      pose: false,
                      twoHanded: weaponTwoHanded(
                        char.attacks.firstAttackSetTwo!
                      ),
                      light: weaponLight(char.attacks.secondAttackSetTwo)
                    }}
                    modifiers={{ attackRoll: char.attackRoll.target }}
                  />
                </>
              )
            )}
          </p>
          <p style={{ gridColumn: 2, gridRow: 6 }}>
            {char.attacks.additionalAttackSetTwo &&
            !weaponTwoHanded(char.attacks.additionalAttackSetTwo) ? (
              <>
                II.11 {char.attacks.additionalAttackSetTwo.name}
                <MapBab
                  key={"II.11"}
                  bab={char.bab}
                  adjBab={adjBab}
                  strenght={strenghtMod}
                  strenghtAtt={specBns(strenghtAtt, char.attacks.additionalAttackSetTwo)}
                  dexterityAtt={specBns(dexterityAtt, char.attacks.additionalAttackSetTwo)}
                  weapon={char.attacks.additionalAttackSetTwo}
                  position={{
                    pose: true,
                    twoHanded: weaponTwoHanded(char.attacks.firstAttackSetTwo!),
                    light: weaponLight(char.attacks.secondAttackSetTwo!)
                  }}
                  modifiers={{ attackRoll: char.attackRoll.target }}
                />
              </>
            ) : (
              <>II.11 ---</>
            )}
          </p>
        </div>
      </>
    </>
  );
};
