import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { character } from "../components/interfaces";
import { urlCharList, urlCharRemove } from "../components/url";

export const List: React.FC = () => {
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    axios.get<[]>(urlCharList).then((response) => {
      setCharList(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (e: number) => {
    try {
      axios.post(urlCharRemove, {id: e})
    } catch (error) {
      console.log(error);
    }
    console.log(e)
    // window.location.reload();
  }

  return (
    <>
    
      {charList.length > 0 ? (
        <div id="list" className="rpgui-container-framed">
          <p>list of characters:</p>
          <ol type="I">
            {charList.map((c: character) => {
              return (
                <>
                  <li key={c.characterId}>
                    <Link to={"/" + c.characterId}>
                      character: <b>{c.characterName}</b> / player:{" "}
                      <b>{c.playerName}</b>
                    </Link>
                    <button onClick={() => handleDelete(c.characterId)}>remove</button>
                  </li>
                </>
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
