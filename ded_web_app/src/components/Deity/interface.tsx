
import { Alignment } from "../Alignment/Alignment";
import { Weapon } from "../interfaces";

export type Deity = {
  id: number;
  name: string;
  domains: Dominio[];
  alignment: Alignment;
  worshiperAlignments: Alignment[];
  favoredWeapons: Weapon[];
  avatarUrl: string;
};
