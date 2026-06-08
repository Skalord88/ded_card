// SkillContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";
import axios from "axios";
import { urlSkillAll } from "../../url";
import { Skill } from "../interface/Skill";
import { Study } from "../interface/SkillsInterface";

interface SkillContextType {
  skillsFromDb: Skill[];
  studiesFromDb: Study[];
  loading: boolean;
}

const SkillContext = createContext<SkillContextType>({
  skillsFromDb: [],
  studiesFromDb: [],
  loading: true
});

export const SkillProvider = ({ children }: { children: ReactNode }) => {
  const [skillsFromDb, setSkillsFromDb] = useState<Skill[]>([]);
  const [studiesFromDb, setStudiesFromDb] = useState<Study[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(urlSkillAll);

        setSkillsFromDb(res.data);
        setStudiesFromDb(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <SkillContext.Provider
      value={{
        skillsFromDb,
        studiesFromDb,
        loading
      }}
    >
      {children}
    </SkillContext.Provider>
  );
};

export const useSkills = () => useContext(SkillContext);

// import { useEffect, useState } from "react";
// import { Skill } from "../interface/Skill";
// import axios from "axios";
// import { urlSkillAll } from "../../url";
// import { Study } from "../interface/SkillsInterface";

// export const AllSkillsAxios = () => {
//   const [skills, setSkills] = useState<Skill[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resURL = await axios.get(urlSkillAll);

//         setSkills(resURL.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
//   return skills
// };
// export const AllStudyAxios = () => {
//   const [skills, setSkills] = useState<Study[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const resURL = await axios.get(urlSkillAll);

//         setSkills(resURL.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchData();
//   }, []);
//   return skills
// };
