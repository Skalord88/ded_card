// SkillContext.tsx
import axios from "axios";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { urlSkillAll, urlStudyAll } from "../../url";
import { Skill } from "../interface/Skill";
import { Study } from "../interface/SkillsInterface";

interface SkillContextType {
  skillsFromDb: Skill[];
  studiesFromDb: Study[];
  loadingSkills: boolean;
  reloadSkills: () => Promise<void>;
}

const SkillContext = createContext<SkillContextType>({
  skillsFromDb: [],
  studiesFromDb: [],
  loadingSkills: true,
  reloadSkills: async () => {},
});

export const SkillProvider = ({ children }: { children: ReactNode }) => {
  const [skillsFromDb, setSkillsFromDb] = useState<Skill[]>([]);
  const [studiesFromDb, setStudiesFromDb] = useState<Study[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);

  const reloadSkills = async () => {
    try {
      setLoadingSkills(true);

      const [res, resStudy] = await Promise.all([
        axios.get(urlSkillAll),
        axios.get(urlStudyAll),
      ]);

      setSkillsFromDb(res.data);
      setStudiesFromDb(resStudy.data);
    } catch (error) {
      console.error(error);
    } finally {
      console.log("skills caricate!");
      setLoadingSkills(false);
    }
  };

  useEffect(() => {
    reloadSkills();
  }, []);

  return (
    <SkillContext.Provider
      value={{
        skillsFromDb,
        studiesFromDb,
        loadingSkills,
        reloadSkills,
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
