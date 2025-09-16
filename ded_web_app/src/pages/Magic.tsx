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
import { AllSpell, SortedBooks, SortedSpells } from "../components/functions";
import { PageLayout } from "./AppLayout";
import { Popup } from "../components/Popup/Popup";

export function Magic() {
  const { charId } = useParams();
  const [char, setChar] = useState<CharacterPc>();
  const [spellsList, setSpellsList] = useState<Spell[]>();
  const [booksChar, setBookChar] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        setChar(resURL.data);

        const resSpells = await axios.get(urlSpellsList);
        setSpellsList(resSpells.data);

        setBookChar(resURL.data.books);

        // console.log(resSpells.data);
        // console.log(resURL.data.books);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UpdateBooks = (s: Spell) => {
    for (const book of booksChar) {
      for (const level of s.level || []) {
        if (level.level === book.level && level.level === book.level) {
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
      {spellsList?.filter(s =>
        booksChar.some(b =>
          s.level?.some(i => i.classDomain === b.caster)
        )
      ).map((s, index) => (
        <div key={index}><Popup text={s.name} popText={s.descriptiveText || ""} /></div>
      ))}
      {char ? <CharacterBooks books={booksChar} /> : null}
      </div>
    </PageLayout>
  );
}

export const CharacterBooks: React.FC<BooksFromChar> = ({ books }) => {
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
                {bk.name}{indexBook < books.length ? ", " : ""}
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
