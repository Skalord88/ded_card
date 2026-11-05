import { useState, useEffect } from "react";
import { SelectedCheck } from "../../Icon/SelectedCheck";
import { MapAllAttacksElements } from "../../SummaryChar/component/SummaryCharAttacks";
import { TotAndBonusElement } from "../../SummaryChar/component/TotAndBonus";
import { AttackOptionsElement } from "../function/createAttackOptions";

export type OneAttackOptionsElementProps = {
  att: AttackOptionsElement;
  myIndex: string;
  indexOne: string | null;
  indexTwo: string | null;

  counter: number;

  onAction: (toThrow?: boolean, toTwo?: boolean) => void;
  onThrow?: (toThrow: boolean) => void;
  onToTwo?: (toTwo: boolean) => void;
  onDeAction: () => void;

  listBabBonus: TotAndBonusElement[][] | undefined;
  listDamage: TotAndBonusElement[] | undefined;
  // listDamage: number;
};

export const OneAttackOptionsElement: React.FC<OneAttackOptionsElementProps> = ({
  att,
  myIndex,
  indexOne,
  indexTwo,
  counter,
  onAction,
  onThrow,
  onToTwo,
  onDeAction,
  listBabBonus,
  listDamage
}) => {
  const [toThrow, setToThrow] = useState<boolean>();
  // const [toTwo, setToTwo] = useState<boolean>();

  useEffect(() => {
    if (toThrow !== undefined && onThrow) onThrow(toThrow);
    // if(toTwo !== undefined && onToTwo) onToTwo(toTwo);
  }, [
    toThrow
    // , toTwo
  ]);

  return (
    <div style={{ gridArea: att.area }}>
      <div>
        <p onDoubleClick={onDeAction}>{att.element?.weapon?.name}</p>

        {Array.from({ length: 2 }).map((_, indexA) => {
          if (indexA !== counter) {
            return null;
          }

          return (
            <div
              key={indexA}
              onClick={
                // toThrow
                //   ? () => onAction(att.area, toThrow)
                //   :
                () =>
                  onAction(
                    toThrow
                    // , toTwo
                  )
              }
              className="rpgui-cursor-point"
            >
              {/* <p>
                index: {indexA}, counter: {counter}, toThrow:{" "}
                {toThrow?.toString()}
              </p> */}
              <MapAllAttacksElements
                index={indexA}
                clicked={indexOne === att.area || indexTwo === att.area}
                ranged={att.element?.weaponRanged || false}
                thrown={toThrow || false}
                weaponDamage={att.element?.weapon?.damage || ""}
                weaponCritical={att.element?.weapon?.critical || ""}
                listBabBonusII={listBabBonus}
                listDamageII={listDamage}
              />
            </div>
          );
        })}
      </div>
      <div>
        {att.element?.weaponThrown && (
          <p>
            <SelectedCheck onAction={setToThrow} />
            Thrown
          </p>
        )}
        {/* {[indexOne, indexTwo].includes(null) && (
          <p>
            <SelectedCheck onAction={setToTwo} />
            twoHanded
          </p>
        )} */}
      </div>
    </div>
  );
};