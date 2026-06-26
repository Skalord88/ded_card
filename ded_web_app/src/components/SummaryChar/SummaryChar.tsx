import { BonusAbilities } from "../functions";
import {
  ModifiedCharacter
} from "../ModifiedCharacter/interface/ModifiedCharacter";
import { signAndCountString } from "../Sign/Function";
import { SummaryCharAbilities } from "./component/SummaryCharAbilities";
import { SummaryCharArmorClass } from "./component/SummaryCharArmorClass";
import { SummaryCharAttacks } from "./component/SummaryCharAttacks";
import { SummaryCharBaseAttack } from "./component/SummaryCharBaseAttack";
import { SummaryCharFeats } from "./component/SummaryCharFeats";
import { SummaryCharSaving } from "./component/SummaryCharSaving";
import { SummaryCharSkills } from "./component/SummaryCharSkills";
import { SummaryCharSpaceReach } from "./component/SummaryCharSpaceReach";
import { SummaryCharSpecialAbilities } from "./component/SummaryCharSpecialAbilities";
import { SummaryCharSpeed } from "./component/SummaryCharSpeed";
import { SummaryCharVita } from "./component/SummaryCharVita";

export type SummaryCharProps = {
  modCharacter: ModifiedCharacter;
};

export type SummaryCharDivTemplateProps = {
  children: React.ReactNode;
};

export const SummaryCharDivTemplate: React.FC<SummaryCharDivTemplateProps> = ({
  children
}) => {
  <div
    style={
      {
        // border: "1px solid red"
        //   display: "grid",
        //   gridTemplateColumns: "1fr 3fr"
      }
    }
  >
    {children}
  </div>;
};

export const SummaryChar: React.FC<SummaryCharProps> = ({ modCharacter }) => {
  return (
    <div className="rpgui-container-framed golden">
      <h2>{modCharacter.title}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr"
        }}
      >
        <div>
          <p>Size/Type:</p>
        </div>
        <div>
          <p>
            {modCharacter.race?.size.size}{" "}
            {modCharacter.race?.race.raceType.raceClass.className}
          </p>
        </div>

        <div>
          <p>Hit Dice:</p>
        </div>
        <SummaryCharVita modCharacter={modCharacter} />

        <div>
          <p>Initiative:</p>
        </div>
        <div>
          <p>
            {modCharacter.abilitys && signAndCountString([BonusAbilities(modCharacter.abilitys, "DEX")])}
          </p>
        </div>

        <SummaryCharSpeed modCharacter={modCharacter} />
        <SummaryCharArmorClass modCharacter={modCharacter} />
        <SummaryCharBaseAttack modCharacter={modCharacter} />
        <SummaryCharAttacks modCharacter={modCharacter} />
        <SummaryCharSpaceReach modCharacter={modCharacter} />
        <SummaryCharSpecialAbilities modCharacter={modCharacter} />
        <SummaryCharSaving modCharacter={modCharacter} />
        <SummaryCharAbilities modCharacter={modCharacter} />
        <SummaryCharSkills modCharacter={modCharacter} />
        <SummaryCharFeats modCharacter={modCharacter} />
      </div>
    </div>
  );
};
