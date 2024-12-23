import { SignAndCount } from "./functions";
import { SignAndNumber } from "./interfaces";
import { D20Popup } from "./Popup/DicePopup/D20Popup";
import { CharToModify } from "./Prerequisite/functions/modifyCharacter";
import { Resistance } from "./Saving/interface";

export type SavingThrowComponentProps = {
  char: CharToModify;
};

export type SavingToShow = {
  title: string;
  signNumber: SignAndNumber;
  mod: Resistance[];
};

export const SavingThrowComponent: React.FC<SavingThrowComponentProps> = ({
  char
}) => {
  console.log(char.savingThrow);
  const saving: SavingToShow[] = [
    {
      title: "fortitude",
      signNumber: SignAndCount([
        char.baseSave.fortitude + char.adjBonus.savingThrow
      ]),
      mod: char.savingThrow.flatMap((sT) => sT.resistance)
    },
    {
      title: "reflex",
      signNumber: SignAndCount([
        char.baseSave.reflex + char.adjBonus.savingThrow
      ]),
      mod: char.savingThrow.flatMap((sT) => sT.resistance)
    },
    {
      title: "will",
      signNumber: SignAndCount([
        char.baseSave.will + char.adjBonus.savingThrow
      ]),
      mod: char.savingThrow.flatMap((sT) => sT.resistance)
    }
  ];

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Saving Throws</h2>

      {saving.map((save) => (
        <div>
          <p>
            <D20Popup
              textOrWeapon={save.title}
              value={Math.floor(save.signNumber.number)}
              modifiers={{
                attackRoll: null,
                specialAttacks: null,
                savingThrow: save.mod
              }}
            />
            {save.signNumber.sign}
            {Math.floor(save.signNumber.number)}
          </p>
        </div>
      ))}
    </>
  );
};
