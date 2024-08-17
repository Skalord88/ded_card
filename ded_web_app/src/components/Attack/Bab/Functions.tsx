import { ClassPc } from "../../interfaces";

export function CountBabFromClassPc(
    classPcList: ClassPc[]): number {
  return classPcList.reduce(
    (total, cl) => 
        total + cl.classBab * cl.level, 0);
}
