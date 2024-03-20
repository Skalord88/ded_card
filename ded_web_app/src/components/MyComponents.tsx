import React, { useEffect, useState } from "react";
import {
  Armor,
  CharInventory,
  Inventory,
  Item,
  ItemToBuy,
  Shield,
  Weapon
} from "./interfaces";
import { noneArmor, noneShield, noneWeapon } from "./variables";

// export const MapOfStudy: React.FC<MapOfSkills> = ({ skills }) => {
//   return (
//     <div className="row">
//       study:
//       {skills.map((sk, index) => (
//         <div className="column">
//           <div className="row" key={index}>
//             {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
//             {sk.fieldOfStudy.map((st, index) => (
//               <div className="row" key={index}>
//                 {st.study} : {sk.skillRank}
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export const MapUpdateOfStudy: React.FC<MapUpdateSkills> = ({
//   skills,
//   studyAdd,
//   studyDel,
//   onRankAdd,
//   onRankDel
// }) => {
//   const [skillsList, setRank] = useState<SkillProps[]>(skills);
//   // ---- zostawic!
//   // const [newStudy, setNewStudy] = useState<AddStudy>(studyEmpty);
//   // const [studySelected, setStudySelected] = useState<AddStudy[]>([]);
//   // ---- zostawic!
//   const [studyToAdd, setToAdd] = useState<StudyUp>(studyAdd);
//   const [studyToDel, setToDel] = useState<StudyUp>(studyDel);

//   useEffect(() => {
//     setRank(skills);
//   }, [skills]);

//   const addRank = (newSkill: number, newStudy: number) => {
//     setToAdd({ ...studyToAdd, idSkill: newSkill, idStudy: newStudy });
//   };

//   const delRank = (newSkill: number, newStudy: number) => {
//     setToDel({ ...studyToDel, idSkill: newSkill, idStudy: newStudy });
//   };

//   useEffect(() => {
//     onRankAdd(studyToAdd);
//   }, [studyToAdd]);

//   useEffect(() => {
//     onRankDel(studyToDel);
//   }, [studyToDel]);

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

//   return (
//     <div className="row">
//       study:
//       {skillsList.map((sk, index) => (
//         <div className="column">
//           <div className="row" key={index}>
//             {sk.nameSkill} {sk.skillBonus + sk.skillAbility}
//             {sk.fieldOfStudy.map((st, index) => (
//               <>
//                 <div className="row" key={index}>
//                   {st.study} : {st.rank}
//                   <button onClick={() => addRank(sk.idSkill, st.idStudy)}>
//                     +
//                   </button>
//                   <button onClick={() => delRank(sk.idSkill, st.idStudy)}>
//                     -
//                   </button>
//                 </div>
//               </>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export const MapOfSkillsNoStudy: React.FC<MapOfSkills> = ({ skills }) => {
//   return (
//     <>
//       skill:
//       {skills.map((sk, index) => (
//         <div className="row" key={index}>
//           {sk.nameSkill} : {sk.skillRank + sk.skillAbility + sk.skillBonus}
//         </div>
//       ))}
//     </>
//   );
// };

export const BuyItemInventory: React.FC<ItemToBuy> = ({
  item,
  type,
  items,
  buyItem,
  sellItem
}) => {
  const selectItem = (i: Item, type: string) => {
    buyItem(i, type);
  };
  const deselect = (i: Item, type: string) => {
    sellItem(i, type);
  };
  return (
    <>
      <div className="column">
        {item.name}
        <button onClick={() => deselect(item, type)}>-</button>
      </div>
      <div>{item.description}</div>
      <div>
        {items.map((it, index) => {
          return (
            <div key={index}>
              {it.name} {it.cost}
              <button onClick={() => selectItem(it, type)}>+</button>
            </div>
          );
        })}
      </div>
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
      <div className="container">
        <div className="container-item">
          ---Armor:
          <BuyItemInventory
            item={equipment.armor}
            items={items.armorsList}
            type={"armor"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">---Shield:</div>
      </div>
      <div className="container">
        <div className="container-item">
          ---Weapon I:
          <BuyItemInventory
            item={equipment.weaponOne}
            items={items.weaponsList}
            type={"one"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">
          ---Weapon II:
          <BuyItemInventory
            item={equipment.weaponTwo}
            items={items.weaponsList}
            type={"two"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">
          ---Weapon III:
          <BuyItemInventory
            item={equipment.weaponThree}
            items={items.weaponsList}
            type={"three"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">
          ---Weapon IV:
          <BuyItemInventory
            item={equipment.weaponFour}
            items={items.weaponsList}
            type={"four"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
        <div className="container-item">
          ---Weapon V:
          <BuyItemInventory
            item={equipment.weaponFive}
            items={items.weaponsList}
            type={"five"}
            buyItem={handleBuyItem}
            sellItem={handleSellItem}
          />
        </div>
      </div>
      <div className="container">
        <div className="container-item">Head: {inventory.head.name}</div>
      </div>
    </>
  );
};
