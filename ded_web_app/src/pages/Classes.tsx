import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ClassCharacter,
  ClassPc
} from "../components/ClassPc/Interface/ClassPcLevel";
import { CharSummary } from "../components/Summary/CharSummary";
import { CharacterPc } from "../components/interfaces";
import { urlChar, urlClassList } from "../components/url";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";

export const Classes = () => {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [classesList, setClassesList] = useState<ClassCharacter[]>([]);
  const [baseClList, setBaseClList] = useState<itemInDrop[]>([]);
  const [prestigeClList, setPrestigeClList] = useState<itemInDrop[]>([]);
  const [charClassPc, setCharClassPc] = useState<ClassPc[]>([]);

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
  }, []);

  useEffect(() => {
    const list = classesList.filter((cl) => cl.classType === "base class");
    setBaseClList(addToDrop(list, "class"));
    const listPrestige = classesList.filter(
      (cl) => cl.classType === "prestige class"
    );
    setPrestigeClList(addToDrop(listPrestige, "class"));
  }, [classesList]);

  const handleNewClass = (option: ClassCharacter) => {
    if (char?.classPcList) {
      let newClassList: ClassPc[] = char.classPcList;

      const indexInClassList: number = newClassList.findIndex(
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

      console.log(newClassList)

      setCharClassPc(newClassList);
    }
  };

  useEffect(() => {
    setCharClassPc(charClassPc)
  },[charClassPc])

  // const handleData = (e: [string, ClassPc]) => {
  //   setOption({ id: e[1].id, sign: e[0] });
  // };

  // const handleSign = () => {
  //   if (option) {
  //     try {
  //       if (option.sign === "+") {
  //         axios.post(urlClassAdd + charId, { id: option.id });
  //       } else if (option.sign === "-") {
  //         axios.post(urlClassSell + charId, { id: option.id });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   window.location.reload();
  // };

  return (
    <>
      {char ? <CharSummary character={char} classPcList={charClassPc}/> : null}

      <div className="rpgui-container-framed-grey">
        <DropdownComponent options={baseClList} onAction={handleNewClass} />
        <DropdownComponent options={prestigeClList} onAction={handleNewClass} />
        {charClassPc ? (
          charClassPc.map((cl) => (
            <div>
              <span>
                lv{cl.level}: {cl.classCharacter.className}
              </span>
              <span><button onClick={()=>handleNewClass(cl.classCharacter)}>+</button></span>
              <span><button>-</button></span>
            </div>
          ))
        ) : (
          <p>add a class</p>
        )}
      </div>
      {char?.classPcList ? (
        <div>
          <button className="rpgui-button">
            <Link to={"/skill/" + charId}>to skills</Link>
          </button>
        </div>
      ) : null}
    </>
  );
};
