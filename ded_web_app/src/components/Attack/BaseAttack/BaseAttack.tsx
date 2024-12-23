import { BonusAbilities, SignAndCount, SignNumber } from "../../functions";
import { SpecialAttacks } from "../../interfaces";
import { D20Popup } from "../../Popup/DicePopup/D20Popup";
import { DiceModifiers } from "../../Popup/DicePopup/Interface";
import { CharToModify } from "../../Prerequisite/functions/modifyCharacter";
import { AttackRoll } from "../AttackRoll/interface";
import { sepcialAttacksToList } from "../function";

export type BaseAttackProp = {
  char: CharToModify;
};

export const BaseAttack: React.FC<BaseAttackProp> = ({ char }) => {
  const forAllAttackRoll: number = char.attackRoll.reduce(
    (tot, at) =>
      tot + (at.target == null && at.bonus != null ? Number(at.bonus) : 0),
    0
  );
  const adjBab: number = char.bab + forAllAttackRoll; 
  const modifiersAttackRoll: DiceModifiers = {attackRoll: char.attackRoll.filter(att => att.target !== null), specialAttacks: null, savingThrow: null};

  const modifiersSpecialAttacks: DiceModifiers = {attackRoll: null, specialAttacks: sepcialAttacksToList(char.specialAttacks), savingThrow: null};

  return (
    <>
      <div>
        <h2 className="rpgui-container-framed-golden-2">Attacks</h2>
        <div>
          {char.specialAttacks.map(att => 
             att.bullRush > 0 ? <>{att.bullRush}</> : null
          )}
          <p>
            <D20Popup
              textOrWeapon={"att"}
              value={adjBab}
              modifiers={modifiersAttackRoll}
            />{" "}
            {SignAndCount([adjBab]).sign}
            {adjBab}
          </p>
          <p>
            <D20Popup
              textOrWeapon={"grapple"}
              value={adjBab}
              modifiers={modifiersSpecialAttacks}
            />{" "}
            {SignAndCount([adjBab]).sign}
            {adjBab}
          </p>
        </div>
        {/* {attacksList.map((att) =>
          att.text === "base att bns" || att.text === "strenghtAtt" || att.text === "dexterityAtt" ? (
            <div>
                {att.mod != null?
                <p>
                  <D20Popup
                  textOrWeapon={att.text}
                  value={att.value}
                  modifiers={att.mod}
                />
                {SignNumber(att.value)}
                {att.value}
                </p>
              : null}
              
            </div>
          ) : att.value !== 0 && att.mod ? (
            <div>
              <p>
                <D20Popup
                  textOrWeapon={att.text}
                  value={char.bab + att.value}
                  modifiers={att.mod}
                />
                {SignNumber(char.bab + att.value)}
                {char.bab + att.value}
              </p>
            </div>
          ) : null
        )} */}
      </div>
    </>
  );
};
