import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { abilitys } from "../components/interfaces";
import { urlAb } from "../components/url";
import { abilitysEmpty } from "../components/variables";

export function Abilitys() {
  const { charId } = useParams();

  const [abilitys, setAbilitys] = useState<abilitys>(abilitysEmpty);
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
      <div className="container">
        <div className="container-item">
          <div className="container-item">
            <input
              type="number"
              onChange={handleData}
              name="streght"
              value={abilitys.streght}
            />
            streght
          </div>
          <div className="container-item">
            <input
              type="number"
              onChange={handleData}
              name="dextrity"
              value={abilitys.dextrity}
            ></input>
            dextrity
          </div>
          <div className="container-item">
            <input
              type="number"
              onChange={handleData}
              name="constitution"
              value={abilitys.constitution}
            ></input>
            constitution
          </div>
          <div className="container-item">
            <input
              type="number"
              onChange={handleData}
              name="intelligence"
              value={abilitys.intelligence}
            ></input>
            intelligence
          </div>
          <div className="container-item">
            <input
              type="number"
              onChange={handleData}
              name="wisdom"
              value={abilitys.wisdom}
            ></input>
            wisdom
          </div>
          <div className="container-item">
            <input
              type="number"
              onChange={handleData}
              name="charisma"
              value={abilitys.charisma}
            ></input>
            charisma
          </div>
          <p>
          {change === false ? (
            <button onClick={handleSubmit}>set</button>
          ) : (
            <>
              <button>
                {" "}
                <Link to={"/race/" + charId}>to race</Link>
              </button>
            </>
          )}
          </p>
        </div>
      </div>
    </>
  );
}
