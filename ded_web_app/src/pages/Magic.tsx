import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FilterPerKnownSpells,
  FilterSpellsByLevelAndClass,
  SpellsByLevelAndClass
} from "../components/Magic/Functions";
import { Book, CharacterPc, Spell } from "../components/interfaces";
import { urlChar, urlSpellsList } from "../components/url";
import {} from "../components/variables";
import { PageLayout } from "./AppLayout";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";

export function Magic() {
  const { charId } = useParams();
  const [char, setChar] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();
  const [spellsList, setSpellsList] = useState<Spell[]>();
  const [spellsPgList, setSpellsPgList] = useState<SpellsByLevelAndClass[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;

        const newModChar = await createModChar(charDB);
        setModChar(newModChar);

        const resSpells = await axios.get(urlSpellsList);
        const allSpells: Spell[] = resSpells.data;
        setSpellsList(allSpells);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modChar) {
      const spellMap: SpellsByLevelAndClass[] = FilterSpellsByLevelAndClass(
        spellsList || [],
        modChar.magicClassLv || {}
      );

      setSpellsPgList(spellMap);
    }
  }, [modChar, spellsList]);

  return (
    <PageLayout title={"Magic"}>
      <div>
        {spellsPgList && (
          <CharacterSpells
            spells={spellsPgList}
            mapOfKnow={modChar?.spellsKnown}
            mapOfDay={modChar?.spellsPerDay}
          />
        )}
      </div>
    </PageLayout>
  );
}
export type SpellsByLevelAndClassProps = {
  spells: SpellsByLevelAndClass[];
  numberOfKnownSpells?: number[];
  mapOfKnow?: (Book | null)[];
  // }[];
  mapOfDay?: (Book | null)[];
};
export const CharacterSpells: React.FC<SpellsByLevelAndClassProps> = ({
  spells,
  mapOfKnow,
  mapOfDay
}) => {
  const [choosenKnownSpell, setChoosenKnownSpell] = useState<(Book | null)[]>(
    []
  );
  const [choosenDaySpell, setChoosenDaySpell] = useState<(Book | null)[]>([]);
  const [filterKnown, setFilterKnown] = useState<{
    [classe: string]: {[lv: number]: (boolean | Spell | null)}[];
  }>({});

  useEffect(() => {
    setChoosenKnownSpell(mapOfKnow || []);
    setChoosenDaySpell(mapOfDay || []);
    const filterK: { [classe: string]: {[lv: number]: (boolean | Spell | null)}[] } = (
      mapOfKnow || []
    ).reduce((acc, book) => {
      if (!book || !book.caster) return acc;
      acc[book.caster] = [];
      return acc;
    }, {} as { [classe: string]: {[lv: number]: (boolean | Spell | null)}[] });

    (mapOfKnow || []).forEach((book) => {
      if (!book || !book.caster) return;
      if (Array.isArray(book.spellsBook)) {
        book.spellsBook.forEach((spell) => {
          if (spell && spell !== undefined) filterK[book.caster].push({[book.level]: spell});
        });
      }
      if (book.spellsBook === true) filterK[book.caster].push({[book.level]: true});
    });
    // console.log("filterK", filterK);
    setFilterKnown(filterK);
  }, []);

  const chooseSpell = (
    knowDay: string,
    caster: string,
    s: Spell,
    level: number,
    indexOfSpell: number
  ) => {
    const book: Book =
      knowDay === "know"
        ? (choosenKnownSpell?.find(
            (m) => m?.caster === caster && m?.level === level
          ) as Book)
        : (choosenDaySpell?.find(
            (m) => m?.caster === caster && m?.level === level
          ) as Book);

    if (Array.isArray(book.spellsBook)) {
      // book.spellsBook is (Spell | null)[]
      // You can safely use book.spellsBook here if needed
      const moddedSpellsBook = book.spellsBook.map((sp, idx) =>
        idx === indexOfSpell ? s : sp
      );
      const moddedBook: Book = {
        ...book,
        spellsBook: moddedSpellsBook
      };
      if (knowDay === "know") {
        const existingIndex = choosenKnownSpell.findIndex(
          (b) => b && b.caster === caster && b.level === level
        );
        if (existingIndex >= 0) {
          const updatedKnownSpells = [...choosenKnownSpell];
          updatedKnownSpells[existingIndex] = moddedBook;
          setChoosenKnownSpell(updatedKnownSpells);
        } else {
          setChoosenKnownSpell([...choosenKnownSpell, moddedBook]);
        }
      } else {
        const existingIndex = choosenDaySpell.findIndex(
          (b) => b && b.caster === caster && b.level === level
        );
        if (existingIndex >= 0) {
          const updatedKnownSpells = [...choosenDaySpell];
          updatedKnownSpells[existingIndex] = moddedBook;
          setChoosenDaySpell(updatedKnownSpells);
        } else {
          setChoosenDaySpell([...choosenDaySpell, moddedBook]);
        }
      }
    }
    // const filterK: { [classe: string]: (boolean | {lv: number, spells: Spell[]} | null) }[] = filterKnown
    // choosenKnownSpell.forEach((book) => {
      // console.log("book", book);
      // console.log("filterK", book? filterK[book.caster] : "vuoto");
      // if (!book || !book.caster) return;
      // const caster: string = book.caster;
      // if (Array.isArray(book.spellsBook)) {
      //   book.spellsBook.forEach((spell) => {
          // if (spell && spell !== undefined) filterK[book.caster].push({[book.level]: spell});
        // });
      // }
      // if (book.spellsBook === true) filterK[caster] = true;
        // filterK[book.caster].push({[book.level]: true});
  //   });
  //   console.log("filterK", filterK);
  //   setFilterKnown(filterK);
  };

  return (
    <div>
      <h2 className="rpgui-container-framed golden-2">SPELLS KNONW</h2>
      {choosenKnownSpell && spells
        ? choosenKnownSpell.map((m, idx) => {
            if (m?.spellsBook)
              return (
                <div className="rpgui-container-framed" key={idx}>
                  <p>
                    {m?.caster}
                    {" lv."}
                    {m?.level}
                  </p>
                  {m?.spellsBook && Array.isArray(m?.spellsBook) ? (
                    m?.spellsBook.map((spell, indexSpell) => {
                      const casterSpells = spells.flatMap((s) =>
                        s.class === m.caster && s.level === m.level
                          ? s.spells ?? []
                          : []
                      );
                      const items: itemInDrop[] = addToDrop(
                        casterSpells,
                        "spells"
                      );
                      return (
                        <div
                          className="rpgui-container-framed grey"
                          key={indexSpell}
                          style={{ display: "flex" }}
                        >
                          <div style={{ flex: 1 }}>
                            {spell ? (
                              <p>{spell.name}</p>
                            ) : (
                              <p>{"Empty Slot"}</p>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <DropdownComponent
                              key={indexSpell}
                              options={items}
                              onAction={(spell: Spell) =>
                                chooseSpell(
                                  "know",
                                  m?.caster,
                                  spell,
                                  m.level,
                                  indexSpell
                                )
                              }
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : (m?.spellsBook as boolean) ? (
                    <div>
                      <p>ALL</p>
                    </div>
                  ) : null}
                </div>
              );
          })
        : null}
      <h2 className="rpgui-container-framed golden-2">SPELLS PER DAY</h2>
      {choosenDaySpell && spells
        ? choosenDaySpell.map((m, idx) => {
            if (m && Array.isArray(m.spellsBook) && m.spellsBook.length > 0)
              return (
                <div className="rpgui-container-framed" key={idx}>
                  <p>
                    {m?.caster}
                    {" lv."}
                    {m?.level}
                  </p>
                  {m?.spellsBook && Array.isArray(m?.spellsBook) ? (
                    m?.spellsBook.map((spell, indexSpell) => {
                      const casterSpells = spells.flatMap((s) =>
                        s.class === m.caster && s.level === m.level
                          ? s.spells? s.spells : []
                          : []
                      );
                      const items: itemInDrop[] = addToDrop(
                        casterSpells,
                        "spells"
                      );
                      return (
                        <div
                          className="rpgui-container-framed grey"
                          key={indexSpell}
                          style={{ display: "flex" }}
                        >
                          <div style={{ flex: 1 }}>
                            {spell ? (
                              <p>{spell.name}</p>
                            ) : (
                              <p>{"Empty Slot"}</p>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <DropdownComponent
                              key={indexSpell}
                              options={items}
                              onAction={(spell: Spell) =>
                                chooseSpell(
                                  "day",
                                  m?.caster,
                                  spell,
                                  m.level,
                                  indexSpell
                                )
                              }
                            />
                          </div>
                        </div>
                      );
                    })
                  ) : m?.spellsBook ? (
                    <div>
                      <p>ALL</p>
                    </div>
                  ) : null}
                </div>
              );
          })
        : null}
    </div>
  );
};

// export const CharacterBooks: React.FC<BooksFromChar> = ({ books }) => {
//   function SortedBooks(books: Book[]) {
//     // Example: sort books by level ascending
//     return [...books].sort((a, b) => a.level - b.level);
//   }

//   return (
//     <div className="container-table-nine">
//       {SortedBooks(books).map((book, index) => (
//         <div key={index}>
//           <p>
//             {book.caster} level.{book.level}
//           </p>
//           <div>
//             {book.spells.map((bk, indexBook) => (
//               <span key={indexBook}>
//                 {bk.name}
//                 {indexBook < books.length ? ", " : ""}
//               </span>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };
