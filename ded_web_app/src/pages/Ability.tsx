import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Abilitys } from "../components/Abilitys/Interface";
import { BonusAbilities, SignNumber } from "../components/functions";
import { urlAb, urlRace } from "../components/url";
import { abilitysEmpty } from "../components/variables";
import { PageLayout } from "./AppLayout";
// import { PageAndSummaryLayout } from "./AppLayout";

export function Ability() {
  const { charId } = useParams();

  const [abilitys, setAbilitys] = useState<Abilitys>(abilitysEmpty);
  const [change, setChange] = useState<boolean>(false);

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 0) {
      setAbilitys((prevAbilities: Abilitys) => ({
        ...prevAbilities,
        [e.target.name]: value
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(urlAb + charId, abilitys).then((response) => {
      console.log(response);
    });
    setChange(true);
  };

  return (
    <PageLayout
      title="Abilities"
      buttons={{
        next: { text: "Races", link: "/race/" + charId },
        change: change,
        // onAction: handleSubmit
      }}
    >
      <AbilityLayout
        ability="STRENGHT"
        value={{ abilities: abilitys, text: "STR" }}
      >
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="strength"
          value={abilitys.strength}
        />
      </AbilityLayout>
      <AbilityLayout
        ability="DEXTERITY"
        value={{ abilities: abilitys, text: "DEX" }}
      >
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="dexterity"
          value={abilitys.dexterity}
        />
      </AbilityLayout>
      <AbilityLayout
        ability="CONSTITUTION"
        value={{ abilities: abilitys, text: "COS" }}
      >
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="constitution"
          value={abilitys.constitution}
        />
      </AbilityLayout>
      <AbilityLayout
        ability="INTELLIGENCE"
        value={{ abilities: abilitys, text: "INT" }}
      >
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="intelligence"
          value={abilitys.intelligence}
        />
      </AbilityLayout>
      <AbilityLayout
        ability="WISDOM"
        value={{ abilities: abilitys, text: "WIS" }}
      >
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="wisdom"
          value={abilitys.wisdom}
        />
      </AbilityLayout>
      <AbilityLayout
        ability="CHARISMA"
        value={{ abilities: abilitys, text: "CHA" }}
      >
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="charisma"
          value={abilitys.charisma}
        />
      </AbilityLayout>

      {/* </PageAndSummaryLayout> */}
    </PageLayout>
  );
}

export type AbilityLayoutProps = {
  ability?: string;
  children?: React.ReactNode;
  value?: { abilities: Abilitys; text: string };
};

export const AbilityLayout: React.FC<AbilityLayoutProps> = ({
  ability,
  children,
  value
}) => {
  return (
    <div className="rpgui-container-framed-golden">
      <div style={{ flex: 1 }}>
        <p>
          {ability}
          {":"}
        </p>
      </div>
      <div style={{ flex: 1 }}>{children}</div>
      <div style={{ flex: 1 }}>
        <p>
          {value && SignNumber(BonusAbilities(value?.abilities, value?.text))}
          {value && BonusAbilities(value?.abilities, value?.text)}
        </p>
      </div>
    </div>
  );
};
