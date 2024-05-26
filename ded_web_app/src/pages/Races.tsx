import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  CharacterPc,
  ChosenRace,
  races,
  subRaces
} from "../components/interfaces";
import { urlChar, urlRaceList } from "../components/url";

export const Races = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [races, setRaces] = useState<races[]>();
  const [selectedRace, setSelected] = useState<String>("");
  const [chosenRace, setChosenRace] = useState<ChosenRace>({
    id: 0,
    subRacesName: ""
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
    setSelected(race);
    setChosenRace({ id: subRace.id, subRacesName: subRace.subRacesName });
    setChange(true);
  };
  const handleSubmit = (e: ChosenRace) => {
    axios.post(urlRaceList + "/" + charId, e);
  };

  return (
    <>
      {change === true ? (
        <p>
          {chosenRace?.subRacesName}, {selectedRace}{" "}
          <button
            className="rpgui-button"
            onClick={() => handleSubmit(chosenRace)}
          >
            <Link to={"/class/" + charId}>to classes</Link>
          </button>
        </p>
      ) : (
        <p>...choose race</p>
      )}

      {races ? (
        <>
          {races.map((r: races, index: number) => {
            return (
              <div
                className="rpgui-container-framed-grey"
                key={index}
                style={{ float: "left", width: "50%" }}
              >
                <p>{r.raceName}:</p>{" "}
                {r.subRaces ? (
                  <ul className="rpgui-list-imp" style={{ height: 90 }}>
                    {r.subRaces.map((sr: subRaces, indexSR: number) => {
                      return (
                        <li
                          key={indexSR}
                          className="data-rpguivalue"
                          onClick={() => handleData(sr, r.raceName)}
                        >
                          {" "}
                          {sr.subRacesName}
                          {sr.raceAbilitys ? (
                            <>
                              <>
                                {sr.raceAbilitys.streght ? (
                                  <>
                                    {" "}
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
                                    {" "}
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
                                    {" "}
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
                                    {" "}
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
                                    {" "}
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
                                    {" "}
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
        </>
      ) : (
        <p>...loading races...</p>
      )}
    </>
  );
};
