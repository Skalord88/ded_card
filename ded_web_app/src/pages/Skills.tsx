import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { CharacterPc } from "../components/interfaces";

import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { SkillsTableComponent } from "../components/Skills/SkillsTableComponent";
import { CharSummary } from "../components/Summary/CharSummary";
import { urlChar } from "../components/url";
import "../css/style.css";

export function Skills() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [modChar, setModChar] = useState<CharToModify>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);

        setChar(resURL.data)
        setModChar(createModChar(resURL.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      
      {char && modChar ? (
        <>
        <CharSummary character={char} />
        <div>
          <SkillsTableComponent
            key={"skillsTable"}
            char={modChar}
          />
        </div>
        </>
      ) : null}
    </>
  );
}
