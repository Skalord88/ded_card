import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../components/Context/Context";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { CharacterPc } from "../components/interfaces";
import { urlCharList } from "../components/url";
import { PageLayoutBody } from "./AppLayout";

export const List: React.FC = () => {
  const { getData, loading, reload } = useData();

  useEffect(() => {
    reload("charList");
  }, [reload]);

  const charList = getData("charList");

  if (loading.charList) {
    return <div>Loading...</div>;
  }

  console.log(charList);
  return (
    <PageLayoutBody>
      {charList && charList.length > 0 ? (
        <div>
          <p>list of characters:</p>
          <ol type="I" id="list">
            {charList.map((c: CharacterPc, index: number) => {
              return (
                <li key={index}>
                  <Link to={"/" + c.id}>
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
