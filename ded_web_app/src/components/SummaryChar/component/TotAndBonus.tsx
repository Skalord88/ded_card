import { Fragment } from "react/jsx-runtime";
import { signAndCountToString } from "../../functions";
import { Popup } from "../../Popup/Popup";
import { ModifierEnum } from "../../Prerequisite/interface/ModifierEnum";

export type TotAndBonusElement = {
  bonus: number;
  text?: string;
  pop: ModifierEnum;
};

export type TotAndBonusProps = {
  show: boolean;
  firstSign?: boolean;
  list: TotAndBonusElement[];
  children?: React.ReactNode;
};

export const TotAndBonus: React.FC<TotAndBonusProps> = ({
  show,
  firstSign,
  list,
  children
}) => {
  const total: number = Math.floor(
    list.reduce((tot, element) => tot + (element?.bonus || 0), 0)
  );

  return (
    <div>
      <span style={{ color: "orange" }}>
        {firstSign ? signAndCountToString([total]) : total}
      </span>

      <span>
        {":("}
        {list.length !== 0 &&
          list.map((l: TotAndBonusElement, index) => {
            const sign: string = signAndCountToString([l?.bonus || 0]);
            const text = show && l.text ? [sign, l.text] : [sign];

            return (
              <Fragment key={index}>
                <Popup text={text} popText={l?.pop || ""} />
                {index === list.length - 1 ? null : show ? (
                  <span>{", "}</span>
                ) : (
                  <span> </span>
                )}
              </Fragment>
            );
          })}
        {")"}
      </span>

      {children}
    </div>
  );
};

export type TotAndBonusAllProps = {
  totBab: number;
  bab: number;
  children?: React.ReactNode;
};

export const TotAndBonusAll: React.FC<TotAndBonusAllProps> = ({
  totBab,
  bab,
  children
}) => {
  const total: string = signAndCountToString([totBab], true);
  const bonus: string = signAndCountToString([bab], true);
  return (
    <>
      <span style={{ color: "orange" }}>{total}</span>
      <span>{" : "}</span>
      <span style={{ textShadow: "2px 2px 5px orange" }}>{bonus}</span>
      {children}
    </>
  );
};