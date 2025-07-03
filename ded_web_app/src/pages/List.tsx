import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { character } from "../components/interfaces";
import { urlCharList } from "../components/url";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { PageLayoutBody } from "./AppLayout";

export const List: React.FC = () => {
  const [charList, setCharList] = useState<character[]>([]);

  useEffect(() => {
    axios.get<character[]>(urlCharList).then((response) => {
      console.log("Character list:", response.data);
      setCharList(response.data);
    });
  }, []);

  return (
    <PageLayoutBody>
      {charList.length > 0 ? (
        <div>
          <p>list of characters:</p>
          <ol type="I" id="list">
            {charList.map((c: character, index: number) => {
              return (
                <li key={index}>
                  <Link to={"/" + c.characterId}>
                    <b>{[c.characterName, c.playerName].join(", ")}</b>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      ) : (
        <div>
          <p>...loading characters...</p>
        </div>
      )}
    </PageLayoutBody>
  );
};

export const CharacterList: React.FC = () => {
  const [charList, setCharList] = useState([]);

  useEffect(() => {
    axios.get<[]>(urlCharList).then((response) => {
      setCharList(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {charList.length > 0 ? (
        <div id="list" className="rpgui-container-framed">
          <p>list of characters:</p>
          <ol type="I" id="list">
            <DropdownComponent options={charList} onAction={() => {}} />
          </ol>
        </div>
      ) : (
        <div className="rpgui-container-framed">
          <p>...loading characters...</p>
        </div>
      )}
    </div>
  );
};
