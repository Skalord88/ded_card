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
  // const [booksChar, setBookChar] = useState<Book[]>([]);
  const [spellsPgList, setSpellsPgList] = useState<SpellsByLevelAndClass[]>();
  // const [mapOfAbilitys, setMapAbilitys] = useState<{ [key: string]: number }>();
  // const [mapOfKnow, setMapOfKnow] = useState<
  //   {
  //     classe: string;
  //     spells: number[];
  //     books: Book[];
  //   }[]
  // >();
  // const [mapOfDay, setMapOfDay] = useState<
  //   {
  //     classe: string;
  //     spells: number[];
  //     books: Book[];
  //   }[]
  // >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;
        setChar(charDB);

        // charDB.books.forEach((book) => {
        //   console.log("Book:", book);
        // })

        const newModChar = await createModChar(charDB);
        setModChar(newModChar);

        // newModChar.spellsKnown?.forEach((sk) => {
        //   console.log("Known Spells:", sk);
        // })

        const resSpells = await axios.get(urlSpellsList);
        const allSpells: Spell[] = resSpells.data;
        setSpellsList(allSpells);

        // setBookChar(resURL.data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (modChar) {
      // const actualKnownClassLv: {
      //   classe: string;
      //   spells: number[];
      // }[] = modChar.spellsKnown ?? [];
      // console.log("actualKnownClassLv:", actualKnownClassLv);
      // setMapOfKnow(actualKnownClassLv);

      // const actualDayClassLv: {
      //   classe: string;
      //   spells: number[];
      // }[] = modChar.spellsPerDay ?? [];

      // console.log("actualDayClassLv:", actualDayClassLv);
      // setMapOfDay(actualDayClassLv);

      const spellMap: SpellsByLevelAndClass[] = FilterSpellsByLevelAndClass(
        spellsList || [],
        modChar.magicClassLv || {}
        // char,
      );

      setSpellsPgList(spellMap);
    }
  }, [modChar, spellsList]);

  // const UpdateBooks = (s: Spell) => {
  //   for (const book of booksChar) {
  //     for (const level of s.level || []) {
  //       if (level.level === book.level) {
  //         book.spells.push(s);
  //         break;
  //       }
  //     }
  //   }
  //   setBookChar([...booksChar]);
  // };

  return (
    <PageLayout title={"Magic"}>
      <div>
        {spellsPgList && (
          <CharacterSpells
            spells={spellsPgList}
            // mapOfAbilitys={mapOfAbilitys}
            mapOfKnow={modChar?.spellsKnown}
            mapOfDay={modChar?.spellsPerDay}
          />
        )}
        {/* {char && <CharacterBooks books={booksChar} />} */}
      </div>
    </PageLayout>
  );
}
export type SpellsByLevelAndClassProps = {
  spells: SpellsByLevelAndClass[];
  mapOfKnow?: (Book | null)[];
  // }[];
  mapOfDay?: (Book | null)[];
};
export const CharacterSpells: React.FC<SpellsByLevelAndClassProps> = ({
  spells,
  mapOfKnow,
  mapOfDay
}) => {
  const [choosenKnownSpell, setChoosenKnownSpell] = useState<Book[]>([]);
  const [choosenDaySpell, setChoosenDaySpell] = useState<Book[]>([]);
  const [filterKnown, setFilterKnown] = useState<number[]>([]);

  // useEffect(() => {
  // let listKnown: (Book | boolean)[] = [];
  // mapOfKnow?.forEach((mapknown) => {
  //   const caster = mapknown.classe;
  //   for (let i = 0; i < mapknown.spells.length; i++) {
  //     if (mapknown.spells[i] > 0) {
  //       const book: Book = mapknown.books.find(
  //         (bk) => bk.caster === caster && bk.level === i
  //       )!;
  //       listKnown.push(book);
  //     } else if (mapknown.spells[i] === -2) {
  //       listKnown.push(true);
  //     }
  //   }
  // });
  // console.log("mk.listKnown:", listKnown);

  // let listDay: (Book | boolean)[] = [];
  // mapOfDay?.forEach((mapDay) => {
  //   const caster = mapDay.classe;
  //   for (let i = 0; i < mapDay.spells.length; i++) {
  //     if (mapDay.spells[i] > 0) {
  //       const book: Book | undefined = mapDay.books.find(
  //         (bk) => bk.caster === caster && bk.level === i
  //       );
  //       if (book) {listDay.push(book)}
  //       else {
  //         const knownCount = mapOfKnow?.find((k) => k.classe === caster)?.spells[i] ?? 0;
  //         const emptySpells: Spell[] =
  //           typeof knownCount === "number" && knownCount > 0
  //             ? Array.from({ length: knownCount }, () => ({} as Spell))
  //             : [];
  //         const emptyBook: Book = {
  //           caster: caster,
  //           knowDay: "DAY",
  //           level: i,
  //           spellsBook: emptySpells,
  //         };
  //         listDay.push(emptyBook);
  //       }
  //     } else if (mapDay.spells[i] === -2) {
  //       listDay.push(true);
  //     }
  //   }
  // });
  // console.log("mk.listDay:", listDay);
  // }, []);

  const chooseSpell = (
      knowDay: string,
      caster: string,
      s: Spell,
      level: number,
      indexOfSpell: number) =>
      
    {
        // console.log(
        //   "knowDay:",
        //   knowDay,
        //   "caster:",
        //   caster,
        //   "s:",
        //   s.id,
        //   "level:",
        //   level,
        //   "indexOfSpell:",
        //   indexOfSpell
        // );
        const indexBookKnown: number
        const indexBookDay: number
        const book: Book = knowDay === "know"?
        mapOfKnow?.find((m, indexKnown) => m?.caster === caster && m?.level === level) as Book
        :
        mapOfDay?.find((m) => m?.caster === caster && m?.level === level) as Book;

        if (Array.isArray(book.spellsBook)) {
          // book.spellsBook is (Spell | null)[]
          // You can safely use book.spellsBook here if needed
          const moddedSpellsBook = book.spellsBook.map((sp, idx) =>
            idx === indexOfSpell ? s : sp)
          const moddedBook: Book = {
            ...book,
            spellsBook: moddedSpellsBook
        }
          if (knowDay === "know") {
            const existingIndex = choosenKnownSpell.findIndex(
              (b) => b.caster === caster && b.level === level
            ); 
            if (existingIndex >= 0) {
              const updatedKnownSpells = [...choosenKnownSpell];
              updatedKnownSpells[existingIndex] = moddedBook;
              setChoosenKnownSpell(updatedKnownSpells);
            } else {
              setChoosenKnownSpell([...choosenKnownSpell, moddedBook]);
            }
          }
    };

  return (
    <div style={{ display: "grid" }}>
      <h2 className="rpgui-container-framed golden-2">SPELLS KNONW</h2>
      {mapOfKnow && spells
        ? mapOfKnow.map((m, idx) => {
            if (m?.spellsBook)
              return (
                <div className="rpgui-container-framed" key={idx}>
                  <div>
                    <p>
                      {m?.caster}
                      {" lv."}
                      {m?.level}
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
                                    onAction={(spell: Spell) => chooseSpell(
                                      "know",
                                      m?.caster,
                                      spell,
                                      m.level,
                                      indexSpell
                                    )}
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
                    </p>
                  </div>
                </div>
              );
          })
        : null}

      {/* {mapOfKnow && spells
        ? spells.map((s, index) => {
            const items: itemInDrop[] = addToDrop(s.spells, "spells");
            const classEntry = mapOfKnow.find((m) => m.classe === s.class);
            const quanti: number = classEntry
              ? classEntry.spells[index] ?? 0
              : 0;
            return (
              <div key={index}>
                <p>
                  {s.level + ".lv "}
                  {s.class}
                </p>
                {quanti === -2 ? (
                  <span>ALL</span>
                ) : ( */}
      {/* // render a DropdownComponent for each available spell slot
                  Array.from({ length: quanti }).map((_, i) => (
                    <DropdownComponent
                      key={i}
                      options={items}
                      onAction={(spell: Spell) =>
                        chooseSpell("know", spell, index, i)
                      }
                    />
                  ))
                )}
              </div>
            );
          })
        : null} */}
      <h2>SPELLS PER DAY</h2>
      {/* {mapOfDay && mapOfKnow && spells
        ? spells.map((s, index) => {
            // const all = mapOfKnow[index].spells.includes(-2)? true : false
            // const filtredPerKnown = FilterPerKnownSpells(all, [], s.spells)
            const classEntry = mapOfDay.find((m) => m.classe === s.class);
            const quanti: number = classEntry
              ? classEntry.spells[index] ?? 0
              : 0;
            const classEntryKnown = mapOfKnow.find((m) => m.classe === s.class);
            const quantiKnown: number = classEntryKnown
              ? classEntryKnown.spells[index] ?? 0
              : 0;
            const filtredPerKnown: Spell[] = FilterPerKnownSpells(
              quantiKnown === -2 ? true : false,
              filterKnown,
              s.spells
            );
            const items: itemInDrop[] = addToDrop(filtredPerKnown, "spells");
            return (
              <div key={index}>
                <p>
                  {s.level + ".lv "}
                  {s.class}
                </p>
                {
                  // render a DropdownComponent for each available spell slot
                  Array.from({ length: quanti }).map((_, i) => {
                    if (items.length > 0)
                      return (
                        <DropdownComponent
                          key={i}
                          options={items}
                          onAction={(spell: Spell) =>
                            chooseSpell("day", spell, index, i)
                          }
                        />
                      );
                  })
                }
              </div>
            );
          })
        : null} */}
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
