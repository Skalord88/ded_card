import { useEffect, useState } from "react";
import { IndexWeaponOne, weaponLight, weaponTwoHanded } from "../functions";
import { Attacks, CharAttack, Weapon } from "../interfaces";
import { ListOfOneHandWeapons, ListOfWeapons } from "../MyComponents";
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
      let indexOne = attack.firstAttackSetOne ? IndexWeaponOne(inventory, attack.firstAttackSetOne) : -1;
      setIndexFirstSetOne(indexOne);
      let indexTwo = attack.firstAttackSetTwo ? IndexWeaponOne(inventory, attack.firstAttackSetTwo) : -1;
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
                weapon={attack.firstAttackSetOne!}
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dexterityAtt={bab}
                position={{
                  pose: true,
                  twoHanded: weaponTwoHanded(attack.firstAttackSetOne!),
                  light: weaponLight(attack.secondAttackSetOne!)
                }} adjBab={0} />
              <ListOfWeapons
                list={inventory}
                where={"set11"}
                selectWeapon={setAttackInSet}
              />
            </div>
            <div>
              {weaponTwoHanded(attack.firstAttackSetOne!) ? (
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
                weapon={attack.secondAttackSetOne!}
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dexterityAtt={bab}
                position={{
                  pose: false,
                  twoHanded: weaponTwoHanded(attack.firstAttackSetOne!),
                  light: weaponLight(attack.secondAttackSetOne!)
                }} adjBab={0} />
              {weaponTwoHanded(attack.firstAttackSetOne!) ? (
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
                dexterityAtt={bab}
                weapon={attack.additionalAttackSetOne!}
                position={{
                  pose: true,
                  twoHanded: weaponTwoHanded(attack.firstAttackSetOne!),
                  light: weaponLight(attack.firstAttackSetOne!)
                }} adjBab={0} />
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
                dexterityAtt={bab}
                weapon={attack.secondAttackSetTwo!}
                position={{
                  pose: true,
                  twoHanded: weaponTwoHanded(attack.secondAttackSetTwo!),
                  light: weaponLight(attack.secondAttackSetTwo!)
                }} adjBab={0} />
              <ListOfWeapons
                list={inventory}
                where={"set21"}
                selectWeapon={setAttackInSet}
              />
            </div>
            <div>
              {weaponTwoHanded(attack.secondAttackSetTwo!) ? (
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
                weapon={attack.secondAttackSetTwo!}
                bab={bab}
                strenght={0}
                strenghtAtt={bab}
                dexterityAtt={bab}
                position={{
                  pose: false,
                  twoHanded: weaponTwoHanded(attack.firstAttackSetTwo!),
                  light: weaponLight(attack.secondAttackSetTwo!)
                }} adjBab={0} />
              {weaponTwoHanded(attack.secondAttackSetTwo!) ? (
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
               
                strenght={0}
                strenghtAtt={bab}
                dexterityAtt={bab}
                weapon={attack.additionalAttackSetTwo!}
                position={{
                  pose: true,
                  twoHanded: weaponTwoHanded(attack.firstAttackSetTwo!),
                  light: weaponLight(attack.secondAttackSetTwo!)
                }} bab={0} adjBab={0}                />
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