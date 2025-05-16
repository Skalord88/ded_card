import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Abilitys } from "../components/Abilitys/Interface";
import { BonusAbilities, SignNumber } from "../components/functions";
import { urlAb } from "../components/url";
import { abilitysEmpty } from "../components/variables";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <h1>Abilities</h1>
      <div
        className="rpgui-container-framed-golden"
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "baseline"
        }}
      >
        <p>{"STR:"}</p>
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="strength"
          value={abilitys.strength}
        />
        <p>
          {SignNumber(BonusAbilities(abilitys, "STR"))}
          {BonusAbilities(abilitys, "STR")}
        </p>
      </div>
      <div
        className="rpgui-container-framed-golden"
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "baseline"
        }}
      >
        <p>{"DEX:"}</p>
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="dexterity"
          value={abilitys.dexterity}
        />{" "}
        <p>
          {SignNumber(BonusAbilities(abilitys, "DEX"))}
          {BonusAbilities(abilitys, "DEX")}
        </p>
      </div>
      <div
        className="rpgui-container-framed-golden"
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "baseline"
        }}
      >
        <p>{"COS:"}</p>
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="constitution"
          value={abilitys.constitution}
        />
        <p>{SignNumber(BonusAbilities(abilitys, "COS"))}
        {BonusAbilities(abilitys, "COS")}
      </p></div>
      <div
        className="rpgui-container-framed-golden"
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "baseline"
        }}
      >
        <p>{"INT:"}</p>
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="intelligence"
          value={abilitys.intelligence}
        />
        <p>{SignNumber(BonusAbilities(abilitys, "INT"))}
        {BonusAbilities(abilitys, "INT")}
      </p></div>
      <div
        className="rpgui-container-framed-golden"
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "baseline"
        }}
      >
        <p>WIS:</p>
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="wisdom"
          value={abilitys.wisdom}
        />{" "}
        <p>{SignNumber(BonusAbilities(abilitys, "WIS"))}
        {BonusAbilities(abilitys, "WIS")}</p>
      </div>
      <div
        className="rpgui-container-framed-golden"
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "baseline"
        }}
      >
        <p>CHA:</p>
        <input
          className="rpgui-content-input"
          type="number"
          onChange={handleData}
          name="charisma"
          value={abilitys.charisma}
        />{" "}
        <p>{SignNumber(BonusAbilities(abilitys, "CHA"))}
        {BonusAbilities(abilitys, "CHA")}</p>
      </div>
      <div>
        <p>
          {change === false ? (
            <button className="rpgui-button" onClick={handleSubmit}>
              <p>set</p>
            </button>
          ) : (
            <button className="rpgui-button">
              {" "}
              <Link to={"/race/" + charId}>to race</Link>
            </button>
          )}
        </p>
      </div>
    </div>
  );
}
