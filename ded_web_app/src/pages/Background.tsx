import { useParams } from "react-router-dom";
import { PageLayout } from "./AppLayout";
import { useEffect, useState } from "react";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import axios from "axios";
import { urlChar, urlDeity } from "../components/url";
import { CharacterPc } from "../components/interfaces";
import { Deity } from "../components/Deity/interface";
import { ListGroupItem } from "react-bootstrap";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";

export function Background() {
  const { charId } = useParams();

  const [modChar, setModChar] = useState<CharToModify>();
  const [deities, setDeities] = useState<Deity[]>([]);
  const [god, setGod] = useState<Deity>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;

        const newModChar = await createModChar(charDB);
        setModChar(newModChar);

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

  const items: itemInDrop[] = addToDrop(
    deities.sort((a, b) => a.name.localeCompare(b.name)),
    "deity"
  );
  return (
    <div>
    <PageLayout title={"background"}>
      {deities && (
        <DropdownComponent
          options={items}
          onAction={selectTheGod}
        ></DropdownComponent>
        
      )}
      {god && 
      <div>
        <h2>{god.name}</h2>
        <p>{god.alignment.name.toString()}</p>
        <p>{god.domains.flatMap(d => d.domain).join(", ")}</p>
      </div>}
    </PageLayout>
  </div>
  );
}
