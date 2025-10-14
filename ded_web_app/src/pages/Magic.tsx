import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BonusTableSpells,
  FilterSpellsByLevelAndClass,
  FilterSpellsByPgClass,
  SpellsByLevelAndClass
} from "../components/Magic/Functions";
import {
  Book,
  BooksFromChar,
  CharacterPc,
  Spell
} from "../components/interfaces";
import { urlChar, urlSpellsList } from "../components/url";
import {} from "../components/variables";
import { PageLayout } from "./AppLayout";
import { Popup } from "../components/Popup/Popup";
import { Dropdown } from "react-bootstrap";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { SpellsTable } from "../components/ClassPc/Interface/ClassPcLevel";
import { findAbility } from "../components/Abilitys/Functions";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";

export function Magic() {
  const { charId } = useParams();
  const [char, setChar] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();
  const [spellsList, setSpellsList] = useState<Spell[]>();
  const [booksChar, setBookChar] = useState<Book[]>([]);
  const [spellsPgList, setSpellsPgList] = useState<SpellsByLevelAndClass[]>();
  const [mapOfAbilitys, setMapAbilitys] = useState<{ [key: string]: number }>();
  const [mapOfKnow, setMapOfKnow] = useState<{ [key: string]: number[] }>();
  const [mapOfDay, setMapOfDay] = useState<{ [key: string]: number[] }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;
        setChar(charDB);

        const newModChar = await createModChar(charDB)
        console.log("newModChar: ", newModChar)

        const abilitysMap: { [key: string]: number } = {};
        charDB.classPcList.forEach((c) => {
          if (
            c &&
            typeof c.classCharacter.spellsDomain === "string" &&
            typeof c.classCharacter.spellBonus === "string"
          ) {
            abilitysMap[c.classCharacter.spellsDomain] = findAbility(
              charDB.abilitys,
              c.classCharacter.spellBonus
            );
          }
        });
        setMapAbilitys(abilitysMap);

        const resSpells = await axios.get(urlSpellsList);
        const allSpells: Spell[] = resSpells.data;
        setSpellsList(allSpells);

        setBookChar(resURL.data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (char) {
      const actualKnownClassLv: { [key: string]: number[] } = {};
      char.classPcList.forEach((c) => {
        actualKnownClassLv[c.classCharacter.className] = [
          ...(c.classCharacter.spellsKnown?.spellsInLevel
            .filter((s) => s.level === c.level)
            .flatMap((s) => s.spells) || [])
        ];
      });
      setMapOfKnow(actualKnownClassLv);

      const actualDayClassLv: { [key: string]: number[] } = {};
      char.classPcList.forEach((c) => {
        actualDayClassLv[c.classCharacter.className] = [
          ...(c.classCharacter.spellsPerDay?.spellsInLevel
            .filter((s) => s.level === c.level)
            .flatMap((s) => s.spells) || [])
        ];
      });
      // console.log("actualDayClassLv: " , actualDayClassLv["CLERIC"][0])
      setMapOfDay(actualDayClassLv);

      const spellMap: SpellsByLevelAndClass[] = FilterSpellsByLevelAndClass(
        spellsList || [],
        // char,
        actualDayClassLv
      );

      setSpellsPgList(spellMap);
    }
  }, [char, spellsList]);

  const UpdateBooks = (s: Spell) => {
    for (const book of booksChar) {
      for (const level of s.level || []) {
        if (level.level === book.level) {
          book.spells.push(s);
          break;
        }
      }
    }
    setBookChar([...booksChar]);
  };

  return (
    <PageLayout title={"Magic"}>
      <div>
        {spellsPgList && (
          <CharacterSpells
            spells={spellsPgList}
            mapOfAbilitys={mapOfAbilitys}
            mapOfKnow={mapOfKnow}
            mapOfDay={mapOfDay}
          />
        )}
        {char && <CharacterBooks books={booksChar} />}
      </div>
    </PageLayout>
  );
}
export type SpellsByLevelAndClassProps = {
  spells: SpellsByLevelAndClass[];
  mapOfAbilitys?: { [key: string]: number };
  mapOfKnow?: { [key: string]: number[] };
  mapOfDay?: { [key: string]: number[] };
};
export const CharacterSpells: React.FC<SpellsByLevelAndClassProps> = ({
  spells,
  mapOfAbilitys,
  mapOfKnow,
  mapOfDay
}) => {
  const [choosenSpell, setChoosenSpell] = useState<{ [key: number]: number[] }>(
    {}
  );

  const chooseSpell = (s: Spell, index: number, indexOfList: number) => {
    if (s && choosenSpell[index] !== undefined && choosenSpell[index].length) {
        const oldList: number[] = choosenSpell[index]
        let added = false;
        for(let i = 0; i < oldList.length - 1; i++){
            if(i === indexOfList){
                oldList[i] = s.id
                added = true;
            }
        }
        if (!added){
            oldList.push(s.id)
        }
        choosenSpell[index] = oldList
      console.log(choosenSpell);
      setChoosenSpell({ ...choosenSpell });
    } else {
      choosenSpell[index] = [s.id];
      console.log(choosenSpell);
      setChoosenSpell({ ...choosenSpell });
    }
  };

  return (
    <div>
      {spells
        ? spells.map((s, index) => {
            const items: itemInDrop[] = addToDrop(s.spells, "spells");
            if (mapOfDay) {
              const abilityValue =
                mapOfAbilitys && mapOfAbilitys[s.class] !== undefined
                  ? mapOfAbilitys[s.class]
                  : 0;
              const quanti =
                mapOfDay[s.class][s.level] +
                BonusTableSpells[abilityValue][index];
              return (
                <div key={index}>
                  <p>
                    {s.level + ".lv "}
                    {s.class}
                  </p>
                  {Array.from({ length: quanti }).map((_, i) => {
                    return (
                      <div key={i}>
                        <span>
                          <DropdownComponent
                            options={items}
                            onAction={(spell: Spell) =>
                              chooseSpell(spell, index, i)
                            }
                          />
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            }
            // Return null if mapOfDay is falsy
            return null;
          })
        : null}
    </div>
  );
};

export const CharacterBooks: React.FC<BooksFromChar> = ({ books }) => {
  function SortedBooks(books: Book[]) {
    // Example: sort books by level ascending
    return [...books].sort((a, b) => a.level - b.level);
  }

  return (
    <div className="container-table-nine">
      {SortedBooks(books).map((book, index) => (
        <div key={index}>
          <p>
            {book.caster} level.{book.level}
          </p>
          <div>
            {book.spells.map((bk, indexBook) => (
              <span key={indexBook}>
                {bk.name}
                {indexBook < books.length ? ", " : ""}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
