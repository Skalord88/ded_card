import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alignment, AlignmentMap } from "../components/Alignment/Alignment";
import { Deity } from "../components/Deity/interface";
import { Dominio } from "../components/Dominio/interface";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { CharacterPc } from "../components/interfaces";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { RacialRegion, Region } from "../components/Region/interface";
import { urlChar, urlRace, urlRegion } from "../components/url";
import { PageLayout } from "./AppLayout";

export function Background() {
  const { charId } = useParams();

  const [character, setCharacter] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();
  const [regions, setRegions] = useState<RacialRegion[]>([]);

  const [aligments, setAligments] = useState<Alignment[]>([]);

  const [itemsAligm, setItemsAligm] = useState<itemInDrop[]>([]);
  const [regionRace, setRegionRace] = useState<RacialRegion>();
  // const [region, setRegion] = useState<Region>();
  const [god, setGod] = useState<Deity>();
  const [deities, setDeities] = useState<Deity[]>([]);
  const [itemsDei, setItemsDei] = useState<itemInDrop[]>([]);

  // const [domain, setDomain] = useState<Dominio>();
  const [itemsDom, setItemsDom] = useState<itemInDrop[]>([]);
  const [domains, setDomains] = useState<Dominio[]>([]);

  const [aligment, setAligment] = useState<Alignment>();

  const [change, setChange] = useState<boolean>(false);

  const [regionToAdd, setRegionToAdd] = useState<
    {idCharacter: number,
    idRegion: number,
    idDeity: number,
    idDomains: number[],
    idAligment?: number}
  >({idCharacter: 0, idRegion: 0, idDeity: 0, idDomains: [], idAligment: 0});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;
        setCharacter(charDB);

        const newModChar = await createModChar(charDB);
        setModChar(newModChar);

        console.log("charDB background", charDB);

        const newRegion = charDB.region? charDB.region : undefined
        setRegionRace(newRegion);
        const newDeities = newRegion?.preferedDeities || [];
        setDeities(newDeities);
        setAligment(charDB.alignment? charDB.alignment : undefined);
        const newGod = charDB.deity? charDB.deity : undefined 
        console.log("charDB newGod", newGod);
        setGod(newGod);
        setDomains(charDB.domains? charDB.domains : []);

        const regioni = await axios.get(urlRegion);
        const allRegioni: RacialRegion[] = regioni.data;
        setRegions(
          allRegioni.sort((a, b) => a.region.name.localeCompare(b.region.name)),
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDomains(Array.from({ length: modChar?.numberOfDomains || 0 }));
  }, [modChar]);

  const itemsRegioni: itemInDrop[] = addToDrop(
    regions
      .filter((reg) =>
        reg.regionalSubRaces.some(
          (sub) => sub.race.id === character?.race.race.id,
        ),
      )
      .sort((a, b) => a.region.name.localeCompare(b.region.name)),
    "raceRegion",
  );

  const selectTheRacialRegion = (option: RacialRegion) => {
    setGod(undefined);
    setItemsDei([]);
    setDeities(
      option.preferedDeities.sort((a, b) => a.name.localeCompare(b.name)),
    );
    setDomains([]);
    setItemsDom([]);
    setAligment(undefined);
    setItemsAligm([]);
    setAligments(option.region.regionalAlignment);
    setRegionRace(option);
  };

  useEffect(() => {
    const itemsDei = addToDrop(
      deities.sort((a, b) => a.name.localeCompare(b.name)),
      "deity",
    );
    setItemsDei(itemsDei);
  }, [deities]);

  const selectTheGod = (option: Deity) => {
    setGod(option);
  };
  const selectAlignment = (option: Alignment) => {
    setAligment(option);
  };
  const selectDomains = (option: Dominio, index: number) => {
    const newDomains = [...domains];
    newDomains[index] = option;
    setDomains(newDomains);
  };

  useEffect(() => {
    if (!god) return;
    if(god.domains === null) {
      setItemsDom([]);
      return;
    }
    const sortedDomains: Dominio[] = god.domains === null? [] : god.domains.length === 0 ? [] : [...god.domains]
      .filter(d => !domains.some((dom) => dom !== undefined && dom.id === d.id))
      .sort((a, b) => a.domain.localeCompare(b.domain));

    setItemsDom(addToDrop(sortedDomains, "domain"));
  }, [god, domains]);

  useEffect(() => {
    const items = addToDrop(
      aligments.sort((a, b) => a.name.localeCompare(b.name)),
      "aligment",
    );
    setItemsAligm(items);
  }, [aligments]);

const handleSubmit = () => {
  const daMandare: {
      idCharacter: number,
    idRegion: number,
    idDeity: number,
    idDomains: number[],
    idAligment?: number,
  } = {
      idCharacter: character ? character.id : 0,
      idRegion: regionRace ? regionRace.region.id : 0,
      idDeity: god ? god.id : 0,
      idDomains: domains.filter(d => d !== undefined).map((d) => d.id),
      idAligment: aligment ? aligment.id : 0,
    };
    console.log("Background daMandare", daMandare);
if(regionToAdd.idCharacter === 0) return;
      axios.post(urlRace + "/" + charId + "addregion", daMandare);
    setChange(true);
    // window.location.reload();
  }

  return (
    <div>
      <PageLayout
      title={"background"}
      buttons={{
        next: { text: "Character", link: "/" + charId, change: change },
        back: { text: "Magic", link: "/magic/" + charId }
      }}
      onAction={handleSubmit}
      >
        <BackgroundLayoutComponent
          title="Region"
          items={itemsRegioni}
          onAction={selectTheRacialRegion}
          one={regionRace?.region}
        />
        {deities && deities.length > 0 && (
          <BackgroundLayoutComponent
            title="God"
            items={itemsDei}
            onAction={selectTheGod}
            one={god && god}
          />
        )}
        {modChar?.numberOfDomains &&
          deities &&
          itemsDom.length > 0 &&
          Array.from({ length: modChar.numberOfDomains }).map((_, index) => (
            <BackgroundLayoutComponent
              key={index}
              title="Domanin"
              items={itemsDom}
              onAction={(option) => selectDomains(option, index)}
              one={domains[index] && domains[index]}
            />
          ))}
        {aligments && aligments.length > 0 && (
          <BackgroundLayoutComponent
            title="Aligment"
            items={itemsAligm}
            onAction={selectAlignment}
            one={aligment && aligment}
          />
        )}
      </PageLayout>
    </div>
  );
}

export type BackgroundLayoutComponentProps = {
  title: string;
  items?: itemInDrop[];
  onAction?: (option: any, index?: number) => void;
  one?: Region | Deity | Dominio | Alignment | undefined;
};

export const BackgroundLayoutComponent: React.FC<
  BackgroundLayoutComponentProps
> = ({ title, items, onAction, one }) => {
  // const [uno, setOne] = useState<Region | Deity | Dominio | Alignment | undefined>(
  //   one,
  // );
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <DropdownComponent
          options={items || []}
          onAction={onAction || (() => {})}
        />

        <div>
          <p>{title}:</p>
        </div>
        {one && <BackgroundOneComponent one={one} />}
        <div></div>
      </div>
    </div>
  );
};

export interface BackgroundOneComponentProps {
  one: Region | Deity | Dominio | Alignment;
}
export const BackgroundOneComponent: React.FC<BackgroundOneComponentProps> = ({
  one,
}) => {
  if ("regionalAlignment" in one) {
    const region = one as Region;
    return (
      <div>
        <p>{region.name}</p>
      </div>
    );
  }
  if ("worshiperAlignments" in one) {
    const deity = one as Deity;
    return (
      <div>
        <p>{deity.name}</p>
      </div>
    );
  }
  if ("domain" in one) {
    const dominio = one as Dominio;
    return (
      <div>
        <p>{dominio.domain}</p>
      </div>
    );
  }
  if ("opposingAlignment" in one) {
    const alignment = one as Alignment;
    return (
      <div>
        <p>{AlignmentMap[alignment.name]}</p>
      </div>
    );
  }
};
