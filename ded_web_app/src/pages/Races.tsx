import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ListOfSomething } from "../components/List/List";
import { SubRace } from "../components/Race/Interfaces";
import { CharSummary } from "../components/Summary/CharSummary";
import { CharacterPc } from "../components/interfaces";
import { urlChar, urlRace, urlRaceList } from "../components/url";
import { addToDrop, itemInDrop } from "../components/functions";

export type ChosenRace = {
  id: number;
};

export const Races = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [racePerRace, setRacePerRace] =
    useState<{ race: string; sub: itemInDrop[] }[]>();
  const [selectedRace, setSelected] = useState<SubRace>();
  const [chosenRace, setChosenRace] = useState<ChosenRace>({
    id: 0
  });
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resRaceList = await axios.get(urlRaceList);
        const resSubRaces: itemInDrop[] = addToDrop(resRaceList.data, "race");
        const listOfRaces: string[] = Array.from(
          new Set(resSubRaces?.map((r) => (r.item as SubRace).race.raceName))
        );
        const listOfSubRaces: { race: string; sub: itemInDrop[] }[] =
          listOfRaces.map((r) => ({
            race: r,
            sub: resSubRaces.filter(
              (sR) => (sR.item as SubRace).race.raceName === r
            )
          }));
        setRacePerRace(listOfSubRaces);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRace = (s: itemInDrop) => {
    if (s.item as SubRace) setChosenRace({ id: (s.item as SubRace).id });
    setSelected(s.item as SubRace);
    setChange(true);
  };
  const handleSubmit = () => {
    if (change) axios.post(urlRace + "/" + charId, chosenRace);
    window.location.reload();
  };

  return (
    <>
      {char && selectedRace ? (
        <CharSummary character={char} race={selectedRace} />
      ) : null}
      {change === true ? (
        <p>
          {selectedRace?.race.raceName}, {selectedRace?.subRacesName}{" "}
          <button className="rpgui-button" onClick={() => handleSubmit()}>
            <Link to={"/class/" + charId}>to classes</Link>
          </button>
        </p>
      ) : (
        <p>...choose race</p>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "auto auto auto" }}>
        {racePerRace
          ? racePerRace.map((r, index) => (
              <div key={index}>
                <ListOfSomething
                  items={r.sub}
                  text={r.race}
                  onSelect={handleRace}
                />
              </div>
            ))
          : null}
      </div>
    </>
  );
};
