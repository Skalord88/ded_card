import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlChar } from "../components/url";
import { PageLayout } from "./AppLayout";

export const Create = () => {
  const [namePlayer, setInputData] = useState<{
    characterName: string;
    playerName: string;
  }>({
    characterName: "",
    playerName: ""
  });

  // const [charId, setCharId] = useState<number>(-1);
  const navigate = useNavigate();

  const handleData = (e: any) => {
    setInputData({ ...namePlayer, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    axios
      .post(urlChar, namePlayer)
      .then((response) => {
        const charId = response.data.characterId;
        navigate(`/race/${charId}`);
      })
      .catch((error) => {
        console.error("Errore nel POST:", error);
      });
  };

  return (
    <PageLayout
      title={"New Character"}
      // buttons={{}}
      onAction={handleSubmit} >
        <input style={{ gridRow: 1 }}
          className="rpgui-content-input"
          type="text"
          placeholder="Character Name"
          onChange={handleData}
          name="characterName"
          value={namePlayer.characterName}
        />
        <input style={{ gridRow: 2 }}
          className="rpgui-content-input"
          type="text"
          placeholder="Player"
          onChange={handleData}
          name="playerName"
          value={namePlayer.playerName}
        />
    </PageLayout>
  );
};
