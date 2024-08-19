import { ClassPc } from "../interfaces";

export function CountLevelFromClass(classList: ClassPc[]): number {
  return classList.reduce((total, cl) => total + cl.level, 0);
}
