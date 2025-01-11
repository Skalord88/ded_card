import { abilityBackgroundColor } from "./Abilitys/Colors";
import { AbilitysProps } from "./Abilitys/Interface";
import { BonusAbilities, signAndCount } from "./functions";

export const AbilitysComponent: React.FC<AbilitysProps> = ({ abilitys }) => {

  const ab = [
    {
      id: 1,
      text: "STR",
      value: abilitys.strength,
      bonusSing: signAndCount([BonusAbilities(abilitys, "STR")]).sign,
      bonus: BonusAbilities(abilitys, "STR"),
      color: abilityBackgroundColor('STRENGTH')
    },
    {
      id: 2,
      text: "DEX",
      value: abilitys.dexterity,
      bonusSing: signAndCount([BonusAbilities(abilitys, "DEX")]).sign,
      bonus: BonusAbilities(abilitys, "DEX"),
      color: abilityBackgroundColor('DEXTERITY')
    },
    {
      id: 3,
      text: "COS",
      value: abilitys.constitution,
      bonusSing: signAndCount([BonusAbilities(abilitys, "COS")]).sign,
      bonus: BonusAbilities(abilitys, "COS"),
      color: abilityBackgroundColor('CONSTITUTION')
    },
    {
      id: 4,
      text: "INT",
      value: abilitys.intelligence,
      bonusSing: signAndCount([BonusAbilities(abilitys, "INT")]).sign,
      bonus: BonusAbilities(abilitys, "INT"),
      color: abilityBackgroundColor('INTELLIGENCE')
    },
    {
      id: 5,
      text: "WIS",
      value: abilitys.wisdom,
      bonusSing: signAndCount([BonusAbilities(abilitys, "WIS")]).sign,
      bonus: BonusAbilities(abilitys, "WIS"),
      color: abilityBackgroundColor('WISDOM')
    },
    {
      id: 6,
      text: "CHA",
      value: abilitys.charisma,
      bonusSing: signAndCount([BonusAbilities(abilitys, "CHA")]).sign,
      bonus: BonusAbilities(abilitys, "CHA"),
      color: abilityBackgroundColor('CHARISMA')
    }
  ];

  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Abilities</h2>
      {ab.map((ability) => (
        <div key={ability.id} style={{ display: "flex" }}>
          <div className={ability.color} style={{ flex: 2 }}>
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
