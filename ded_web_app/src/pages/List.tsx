import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { character } from '../components/interfaces';
import { urlCharList } from '../components/url';

export function List() {

  const [charList, setCharList] = useState([]);

  useEffect(() => {
    axios.get<[]>(urlCharList)
    .then((response) => {
      setCharList(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      list of characters:
      {charList.length > 0? (
        <>
          {charList.map((c:character, index:number) => {
            return (
              <li key={index}>
                <Link to={'/'+c.characterId}>
                  character: <b>{c.characterName}</b> / player: <b>{c.playerName}</b>
                </Link>
              </li>
            );
          })}
        </>
      ) : (
        <div>...loading characters...</div>
      )}
    </>
  );
}
