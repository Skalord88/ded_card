import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  ClassCharacter,
  ClassPc
} from "../components/ClassPc/Interface/ClassPcLevel";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, ItemInDrop } from "../components/functions";
import { useCharacter } from "../components/ModifiedCharacter/Context/CharacterContext";
import { SummaryChar } from "../components/SummaryChar/SummaryChar";
import { urlClassAdd, urlClassList } from "../components/url";
import { PageLayout } from "./AppLayout";

export const Classes = () => {
  const { charId } = useParams();

  const { moddedCharacter, classes, setClasses } = useCharacter();

  // const [char, setChar] = useState<CharacterPc>();
  // const [modCharacter, setModCharacter] = useState<ModifiedCharacter>();
  const [classesList, setClassesList] = useState<ClassCharacter[]>([]);
  const [baseClList, setBaseClList] = useState<ItemInDrop<ClassCharacter>[]>(
    []
  );
  const [prestigeClList, setPrestigeClList] = useState<
    ItemInDrop<ClassCharacter>[]
  >([]);
  const [charClassPc, setCharClassPc] = useState<ClassPc[]>();

  const [change, setChange] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const resClassList = await axios.get(urlClassList);
      setClassesList(resClassList.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(
      (classes && classes.length > 0) ||
      (charClassPc && charClassPc.length > 0)) setChange(true)
  },[charClassPc, classes])

  useEffect(() => {
    if (classesList) {
      const list: ClassCharacter[] = classesList.filter(
        (cl) => cl.classType === "BASE_CLASS"
      );
      setBaseClList(addToDrop(list, (c) => c.className));
      const listPrestige = classesList.filter(
        (cl) => cl.classType === "PRESTIGE_CLASS"
      );
      setPrestigeClList(addToDrop(listPrestige, (c) => c.className));
    }
  }, [classesList]);

  const handleNewClass = (option: ClassCharacter) => {
    if (classes) {
      const newClassList = [...classes]; // Crea una nuova copia di charClassPc
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

      axios.post(urlClassAdd + charId, classToAdd);
    }
    setChange(true);
    window.location.reload();
  };

  // newClassList
  useEffect(() => {
    if (
      charClassPc
      //  && char
    ) {
      setClasses(charClassPc);
      // const modChar = modifiedCharacter({ ...char, classPcList: charClassPc });
      // setModCharacter(modChar);
    }
  }, [charClassPc, setClasses]);

  return (
    <PageLayout
      title={"Classes"}
      buttons={{
        next: { text: "Feat", link: `/${charId}/feat`, change: change },
        back: { text: "Ability", link: `/${charId}/ability` }
      }}
      onAction={handleSubmit}
    >
      <div className="rpgui-container-framed-grey">
        <p>Base Classes: </p>
        <DropdownComponent
          options={baseClList}
          onAction={
            // () => void
            handleNewClass
          }
        />
        <p>Prestige Classes: </p>
        <DropdownComponent options={prestigeClList} onAction={handleNewClass} />
        <div>
          <p>
            <span>
              Total Level:{" "}
              {/* {(charMod?.totLevel || 0) + (charMod?.adjLevel || 0)} */}
            </span>
            {moddedCharacter && (
              <span> Classe:
                {moddedCharacter?.classPcList?.reduce(
                  (tot, c) => tot + c.level,
                  0
                )}
              </span>
            )}
            {/* {charMod?.adjLevel !== 0 && (
              <span> Racial: {charMod?.adjLevel}</span>
            )} */}
          </p>
        </div>
        {moddedCharacter?.classPcList ? (
          moddedCharacter?.classPcList?.map((cl, index) => (
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
          ))
        ) : (
          <p>add a class</p>
        )}
      </div>
      {moddedCharacter && <SummaryChar modCharacter={moddedCharacter} />}
    </PageLayout>
  );
};

// export type AbilityLevelComponentProps = {
//   value: number;
//   name: string;
// };

// const AbilityLevelComponent: React.FC<AbilityLevelComponentProps> = ({
//   value,
//   name
// }) => {
//   const [abValue, setAbValue] = useState<number>(value);
//   return (
//     <div style={{ position: "relative", display: "inline-block" }}>
//       <div style={{ margin: 0 }}>
//         <p>
//           {name}:{abValue}
//         </p>
//       </div>

//       {/* SINISTRA (+) */}
//       <div
//         // onClick={() => console.log("plus")}
//         onClick={() => setAbValue(abValue + 1)}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "50%",
//           height: "100%",
//           // background: "rgba(0,255,0,0.3)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center"
//           // cursor: "pointer"
//         }}
//       ></div>

//       {/* DESTRA (-) */}
//       <div
//         onClick={() => setAbValue(abValue - 1)}
//         style={{
//           position: "absolute",
//           top: 0,
//           right: 0,
//           width: "50%",
//           height: "100%",
//           // background: "rgba(255,0,0,0.3)",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center"
//           // cursor: "pointer"
//         }}
//       ></div>
//     </div>
//   );
// };
