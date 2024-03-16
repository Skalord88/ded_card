import React, { useEffect, useState } from "react";
import {
  AddStudy,
  Armor,
  CharInventory,
  Inventory,
  Item,
  MapOfSkills,
  MapUpdateSkills,
  Shield,
  SkillProps,
  Study,
  StudyUp,
  Weapon
} from "./interfaces";
import {
  emptyInventory,
  noneArmor,
  noneShield,
  noneWeapon,
  studyEmpty
} from "./variables";

export const MapOfStudy: React.FC<MapOfSkills> = ({ skills }) => {
  return (
    <div className="row">
      study:
      {skills.map((sk, index) => (
        <div className="column">
          <div className="row" key={index}>
            {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
            {sk.fieldOfStudy.map((st, index) => (
              <div className="row" key={index}>
                {st.study} : {sk.skillRank}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const MapUpdateOfStudy: React.FC<MapUpdateSkills> = ({
  skills,
  studyAdd,
  studyDel,
  onRankAdd,
  onRankDel
}) => {
  const [skillsList, setRank] = useState<SkillProps[]>(skills);
  // ---- zostawic!
  // const [newStudy, setNewStudy] = useState<AddStudy>(studyEmpty);
  // const [studySelected, setStudySelected] = useState<AddStudy[]>([]);
  // ---- zostawic!
  const [studyToAdd, setToAdd] = useState<StudyUp>(studyAdd);
  const [studyToDel, setToDel] = useState<StudyUp>(studyDel);

  useEffect(() => {
    setRank(skills);
  }, [skills]);

  const addRank = (newSkill: number, newStudy: number) => {
    setToAdd({ ...studyToAdd, idSkill: newSkill, idStudy: newStudy });
  };

  const delRank = (newSkill: number, newStudy: number) => {
    setToDel({ ...studyToDel, idSkill: newSkill, idStudy: newStudy });
  };

  useEffect(() => {
    onRankAdd(studyToAdd);
  }, [studyToAdd]);

  useEffect(() => {
    onRankDel(studyToDel);
  }, [studyToDel]);

  // ---- zostawic!
  // const handleStudyName = (e: any) => {
  //   setNewStudy({ ...newStudy, study: e.target.value });
  // };

  // const handleNewStudy = (e: any) => {
  //   setNewStudy({ ...newStudy, idSkill: e.target.vale });
  // };

  // useEffect(() => {
  //   if (newStudy.idSkill !== 0) {
  //     setStudySelected([...studySelected, newStudy]);
  //     setNewStudy({ ...newStudy, idSkill: 0, study: "" });
  //   }
  // }, [newStudy.idSkill]);
  // ---- zostawic!

  return (
    <div className="row">
      study:
      {skillsList.map((sk, index) => (
        <div className="column">
          <div className="row" key={index}>
            {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
            {sk.fieldOfStudy.map((st, index) => (
              <>
                <div className="row" key={index}>
                  {st.study} : {st.rank}
                  <button onClick={() => addRank(sk.idSkill, st.idStudy)}>
                    +
                  </button>
                  <button onClick={() => delRank(sk.idSkill, st.idStudy)}>
                    -
                  </button>
                </div>
              </>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const MapOfSkillsNoStudy: React.FC<MapOfSkills> = ({ skills }) => {
  return (
    <>
      skill:
      {skills.map((sk, index) => (
        <div className="row" key={index}>
          {sk.nameSkill} : {sk.skillRank + sk.skillAbility + sk.skillBonus}
        </div>
      ))}
    </>
  );
};

export const MapOfInventory: React.FC<CharInventory> = ({
  inventory,
  items,
  updateInventory
}) => {
  const [equipment, setEquipment] = useState<Inventory>(inventory);
  const [tresure, setTresure] = useState<number>(0);

  useEffect(() => {
    updateInventory(equipment, tresure);
  }, [tresure]);

  const handleBuyItem = (e: Item, type: string) => {
    if (type === "armor") {
      setTresure(+equipment.armor.cost - e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        armor: e as Armor
      };
      setEquipment(updatedInventory);
    }

    if (type === "shield") {
      setTresure(+equipment.shield.cost - e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        shield: e as Shield
      };
      setEquipment(updatedInventory);
    }

    if (type === "one") {
      setTresure(+equipment.weaponOne.cost - e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponOne: e as Weapon
      };
      setEquipment(updatedInventory);
    }

    if (type === "two") {
      setTresure(+equipment.weaponTwo.cost - e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponTwo: e as Weapon
      };
      setEquipment(updatedInventory);
    }

    if (type === "three") {
      setTresure(+equipment.weaponThree.cost - e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponThree: e as Weapon
      };
      setEquipment(updatedInventory);
    }

    if (type === "four") {
      setTresure(+equipment.weaponFour.cost - e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponFour: e as Weapon
      };
      setEquipment(updatedInventory);
    }

    if (type === "five") {
      setTresure(+equipment.weaponFive.cost - e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponFive: e as Weapon
      };
      setEquipment(updatedInventory);
    }
  };

  const handleSellItem = (e: Item, type: string) => {
    if (type === "armor") {
      setTresure(+e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        armor: noneArmor
      };
      setEquipment(updatedInventory);
    }

    if (type === "shield") {
      setTresure(+e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        shield: noneShield
      };
      setEquipment(updatedInventory);
    }

    if (type === "one") {
      setTresure(+e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponOne: noneWeapon
      };
      setEquipment(updatedInventory);
    }

    if (type === "two") {
      setTresure(+e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponTwo: noneWeapon
      };
      setEquipment(updatedInventory);
    }

    if (type === "three") {
      setTresure(+e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponThree: noneWeapon
      };
      setEquipment(updatedInventory);
    }

    if (type === "four") {
      setTresure(+e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponFour: noneWeapon
      };
      setEquipment(updatedInventory);
    }

    if (type === "five") {
      setTresure(+e.cost);
      const updatedInventory: Inventory = {
        ...equipment,
        weaponFive: noneWeapon
      };
      setEquipment(updatedInventory);
    }
  };

  return (
    <>
      <div className="row">
        Armor: {inventory.armor.armorName}
        {inventory.armor.id !== 0 ? (
          <>
            <button onClick={() => handleSellItem(inventory.armor, "armor")}>
              -
            </button>
          </>
        ) : (
          <></>
        )}
        <>
          {items.armorsList.map((armor, index) => {
            return (
              <>
                <div key={index}>
                  <button onClick={() => handleBuyItem(armor, "armor")}>
                    +
                  </button>
                  {armor.armorName} {armor.cost}gp
                </div>
              </>
            );
          })}
        </>
      </div>
      <div className="row">
        Shield: {inventory.shield.shieldName}
        {inventory.shield.id !== 0 ? (
          <>
            <button>-</button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="row">
        <div className="row">
          Weapon I: {inventory.weaponOne.name}
          {inventory.weaponOne.id !== 0 ? (
            <>
              <button
                onClick={() => handleSellItem(inventory.weaponOne, "one")}
              >
                -
              </button>
            </>
          ) : (
            <></>
          )}
          {items.weaponsList.map((weapon, index) => {
            return (
              <div key={index}>
                {weapon.name} {weapon.cost}gp
                <button onClick={() => handleBuyItem(weapon, "one")}>+</button>
              </div>
            );
          })}
        </div>
        <div className="row">Weapon II: {inventory.weaponTwo.name}</div>
        <div className="row">Weapon III: {inventory.weaponThree.name}</div>
      </div>
    </>
  );
};
