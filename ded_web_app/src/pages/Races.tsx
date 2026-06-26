import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { addToDrop, ItemInDrop } from "../components/functions";
import { CharacterPc } from "../components/interfaces";
import { ListOfSomething } from "../components/List/List";
import { findIconRace } from "../components/Race/Function";
import { Race, SubRace } from "../components/Race/Interfaces";
import { urlChar, urlRace, urlRaceList } from "../components/url";
import { PageLayout } from "./AppLayout";

export type ChosenRace = {
  id: number;
};

export const Races = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [racePerRace, setRacePerRace] = useState<ItemInDrop[]>();
  const [subRacePerRace, setSubRacePerRace] = useState<ItemInDrop[]>();
  const [oneSubRaceList, setOneSubRaceList] = useState<ItemInDrop[]>();
  const [selectedRace, setSelectedRace] = useState<Race>();
  const [selectedSubRace, setSelectedSubRace] = useState<SubRace>();
  const [chosenRace, setChosenRace] = useState<ChosenRace>({
    id: -1
  });
  const [change, setChange] = useState(false);
  const [iconRace, setIconRace] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const charFromDB = resChar.data as CharacterPc;
        setChar(charFromDB);

        if (charFromDB.race && charFromDB.race.race){
          setSelectedRace(charFromDB.race.race)
          setSelectedSubRace(charFromDB.race)
        }

        const resArchi = await axios.get("http://localhost:8080/race/archetype");
        // const one: Archetype | undefined = (resArchi.data as Archetype[]).find(a => a.id === 1);
        // const mod: Prerequisite | null = one?.modifiers || null;
        // console.log("mod", mod?.armorClass?.modifierBonus.description);

        const resRaceList = await axios.get(urlRace);
        const resSubRaceList = await axios.get(urlRaceList);
        const resRaces: ItemInDrop[] = addToDrop(resRaceList.data, "race");
        const resSubRaces: ItemInDrop[] = addToDrop(
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

  const handleRace = (s: ItemInDrop) => {
    const race = s.item as Race;
    setSelectedRace(s.item as Race);
    const oneSub = subRacePerRace?.filter(
      (sub) => (sub.item as SubRace).race.id === race?.id
    );
    setOneSubRaceList(oneSub);
    setSelectedSubRace(undefined);
  };
  const handleSubRace = (s: ItemInDrop) => {
    if (s.item as SubRace) setChosenRace({ id: (s.item as SubRace).id });
    setSelectedSubRace(s.item as SubRace);
    setIconRace("rpgui-icon " + findIconRace((s.item as SubRace).id));
  };
  const handleNoRace = () => {
    setSelectedRace(undefined);
    setSelectedSubRace(undefined);
    setChange(false);
  };
  const handleSubmit = () => {
    console.log("chosenRace", chosenRace);
    if(chosenRace && chosenRace.id > -1) axios.post(urlRace + "/" + charId, chosenRace);
    setChange(true);
    // window.location.reload();
  };

  return (
    <PageLayout
      title={"Races"}
      buttons={{
        next: { text: "Background", link: "/background/" + charId, change: change }
      }}
      onAction={handleSubmit}
      pageStyle="auto"
    >
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
      {char && selectedRace && selectedSubRace && (
        <div>
          <h2
            className="rpgui-container-framed golden-2"
            onClick={() => handleNoRace()}
          >
            {selectedRace?.raceName +
              ", " +
              selectedSubRace?.subRacesName +
              " "}
          </h2>
          <div className={iconRace} />
          {/* <CharSummary character={char} race={selectedSubRace} /> */}
        </div>
      )}
    </PageLayout>
  );
};
