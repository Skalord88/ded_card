import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alignment, AlignmentMap } from "../components/Alignment/Alignment";
import { Deity } from "../components/Deity/interface";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { CharacterPc } from "../components/interfaces";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { RacialRegion, Region } from "../components/Region/interface";
import { urlChar, urlRegion } from "../components/url";
import { PageLayout } from "./AppLayout";
import { Dominio } from "../components/Dominio/interface";

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

  const [domain, setDomain] = useState<Dominio>();
  // const [domains, setDomains] = useState<Dominio[]>([]);
  const [itemsDom, setItemsDom] = useState<itemInDrop[]>([]);

  const [aligment, setAligment] = useState<Alignment>();

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
        setRegions(
          allRegioni.sort((a, b) => a.region.name.localeCompare(b.region.name))
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsRegioni: itemInDrop[] = addToDrop(
    regions
      .filter((reg) =>
        reg.regionalSubRaces.some(
          (sub) => sub.race.id === character?.race.race.id
        )
      )
      .sort((a, b) => a.region.name.localeCompare(b.region.name)),
    "raceRegion"
  );

  const selectTheRacialRegion = (option: RacialRegion) => {
    setGod(undefined);
    setItemsDei([]);
    setDeities(
      option.preferedDeities.sort((a, b) => a.name.localeCompare(b.name))
    );
    setDomain(undefined);
    setItemsDom([]);
    setAligment(undefined);
    setItemsAligm([]);
    setAligments(option.region.regionalAlignment);
    setRegionRace(option);
  };

  useEffect(() => {
    const itemsDei = addToDrop(
      deities.sort((a, b) => a.name.localeCompare(b.name)),
      "deity"
    );
    setItemsDei(itemsDei);
  }, [deities]);

  const selectTheGod = (option: Deity) => {
  setGod(option);
  }

  useEffect(() => {
  if (!god) return;

  const sortedDomains = [...god.domains].sort(
    (a, b) => a.domain.localeCompare(b.domain)
  );

  setItemsDom(addToDrop(sortedDomains, "domain"));
}, [god]);



  // useEffect(() => {
  //   if (god) {
  //     const itemsDom = addToDrop(
  //       god?.domains.sort((a, b) => a.domain.localeCompare(b.domain)),
  //       "domain"
  //     );
  //     setItemsDom(itemsDom);
  //   }
  // }, [god]);

  useEffect(() => {
    const items = addToDrop(
      aligments.sort((a, b) => a.name.localeCompare(b.name)),
      "aligment"
    );
    setItemsAligm(items);
  }, [aligments]);

  return (
    <div>
      <PageLayout title={"background"}>
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
        {modChar?.numberofDomains &&
          deities &&
          itemsDom.length > 0 &&
          Array.from({ length: modChar.numberofDomains }).map((_, index) => (
            <BackgroundLayoutComponent
              title="Domanin"
              items={itemsDom}
              onAction={selectTheGod}
              one={domain && domain}
            />
          ))}
        {/* {aligments && aligments.length > 0 && (
          <BackgroundLayoutComponent
            title="Aligment"
            items={itemsAligm}
            onAction={selectTheAligment}
            one={aligment && aligment}
          />
        )} */}
      </PageLayout>
    </div>
  );
}

export type BackgroundLayoutComponentProps = {
  title: string;
  items?: itemInDrop[];
  onAction?: (option: any) => void;
  one?: Region | Deity | Dominio | Alignment | undefined;
};

export const BackgroundLayoutComponent: React.FC<
  BackgroundLayoutComponentProps
> = ({ title, items, onAction, one }) => {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          gap: "8px"
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
  one
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
    const deity = one as Dominio;
    return (
      <div>
        <p>{deity.domain}</p>
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
