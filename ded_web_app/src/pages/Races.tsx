import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ListOfSomething } from "../components/List/List";
import { Race, SubRace } from "../components/Race/Interfaces";
import { CharSummary } from "../components/Summary/CharSummary";
import { CharacterPc } from "../components/interfaces";
import { urlChar, urlRace, urlRaceList } from "../components/url";
import { addToDrop, itemInDrop } from "../components/functions";
import { findIconRace } from "../components/Race/Function";
import { ButtonRpg } from "../components/Buttons/Buttons";

export type ChosenRace = {
  id: number;
};

export const Races = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [racePerRace, setRacePerRace] = useState<itemInDrop[]>();
  const [subRacePerRace, setSubRacePerRace] = useState<itemInDrop[]>();
  const [oneSubRaceList, setOneSubRaceList] = useState<itemInDrop[]>();
  const [selectedRace, setSelectedRace] = useState<Race>();
  const [selectedSubRace, setSelectedSubRace] = useState<SubRace>();
  const [chosenRace, setChosenRace] = useState<ChosenRace>({
    id: 0
  });
  const [change, setChange] = useState(false);
  const [iconRace, setIconRace] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resRaceList = await axios.get(urlRace);
        const resSubRaceList = await axios.get(urlRaceList);
        const resRaces: itemInDrop[] = addToDrop(resRaceList.data, "race");
        const resSubRaces: itemInDrop[] = addToDrop(
          resSubRaceList.data,
          "subRace"
        );
        setSubRacePerRace(resSubRaces);
        setRacePerRace(resRaces);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRace = (s: itemInDrop) => {
    const race = s.item as Race
    setSelectedRace(s.item as Race);
    const oneSub = subRacePerRace?.filter(
      (sub) => (sub.item as SubRace).race.id === race?.id
    );
    setOneSubRaceList(oneSub);
    setSelectedSubRace(undefined);
  };
  const handleSubRace = (s: itemInDrop) => {
    if (s.item as SubRace) setChosenRace({ id: (s.item as SubRace).id });
    setSelectedSubRace(s.item as SubRace);
    setIconRace("rpgui-icon " + findIconRace((s.item as SubRace).id));
    setChange(true);
  };
  const handleNoRace = () => {
    setSelectedRace(undefined);
    setSelectedSubRace(undefined);
    setChange(false);
  };
  const handleSubmit = () => {
    if (change) axios.post(urlRace + "/" + charId, chosenRace);
    window.location.reload();
  };

  return (
    <div>
      <h1>Races</h1>
      {/* <PageAndSummaryLayout> */}
        {char && selectedSubRace ? (
          <div>
            {change === true ? (
              <div className="rpgui-container-framed-grey">
                <div className={iconRace} />
                <p onClick={() => handleNoRace()}>
                  {selectedRace?.raceName +
                    ", " +
                    selectedSubRace?.subRacesName +
                    " "}
                </p>
                <ButtonRpg text={"to classes"} link={"/class/" + charId} onAction={()=> handleSubmit}/>
              </div>
            ) : (
              <div>
                <p>...choose race</p>
              </div>
            )}
            <CharSummary character={char} race={selectedSubRace} />
          </div>
        ) : (
          <div>
            <p>...choose race</p>
          </div>
        )}

        <div className="rpgui-container-framed-grey">
          {racePerRace ? (
            <ListOfSomething
              items={racePerRace}
              text={"Race"}
              onSelect={handleRace}
            />
          ) : null}
          {selectedRace && oneSubRaceList ? (
            <ListOfSomething
              items={oneSubRaceList}
              text={selectedRace.raceName}
              onSelect={handleSubRace}
            />
          ) : null}
        </div>
      {/* </PageAndSummaryLayout> */}
    </div>
  );
};
