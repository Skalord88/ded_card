import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ChosenRace,
  // races,
} from "../components/interfaces";
import { urlRaceList } from "../components/url";
import { itemInDrop } from "../components/functions";

export const Races = () => {
  const { charId } = useParams();

  // const [races, setRaces] = useState<races[]>();
  const [selectedRace, setSelected] = useState<String>("");
  const [chosenRace, setChosenRace] = useState<ChosenRace>({
    id: 0,
    subRacesName: ""
  });
  const [change, setChange] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resRaceList = await axios.get(urlRaceList);
        // setRaces(resRaceList.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRace = (sRace: itemInDrop) => {
    setSelected(sRace.name)
    setChosenRace({ id: sRace.item.id, subRacesName: sRace.item.subRacesName });
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
      {/* {races?.map(race => {
        return(
          <>
            <ListOfSomething
              items={race.subRaces}
              text={race.raceName}
              onSelect={handleRace}
            />
          </>
        )
      })} */}
  </>
  )
  
}
                      

