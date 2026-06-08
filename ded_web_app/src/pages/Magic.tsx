import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FilterAlreadyKnownSpells,
  FilterDayByAlreadyKnownSpells,
  FilterPerKnownSpells,
  FilterSpellsByLevelAndClass,
  SpellsByLevelAndClass
} from "../components/Magic/Functions";
import { Book, BookToSend, CharacterPc, Spell } from "../components/interfaces";
import { urlChar, urlSpellsAdd, urlSpellsList } from "../components/url";
import {} from "../components/variables";
import { PageLayout } from "./AppLayout";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop } from "../components/functions";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { FormattingText } from "../components/Formatting/Function";

export function Magic() {
  const { charId } = useParams();
  // const [char, setChar] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();
  const [spellsList, setSpellsList] = useState<Spell[]>();
  const [spellsPgList, setSpellsPgList] = useState<SpellsByLevelAndClass[]>();
  const [booksToSend, setBooksToSend] = useState<BookToSend[]>([]);

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

  const PrepareBookToSend = (allBook: Book[]) => {
    let sendedBooks: BookToSend[] = [];

    allBook.forEach((b) => {
      if (Array.isArray(b.spellsBook) && Array.from(b.spellsBook).length > 0) {
        let spellsToSend: { id: number }[] = [];
        Array.from(b.spellsBook).forEach((s) => {
          if (s !== null && s !== undefined) {
            spellsToSend.push({ id: s.id });
          }
        });
        if (spellsToSend.length > 0) {
          sendedBooks.push({
            caster: b.caster,
            level: b.level,
            knowDay: b.knowDay,
            spellsBook: spellsToSend
          });
        }
      }
    });

    if (sendedBooks.length > 0) {
      setBooksToSend(sendedBooks);
    }
  };

  const confirmBooksAndSend = async () => {
    if (booksToSend) {
      // console.log(urlSpellsList + "/" + charId + urlSpellsAdd)
      // console.log("booksToSend", booksToSend)
      await axios.post(
        urlSpellsList + "/" + charId + urlSpellsAdd,
        booksToSend
      );
    }
  };

  return (
    <PageLayout title={"Magic"} buttons={{
      next: { text: "Show", link: charId , change: true },
      back: { text: "Attacks", link: "/attack/" + charId }
    }} onAction={confirmBooksAndSend}>
      <div>
        {spellsPgList && (
          <CharacterSpells
            spells={spellsPgList}
            mapOfKnow={modChar?.spellsKnown}
            mapOfDay={modChar?.spellsPerDay}
            onAction={PrepareBookToSend}
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
  onAction?: (allBooks: Book[]) => void;
};
export const CharacterSpells: React.FC<SpellsByLevelAndClassProps> = ({
  spells,
  mapOfKnow,
  mapOfDay,
  onAction
}) => {
  const [selectedSpell, setSelectedSpell] = useState<{spellKnown: Spell | null, spellDay: Spell | null}>({spellKnown: null, spellDay: null});
  const [choosenKnownSpell, setChoosenKnownSpell] = useState<(Book | null)[]>(
    []
  );
  const [choosenDaySpell, setChoosenDaySpell] = useState<(Book | null)[]>([]);
  const [filterKnown, setFilterKnown] = useState<{
    [classe: string]: Set<number>;
  }>({});

  const scegliSpell = (n: number , scelta: Spell) => {
    if(scelta && n === 1)
    {
      const newSelectedSpell = {...selectedSpell, spellKnown: scelta};
      setSelectedSpell(newSelectedSpell);
    }
    if (scelta && n === 2)
    {
      const newSelectedSpell = {...selectedSpell, spellDay: scelta};
      setSelectedSpell(newSelectedSpell);
    }
  }

  useEffect(() => {
    if (onAction) {
      let allBooks: Book[] = [];
      choosenKnownSpell.forEach((kB) => {
        if (kB !== null) {
          allBooks.push(kB);
        }
      });
      choosenDaySpell.forEach((dB) => {
        if (dB !== null) {
          allBooks.push(dB);
        }
      });
      onAction(allBooks);
    }
  }, [choosenKnownSpell, choosenDaySpell]);

  useEffect(() => {
    if (mapOfKnow === undefined || mapOfDay === undefined) return;
    setChoosenKnownSpell(mapOfKnow || []);
    // console.log("mapOfDay", mapOfDay);
    setChoosenDaySpell(mapOfDay || []);
  }, []);

  useEffect(() => {
    const filterK: { [classe: string]: Set<number> } = {};
    choosenKnownSpell.forEach((book) => {
      if (!book) return;
      if (book?.caster) filterK[book.caster] = new Set<number>();
    });

    choosenKnownSpell.forEach((book) => {
      if (book && book.caster && Array.isArray(book.spellsBook)) {
        book.spellsBook.forEach((spell) => {
          if (spell) {
            if (filterK[book.caster]) {
              filterK[book.caster].add(spell.id);
            }
          }
        });
      }
    });
    setFilterKnown(filterK);
  }, [choosenKnownSpell]);

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
  };

  return (
    <div>
      <h2 className="rpgui-container-framed golden-2">SPELLS KNONW</h2>
      <CharacterSpellsTemplate spello={selectedSpell.spellKnown}>
        {choosenKnownSpell && spells
          ? choosenKnownSpell.map((book, idx) => {
              if (book?.spellsBook)
                return (
                  <div className="rpgui-container-framed" key={idx}>
                    <p>
                      {book?.caster}
                      {" lv."}
                      {book?.level}
                    </p>
                    {book?.spellsBook && Array.isArray(book?.spellsBook) ? (
                      book?.spellsBook.map((spell, indexSpell) => {
                        const casterSpells = FilterAlreadyKnownSpells(
                          filterKnown,
                          book.caster,
                          book.level,
                          spells
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
                                <p onClick={() => scegliSpell(1, spell)}>{spell.name}</p>
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
                                    book?.caster,
                                    spell,
                                    book.level,
                                    indexSpell
                                  )
                                }
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : (book?.spellsBook as boolean) ? (
                      <div>
                        <p>ALL</p>
                      </div>
                    ) : null}
                  </div>
                );
            })
          : null}
      </CharacterSpellsTemplate>
      <div>
        <h2 className="rpgui-container-framed golden-2">SPELLS PER DAY</h2>
        <CharacterSpellsTemplate spello={selectedSpell.spellDay}>
        {choosenDaySpell && spells
          ? choosenDaySpell.map((book, idx) => {
              if (
                book &&
                Array.isArray(book.spellsBook) &&
                book.spellsBook.length > 0
              )
                return (
                  <div className="rpgui-container-framed" key={idx}>
                    <p>
                      {book?.caster}
                      {" lv."}
                      {book?.level}
                    </p>
                    {book?.spellsBook && Array.isArray(book?.spellsBook) ? (
                      book?.spellsBook.map((spell, indexSpell) => {
                        const casterSpells = FilterDayByAlreadyKnownSpells(
                          filterKnown,
                          idx,
                          book.caster,
                          book.level,
                          spells,
                          choosenKnownSpell
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
                                <p onClick={() => scegliSpell(2, spell)}>{spell.name}</p>
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
                                    book?.caster,
                                    spell,
                                    book.level,
                                    indexSpell
                                  )
                                }
                              />
                            </div>
                          </div>
                        );
                      })
                    ) : book?.spellsBook ? (
                      <div>
                        <p>ALL</p>
                      </div>
                    ) : null}
                  </div>
                );
            })
          : null}
          </CharacterSpellsTemplate>
      </div>
    </div>
  );
};
export type CharacterSpellsTemplateProps = {
  children?: React.ReactNode;
  spello?: Spell | null;
};
export const CharacterSpellsTemplate: React.FC<
  CharacterSpellsTemplateProps
> = ({ children, spello }) => {
  const [spell, setSpell] = useState<Spell>();
  useEffect(() => {
    if (spello) setSpell(spello);
  }, [spello]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: "2px",
        textJustify: "auto"
      }}
    >
      <div>{children}</div>
      <div className="rpgui-container-framed grey" style={{ position: "static", overflowY: "auto" }}>
        <h3>{spell?.name}</h3>
        <p>{spell?.school && FormattingText(spell.school)}</p>
        <p>{spell?.subschool}</p>
        <p>{spell?.descriptor}</p>
        <p>{spell?.level?.map(l => <p>{l.classDomain}{" lv."}{l.level}</p>)}</p>
        <p>{spell?.components && FormattingText(spell.components)}</p>
        <p>{spell?.castingTime && FormattingText(spell.castingTime)}</p>
        <p>{spell?.range && FormattingText(spell?.range)}</p>
        <p>{spell?.targetEffectArea && FormattingText(spell?.targetEffectArea)}</p>
        <p>{spell?.duration && FormattingText(spell?.duration)}</p>
        <p>{spell?.savingThrow && FormattingText(spell?.savingThrow)}</p>
        <p>{spell?.spellResistance && FormattingText(spell?.spellResistance)}</p>
        <p>{spell?.descriptiveText && FormattingText(spell?.descriptiveText)}</p>
        <p>{spell?.materialComponent}</p>
        <p>{spell?.focus}</p>
        <p>{spell?.xpCost}</p>
      </div>
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
