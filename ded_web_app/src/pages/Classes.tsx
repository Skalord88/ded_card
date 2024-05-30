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

export const Classes = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [classesList, setClassesList] = useState<ClassPc[]>([]);
  const [sign, setSign] = useState<string>("");
  const [id, setId] = useState<number>(-1);
  const [option, setOption] = useState({
    id: -1,
    sign: ""
  })

  const [classPcName, setInputName] = useState<string>("");

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

  useEffect(() => {
    const list: ClassPc[] = classesList.filter(
      (classe) =>
        option.id !== classe.id
    )
    setClassesList(list)
  }, [option]);

  const handleOption = (e: ClassPc) => {
    setOption(prevOption => ({
      ...prevOption,
      id: e.id,
      sign: "+"
    }))
  }

  const handleData = (e: any) => {
    setSign(e[0]);
    setId(e[1]);
    setInputName(e[2]);
  };

  const handleSign = () => {
    
    if (option.id !== -1 && option.sign !== ""){
    try {
      if (option.sign === "+") {
        axios.post(urlClassAdd + charId, { id: option.id });
      } else if (option.sign === "-") {
        axios.post(urlClassSell + charId, { id: option.id });
      }
    } catch (error) {
      console.log(error);
    }}
    window.location.reload();
  };

  return (
    <>
    <p>D{char?.vitality.hitDices.key} {char?.vitality.hitDices.value}</p>
    <p>{char?.bab}</p>
    <div><p>{char?.savingThrows.fortitude} / {char?.savingThrows.reflex} / {char?.savingThrows.will}</p></div>
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
        <div>
        <div style={{float:'left', width: '15%'}}>
        <Dropdown
         options={classesList}
         onSelect={handleOption}
        />
      </div>
      <button
       className="rpgui-button"
       onClick={() => handleSign} 
      >+</button>
      </div>
        {char?.classPcList ? (
          <>
            {char.classPcList.map((c: any, index: number) => {
              return c.level === 0 ? (
                <></>
              ) : (
                <>
                  <div
                    className="flex-container rpgui-container-framed"
                    key={index}
                  >
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
                </>
              );
            })}
          </>
        ) : (
          <p>no classes in character</p>
        )}
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
