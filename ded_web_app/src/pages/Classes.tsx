import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  urlChar,
  urlClassList,
  urlClassAdd,
  urlClassSell
} from "../components/url";
import { ClassPc, characterPc } from "../components/interfaces";

export function Classes() {
  const { charId } = useParams();

  const [char, setChar] = useState<characterPc>();
  const [classesList, setClassesList] = useState<ClassPc[]>([]);
  const [sign, setSign] = useState("");
  const [id, setId] = useState(-1);

  const [classPcName, setInputName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resClassList = await axios.get(urlClassList);
        setClassesList(resClassList.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [classesList]);

  const handleData = (e: any) => {
    setSign(e[0]);
    setId(e[1]);
    setInputName(e[2]);
  };

  const handleSign = (e: any) => {
    e.preventDefault();
    try {
      if (sign === "+") {
        axios.post(urlClassAdd + charId, { id: id });
      } else if (sign === "-") {
        axios.post(urlClassSell + charId, { id: id });
      }
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <>
      <div className="container">
        <div className="container-item">
          <div>
            {classPcName ? (
              <>
                choosen: {classPcName}{" "}
                <button onClick={handleSign}>proceed</button>
              </>
            ) : (
              <>choose one</>
            )}
          </div>

          <div>
            <div>efective level: {char?.effectiveCharacterLv}</div>
            {char?.classPcList ? (
              <>
                {char.classPcList.map((c: any, index: number) => {
                  return c.level === 0 ? (
                    <></>
                  ) : (
                    <div className="container-item" key={index}>
                      <button
                        onClick={() =>
                          handleData(["+", c.id, c.className, c.level])
                        }
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          handleData(["-", c.id, c.className, c.level])
                        }
                      >
                        -
                      </button>{" "}
                      {c.className} {c.level}
                    </div>
                  );
                })}
              </>
            ) : (
              <>no classes in character</>
            )}
          </div>
          <div className="container-item">
            {char?.classPcList ? (
              <button>
                <Link to={"/skill/" + charId}>to skills</Link>
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="container-item">
          {classesList.map((cl: any, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() =>
                    handleData(["+", cl.id, cl.className, cl.level])
                  }
                >
                  +
                </button>{" "}
                {cl.classType}, {cl.className}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
