import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alignment, AlignmentMap } from "../components/Alignment/Alignment";
import { Deity } from "../components/Deity/interface";
import { Dominio } from "../components/Dominio/interface";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, ItemInDrop } from "../components/functions";
import { CharacterPc } from "../components/interfaces";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { RacialRegion } from "../components/Region/interface";
import { urlChar, urlRace, urlRegion } from "../components/url";
import { PageLayout } from "./AppLayout";

export function Background() {
  const { charId } = useParams();

  const [character, setCharacter] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();

  const [regions, setRegions] = useState<RacialRegion[]>([]);
  const [regionRace, setRegionRace] = useState<RacialRegion>();

  const [aligment, setAligment] = useState<Alignment>();
  const [aligments, setAligments] = useState<Alignment[]>([]);
  const [itemsAligm, setItemsAligm] = useState<ItemInDrop[]>([]);

  const [god, setGod] = useState<Deity>();
  const [deities, setDeities] = useState<Deity[]>([]);
  const [itemsDei, setItemsDei] = useState<ItemInDrop[]>([]);

  const [itemsDom, setItemsDom] = useState<ItemInDrop[]>([]);
  const [domains, setDomains] = useState<Dominio[]>([]);

  const [selected, setSelected] = useState<
    RacialRegion | Alignment | Deity | Dominio
  >();
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);
        const charDB: CharacterPc = resURL.data;
        setCharacter(charDB);

        const newModChar = await createModChar(charDB);
        setModChar(newModChar);

        // se il char ha gia' una regione,
        if (charDB.region !== null) {
          const newRegion = charDB.region;
          newRegion && setRegionRace(newRegion);
          // setta i dei preferiti della regione
          if (
            newRegion.preferedDeities &&
            newRegion.preferedDeities.length > 0
          ) {
            const newDeities = newRegion.preferedDeities;
            newDeities && setDeities(newDeities);
          }

          setAligments(charDB.region.region.regionalAlignment);
          const newAligments = charDB.alignment;
          newAligments && setAligment(newAligments);
        }

        const regioni = await axios.get(urlRegion);
        const allRegioni: RacialRegion[] = regioni.data;
        setRegions(
          allRegioni.sort((a, b) => a.region.name.localeCompare(b.region.name))
        );

        if (charDB.deity) {
          const newGod = charDB.deity;
          newGod && setGod(newGod);

          if (newGod.domains && newGod.domains.length > 0) {
            const sortedDomains: Dominio[] = [...newGod.domains]
              .filter(
                (d) =>
                  !domains.some((dom) => dom !== undefined && dom.id === d.id)
              )
              .sort((a, b) => a.domain.localeCompare(b.domain));

            setItemsDom(addToDrop(sortedDomains, "domain"));
          }
          if (charDB.domains && charDB.domains.length > 0) {
            const newDomains = charDB.domains;
            newDomains && setDomains(newDomains);
          } else {
            setDomains(Array.from({ length: modChar?.numberOfDomains || 0 }));
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const itemsRegioni: ItemInDrop[] = addToDrop(
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
    setDomains([]);
    setItemsDom([]);
    setAligment(undefined);
    setItemsAligm([]);
    setAligments(option.region.regionalAlignment);
    setRegionRace(option);
    setSelected(option);
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
    setDomains(Array.from({ length: modChar?.numberOfDomains || 0 }));
    setAligment(undefined);
    setSelected(option);
  };
  const selectAlignment = (option: Alignment) => {
    setAligment(option);
    setSelected(option);
  };
  const selectDomains = (option: Dominio, index: number) => {
    const newDomains = [...domains];
    newDomains[index] = option;
    setDomains(newDomains);
    setSelected(option);
  };

  useEffect(() => {
    if (!god) return;
    if (god.domains === null) {
      setItemsDom([]);
      return;
    }
    const sortedDomains: Dominio[] =
      god.domains === null
        ? []
        : god.domains.length === 0
          ? []
          : [...god.domains]
              .filter(
                (d) =>
                  !domains.some((dom) => dom !== undefined && dom.id === d.id)
              )
              .sort((a, b) => a.domain.localeCompare(b.domain));

    setItemsDom(addToDrop(sortedDomains, "domain"));
  }, [god, domains]);

  useEffect(() => {
    const items = addToDrop(
      aligments.sort((a, b) => a.name.localeCompare(b.name)),
      "aligment"
    );
    setItemsAligm(items);
  }, [aligments]);

  const handleSubmit = () => {
    const daMandare: {
      idCharacter: number;
      idRegion: number;
      idDeity: number;
      idDomains: number[];
      idAligment: number;
    } = {
      idCharacter: character ? character.id : 0,
      idRegion: regionRace ? regionRace.region.id : 0,
      idDeity: god ? god.id : 0,
      idDomains: domains.filter((d) => d !== undefined).map((d) => d.id),
      idAligment: aligment ? aligment.id : 0
    };
    console.log("Background daMandare", daMandare);
    if (daMandare.idCharacter === 0) return;
    axios.post(urlRace + "/" + charId + "/addregion", daMandare);
    setChange(true);
    // window.location.reload();
  };

  return (
    <>
      <PageLayout
        title={"Background"}
        buttons={{
          next: { text: "Ability", link: "/ability/" + charId, change: change },
          back: { text: "Race", link: "/race/" + charId }
        }}
        onAction={handleSubmit}
      >
        <div style={{ display: "flex" }}>
          <div className="rpgui-container-framed grey" style={{ flex: 1 }}>
            <BackgroundLayoutComponent
              title="Region"
              items={itemsRegioni}
              onAction={selectTheRacialRegion}
              one={regionRace}
              onSelect={() => setSelected(regionRace)}
            />
            {deities && deities.length > 0 && (
              <BackgroundLayoutComponent
                title="God"
                items={itemsDei}
                onAction={selectTheGod}
                one={god && god}
                onSelect={() => setSelected(god)}
              />
            )}
            {modChar?.numberOfDomains &&
              deities &&
              itemsDom.length > 0 &&
              Array.from({ length: modChar.numberOfDomains }).map(
                (_, index) => (
                  <BackgroundLayoutComponent
                    key={index}
                    title="Domanin"
                    items={itemsDom}
                    onAction={(option) => selectDomains(option, index)}
                    one={domains[index] && domains[index]}
                    onSelect={() => setSelected(domains[index])}
                  />
                )
              )}
            {aligments && aligments.length > 0 && (
              <BackgroundLayoutComponent
                title="Aligment"
                items={itemsAligm}
                onAction={selectAlignment}
                one={aligment && aligment}
                onSelect={() => setSelected(aligment)}
              />
            )}
          </div>
          <div className="rpgui-container-framed grey" style={{ flex: 2 }}>
            {selected && <BackgroundOneComponent one={selected} />}
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export type BackgroundLayoutComponentProps = {
  title: string;
  items?: ItemInDrop[];

  onAction?: (option: any, index?: number) => void;
  one?: RacialRegion | Deity | Dominio | Alignment | undefined;
  onSelect?: (
    option: RacialRegion | Deity | Dominio | Alignment | undefined
  ) => void;
};

export const BackgroundLayoutComponent: React.FC<
  BackgroundLayoutComponentProps
> = ({ title, items, onAction, one, onSelect }) => {
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
        {one && (
          <div onClick={() => onSelect?.(one)}>
            {"racialRegion" in one && (
              <BackgroundOneComponent
                text={(one as RacialRegion).region.name}
              />
            )}
            {"worshiperAlignments" in one && (
              <BackgroundOneComponent text={(one as Deity).name} />
            )}
            {"domain" in one && (
              <BackgroundOneComponent text={(one as Dominio).domain} />
            )}
            {"opposingAlignment" in one && (
              <BackgroundOneComponent text={AlignmentMap[(one as Alignment).name]} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export interface BackgroundOneComponentProps {
  text?: string;
  one?: RacialRegion | Deity | Dominio | Alignment;
}
export const BackgroundOneComponent: React.FC<BackgroundOneComponentProps> = ({
  text,
  one
}) => {
  if(text) {
    return <div><p>{text}</p></div>
  }
  if (one) {
    if ("racialRegion" in one) {
      const region = one as RacialRegion;
      return (
        <div>
          <h2>{region.region.name}</h2>
          <p>{region.region.description}</p>
        </div>
      );
    }
    if ("worshiperAlignments" in one) {
      const deity = one as Deity;
      return (
        <div>
          <h2>{deity.name}</h2>
          {deity.favoredWeapons.map(fW => (
            <p>{fW.name}</p>
          ))}
          <p>{deity.alignment.name}</p>
        </div>
      );
    }
    if ("domain" in one) {
      const dominio = one as Dominio;
      return (
        <div>
          <h2>{dominio.domain}</h2>
          <p>{dominio.grantedPower}</p>
          {dominio.domainSpells.sort((a, b) => a.level - b.level).map(d => (
            <p>lv.{d.level} : {d.spell.name}</p>
          ))}
        </div>
      );
    }
    if ("opposingAlignment" in one) {
      const alignment = one as Alignment;
      return (
        <>
          <div>
            <h2>{AlignmentMap[alignment.name]}</h2>
            <p>{alignment.description}</p>
            <p>{alignment.opposingAlignment}</p>
          </div>
        </>
      );
    }
  }
};
