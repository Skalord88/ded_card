import { useParams } from "react-router-dom";
import { PageLayout } from "./AppLayout";
import { useEffect, useState } from "react";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import axios from "axios";
import { urlChar, urlDeity, urlRegion } from "../components/url";
import { CharacterPc } from "../components/interfaces";
import { Deity } from "../components/Deity/interface";
import { ListGroupItem } from "react-bootstrap";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { RacialRegion, Region } from "../components/Region/interface";
import { Domain } from "domain";

export function Background() {
  const { charId } = useParams();

  const [character, setCharacter] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();
  const [regions, setRegions] = useState<RacialRegion[]>([]);
  const [deities, setDeities] = useState<Deity[]>([]);
  const [regionRace, setRegionRace] = useState<RacialRegion>();
  const [region, setRegion] = useState<Region>();
  const [god, setGod] = useState<Deity>();
  const [domains, setDomains] = useState<Domain[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;
        setCharacter(charDB);

        const newModChar = await createModChar(charDB);
        setModChar(newModChar);

        const regioni = await axios.get(urlRegion);
        const allRegioni: RacialRegion[] = regioni.data;
        setRegions(allRegioni.sort((a, b) => a.region.name.localeCompare(b.region.name)));

        // const deities = await axios.get(urlDeity);
        // const allDeitys: Deity[] = deities.data;
        // setDeities(allDeitys);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectTheRacialRegion = (option: RacialRegion) => {
    setRegionRace(option);
  };
  const selectTheGod = (option: Deity) => {
    setGod(option);
  };
  const selectTheRegion = (option: RacialRegion) => {
    setRegion(option.region);
  };

  const itemsDei: itemInDrop[] = addToDrop(
    deities.sort((a, b) => a.name.localeCompare(b.name)),
    "deity"
  );

  const itemsRegioni: itemInDrop[] = addToDrop(
    regions
      .filter((reg) =>
        reg.regionalSubRaces.some((sub) => sub.race.id === character?.race.race.id)
      )
      .sort((a, b) => a.region.name.localeCompare(b.region.name)),
    "raceRegion"
  );

  return (
    <div>
      <PageLayout title={"background"}>
        <DropdownComponent
          options={itemsRegioni}
          onAction={selectTheRacialRegion}
        ></DropdownComponent>
      </PageLayout>
    </div>
  );
}
