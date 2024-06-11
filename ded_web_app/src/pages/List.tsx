import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { character } from "../components/interfaces";
import { urlCharList } from "../components/url";

export const List: React.FC = () => {
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    axios.get<[]>(urlCharList).then((response) => {
      setCharList(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {charList.length > 0 ? (
        <div id="list" className="rpgui-container-framed">
          <p>list of characters:</p>
          <ol type="I" id="list">
            {charList.map((c: character, index: number) => {
              return (
                <li key={index}>
                  <Link to={"/" + c.characterId}>
                    character: <b>{c.characterName}</b> / player:{" "}
                    <b>{c.playerName}</b>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <div className="rpgui-container-framed">...loading characters...</div>
      )}
    </>
  );
};
