import { useEffect, useState } from "react";
import {
  Book,
  BooksFromChar,
  CharacterPc,
  Spell
} from "../components/interfaces";
import axios from "axios";
import { urlChar, urlSpellsList } from "../components/url";
import { useParams } from "react-router-dom";
import {} from "../components/variables";
import { MagicKnown } from "../components/MyComponents";
import { AllSpell } from "../components/functions";
import { PageLayout } from "./AppLayout";
import { Popup } from "../components/Popup/Popup";
import { ClassPc } from "../components/ClassPc/Interface/ClassPcLevel";
import {
  FilterSpellsByLevelAndClass,
  FilterSpellsByPgClass,
  SpellsByLevelAndClass
} from "../components/Magic/Functions";

export function Magic() {
  const { charId } = useParams();
  const [char, setChar] = useState<CharacterPc>();
  const [spellsList, setSpellsList] = useState<Spell[]>();
  const [booksChar, setBookChar] = useState<Book[]>([]);
  const [spellsPgList, setSpellsPgList] = useState<SpellsByLevelAndClass[]>();

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
      const spellMap: SpellsByLevelAndClass[] = FilterSpellsByLevelAndClass(
        spellsList || []
      );

      const spellPcMap: SpellsByLevelAndClass[] = FilterSpellsByPgClass(
        spellMap,
        char
      );
      console.log(spellPcMap);
      setSpellsPgList(spellPcMap);
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
        {spellsPgList && <CharacterSpells spells={spellsPgList} />}
        {char && <CharacterBooks books={booksChar} />}
      </div>
    </PageLayout>
  );
}
export type SpellsByLevelAndClassProps = {
  spells: SpellsByLevelAndClass[];
};
export const CharacterSpells: React.FC<SpellsByLevelAndClassProps> = ({
  spells
}) => {
  return (
    <div>
      {spells
        ? spells.map((s, index) => (
            <div key={index}>
              <p>
                {s.level + "lv "}
                {s.class}
              </p>
              {s.spells.map((sp, ind) => (
                <li key={ind}>{sp.name}</li>
              ))}
            </div>
          ))
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

// <div>
//   {char ? <CharacterBooks books={booksChar} /> : null}

//   <div className="container">
//     {char ? (
//       <div>
//         <div>per day:</div>
//         {Object.entries(char.magicPerDay).map((k) => (
//           <div>
//             {k[0]}
//             {k[1].map((lv, chiave) => (
//               <div>
//                 lv.{chiave}:{" ("}
//                 {lv}
//                 {")"}
//                 {}
//               </div>
//             ))}
//           </div>
//         ))}
//         <div>known:</div>
//         {Object.entries(char.magicKnown).map((k) => (
//           <div>
//             {k[0]}{" "}
//             {k[1].map((lv, key) => (
//               <div key={key}>
//                 lv.{key}
//                 {" ("}
//                 {AllSpell(lv)}
//                 {")"}
//                 {spellsList ? (
//                   <>
//                     <MagicKnown
//                       list={spellsList}
//                       lvSpell={key}
//                       pgClass={k[0]}
//                       selectSpell={UpdateBooks}
//                     />
//                   </>
//                 ) : null}
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     ) : null}
//   </div>
// </div>
