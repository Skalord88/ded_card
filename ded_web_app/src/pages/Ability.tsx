import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { Abilitys } from "../components/interfaces";
import { urlAb } from "../components/url";
import { abilitysEmpty } from "../components/variables";

export function Ability() {
  const { charId } = useParams();

  const [abilitys, setAbilitys] = useState<Abilitys>(abilitysEmpty);
  const [change, setChange] = useState<boolean>(false);

  const handleData = (e: any) => {
    setAbilitys({ ...abilitys, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios.post(urlAb + charId, abilitys).then((response) => {
      console.log(response);
    });
    setChange(true);
  };

  return (
    <>
      <div className="rpgui-container-framed">
        <div className="rpgui-container-framed-golden">
          <input
            type="number"
            onChange={handleData}
            name="streght"
            value={abilitys.streght}
          />{" "}
          streght
        </div>
        <div className="rpgui-container-framed-golden">
          <input
            type="number"
            onChange={handleData}
            name="dextrity"
            value={abilitys.dextrity}
          />{" "}
          dextrity
        </div>
        <div className="rpgui-container-framed-golden">
          <input
            type="number"
            onChange={handleData}
            name="constitution"
            value={abilitys.constitution}
          />{" "}
          constitution
        </div>
        <div className="rpgui-container-framed-golden">
          <input
            type="number"
            onChange={handleData}
            name="intelligence"
            value={abilitys.intelligence}
          />{" "}
          intelligence
        </div>
        <div className="rpgui-container-framed-golden">
          <input
            type="number"
            onChange={handleData}
            name="wisdom"
            value={abilitys.wisdom}
          />{" "}
          wisdom
        </div>
        <div className="rpgui-container-framed-golden">
          <input
            type="number"
            onChange={handleData}
            name="charisma"
            value={abilitys.charisma}
          />{" "}
          charisma
        </div>
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
