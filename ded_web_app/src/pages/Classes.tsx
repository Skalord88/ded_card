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
import { PageLayout } from "./AppLayout";

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
        const classi: ClassPc[] = resChar.data.classPcList;
        if (classi && classi.length > 0) {
          setChange(true);
        }
        setCharClassPc(classi);

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

  return (
    <PageLayout
      title={"Classes"}
      buttons={{
        next: { text: "Feat", link: "/feat/" + charId, change: change },
        back: { text: "Ability", link: "/ability/" + charId }
      }}
      onAction={handleSubmit}
    >
      <div className="rpgui-container-framed-grey">
        <p>Base Classes: </p>
        <DropdownComponent options={baseClList} onAction={handleNewClass} />
        <p>Prestige Classes: </p>
        <DropdownComponent options={prestigeClList} onAction={handleNewClass} />
        {char?.abilitys && (
          <div style={{ display: "flex", flexDirection: "row", gap: 10}}>
            <AbilityLevelComponent
              value={char?.abilitys?.strength}
              name="STR"
            />
            <AbilityLevelComponent
              value={char?.abilitys?.dexterity}
              name="DEX"
            />
            <AbilityLevelComponent
              value={char?.abilitys?.constitution}
              name="CON"
            />
            <AbilityLevelComponent
              value={char?.abilitys?.intelligence}
              name="INT"
            />
            <AbilityLevelComponent value={char?.abilitys?.wisdom} name="WIS" />
            <AbilityLevelComponent
              value={char?.abilitys?.charisma}
              name="CHA"
            />
          </div>
        )}
        {charClassPc ? (
          charClassPc.map((cl, index) => (
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
      {/* {char ? <CharSummary character={char} classPcList={charClassPc} /> : null} */}
    </PageLayout>
  );
};

export type AbilityLevelComponentProps = {
  value: number;
  name: string;
};

const AbilityLevelComponent: React.FC<AbilityLevelComponentProps> = ({
  value,
  name
}) => {
  const [abValue, setAbValue] = useState<number>(value);
  return (
    <div>
      <p>
        <span
          onClick={() =>
            value <= abValue - 1 ? setAbValue(abValue - 1) : abValue
          }
        >
          {name}
        </span>
        <span>{":"}</span>
        <span onClick={() => setAbValue(abValue + 1)}>{abValue}</span>
      </p>
    </div>
  );
};
