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
import { Abilitys } from "../../Abilitys/Interface";
import { ClassCharacter, ClassPc } from "../../ClassPc/Interface/ClassPcLevel";
import { FeatPc } from "../../Feats/Interface/FeatInterface";
import { Attacks, CharacterPc, Inventory } from "../../interfaces";
import { Archetype, SubRace } from "../../Race/Interfaces";
import { SkillCharacter } from "../../Skills/interface/SkillsInterface";
import { useSkills } from "../../Skills/Skills/SkillProvider";
import { urlChar } from "../../url";
import { modifiedCharacter } from "../functions/ModifiedCharacter";
import { ModifiedCharacter } from "../interface/ModifiedCharacter";

type CharacterContextValue = {
  character: CharacterPc | null;
  moddedCharacter: ModifiedCharacter | null;

  abilitys?: Abilitys;
  classes: ClassPc[];
  featsList?: FeatPc[],
  skills: SkillCharacter[];

  setAbilitys: Dispatch<SetStateAction<Abilitys | undefined>>;
  updateAbility: (
    ability: keyof Omit<Abilitys, "modifierBonus">,
    value: number
  ) => void;

  setClasses: (classes: ClassPc[]) => void;
  setFeatsList: (feats: FeatPc[]) => void;
  setSkills: (skills: SkillCharacter[]) => void;

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

  const [abilitys, setAbilitys] = useState<Abilitys | undefined>();
  const [race, setRace] = useState<SubRace | undefined>();
  const [archetypes, setArchetypes] = useState<Archetype[] | undefined>([]);
  const [featsList, setFeatsList] = useState<FeatPc[] | undefined>([]);
  const [classes, setClasses] = useState<ClassPc[]>([]);
  const [inventory, setInventory] = useState<Inventory | undefined>();
  const [attacks, setAttacks] = useState<Attacks | undefined>();
  const [skills, setSkills] = useState<SkillCharacter[]>([]);

  const { skillsFromDb, studiesFromDb, loadingSkills } = useSkills();

  const moddedCharacter = useMemo(() => {
  if (!character) return null;
  if (loadingSkills) return null;

  return modifiedCharacter(
    character,
    skillsFromDb,
    studiesFromDb,
    abilitys,
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
  loadingSkills,
  skillsFromDb,
  studiesFromDb,
  abilitys,
  race,
  archetypes,
  featsList,
  classes,
  inventory,
  attacks,
  skills,
]);

  const reloadCharacter = async () => {
  try {
    const response = await axios.get(urlChar(charId));
    const char: CharacterPc = response.data;

    setCharacter(char);

    setAbilitys(char.abilitys);
    setRace(char.race);
    setArchetypes(char.archetypes ?? []);
    setFeatsList(char.featsList ?? []);
    setClasses(char.classPcList ?? []);
    setInventory(char.inventory);
    setAttacks(char.attacks);
    setSkills(char.skillsCharacter ?? []);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("char caricato!");
  }
};

  useEffect(() => {
    reloadCharacter();
  }, [charId]);

  const updateAbility = (
    ability: keyof Omit<Abilitys, "modifierBonus">,
    value: number
  ) => {
    setAbilitys((prev) => {
      if (!prev) return prev;

      return {
        ...prev,
        [ability]: value
      };
    });
  };

  return (
    <CharacterContext.Provider
      value={{
        character,
        moddedCharacter,

        abilitys,
        classes,
        featsList,
        skills,
        setAbilitys,
        setClasses,
        setFeatsList,
        setSkills,

        updateAbility,

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
