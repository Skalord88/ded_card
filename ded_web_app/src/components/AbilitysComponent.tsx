import { AbilityBackgroundColor } from "./Abilitys/Colors";
import { AbilitysProps } from "./Abilitys/Interface";
import { BonusAbilities, SignAndCount } from "./functions";

export const AbilitysComponent: React.FC<AbilitysProps> = ({ abilitys }) => {

  const ab = [
    {
      id: 1,
      text: "STR",
      value: abilitys.strength,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "STR")]).sign,
      bonus: BonusAbilities(abilitys, "STR"),
      color: AbilityBackgroundColor('STRENGHT')
    },
    {
      id: 2,
      text: "DEX",
      value: abilitys.dextrity,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "DEX")]).sign,
      bonus: BonusAbilities(abilitys, "DEX"),
      color: AbilityBackgroundColor('DEXTERITY')
    },
    {
      id: 3,
      text: "COS",
      value: abilitys.constitution,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "COS")]).sign,
      bonus: BonusAbilities(abilitys, "COS"),
      color: AbilityBackgroundColor('CONSTITUTION')
    },
    {
      id: 4,
      text: "INT",
      value: abilitys.intelligence,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "INT")]).sign,
      bonus: BonusAbilities(abilitys, "INT"),
      color: AbilityBackgroundColor('INTELLIGENCE')
    },
    {
      id: 5,
      text: "WIS",
      value: abilitys.wisdom,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "WIS")]).sign,
      bonus: BonusAbilities(abilitys, "WIS"),
      color: AbilityBackgroundColor('WISDOM')
    },
    {
      id: 6,
      text: "CHA",
      value: abilitys.charisma,
      bonusSing: SignAndCount([BonusAbilities(abilitys, "CHA")]).sign,
      bonus: BonusAbilities(abilitys, "CHA"),
      color: AbilityBackgroundColor('CHARISMA')
    }
  ];

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Abilities</h2>
      {ab.map((ability) => (
        <div key={ability.id} style={{ display: "flex" }}>
          <div className={ability.color} style={{ flex: 1 }}>
            <p>{ability.text}</p>
          </div>
          <div className={ability.color} style={{ flex: 1 }}>
            <p>{ability.value}</p>
          </div>
          <div className={ability.color} style={{ flex: 1 }}>
            <p>
              {ability.bonusSing}
              {ability.bonus}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
