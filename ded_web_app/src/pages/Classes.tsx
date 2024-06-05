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
import { Dropdown } from "../components/Dropdown";
import { CharSummary } from "../components/CharSummary";
import { emptyClass } from "../components/variables";

export const Classes = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [classesList, setClassesList] = useState<ClassPc[]>([]);
  const [option, setOption] = useState<{ id: number; sign: string }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resClassList = await axios.get(urlClassList);
        setClassesList(resClassList.data);

        setOption({ id: -1, sign: "" });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let list: ClassPc[] = [];

    list = classesList.filter((classe) => option?.id !== classe.id);

    list = list.filter(
      (classe) =>
        !char?.classPcList.some((classInChar) => classInChar.id === classe.id)
    );

    char?.classPcList.forEach((classInList) =>
      list.filter((inList) => classInList.id !== inList.id)
    );
    setClassesList(list);
  }, [option]);

  const handleOption = (e: ClassPc) => {
    setOption((prevOption) => ({
      ...prevOption,
      id: e.id,
      sign: "+"
    }));
  };

  const handleData = (e: [string, ClassPc]) => {
    setOption({ id: e[1].id, sign: e[0] });
  };

  const handleSign = () => {
    if (option) {
      try {
        if (option.sign === "+") {
          axios.post(urlClassAdd + charId, { id: option.id });
        } else if (option.sign === "-") {
          axios.post(urlClassSell + charId, { id: option.id });
        }
      } catch (error) {
        console.log(error);
      }
    }
    window.location.reload();
  };

  return (
    <>
      <CharSummary character={char} />
      <div className="rpgui-container-framed-grey">
        <div>
          <div style={{ width: "50%" }}>
            <Dropdown options={classesList} onSelect={handleOption} />
          </div>
          <button className="rpgui-button" onClick={() => handleSign()}>
            <p>add class</p>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          {char?.classPcList ? (
            <>
              {char.classPcList.map((c: ClassPc, index: number) => {
                return c.level === 0 ? (
                  <div></div>
                ) : (
                  <div
                    key={index}
                    className="rpgui-container-framed-golden"
                    style={{ width: "50%" }}
                  >
                    <p>
                      <button
                        className="rpgui-button-golden-small"
                        onClick={() => handleData(["+", c])}
                      >
                        <p>+</p>
                      </button>
                      <button
                        className="rpgui-button-golden-small"
                        onClick={() => handleData(["-", c])}
                      >
                        <p>-</p>
                      </button>{" "}
                      {c.className}
                      {option?.id !== c.id ? (
                        <> {c.level} </>
                      ) : (
                        <>
                          {option.sign === "+" ? (
                            <>
                              {" ("}
                              {c.level}
                              {") "}
                              {c.level + 1}{" "}
                              <button
                                className="rpgui-button-golden-small"
                                onClick={() => handleSign()}
                              >
                                <p>change</p>
                              </button>
                            </>
                          ) : (
                            <>
                              {" ("}
                              {c.level}
                              {") "}
                              {c.level - 1}{" "}
                              <button
                                className="rpgui-button-golden-small"
                                onClick={() => handleSign()}
                              >
                                <p>change</p>
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </p>
                  </div>
                );
              })}
            </>
          ) : (
            <p>no classes in character</p>
          )}
        </div>
        {char?.classPcList ? (
          <div>
            <button className="rpgui-button">
              <Link to={"/skill/" + charId}>to skills</Link>
            </button>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
};
