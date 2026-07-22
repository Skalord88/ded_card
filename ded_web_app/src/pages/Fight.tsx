import { useEffect, useState } from "react";
import { FightAttack } from "../components/Attack";
import { PageLayoutBody } from "./AppLayout";
import { CharacterPc, CreateCharacter } from "../components/interfaces";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { useData } from "../components/Context/Context";
import { addToDrop } from "../components/functions";

export function Fight() {
  const { getData, loading, reload } = useData();

  useEffect(() => {
    reload("charList");
  }, [reload]);

  const charList = addToDrop(getData("charList"), (c) => c.characterName);

  const [option, setOption] = useState<string>("");
  const [sideA, setSideA] = useState<CharacterPc[]>([]);
  const [sideB, setSideB] = useState<CharacterPc[]>([]);

  const addToSide = (char: CharacterPc, side: boolean) => {
    side ? setSideA(sideA.concat([char])) : setSideB(sideB.concat([char]));
  };

  if (loading.charList) {
    return <div>Loading...</div>;
  }

  return (
    <PageLayoutBody>
      {charList && (
        <div style={{display:"flex"}}>
          <div>
          <DropdownComponent
            options={charList}
            onAction={(character) => addToSide(character, true)}
          />
  {sideA.map((a, indexA)=> (
    <p key={indexA}>{a.characterName}</p>
  ))}
          </div>

          <DropdownComponent
            options={charList}
            onAction={(character) => addToSide(character, false)}
          />
        </div>
      )}

      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
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
          </div>
        </div>
        <div style={{ flex: 3 }}>{option === "Attack" && <FightAttack />}</div>
      </div>
    </PageLayoutBody>
  );
}
