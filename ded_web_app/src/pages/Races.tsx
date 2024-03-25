import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

import { urlChar, urlRaceList } from "../components/url";
import {
  ChosenRace,
  characterPc,
  races,
  subRaces
} from "../components/interfaces";
import { emptySubRaces } from "../components/variables";

export function Races() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();
  const [races, setRaces] = useState<races[]>();
  const [selectedRace, setSelected] = useState<String>('')
  const [chosenRace, setChosenRace] = useState<ChosenRace>({
    id: 0,
    subRacesName: ''
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

  const handleData = (subRace: subRaces, race: string) => {
    setSelected(race)
    setChosenRace({id: subRace.id, subRacesName: subRace.subRacesName});
    setChange(true);
  };
  const handleSubmit = (e: ChosenRace) => {
    axios.post(urlRaceList + "/" + charId, e)
  };

  return (
    <>
      <div className="container">
        {change === true ? (
          <div>
            {chosenRace?.subRacesName}, {selectedRace}
            <button onClick={() => handleSubmit(chosenRace)}>
              <Link to={"/class/" + charId}>to classes</Link>
            </button>
          </div>
        ) : (
          <div>...choose race</div>
        )}
        <>
          {races ? (
            <div className="container">
              {races.map((r: races, index: number) => {
                return (
                  <div className="container-item" key={index}>
                    <b>{r.raceName}</b>{" "}
                    {r.subRaces ? (
                      <ul>
                        {r.subRaces.map((sr: subRaces, indexSR: number) => {
                          return (
                            <li key={indexSR}>
                              <>
                                <button
                                  onClick={() =>
                                    handleData(sr, r.raceName)
                                  }
                                >
                                  {sr.subRacesName}
                                </button>
                              </>
                              :{" "}
                              {sr.raceAbilitys ? (
                                <>
                                  <>
                                    {sr.raceAbilitys.streght ? (
                                      <>
                                        str:
                                        {sr.raceAbilitys.streght > 0 ? (
                                          <>+{sr.raceAbilitys.streght}</>
                                        ) : (
                                          <>{sr.raceAbilitys.streght}</>
                                        )}{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                  <>
                                    {sr.raceAbilitys.dextrity ? (
                                      <>
                                        dex:
                                        {sr.raceAbilitys.dextrity > 0 ? (
                                          <>+{sr.raceAbilitys.dextrity}</>
                                        ) : (
                                          <>{sr.raceAbilitys.dextrity}</>
                                        )}{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                  <>
                                    {sr.raceAbilitys.constitution ? (
                                      <>
                                        con:
                                        {sr.raceAbilitys.constitution > 0 ? (
                                          <>+{sr.raceAbilitys.constitution}</>
                                        ) : (
                                          <>{sr.raceAbilitys.constitution}</>
                                        )}{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                  <>
                                    {sr.raceAbilitys.intelligence ? (
                                      <>
                                        int:
                                        {sr.raceAbilitys.intelligence > 0 ? (
                                          <>+{sr.raceAbilitys.intelligence}</>
                                        ) : (
                                          <>{sr.raceAbilitys.intelligence}</>
                                        )}{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                  <>
                                    {sr.raceAbilitys.wisdom ? (
                                      <>
                                        wis:
                                        {sr.raceAbilitys.wisdom > 0 ? (
                                          <>+{sr.raceAbilitys.wisdom}</>
                                        ) : (
                                          <>{sr.raceAbilitys.wisdom}</>
                                        )}{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                  <>
                                    {sr.raceAbilitys.charisma ? (
                                      <>
                                        cha:
                                        {sr.raceAbilitys.charisma > 0 ? (
                                          <>+{sr.raceAbilitys.charisma}</>
                                        ) : (
                                          <>{sr.raceAbilitys.charisma}</>
                                        )}{" "}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                </>
                              ) : (
                                <></>
                              )}
                              {sr.levelAdjustment === 0 ? (
                                <></>
                              ) : (
                                <> lva:{sr.levelAdjustment}</>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    ) : (
                      <p>...loading sub races...</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>...loading races...</p>
          )}
        </>
      </div>
    </>
  );
}
