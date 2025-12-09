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

export function Background() {
  const { charId } = useParams();

  const [modChar, setModChar] = useState<CharToModify>();
  const [regions, setRegions] = useState<RacialRegion[]>([]);
  const [deities, setDeities] = useState<Deity[]>([]);
  const [region, setRegion] = useState<Region>();
  const [god, setGod] = useState<Deity>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;

        const newModChar = await createModChar(charDB);
        setModChar(newModChar);

        const regioni = await axios.get(urlRegion);
        const allRegioni: RacialRegion[] = regioni.data;
        setRegions(allRegioni);

        const deities = await axios.get(urlDeity);
        const allDeitys: Deity[] = deities.data;
        setDeities(allDeitys);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectTheGod = (deitySelected: Deity) => {
    setGod(deitySelected);
  };
  const selectTheRegion = (deitySelected: RacialRegion) => {
    setRegion(deitySelected.region);
  };

  const itemsDei: itemInDrop[] = addToDrop(
    deities.sort((a, b) => a.name.localeCompare(b.name)),
    "deity"
  );
  const itemsRegioni: itemInDrop[] = addToDrop(
    regions.sort((a, b) => a.region.name.localeCompare(b.region.name)),
    "region"
  );
  return (
    <div>
      <PageLayout title={"background"}>
        {deities && (
          <DropdownComponent
            options={itemsDei}
            onAction={selectTheGod}
          ></DropdownComponent>
        )}
        {god && (
          <div>
            <h2>{god.name}</h2>
            <p>{god.alignment.name}</p>
            <p>{god.domains.flatMap((d) => d.domain).join(", ")}</p>
          </div>
        )}
        <DropdownComponent
            options={itemsRegioni}
            onAction={selectTheRegion}
          ></DropdownComponent>
      </PageLayout>
    </div>
  );
}
