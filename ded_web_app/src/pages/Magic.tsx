import { useEffect, useState } from "react";
import {
  Book,
  CharacterPc,
  Spell
} from "../components/interfaces";
import axios from "axios";
import { urlChar, urlSpellsList } from "../components/url";
import { useParams } from "react-router-dom";
import { } from "../components/variables";
import { CharacterBooks, MagicKnown } from "../components/MyComponents";
import { AllSpell } from "../components/functions";

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

        setBookChar(resURL.data.books)
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
        if (level.classDomain === book.caster && level.level === book.level) {
          book.spells.push(s);
          break;
        }
      }
    }
    setBookChar([...booksChar]);
  }

  return (
    <>
    {char? (
    <>
      <CharacterBooks
        books = {booksChar}
      />
    </>
  ):(<></>)}
    
      <div className="container">
        {char ? (
          <>
            <div>per day:</div>
            <>
              {Object.entries(char.magicPerDay).map((k) => (
                <div>
                  {k[0]}
                  {k[1].map((lv, chiave) => (
                    <div>
                      lv.{chiave}:{" ("}
                      {lv}
                      {")"}
                      {}
                    </div>
                  ))}
                </div>
              ))}
            </>
            <div>known:</div>
            <>
              {Object.entries(char.magicKnown).map((k) => (
                <div>
                  {k[0]} {k[1].map((lv, key) => (
                    <div key={key}>lv.{key}{" ("}{AllSpell(lv)}{")"}
                    {spellsList?(
                    <>
                    <MagicKnown
                      list={spellsList}
                      lvSpell={key}
                      pgClass={k[0]}
                      selectSpell={UpdateBooks}
                    />
                    </>):(<></>)}
                    </div>
                  ))}
                </div>
              ))}
            </>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
