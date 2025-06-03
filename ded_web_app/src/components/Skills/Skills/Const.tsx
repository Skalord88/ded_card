import { useEffect, useState } from "react";
import { Skill } from "../interface/Skill";
import axios from "axios";
import { urlSkillAll } from "../../url";
import { Study } from "../interface/SkillsInterface";

export const AllSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlSkillAll);

        setSkills(resURL.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return skills
};
export const AllStudy = () => {
  const [skills, setSkills] = useState<Study[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resURL = await axios.get(urlSkillAll);

        setSkills(resURL.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return skills
};
