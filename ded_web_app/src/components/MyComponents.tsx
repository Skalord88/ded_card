import React, { useEffect, useState } from "react";
import {
  SortedBooks,
  SpellsFilter,
  weaponTwoHanded
} from "./functions";
import {
  BooksFromChar,
  SelectOffWeapon,
  SelectWeapon,
  Spell,
  SpellsList,
  Weapon
} from "./interfaces";
import { noneWeapon } from "./variables";



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
    <div>
      {list.map((weapon, index) => {
        return (
          <div key={index}>
            {weapon.name}
            <button onClick={() => select(weapon)}>+</button>
          </div>
        );
      })}
    </div>
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
    <div>
      {list.map((w, index) =>
        index !== indexOne && !weaponTwoHanded(w) ? (
          <div key={index}>
            {w.name}
            <button onClick={() => select(w)}>+</button>
          </div>
        ) : (
          null
        )
      )}
    </div>
  ) : (
    null
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
              {/* {spell.level?.map((domain) => (
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
              ))} */}
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};


