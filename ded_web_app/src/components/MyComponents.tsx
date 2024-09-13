import React, { useEffect, useState } from "react";
import {
  AttackIIMelee,
  AttackIIRanged,
  AttackMelee,
  AttackRanged,
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
import { MapBab } from "./Attack/Bab/MapBab";



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
