import { Spell } from "../interfaces";
import { Popup } from "../Popup/Popup";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";

export type MagicComponentProps = {
  char: CharToModify;
};

export const MagicComponent: React.FC<MagicComponentProps> = ({ char }) => {
  return (
    <div>
      <h2 className="rpgui-container-framed golden-2">Magic</h2>
      {char.spellsPerDay &&
        char.spellsPerDay.map((table, index) => (
          <div key={index}>
            <p>{table?.caster} day spells:</p>
            {/* {table?.spellsBook && 
              table.spellsBook.map((s, index) => {
                if(s as Spell){
                const show: number | string | null =
                  s. === -2
                    ? "All"
                    : s === -1
                    ? null
                    : s === -3
                    ? "can't cast"
                    : s === 0
                    ? "can't cast"
                    : s;}
                const lght = table.spells ? table.spells.length : 0;
                return show ? (
                  <span>
                    lv{index}: {show}
                    {lght - 1 > index ? <> / </> : null}
                  </span>
                ) : null;
              })} */}
          </div>
        ))}
      {char.spellsKnown &&
        char.spellsKnown.map((table, index) => (
          <div key={index}>
            <p>{table?.caster} known spells:</p>
            {/* {table.spells &&
              table.spells.map((s, index) => {
                const show: number | string | null =
                  s === -2
                    ? "All"
                    : s === -1
                    ? null
                    : s === -3
                    ? "can't cast"
                    : s === 0
                    ? "can't cast"
                    : s;
                const lght = table.spells ? table.spells.length : 0;
                return show ? (
                  <span>
                    lv{index}: {show}
                    {lght - 1 > index ? <> / </> : null}
                  </span>
                ) : null;
              })} */}
          </div>
        ))}
      {/* {char.books &&
        char.books.map((book, index) => (
          <div key={`book-${index}`}>
            <p>{book.caster} prepared:</p>
            {book.spells.map((spell, indexSp) => {
              const spellText: string[] = [
                "target: " , spell.targetEffectArea ? spell.targetEffectArea : "",
                "descriptive: " , spell.descriptiveText ? spell.descriptiveText : ""
              ];

              return (
                <span>
                  <Popup
                    key={`${book.caster}.${indexSp}.${spell.id}`}
                    text={String(spell.name)}
                    popText={spellText.join()}
                  />
                </span>
              );
            })}
          </div>
        ))} */}
    </div>
  );
};
