import { table } from "console";
import { SpellsInLevel, SpellsTable } from "../ClassPc/Interface/ClassPcLevel";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";

export type MagicComponentProps = {
  char: CharToModify;
};

export const MagicComponent: React.FC<MagicComponentProps> = ({ char }) => {
  return (
    <div>
      <h2 className="rpgui-container-framed-golden-2">Magic</h2>
      {char.spellsPerDay &&
        char.spellsPerDay.map((table, index) => (
          <div key={index}>
            <p>{table.classe} day spells:</p>
            {table.spells.map((s, index) => (
              <>
                <span>
                  lv{index}:{s === -2 ? " All" : " " + s}
                </span>
                {table.spells.length - 1 > index ? <span>{" / "}</span> : null}
              </>
            ))}
          </div>
        ))}
      {char.spellsKnown &&
        char.spellsKnown.map((table, index) => (
          <div key={index}>
            <p>{table.classe} known spells:</p>
            {table.spells.map((s, index) => (
              <>
                <span>
                  lv{index}:{s === -2 ? " All" : s}
                </span>
                {table.spells.length - 1 > index ? <span>{" / "}</span> : null}
              </>
            ))}
          </div>
        ))}
    </div>
  );
};
