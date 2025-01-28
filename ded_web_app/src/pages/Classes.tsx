import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ClassCharacter,
  ClassPc
} from "../components/ClassPc/Interface/ClassPcLevel";
import { CharSummary } from "../components/Summary/CharSummary";
import { CharacterPc } from "../components/interfaces";
import { urlChar, urlClassAdd, urlClassList } from "../components/url";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";

export const Classes = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [classesList, setClassesList] = useState<ClassCharacter[]>([]);
  const [baseClList, setBaseClList] = useState<itemInDrop[]>([]);
  const [prestigeClList, setPrestigeClList] = useState<itemInDrop[]>([]);
  const [charClassPc, setCharClassPc] = useState<ClassPc[]>([]);

  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);
        setCharClassPc(resChar.data.classPcList);

        const resClassList = await axios.get(urlClassList);
        setClassesList(resClassList.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (classesList) {
      const list = classesList.filter((cl) => cl.classType === "BASE_CLASS");
      setBaseClList(addToDrop(list, "class"));
      const listPrestige = classesList.filter(
        (cl) => cl.classType === "PRESTIGE_CLASS"
      );
      setPrestigeClList(addToDrop(listPrestige, "class"));
    }
  }, [classesList]);

  const handleNewClass = (option: ClassCharacter) => {
    if (char?.classPcList) {
      const newClassList = [...charClassPc]; // Crea una nuova copia di charClassPc
      const indexInClassList = newClassList.findIndex(
        (cl: ClassPc) => cl.classCharacter.id === option.id
      );
      if (indexInClassList !== -1) {
        newClassList[indexInClassList] = {
          ...newClassList[indexInClassList],
          level: newClassList[indexInClassList].level + 1
        };
      } else {
        newClassList.push({
          level: 1,
          firstClass: newClassList.length === 0,
          classCharacter: option
        });
      }
      if (
        newClassList.length === 1 ||
        newClassList.find((cl) => !cl.firstClass)
      ) {
        newClassList[0] = {
          ...newClassList[0],
          firstClass: true
        };
      }
      setChange(true);
      setCharClassPc(newClassList);
    }
  };
  const handleDelClass = (option: ClassCharacter) => {
    if (charClassPc) {
      const newClassList = [...charClassPc]; // Crea una nuova copia di charClassPc
      const indexInClassList = newClassList.findIndex(
        (cl: ClassPc) => cl.classCharacter.id === option.id
      );
      if (indexInClassList !== -1) {
        if (newClassList[indexInClassList].level > 1) {
          newClassList[indexInClassList] = {
            ...newClassList[indexInClassList],
            level: newClassList[indexInClassList].level - 1
          };
        } else {
          newClassList.splice(indexInClassList, 1); // Rimuove l'elemento dall'array
        }
      }
      if (
        newClassList.length === 1 ||
        newClassList.find((cl) => !cl.firstClass)
      ) {
        newClassList[0] = {
          ...newClassList[0],
          firstClass: true
        };
      }
      setChange(true);
      setCharClassPc(newClassList);
    }
  };

  const handleSubmit = () => {
    if (charClassPc) {
      const classToAdd: {
        id: number;
        level: number;
        firstClass: boolean;
      }[] = charClassPc.flatMap((cl) => {
        return {
          id: cl.classCharacter.id,
          level: cl.level,
          firstClass: cl.firstClass
        };
      });

      console.log(classToAdd);

      axios.post(urlClassAdd + charId, classToAdd);
    }
    window.location.reload();
  };

  return (
    <>
      {char ? <CharSummary character={char} classPcList={charClassPc} /> : null}

      <div className="rpgui-container-framed-grey">
        <p>Base Classes: </p>
        <DropdownComponent options={baseClList} onAction={handleNewClass} />
        <p>Prestige Classes: </p>
        <DropdownComponent options={prestigeClList} onAction={handleNewClass} />
        {charClassPc ? (
          charClassPc.map((cl, index) => (
            <>
              <div key={index}>
                <p>
                  <span>
                    lv{cl.level}: {cl.classCharacter.className}{" "}
                    {cl.firstClass ? "-first class- " : null}
                  </span>
                  <span>
                    <button
                      onClick={() => handleNewClass(cl.classCharacter)}
                      className="rpgui-button-golden-small"
                    >
                      <p>+</p>
                    </button>
                  </span>
                  <span>
                    <button
                      onClick={() => handleDelClass(cl.classCharacter)}
                      className="rpgui-button-golden-small"
                    >
                      <p>-</p>
                    </button>
                  </span>
                </p>
              </div>
            </>
          ))
        ) : (
          <p>add a class</p>
        )}
      </div>
      <div>
        {change ? (
          <button className="rpgui-button" onClick={handleSubmit}>
            <p>confirm</p>
          </button>
        ) : null}
        <button className="rpgui-button">
          <Link to={"/skill/" + charId}>
            <p>to skills</p>
          </Link>
        </button>
      </div>
    </>
  );
};
