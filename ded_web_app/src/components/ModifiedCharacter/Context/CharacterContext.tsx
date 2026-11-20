// CharacterContext.tsx
import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { Abilitys, LevelAbilitys } from "../../Abilitys/Interface";
import { ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { useData } from "../../Context/Context";
import { FeatPc } from "../../Feats/Interface/FeatInterface";
import { Attacks, CharacterPc, Inventory } from "../../interfaces";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { SkillCharacter } from "../../Skills/interface/SkillsInterface";
import { urlChar } from "../../url";
import { modifiedCharacter } from "../Const/ModifiedCharacter";
import { ModifiedCharacter } from "../interface/ModifiedCharacter";

type CharacterContextValue = {
  character: CharacterPc | null;
  moddedCharacter: ModifiedCharacter | null;

  abilitysBase?: Abilitys;
  abilitys?: Abilitys;
  abilitysLv: LevelAbilitys[];
  classes: ClassPc[];
  featsList?: FeatPc[];
  featsPg?: FeatPc[];
  skills: SkillCharacter[];
  attacks?: Attacks;

  setAbilitysBase: Dispatch<SetStateAction<Abilitys | undefined>>;
  // setAbilitys: Dispatch<SetStateAction<Abilitys | undefined>>;
  setAbilitysLv: Dispatch<SetStateAction<LevelAbilitys[] | undefined>>;
  updateAbilityBase: (
    ability: keyof Omit<Abilitys, "modifierType">,
    value: number
    // , abilitysLv?: LevelAbilitys[]
  ) => void;

  setClasses: (classes: ClassPc[]) => void;
  setFeatsList: (feats: FeatPc[]) => void;
  setSkills: (skills: SkillCharacter[]) => void;
  setAttacks: (attack: Attacks) => void;

  reloadCharacter: () => Promise<void>;
};

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterProvider({
  charId,
  children
}: {
  charId: string;
  children: ReactNode;
}) {
  const [character, setCharacter] = useState<CharacterPc | null>(null);
  // const [moddedCharacter, setModdedCharacter] =
  //   useState<ModifiedCharacter | null>(null);

  const [abilitysBase, setAbilitysBase] = useState<Abilitys | undefined>();
  const [abilitysLv, setAbilitysLv] = useState<LevelAbilitys[] | undefined>();
  const [abilitys, setAbilitys] = useState<Abilitys | undefined>();
  const [race, setRace] = useState<SubRace | undefined>();
  const [archetypes, setArchetypes] = useState<Archetype[] | undefined>([]);
  const [featsList, setFeatsList] = useState<FeatPc[] | undefined>([]);
  const [classes, setClasses] = useState<ClassPc[]>([]);
  const [inventory, setInventory] = useState<Inventory | undefined>();
  const [attacks, setAttacks] = useState<Attacks | undefined>();
  const [skills, setSkills] = useState<SkillCharacter[]>([]);

  // const { skillsFromDb, studiesFromDb, loadingSkills } = useSkills();

  const { getData, loading, reload } = useData();

  const dBskills = getData("skills");
  const dBstudies = getData("studies");
  // const items = getData("items");
  // const classes = getData("classes");

  useEffect(() => {
    reload("skills");
    reload("studies");
    // reload("items");
    // reload("classes");
  }, [reload]);

  const moddedCharacter = useMemo(() => {
    if (!character) return null;
    if (!loading) return null;

    return modifiedCharacter(
      character,
      character.playerName,
      dBskills,
      dBstudies,
      abilitys,
      abilitysLv,
      race,
      archetypes,
      featsList,
      classes,
      inventory,
      attacks,
      skills
    );
  }, [
    character,
    loading,
    dBskills,
    dBstudies,
    abilitys,
    abilitysLv,
    race,
    archetypes,
    featsList,
    classes,
    inventory,
    attacks,
    skills
  ]);

  const reloadCharacter = async () => {
    try {
      const response = await axios.get(urlChar(charId));
      const char: CharacterPc = response.data;

      setCharacter(char);
      // if(moddedCharacter){
      // setAbilitys(char.abilitys);
      setAbilitysBase(char.abilitys);
      // setAbilitys(moddedCharacter?.abilitys ?? char.abilitys);
      setAbilitysLv(char.characterLevelAbilitys ?? []);
      setRace(char.race);
      setArchetypes(char.archetypes ?? []);
      setFeatsList(char.featsList ?? []);
      setClasses(char.classPcList ?? []);
      setInventory(char.inventory);
      setAttacks(char.attacks);
      setSkills(char.skillsCharacter ?? []);
      // }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("char caricato!");
    }
  };

  useEffect(() => {
    reloadCharacter();
  }, [charId]);

  const updateAbilityBase = (
    ability: keyof Omit<Abilitys, "modifierType">,
    value: number
    // lvAbilitys?: LevelAbilitys[]
  ) => {
    setAbilitysBase((prev) => {
      if (!prev) return prev;

      // Copia i valori base
      const updated = {
        ...prev,
        [ability]: value
      };

      // Aggiunge i bonus dei livelli
      // lvAbilitys?.forEach((lv) => {
      //   abilityKeys.forEach((key) => {
      //     updated[key] += lv.abilitys[key] ?? 0;
      //   });
      // });

      return updated;
    });
  };

  return (
    <CharacterContext.Provider
      value={{
        character,
        moddedCharacter,

        abilitys,
        abilitysBase,
        abilitysLv: abilitysLv ?? [],
        classes,
        featsList,
        featsPg: moddedCharacter?.feats,
        skills,
        attacks,
        setAbilitysBase,
        // setAbilitys,
        setAbilitysLv,
        setClasses,
        setFeatsList,
        setSkills,
        setAttacks,

        updateAbilityBase,

        reloadCharacter
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error("useCharacter deve essere usato dentro CharacterProvider");
  }

  return context;
}
