import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
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

export function Magic() {
  const { charId } = useParams();
  const [char, setChar] = useState<CharacterPc>();
  const [spellsList, setSpellsList] = useState<Spell[]>();
  const [booksChar, setBookChar] = useState<Book[]>([]);
  const [spellsPgList, setSpellsPgList] = useState<SpellsByLevelAndClass[]>();
  const [mapOfKnow, setMapOfKnow] = useState<{ [key: string]: number[] }>();
  const [mapOfDay, setMapOfDay] = useState<{ [key: string]: number[] }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;
        setChar(charDB);

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
      setMapOfDay(actualDayClassLv);

      const spellMap: SpellsByLevelAndClass[] = FilterSpellsByLevelAndClass(
        spellsList || [],
        actualKnownClassLv
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
  mapOfKnow?: { [key: string]: number[] };
  mapOfDay?: { [key: string]: number[] };
};
export const CharacterSpells: React.FC<SpellsByLevelAndClassProps> = ({
  spells,
  mapOfKnow,
  mapOfDay
}) => {
  const [choosenSpell, setChoosenSpell] = useState<Spell | null>(null);

  const chooseSpell = (s: Spell) => {
    if (s) {
      setChoosenSpell(s);
    }
  };

  return (
    <div>
      {spells
        ? spells.map((s, index) => {
            const items: itemInDrop[] = addToDrop(s.spells, "spells");
            if (mapOfDay) {
              const quanti = mapOfDay[s.class][s.level];
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
                            onAction={chooseSpell}
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
