import { useEffect, useState } from "react";
import { useData } from "../components/Context/Context";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { ActionMenu } from "../components/Fight/component/ActionMenu";
import { FightsMenu } from "../components/Fight/component/FightsMenu";
import { addToDrop } from "../components/functions";
import { CharacterPc } from "../components/interfaces";
import { modifiedCharacter } from "../components/ModifiedCharacter/functions/ModifiedCharacter";
import {
  ModifiedCharacter
} from "../components/ModifiedCharacter/interface/ModifiedCharacter";
import { PageLayoutBody } from "./AppLayout";
import { createBorder } from "../components/Fight/function/createBorder";



export function Fight() {
  const { getData, loading, reload } = useData();

  useEffect(() => {
    reload("charList");
  }, [reload]);

  const charList = addToDrop(getData("charList"), (c) => c.characterName);

  const [sideA, setSideA] = useState<ModifiedCharacter[]>([]);
  const [sideB, setSideB] = useState<ModifiedCharacter[]>([]);
  const [clickMenu, setClickMenu] = useState<[number, number]>([0, 0]);

  const [optionActionMenu, setActionOption] = useState<string>();

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
            <div>
              <h3>side A</h3>
            </div>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, true)}
            />
            <div></div>
            {sideA.map((a, indexA) => {
              const border: string = createBorder(clickMenu[0] === indexA);
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
                  {clickMenu[0] === indexA && (
                    <FightsMenu selectOption={(opt) => setActionOption(opt)} />
                  )}
                </div>
              );
            })}
          </div>

          {optionActionMenu && (
            <ActionMenu
              charAB={[sideA[clickMenu[0]], sideB[clickMenu[1]]]}
              optionAction={optionActionMenu}
            />
          )}

          <div style={{ flex: 1 }}>
            <div>
              <h3>side B</h3>
              {/* {optionActionMenu && (<p>{optionActionMenu}</p>)} */}
            </div>
            <DropdownComponent
              options={charList}
              onAction={(character) => addToSide(character, false)}
            />
            {sideB.map((b, indexB) => {
              const border: string = createBorder(clickMenu[1] === indexB);
              return (
                <div key={indexB}>
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
