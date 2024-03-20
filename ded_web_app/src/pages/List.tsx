import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { character } from "../components/interfaces";
import { urlCharList } from "../components/url";

export function List() {
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    axios.get<[]>(urlCharList).then((response) => {
      setCharList(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {charList.length > 0 ? (
        <div className="container-item">
          list of characters:
          {charList.map((c: character, index: number) => {
            return (
              <>
                <ol type="I">
                  <li key={index}>
                    <Link to={"/" + c.characterId}>
                      character: <b>{c.characterName}</b> / player:{" "}
                      <b>{c.playerName}</b>
                    </Link>
                  </li>
                </ol>
              </>
            );
          })}
        </div>
      ) : (
        <div className="container-item">...loading characters...</div>
      )}
    </div>
  );
}
