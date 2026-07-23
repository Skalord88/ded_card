import { useEffect, useState } from "react";
import { FightAttack } from "../components/Attack";
import { PageLayoutBody } from "./AppLayout";
import { CharacterPc } from "../components/interfaces";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { useData } from "../components/Context/Context";
import { addToDrop } from "../components/functions";
import { modifiedCharacter } from "../components/ModifiedCharacter/functions/ModifiedCharacter";
import { ModifiedCharacter } from "../components/ModifiedCharacter/interface/ModifiedCharacter";

export function Fight() {
  const { getData, loading, reload } = useData();

  useEffect(() => {
    reload("charList");
  }, [reload]);

  const charList = addToDrop(getData("charList"), (c) => c.characterName);

  const [sideA, setSideA] = useState<ModifiedCharacter[]>([]);
  const [sideB, setSideB] = useState<ModifiedCharacter[]>([]);
  const [clickMenu, setClickMenu] = useState<[number, number]>([0, 0]);

  const addToSide = (char: CharacterPc, side: boolean) => {
    side
      ? setSideA(sideA.concat([modifiedCharacter(char)]))
      : setSideB(sideB.concat([modifiedCharacter(char)]));
  };
  const delToSide = (index: number, side: boolean) => {
    if (side) {
      setSideA((prev) => prev.filter((_, i) => i !== index));
    } else {
      setSideB((prev) => prev.filter((_, i) => i !== index));
    }
  };

  if (loading.charList) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayoutBody>
      {charList && (
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, true)}
            />
            {sideA.map((a, indexA) => {
              const border: string =
                clickMenu[0] === indexA
                  ? "rpgui-container-framed golden"
                  : "rpgui-container-framed grey";
              // console.log(clickMenu)
              return (
                <div key={indexA}>
                  <div>
                    <p className={border}>
                      <span
                        style={{ color: "orange" }}
                        onClick={() => delToSide(indexA, true)}
                      >
                        X
                      </span>
                      <span
                        onClick={() => setClickMenu([indexA, clickMenu[1]])}
                      >
                        {a.name + ", " + a.title}
                      </span>
                    </p>
                  </div>
                  {clickMenu[0] === indexA && <FightsMenu />}
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1 }}>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, false)}
            />
            {sideB.map((b, indexB) => {
              const border: string =
                clickMenu[1] === indexB
                  ? "rpgui-container-framed golden"
                  : "rpgui-container-framed grey";
              return (
                <div>
                  <p className={border}>
                    <span
                      style={{ color: "orange" }}
                      onClick={() => delToSide(indexB, false)}
                    >
                      X
                    </span>
                    <span onClick={() => setClickMenu([clickMenu[0], indexB])}>
                      {b.name + ", " + b.title}
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PageLayoutBody>
  );
}

export type FightsProps = {
  // listAB?: ModifiedCharacter[];
  selectOption?: (option: string) => string;
};

const FightsMenu: React.FC<FightsProps> = ({ selectOption }) => {
  const [option, setOption] = useState<string>("");
  // const setMenuOption = (option: string) => {
  //   selectOption(option)
  // }
  return (
    <div className="rpgui-container-framed golden">
      <div>
        <p onClick={() => setOption("Attack")}>Attack</p>
      </div>
      <div>
        <p>Magic</p>
      </div>
      <div>
        <p>Action</p>
      </div>
      <div>
        <p>Skills</p>
      </div>
      {/* <div style={{ flex: 3 }}>{option === "Attack" && <FightAttack />}</div> */}
    </div>
  );
};
