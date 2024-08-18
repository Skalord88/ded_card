import { BonusAbilities, SignAndCount } from "./functions";
import { AbilitysFromChar } from "./interfaces";

export const AbilitysComponent: React.FC<AbilitysFromChar> = ({ abilitys }) => {
  const ab = [
    {
      id: 1,
      text: "STR",
      value: abilitys.strength,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "STR")]).sign,
      bonus: BonusAbilities(abilitys, "STR")
    },
    {
      id: 2,
      text: "DEX",
      value: abilitys.dextrity,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "DEX")]).sign,
      bonus: BonusAbilities(abilitys, "DEX")
    },
    {
      id: 3,
      text: "COS",
      value: abilitys.constitution,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "COS")]).sign,
      bonus: BonusAbilities(abilitys, "COS")
    },
    {
      id: 4,
      text: "INT",
      value: abilitys.intelligence,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "INT")]).sign,
      bonus: BonusAbilities(abilitys, "INT")
    },
    {
      id: 5,
      text: "WIS",
      value: abilitys.wisdom,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "WIS")]).sign,
      bonus: BonusAbilities(abilitys, "WIS")
    },
    {
      id: 6,
      text: "CHA",
      value: abilitys.charisma,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "CHA")]).sign,
      bonus: BonusAbilities(abilitys, "CHA")
    }
  ];

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Abilities</h2>
      {ab.map((ability) => {
        return (
          <>
            <div key={ability.id} style={{ display: "flex" }}>
              <div
                key={ability.id}
                className="rpgui-container-framed-grey"
                style={{ flex: 1 }}
              >
                <p>{ability.text}</p>
              </div>
              <div
                className="rpgui-container-framed-grey"
                style={{ flex: 1 }}
              >
                <p>{ability.value}</p>
              </div>
              <div
                className="rpgui-container-framed-grey"
                style={{ flex: 1 }}
              >
                <p>
                  {ability.bonusSing}
                  {ability.bonus}
                </p>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
