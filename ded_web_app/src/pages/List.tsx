import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { character } from "../components/interfaces";
import { urlCharList } from "../components/url";

export const List = () => {
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    axios.get<[]>(urlCharList).then((response) => {
      setCharList(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="rpgui-container">
        <h1>Containers</h1>
        <p>
          This example shows the built-in containers and frames. Containers are
          just fancy divs used for rpgui elements.
        </p>

        <div className="rpgui-container.framed">
          <p>class:rpgui-container framed</p>
        </div>

        <div className="rpgui-container.framed-golden">
          <p>class:rpgui-container framed-golden</p>
        </div>

        <div className="rpgui-container.framed-golden-2">
          <p>class:rpgui-container framed-golden-2</p>
        </div>

        <div className="rpgui-container.framed-grey">
          <p>class:rpgui-container framed-grey</p>
        </div>
      </div>
      <div className="rpgui-container.framed-grey">
        {charList.length > 0 ? (
          <div className="rpgui-container.framed">
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
    </>
  );
}
