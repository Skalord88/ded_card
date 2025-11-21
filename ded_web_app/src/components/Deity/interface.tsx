
import { Weapon } from "../interfaces";
import { Alignment } from "../Alignment/Alignment";
import { Domains } from "../Domains/interface";

export type Deity = {
  id: number;
  name: string;
  domains: Domains[];
  alignment: Alignment;
  worshiperAlignments: Alignment[];
  favoredWeapons: Weapon[];
  avatarUrl: string;
};
