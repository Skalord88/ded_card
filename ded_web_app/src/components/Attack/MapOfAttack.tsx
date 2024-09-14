import { useState, useEffect } from "react";
import { IndexWeaponOne, WeaponTwoHanded, WeaponLight } from "../functions";
import { CharAttack, Attacks, Weapon } from "../interfaces";
import { ListOfWeapons, ListOfOneHandWeapons } from "../MyComponents";
import { MapBab } from "./Bab/MapBab";

export const MapOfAttack: React.FC<CharAttack> = ({
    inventory,
    attacks,
    bab,
    setListOfAttack
  }) => {
    const [attack, setAttack] = useState<Attacks>(attacks);
    const [indexFirstSetOne, setIndexFirstSetOne] = useState<number>(-1);
    const [indexFirstSetTwo, setIndexFirstSetTwo] = useState<number>(-1);
  
    useEffect(() => {
      setListOfAttack(attack);
    }, [attack]);
  
    useEffect(() => {
      let indexOne = IndexWeaponOne(inventory, attack.firstAttackSetOne);
      setIndexFirstSetOne(indexOne);
      let indexTwo = IndexWeaponOne(inventory, attack.firstAttackSetTwo);
      setIndexFirstSetTwo(indexTwo);
    }, [attack.firstAttackSetOne, attack.firstAttackSetTwo]);
  
    const setAttackInSet = (newWeapon: Weapon, where: string) => {
      let att = { ...attack };
  
      switch (where) {
        case "set11":
          att.firstAttackSetOne = newWeapon;
          break;
        case "set12":
          att.secondAttackSetOne = newWeapon;
          break;
        case "set13":
          att.additionalAttackSetOne = newWeapon;
          break;
        case "set21":
          att.firstAttackSetTwo = newWeapon;
          break;
        case "set22":
          att.secondAttackSetTwo = newWeapon;
          break;
        case "set23":
          att.additionalAttackSetTwo = newWeapon;
          break;
      }
      setAttack(att);
    };
  
    return (
      <>
        <div className="container-item">
          Set I
          <div className="container">
            <div>
              <div>
                {attack.firstAttackSetOne ? (
                  <>first hand: {attack.firstAttackSetOne.name}</>
                ) : (
                  <>first hand: ...selsect weapon...</>
                )}
              </div>
              <MapBab
                weapon={attack.firstAttackSetOne}
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dextrityAtt={bab}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                  light: WeaponLight(attack.secondAttackSetOne)
                }}
                specific={[]}
              />
              <ListOfWeapons
                list={inventory}
                where={"set11"}
                selectWeapon={setAttackInSet}
              />
            </div>
            <div>
              {WeaponTwoHanded(attack.firstAttackSetOne) ? (
                <>second hand: ---</>
              ) : (
                <>
                  {attack.secondAttackSetOne ? (
                    <>second hand: {attack.secondAttackSetOne.name}</>
                  ) : (
                    <>second hand: ...selsect weapon... </>
                  )}
                </>
              )}
              <MapBab
                weapon={attack.secondAttackSetOne}
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dextrityAtt={bab}
                position={{
                  pose: false,
                  twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                  light: WeaponLight(attack.secondAttackSetOne)
                }}
                specific={[]}
              />
              {WeaponTwoHanded(attack.firstAttackSetOne) ? (
                <></>
              ) : (
                <ListOfOneHandWeapons
                  indexOne={indexFirstSetOne}
                  list={inventory}
                  where={"set12"}
                  selectWeapon={setAttackInSet}
                />
              )}
            </div>
            <div></div>
            <div>
              <>
                {attack.additionalAttackSetOne ? (
                  <>additional weapon: {attack.additionalAttackSetOne.name}</>
                ) : (
                  <>additional weapon: ...select weapon...</>
                )}
              </>
              <MapBab
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dextrityAtt={bab}
                weapon={attack.additionalAttackSetOne}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                  light: WeaponLight(attack.firstAttackSetOne)
                }}specific={[]}
              />
              <ListOfOneHandWeapons
                indexOne={indexFirstSetOne}
                list={inventory}
                where={"set13"}
                selectWeapon={setAttackInSet}
              />
            </div>
          </div>
        </div>
        <div className="container-item">
          Set II
          <div className="container">
            <div>
              <>
                {attack.secondAttackSetTwo ? (
                  <>first hand: {attack.secondAttackSetTwo.name}</>
                ) : (
                  <>first hand: ...selsect weapon...</>
                )}
              </>
  
              <MapBab
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dextrityAtt={bab}
                weapon={attack.secondAttackSetTwo}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attack.secondAttackSetTwo),
                  light: WeaponLight(attack.secondAttackSetTwo)
                }}specific={[]}
              />
              <ListOfWeapons
                list={inventory}
                where={"set21"}
                selectWeapon={setAttackInSet}
              />
            </div>
            <div>
              {WeaponTwoHanded(attack.secondAttackSetTwo) ? (
                <>second hand: ---</>
              ) : (
                <>
                  {attack.secondAttackSetTwo ? (
                    <>second hand: {attack.secondAttackSetTwo.name}</>
                  ) : (
                    <>second hand: ...select weapon...</>
                  )}
                </>
              )}
              <MapBab
                weapon={attack.secondAttackSetTwo}
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dextrityAtt={bab}
                position={{
                  pose: false,
                  twoHanded: WeaponTwoHanded(attack.firstAttackSetTwo),
                  light: WeaponLight(attack.secondAttackSetTwo)
                }}specific={[]}
              />
              {WeaponTwoHanded(attack.secondAttackSetTwo) ? (
                <></>
              ) : (
                <ListOfOneHandWeapons
                  indexOne={indexFirstSetTwo}
                  list={inventory}
                  where={"set22"}
                  selectWeapon={setAttackInSet}
                />
              )}
            </div>
            <div></div>
            <div>
              <>
                {attack.additionalAttackSetTwo ? (
                  <>additional weapon: {attack.additionalAttackSetTwo.name}</>
                ) : (
                  <>additional weapon: ...select weapon...</>
                )}
              </>
  
              <MapBab
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dextrityAtt={bab}
                weapon={attack.additionalAttackSetTwo}
                position={{
                  pose: true,
                  twoHanded: WeaponTwoHanded(attack.firstAttackSetTwo),
                  light: WeaponLight(attack.secondAttackSetTwo)
                }}specific={[]}
              />
              <ListOfOneHandWeapons
                indexOne={indexFirstSetTwo}
                list={inventory}
                where={"set23"}
                selectWeapon={setAttackInSet}
              />
            </div>
          </div>
        </div>
      </>
    );
  };