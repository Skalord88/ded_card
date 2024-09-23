import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ListOfSomething } from "../components/List/List";
import { SubRace } from "../components/Race/Interfaces";
import { CharSummary } from "../components/Summary/CharSummary";
import { CharacterPc } from "../components/interfaces";
import { urlChar, urlRace, urlRaceList } from "../components/url";

export type ChosenRace = {
  id: number;
};

export const Races = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [races, setRaces] = useState<SubRace[]>();
  const [racePerRace, setRacePerRace] =
    useState<{ race: string; sub: SubRace[] }[]>();
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
        setRaces(resRaceList.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (races) {
      const NumberOfRaces: { race: string; sub: SubRace[] }[] = races.reduce(
        (acc, currentRace) => {
          // Cerca se esiste già un gruppo per la stessa razza
          const existingRaceGroup = acc.find(
            (group) => group.race === currentRace.race.raceName
          );

          if (existingRaceGroup) {
            // Aggiungi la sottorazza al gruppo esistente
            existingRaceGroup.sub.push(currentRace);
          } else {
            // Crea un nuovo gruppo per la razza
            acc.push({
              race: currentRace.race.raceName,
              sub: [currentRace] // Aggiungi la prima sottorazza
            });
          }

          return acc;
        },
        [] as { race: string; sub: SubRace[] }[]
      );

      setRacePerRace(NumberOfRaces);
    }
  }, [races]);

  useEffect(() => {
    if (selectedRace) setChosenRace({ id: selectedRace?.id });
  }, [selectedRace]);

  const handleRace = (sRace: { name: string; item: SubRace }) => {
    setSelected(sRace.item);
    setChange(true);
  };
  const handleSubmit = () => {
    if (change) axios.post(urlRace + "/" + charId, chosenRace);
  };

  return (
    <>
      {char ? <CharSummary character={char} race={selectedRace} /> : null}
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
      <div style={{display: "grid", gridTemplateColumns: 'auto auto auto'}}>
      {racePerRace?.map((race) => {
        return (
          <>
            <ListOfSomething
              items={race.sub}
              text={race.race}
              onSelect={handleRace}
            />
          </>
        );
      })}</div>
    </>
  );
};
