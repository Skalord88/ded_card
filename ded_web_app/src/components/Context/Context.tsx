import axios from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import {
  urlClassList,
  urlFeats,
  urlItems,
  urlSkillAll,
  urlStudyAll,
} from "../url";

import { Skill } from "../Skills/interface/Skill";
import { Study } from "../Skills/interface/SkillsInterface";
import { Feat } from "../Feats/Interface/FeatInterface";
import { Item, ItemsList } from "../interfaces";
import { ClassCharacter } from "../ClassPc/Interface/ClassPcLevel";

type DbType = "skills" | "studies" | "feats" | "items" | "classes";

type DataMap = {
  skills: Skill;
  studies: Study;
  feats: Feat;
  items: Item;
  // items: ItemsList;
  classes: ClassCharacter;
};

const urls: Record<DbType, string> = {
  skills: urlSkillAll,
  studies: urlStudyAll,
  feats: urlFeats,
  items: urlItems,
  classes: urlClassList,
};

type DataContextType = {
  getData: <T extends DbType>(type: T) => DataMap[T][];
  loading: Partial<Record<DbType, boolean>>;
  reload: <T extends DbType>(type: T) => Promise<void>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Partial<{ [K in DbType]: DataMap[K][] }>>({});
  const [loading, setLoading] = useState<Partial<Record<DbType, boolean>>>({});

  const reload = useCallback(async <T extends DbType>(type: T) => {
    try {
      setLoading((prev) => ({ ...prev, [type]: true }));

      const res = await axios.get<DataMap[T][]>(urls[type]);

      setData((prev) => ({
        ...prev,
        [type]: res.data,
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  }, []);

  const getData = <T extends DbType>(type: T): DataMap[T][] => {
    return (data[type] ?? []) as DataMap[T][];
  };

  return (
    <DataContext.Provider value={{ getData, loading, reload }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData deve essere usato dentro DataProvider");
  }

  return context;
};