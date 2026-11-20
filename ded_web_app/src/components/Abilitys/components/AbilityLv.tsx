import { DropdownComponent } from "../../DropDown/DropDown";
import { addToDrop } from "../../functions";
import { useCharacter } from "../../ModifiedCharacter/Context/CharacterContext";
import {
  abilityForDrop,
  AbilityKey,
  abilityList,
  Abilitys,
  LevelAbilitys
} from "../Interface";

export type AbilityLvProps = {
  times: number;
  abilitysLvPc: LevelAbilitys[];
};

export const AbilityLv: React.FC<AbilityLvProps> = ({
  times,
  abilitysLvPc
}) => {
  return (
    <>
      {Array.from({ length: times }, (_, index) => (
        <div key={index} className="rpgui-container-framed grey">
          <p>Level {(index + 1) * 4}</p>
          {abilitysLvPc[index] ? (
            <p>
              {Object.entries(abilitysLvPc[index].abilitys)
                .filter(
                  ([key, value]) =>
                    key !== "modifierType" && value && value !== 0
                )
                .map(([key, value]) => `${key} +${value}`)
                .join(", ")}
            </p>
          ) : null}
          <ChooseAbilityLv level={(index + 1) * 4} />
        </div>
      ))}
    </>
  );
};

export type ChooseAbilityLvProps = {
  level?: number;
  //   onSelect?: (ability: string) => void;
};

export const ChooseAbilityLv: React.FC<ChooseAbilityLvProps> = ({ level }) => {
  const { setAbilitysLv } = useCharacter();

  const changeAbilityLv = (option: AbilityKey) => {
    if (!level) return;

    setAbilitysLv((prev) => {
      const current = prev ?? [];

      const abilitys: Abilitys = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
      };

      const existing = current.find((lv) => lv.level === level);

      if (existing) {
        Object.assign(abilitys, existing.abilitys);
      }

      // Reset bonus del livello corrente
      abilitys.strength = 0;
      abilitys.dexterity = 0;
      abilitys.constitution = 0;
      abilitys.intelligence = 0;
      abilitys.wisdom = 0;
      abilitys.charisma = 0;

      abilitys[option] = 1;

      const updated: LevelAbilitys = {
        level,
        abilitys
      };

      return existing
        ? current.map((lv) => (lv.level === level ? updated : lv))
        : [...current, updated];
    });
  };
  return (
    <DropdownComponent
      options={abilityForDrop}
      onAction={(option) => changeAbilityLv(option)}
    />
  );
};
