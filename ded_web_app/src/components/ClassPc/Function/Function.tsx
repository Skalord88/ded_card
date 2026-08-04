import { CharacterPc } from "../../interfaces";
import { ClassPc } from "../Interface/ClassPcLevel";

export const getTotalClassLevel = (classes: ClassPc[]) => {
  return classes && classes.length > 0 ? classes.reduce((total, cl) => total + cl.level, 0) : 0;
};