import { CharacterPc } from "../../interfaces";
import { ClassPc } from "../Interface/ClassPcLevel";

export const getTotalClassLevel = (classes: ClassPc[]) => {
  return classes.reduce((total, cl) => total + cl.level, 0);
};