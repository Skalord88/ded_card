import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { urlChar } from "../components/url";

export const Create = () => {
  const [inputData, setInputData] = useState<{
    characterName: string;
    playerName: string;
  }>({
    characterName: "",
    playerName: ""
  });

  const [charId, setCharId] = useState<number>(-1);

  const handleData = (e: any) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(urlChar, inputData).then((response) => {
      setCharId(response.data.characterId);
    });
  };

  return (
    <>
        <div className="rpgui-container-framed">
          <form>
            <input
              className="rpgui-content-input"
              type="text"
              placeholder="Character Name"
              onChange={handleData}
              name="characterName"
              value={inputData.characterName}
            />
            <input
              className="rpgui-content-input"
              type="text"
              placeholder="Player"
              onChange={handleData}
              name="playerName"
              value={inputData.playerName}
            />

            <div>
              {charId > -1 ? (
                <button className="rpgui-button">
                  {" "}
                  <Link to={"/ability/" + charId}>to abilitys</Link>
                </button>
              ) : (
                <button className="rpgui-button" onClick={handleSubmit}>
                  create
                </button>
              )}
            </div>
          </form>
        </div>
    </>
  );
};
