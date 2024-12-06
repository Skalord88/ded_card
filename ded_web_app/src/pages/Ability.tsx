import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Abilitys } from "../components/Abilitys/Interface";
import {
  BonusAbilities,
  SignNumber
} from "../components/functions";
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
        className="rpgui-container-framed-golden flex-container"
        style={{ minWidth: "50%"}}
        >
        <p>ID: {charId}</p>
        <p>
          STR:
          <input
            className="rpgui-content-input"
            style={{
               float: "initial",
               width: "12%" }}
            type="number"
            onChange={handleData}
            name="strength"
            value={abilitys.strength}
          />{" "}
          {SignNumber(BonusAbilities(abilitys, "STR"))}
          {BonusAbilities(abilitys, "STR")} streght
        </p>
        <p>
          DEX:
          <input
            className="rpgui-content-input"
            style={{ float: "initial", width: "12%" }}
            type="number"
            onChange={handleData}
            name="dexterity"
            value={abilitys.dexterity}
          />{" "}
          {SignNumber(BonusAbilities(abilitys, "DEX"))}
          {BonusAbilities(abilitys, "DEX")} dexterity
        </p>
        <p>
          COS:
          <input
            className="rpgui-content-input"
            style={{ float: "initial", width: "12%" }}
            type="number"
            onChange={handleData}
            name="constitution"
            value={abilitys.constitution}
          />{" "}
          {SignNumber(BonusAbilities(abilitys, "COS"))}
          {BonusAbilities(abilitys, "COS")} constitution
        </p>
        <p>
          INT:
          <input
            className="rpgui-content-input"
            style={{ float: "initial", width: "12%" }}
            type="number"
            onChange={handleData}
            name="intelligence"
            value={abilitys.intelligence}
          />{" "}
          {SignNumber(BonusAbilities(abilitys, "INT"))}
          {BonusAbilities(abilitys, "INT")} intelligence
        </p>
        <p>
          WIS:
          <input
            className="rpgui-content-input"
            style={{ float: "initial", width: "12%" }}
            type="number"
            onChange={handleData}
            name="wisdom"
            value={abilitys.wisdom}
          />{" "}
          {SignNumber(BonusAbilities(abilitys, "WIS"))}
          {BonusAbilities(abilitys, "WIS")} wisdom
        </p>
        <p>
          CHA:
          <input
            className="rpgui-content-input"
            style={{ float: "initial", width: "12%" }}
            type="number"
            onChange={handleData}
            name="charisma"
            value={abilitys.charisma}
          />{" "}
          {SignNumber(BonusAbilities(abilitys, "CHA"))}
          {BonusAbilities(abilitys, "CHA")} charisma
        </p>
        <p>
          {change === false ? (
            <button className="rpgui-button" onClick={handleSubmit}>
              <p>set</p>
            </button>
          ) : (
            <>
              <button className="rpgui-button">
                {" "}
                <Link to={"/race/" + charId}>to race</Link>
              </button>
            </>
          )}
        </p>
      </div>
  );
}
