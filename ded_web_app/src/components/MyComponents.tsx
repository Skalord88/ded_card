import React, { useEffect, useState } from "react";
import {
  AttackIIMelee,
  AttackIIRanged,
  AttackMelee,
  AttackRanged,
  CountArmor,
  CountInCharArmor,
  IndexWeaponOne,
  SortedBooks,
  SpellsFilter,
  WeaponLight,
  WeaponTwoHanded
} from "./functions";
import {
  ArmorInCharacter,
  Attacks,
  BooksFromChar,
  CharAttack,
  CharBab,
  SelectOffWeapon,
  SelectWeapon,
  Spell,
  SpellsList,
  Weapon
} from "./interfaces";
import { noneWeapon } from "./variables";

export const MapOfAttack: React.FC<CharAttack> = ({
  inventory,
  attacks,
  bab,
  ability,
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
              ability={ability}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                light: WeaponLight(attack.secondAttackSetOne)
              }}
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
              ability={ability}
              position={{
                pose: false,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                light: WeaponLight(attack.secondAttackSetOne)
              }}
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
              ability={ability}
              weapon={attack.additionalAttackSetOne}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetOne),
                light: WeaponLight(attack.firstAttackSetOne)
              }}
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
              ability={ability}
              weapon={attack.secondAttackSetTwo}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.secondAttackSetTwo),
                light: WeaponLight(attack.secondAttackSetTwo)
              }}
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
              ability={ability}
              position={{
                pose: false,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetTwo),
                light: WeaponLight(attack.secondAttackSetTwo)
              }}
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
              ability={ability}
              weapon={attack.additionalAttackSetTwo}
              position={{
                pose: true,
                twoHanded: WeaponTwoHanded(attack.firstAttackSetTwo),
                light: WeaponLight(attack.secondAttackSetTwo)
              }}
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

export const MapBab: React.FC<CharBab> = ({
  bab,
  ability,
  weapon,
  position
}) => {
  return (
    <>
      {bab > 15 ? (
        <>
          <div className="container-table">
            <div>melee: </div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 10)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 15)}</div>
            <div></div>
            <div>distance: </div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 0)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 5)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 10)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 15)}</div>
            <div></div>
            <div>melee two hands: </div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div>
              {AttackIIMelee(weapon, bab, position, ability, "STR", 10)}
            </div>
            <div>
              {AttackIIMelee(weapon, bab, position, ability, "STR", 15)}
            </div>
            <div></div>
            <div>distance two hands: </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : bab > 10 ? (
        <>
          <div className="container-table">
            <div>melee: </div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 10)}</div>
            <div></div>
            <div></div>
            <div>distance: </div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 0)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 5)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 10)}</div>
            <div></div>
            <div></div>
            <div>melee two hands: </div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div>
              {AttackIIMelee(weapon, bab, position, ability, "STR", 10)}
            </div>
            <div></div>
            <div></div>
            <div>distance two hands: </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : bab > 5 ? (
        <>
          <div className="container-table">
            <div>melee: </div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div>distance: </div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 0)}</div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 5)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div>melee two hands: </div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 5)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div>distance two hands: </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <div className="container-table">
            <div>melee: </div>
            <div>{AttackMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>distance: </div>
            <div>{AttackRanged(weapon, bab, position, ability, "DEX", 0)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>melee two hands: </div>
            <div>{AttackIIMelee(weapon, bab, position, ability, "STR", 0)}</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div>distance two hands: </div>
            <div>
              {AttackIIRanged(weapon, bab, position, ability, "DEX", 0)}
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      )}
    </>
  );
};

export const ListOfWeapons: React.FC<SelectWeapon> = ({
  list,
  where,
  selectWeapon
}) => {
  const [selected, setSelected] = useState<Weapon>(noneWeapon);

  const select = (w: Weapon) => {
    setSelected(w);
  };

  useEffect(() => {
    selectWeapon(selected, where);
  }, [selected]);
  return (
    <>
      {list.map((weapon, index) => {
        return (
          <div key={index}>
            {weapon.name}
            <button onClick={() => select(weapon)}>+</button>
          </div>
        );
      })}
    </>
  );
};

export const ListOfOneHandWeapons: React.FC<SelectOffWeapon> = ({
  indexOne,
  list,
  where,
  selectWeapon
}) => {
  const [selected, setSelected] = useState<Weapon>(noneWeapon);

  const select = (w: Weapon) => {
    setSelected(w);
  };

  useEffect(() => {
    selectWeapon(selected, where);
  }, [selected]);

  return list ? (
    <>
      {list.map((w, index) =>
        index !== indexOne && !WeaponTwoHanded(w) ? (
          <div key={index}>
            {w.name}
            <button onClick={() => select(w)}>+</button>
          </div>
        ) : (
          <></>
        )
      )}
    </>
  ) : (
    <></>
  );
};



export const MagicKnown: React.FC<SpellsList> = ({
  list,
  lvSpell,
  pgClass,
  selectSpell
}) => {
  const AddSpell = (s: Spell) => {
    selectSpell(s);
  };

  return (
    <>
      {list ? (
        <>
          {list.map((spell, index) => (
            <div key={index}>
              {spell.level?.map((domain) => (
                <>
                  {domain.level === lvSpell &&
                  domain.classDomain === SpellsFilter(pgClass) ? (
                    <div>
                      {spell.id} {spell.name}{" "}
                      <button onClick={() => AddSpell(spell)}>+</button>
                    </div>
                  ) : (
                    <></>
                  )}
                </>
              ))}
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export const CharacterBooks: React.FC<BooksFromChar> = ({ books }) => {
  return (
    <div className="container-table-nine">
      {SortedBooks(books).map((book, index) => (
        <div key={index}>
          <div>
            {book.caster} level.{book.level}
          </div>
          <div>
            {book.spells.map((book) => (
              <>---{book}---</>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
