import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Abilitys } from "../components/interfaces";
import { urlAb } from "../components/url";
import { abilitysEmpty } from "../components/variables";
import {
  BonusAbilities,
  SignNumber
} from "../components/functions";
import { CharSummary } from "../components/CharSummary";

export function Ability() {
  const { charId } = useParams();

  const [abilitys, setAbilitys] = useState<Abilitys>(abilitysEmpty);
  const [change, setChange] = useState<boolean>(false);

  const handleData = (e: any) => {
    if (e.target.value >= 0) {
      setAbilitys((newAbility) => ({
        ...newAbility,
        [e.target.name]: e.target.value
      }));
    }
  };

  useEffect(() => {}, [abilitys]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(urlAb + charId, abilitys).then((response) => {
      console.log(response);
    });
    setChange(true);
  };

  return (
    <>
      <div className="rpgui-container-framed flex-container">
        <p>
          STR:
          <input
            className="rpgui-content-input"
            style={{ float: "initial", width: "12%" }}
            type="number"
            onChange={handleData}
            name="streght"
            value={abilitys.streght}
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
            name="dextrity"
            value={abilitys.dextrity}
          />{" "}
          {SignNumber(BonusAbilities(abilitys, "DEX"))}
          {BonusAbilities(abilitys, "DEX")} dextrity
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
              set
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
    </>
  );
}
