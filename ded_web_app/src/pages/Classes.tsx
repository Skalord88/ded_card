import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { CharacterPc, ClassPc } from "../components/interfaces";
import {
  urlChar,
  urlClassAdd,
  urlClassList,
  urlClassSell
} from "../components/url";

export const Classes = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
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
      <div className="rpgui-container-framed-grey">
        {classPcName ? (
          <p>
            choosen: {classPcName}{" "}
            <button className="rpgui-button" onClick={handleSign}>
              proceed
            </button>
          </p>
        ) : (
          <p>...choose one</p>
        )}

        <p>effective level: {char?.effectiveCharacterLv}</p>
        {char?.classPcList ? (
          <>
            {char.classPcList.map((c: any, index: number) => {
              return c.level === 0 ? (
                <></>
              ) : (
                <div key={index}>
                  <p>
                    <button
                      className="rpgui-button"
                      onClick={() =>
                        handleData(["+", c.id, c.className, c.level])
                      }
                    >
                      +
                    </button>
                    <button
                      className="rpgui-button"
                      onClick={() =>
                        handleData(["-", c.id, c.className, c.level])
                      }
                    >
                      -
                    </button>{" "}
                    {c.className} {c.level}{" "}
                  </p>
                </div>
              );
            })}
          </>
        ) : (
          <p>no classes in character</p>
        )}
        {char?.classPcList ? (
          <button className="rpgui-button">
            <Link to={"/skill/" + charId}>to skills</Link>
          </button>
        ) : (
          <p></p>
        )}
      </div>
      <ul className="rpgui-list-imp" style={{ height: 200 }}>
        {classesList.map((cl: any, index) => {
          return (
            <li
              key={index}
              className="data-rpguivalue"
              onClick={() => handleData(["+", cl.id, cl.className, cl.level])}
            >
              {cl.classType}, {cl.className}
            </li>
          );
        })}
      </ul>
    </>
  );
};
