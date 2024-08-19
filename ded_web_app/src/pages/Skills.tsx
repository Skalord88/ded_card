import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { CharacterPc } from "../components/interfaces";

import { urlChar } from "../components/url";
import "../css/style.css";
import { CharSummary } from "../components/CharSummary";
import { SkillsTableComponent } from "../components/Skills/SkillsTableComponent";
import { SkillProps } from "../components/Skills/interface/SkillsInterface";

export function Skills() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  // const [maxSkillsPoints, setMaxSkillsPoints] = useState(0);
  // const [maxToSpentPoints, SetMaxToSpentPoints] = useState(0);
  const [skills, setSkills] = useState<SkillProps[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlChar + "/" + charId);

        setChar(resURL.data);
        setSkills(resURL.data.skillsList);
        // SetMaxToSpentPoints(resURL.data.effectiveCharacterLv + 3);
        // setMaxSkillsPoints(resURL.data.skillPoints);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CharSummary character={char} />

      {char ? (
        <p>
          <SkillsTableComponent
            key={"skillsTable"}
            char={char}
          />
        </p>
      ) : (
        <></>
      )}
    </>
  );
}
