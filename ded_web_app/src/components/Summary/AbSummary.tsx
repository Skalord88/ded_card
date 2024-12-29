import { Abilitys } from "../Abilitys/Interface";
import { BonusAbilities, signAndCount } from "../functions";

export type AbSummaryProps = {
  abilitys: Abilitys;
};

export const AbSummary: React.FC<AbSummaryProps> = ({ abilitys }) => {
  const ab = [
    {
      idAb: 0,
      text: "STR",
      number: abilitys.strength,
      bonus: signAndCount([BonusAbilities(abilitys, "STR")])
    },
    {
      idAb: 1,
      text: "DEX",
      number: abilitys.dexterity,
      bonus: signAndCount([BonusAbilities(abilitys, "DEX")])
    },
    {
      idAb: 2,
      text: "COS",
      number: abilitys.constitution,
      bonus: signAndCount([BonusAbilities(abilitys, "COS")])
    },
    {
      idAb: 3,
      text: "INT",
      number: abilitys.intelligence,
      bonus: signAndCount([BonusAbilities(abilitys, "INT")])
    },
    {
      idAb: 4,
      text: "WIS",
      number: abilitys.wisdom,
      bonus: signAndCount([BonusAbilities(abilitys, "WIS")])
    },
    {
      idAb: 5,
      text: "CHA",
      number: abilitys.charisma,
      bonus: signAndCount([BonusAbilities(abilitys, "COS")])
    }
  ];
  return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {ab.map((a, index) => {
          return (
            <p key={index}>
              {" "}
              {a.text} {a.number}
              {a.bonus.sign}
              {a.bonus.number}
              {a.idAb !== 5 ? " / " : ""}
            </p>
          );
        })}
      </div>
  );
};
