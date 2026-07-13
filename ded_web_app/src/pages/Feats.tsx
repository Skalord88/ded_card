import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useData } from "../components/Context/Context";
import { DropdownComponent } from "../components/DropDown/DropDown";
import {
  Feat,
  FeatPc,
  FeatsTypeEnum
} from "../components/Feats/Interface/FeatInterface";
import { FormattingText } from "../components/Formatting/Function";
import {
  addToDrop,
  ItemInDrop,
  signAndCountToString
} from "../components/functions";
import { Item } from "../components/interfaces";
import { useCharacter } from "../components/ModifiedCharacter/Context/CharacterContext";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";
import { PrerequisiteSkills } from "../components/Skills/interface/PrerequisiteSkills";
import { Skill } from "../components/Skills/interface/Skill";
import { Study } from "../components/Skills/interface/SkillsInterface";
import { emptyPrerequisite } from "../components/variables";
import { PageLayout } from "./AppLayout";

export type FiltroPrerequisite = {
  featType?: ItemInDrop<FeatsTypeEnum>[]; // ItemInDrop
  feats?: ItemInDrop<Feat>[]; // ItemInDrop
  weapons?: ItemInDrop<Item>[]; // ItemInDrop
  weaponsProficency?: []; // ItemInDrop
  skills?: ItemInDrop<PrerequisiteSkills>[]; // ItemInDrop
};

const getSkillStudyRanksString = (skillStudy?: PrerequisiteSkills[]): string =>
  skillStudy
    ?.map((s) => {
      const name = s.skill?.skillName?.text ?? s.study?.studyName?.text;

      return name ? `${name} ${signAndCountToString([s.rank])}` : "";
    })
    .filter(Boolean)
    .join(", ") ?? "";

export function Feats() {
  const { charId } = useParams();

  const { moddedCharacter, featsPg, setFeatsList } = useCharacter();

  // console.log(featsList);

  // const [char, setChar] = useState<CharacterPc>();
  // const [itemList, setItemList] = useState<ListOfToSelect>();
  // const [filtroList, setFiltroList] = useState<FiltroPrerequisite>();
  // const [featsToAddList, setFeatsToAddList] = useState<FeatPc[]>([]);
  // const [featsPcToSelectList, setFeatsPcToAddList] = useState<FeatPc[]>([]);
  // const [modChar, setModChar] = useState<CharToModify>();
  const [change, setChange] = useState(false);

  const { getData, loading, reload } = useData();
  const skillsDB = getData("skills");
  const studiesDB = getData("studies");
  const itemsDB = getData("items");
  const featsDB = getData("feats");

  useEffect(() => {
    reload("skills");
    reload("studies");
    reload("items");
    reload("feats");
  }, [reload]);

  // useEffect(() => {
  //   if (!loading) return;
  // setItemList({
  //   feats: addToDrop(feats, (f: Feat) => f.featName),
  //   items: items
  // ,weapons: addToDrop(
  //   items
  // .filter((i: Item) => i.itemType === "weapon"),
  //   , (i: Item) => i.name
  // )
  // });
  // setFiltroList({
  //   featsType: [],
  //   feats: addToDrop(feats, (f: Feat) => f.featName),
  //   weapons: addToDrop(
  //     items.filter((i: Item) => i.itemType === "weapon"),
  //     (i: Item) => i.name
  //   ),
  //   weaponsProficency: [],
  //   skills: []
  // });
  // }, [loading, items, feats]);

  // useEffect(() => {
  // const pcBonusFeats: FeatPc[] = moddedCharacter
  //   ? createPcBonusFeats(moddedCharacter)
  //   : [];

  // moddedCharacter && setFeatsToAddList(createPcBonusFeats(moddedCharacter));

  // const classFeats: FeatPc[] = moddedCharacter
  //   ? createClassPcClassFeats(moddedCharacter)
  //   : [];

  // moddedCharacter && setFeatsPcToAddList(createClassPcClassFeats(moddedCharacter));
  // }, [moddedCharacter]);

  // moddedCharacter?.classPcList?.forEach((cl: ClassPc) =>
  //   cl.classCharacter.classFeats.forEach((c: ClassFeats) => {
  //     if (((c.selected || c.feat.toSelect) && !c.selected) && c.level <= cl.level) {
  //       const featToAdd: FeatPc = {
  //         id: -1,
  //         classFeat: c
  //       }
  //       // console.log(c)
  //       classFeats.push(featToAdd);
  //     } else {
  //       // console.log("non ha", c.className, c.feat.featName)
  //     }
  //   })
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const resItems = await axios.get(urlItems);

  //       const resFeats = await axios.get(urlFeats);
  //       const listOfFeats: Feat[] = resFeats.data;
  //       const itemsFeats: ItemInDrop<Feat>[] = addToDrop(
  //         listOfFeats.filter(
  //           (f) =>
  //             f.featType === null ||
  //             (!f.featType.includes(FeatsTypeEnum.CLASS) &&
  //               !f.featType.includes(FeatsTypeEnum.MAGE))
  //         ),
  //         (f) => f.featName
  //       );

  //       const dbWeapons = await resItems.data.weaponsList;
  //       const itemsWeapons = addToDrop(dbWeapons, (i: Weapon) => i.name);
  //       const dbArmors = await resItems.data.armorsList;
  //       const itemsArmors = addToDrop(dbArmors, (i: Armor) => i.name);

  //       setItemList({
  //         feats: itemsFeats,
  //         weapons: itemsWeapons,
  //         armors: itemsArmors
  //       });

  //       // setFiltroList({
  //       //   featsType: addToDrop(
  //       //     Array.from(
  //       //       new Set(
  //       //         itemsFeats.flatMap((f) =>
  //       //           (f.item as Feat).featType
  //       //             ? ["ALL"].concat((f.item as Feat).featType)
  //       //             : []
  //       //         )
  //       //       )
  //       //     )
  //       //   ),
  //       //   feats: addToDrop(Array.from(new Set(listOfFeats)), (i) => i.featName),
  //       //   weapons: addToDrop(
  //       //     Array.from(
  //       //       new Set(
  //       //         itemsWeapons.flatMap((w) =>
  //       //           (w.item as Weapon) ? (w.item as Weapon) : []
  //       //         )
  //       //       )
  //       //     ),
  //       //     (i: Item) => i.name
  //       //   ),
  //       //   weaponsProficency: addToDrop(
  //       //     moddedCharacter?.proficency,
  //       //     (i: Item) => i.name
  //       //   ),
  //       //   skills: addToDrop(["culi", "tette"], (s) => s)
  //       // });
  //       // const quantiFeats: FeatPc[] = createClassPcBonusFeats(moddedCharacter);
  //       // setFeatsToAddList([]);
  //       // const checkQuantiFeats: boolean[] = [];
  //       // quantiFeats.forEach((f, index) => {
  //       //   if (index === 0) {
  //       //     checkQuantiFeats.push(true);
  //       //   } else {
  //       //     f.feat ? checkQuantiFeats.push(true) : checkQuantiFeats.push(false);
  //       //   }
  //       //   setChoosenFeatsCheck(checkQuantiFeats);
  //       // });

  //       // setFeatsPcToAddList(createClassPcClassFeats(newModChar));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // const newFeatsToAddList = (f: FeatPc, i: number) => {
  //   const updatedList = [...featsToAddList];
  //   updatedList[i] = f;
  //   setFeatsToAddList(updatedList);
  //   // const seltiFeats = [...choosenFeatsCheck];
  //   // seltiFeats[i] = true;
  //   // console.log("seltiFeats", seltiFeats);
  //   // console.log("updatedList", updatedList);
  //   // setChoosenFeatsCheck(seltiFeats);
  // };

  // useEffect(() => {
  //   const updatedChecks: boolean[] = choosenFeatsCheck
  //   featsToAddList.forEach((f, index) => {
  //       // console.log("f", f.feat?.featName, "index", index, f.feat? true : false);
  //       if (index < featsToAddList.length - 1)
  //       f.feat ? updatedChecks[index + 1] = true : updatedChecks[index] = false;
  //     }
  //   );
  //   updatedChecks[0] = true
  //   console.log("updatedChecks", updatedChecks);
  //   setChoosenFeatsCheck(updatedChecks);
  //   // }
  //   // })
  // }, [featsToAddList]);

  // const newFeatsPcToAddList = (f: FeatPc, i: number) => {
  //   if (featsPcToSelectList) {
  //     const updatedList = [...featsPcToSelectList];
  //     updatedList[i] = f;
  //     setFeatsPcToAddList(updatedList);
  //   }
  // };

  const clearFeat = (indexF: number) => {
    if (featsPg && featsPg.length > 0) {
      const newFeatsList = featsPg.map((feat, index) =>
        index === indexF
          ? {
              id: -1,
              level: feat.level,
              feat: undefined,
              toSelect: undefined,
              selected: undefined
            }
          : feat
      );

      setFeatsList(newFeatsList);
    }
  };

  const changeFeat = (indexF: number, newFeat: Feat) => {
    if (featsPg && featsPg.length > 0) {
      const newFeatsList = featsPg.map((feat, index) =>
        index === indexF
          ? {
              id: -1,
              level: feat.level,
              feat: newFeat,
              selected: newFeat.toSelect ? emptyPrerequisite : undefined
            }
          : feat
      );

      setFeatsList(newFeatsList);
    }
  };

  const handleSubmit = () => {
    //   const list: {
    //     id?: number | null;
    //     feat?: { id: number } | null;
    //     level?: number;
    //     selected?: Prerequisite | null;
    //   }[] = featsToAddList.map((f) => {
    //     return {
    //       id: f.id === 0 ? null : f.id,
    //       feat: f.feat ? { id: f.feat?.id } : null,
    //       level: f.level,
    //       selected: f.selected ? f.selected : null
    //     };
    //   });
    //   const listBonus: {
    //     id: number | null;
    //     classFeat?: { id?: number } | null;
    //     selected?: Prerequisite | null;
    //   }[] = featsPcToSelectList.map((f) => {
    //     return {
    //       id: f.id ?? f.id,
    //       classFeat: f.classFeat ? { id: f.classFeat?.id } : null,
    //       selected: f.selected ? f.selected : null
    //     };
    //   });
    //   // console.log("list", list);
    //   // console.log("listBonus", listBonus);
    //   axios.post(urlFeats + "/" + charId, [...list, ...listBonus]);
    //   // window.location.reload();
  };

  const changeSelected = (
    indexF: number,
    newItems: Feat | Item | Skill | Study
    // newFeat: Feat | null,
    // newItem: Item | null,
    // newSkill: Skill | Study | null
  ) => {
    if (featsPg && featsPg.length > 0) {
      const newFeatsList = featsPg.map((feat, index) => {
        if (index === indexF) {
          return {
            ...feat,
            selected: getNewSelected(feat, newItems)
          };
        }
        return feat;
      });

      setFeatsList(newFeatsList);
    }
  };

  // useEffect(() => {
  //   let checkTheNull: boolean = false;
  //   featsToAddList.forEach((f) => {
  //     if (f.feat === null) checkTheNull = true;
  //   });
  //   checkTheNull ? setChange(false) : setChange(true);
  // }, [featsToAddList]);

  const featsFilted: ItemInDrop<Feat>[] = addToDrop(
    featsDB
      .filter((fDB) => !fDB.featType?.includes(FeatsTypeEnum.CLASS))
      .sort((a, b) => a.featName.localeCompare(b.featName)),
    (fDB) => fDB.featName
  );

  const itemsSkills: ItemInDrop<Skill>[] = addToDrop(
    skillsDB,
    (s) => s.skillName.text
  );
  const itemsStudies: ItemInDrop<Study>[] = addToDrop(
    studiesDB,
    (s) => s.studyName.text
  );
  const selectedSkills: (ItemInDrop<Skill> | ItemInDrop<Study>)[] = [
    ...itemsSkills,
    ...itemsStudies
  ];

  return (
    <PageLayout
      title={"Feats"}
      onAction={handleSubmit}
      buttons={{
        back: { text: "Classes", link: "/class/" + charId },
        next: { text: "Skills", link: "/feat/" + charId, change: change }
      }}
    >
      {featsPg &&
        featsPg.map((f: FeatPc, indexF) => {
          const title: string = getTitle(f);
          const selectedFeats: string | null = getSelectedFeats(f);
          const selectedSkillsRanks: string | null = getSelectedSkills(f);

          const selectedItems: string | null = getSelectedItems(f);
          const itemsFilted: ItemInDrop<Item>[] = addToDrop(
            itemsDB
              .filter((iDB) => iDB.itemType === "WEAPON")
              .sort((a, b) => a.name.localeCompare(b.name)),
            (iDB) => iDB.name
          );
          const featsBonusFilted: ItemInDrop<Feat>[] = addToDrop(
            featsDB
              .filter(
                (fDB) =>
                  !fDB.featType?.some((ft) =>
                    f.classFeat?.feat?.toSelect?.featType?.includes(ft)
                  )
              )
              .sort((a, b) => a.featName.localeCompare(b.featName)),
            (fDB) => fDB.featName
          );
          const toShowList: ({
            text: string;
            drop: ItemInDrop<Feat | Item | Skill | Study>[];
          } | null)[] = [
            selectedFeats ? { text: selectedFeats, drop: featsFilted } : null,
            selectedItems ? { text: selectedItems, drop: itemsFilted } : null,
            selectedSkillsRanks
              ? { text: selectedSkillsRanks, drop: selectedSkills }
              : null
          ];
          return (
            <div key={indexF} className="rpgui-container-framed golden">
              <PageLayoutFeats>
                <PageLayoutFeatsComponent>
                  <p onClick={() => clearFeat(indexF)}>{title}</p>
                </PageLayoutFeatsComponent>

                <PageLayoutFeatsComponent>
                  {f.feat && !f.classFeat && featsDB && (
                    <DropdownComponent
                      options={featsFilted || []}
                      onAction={(newFeat) => changeFeat(indexF, newFeat)}
                    />
                  )}
                </PageLayoutFeatsComponent>
              </PageLayoutFeats>

              {toShowList.map(
                (t) =>
                  t && (
                    <PageLayoutFeatsComponent>
                      <PageLayoutFeatsComponent>
                        {t.text}
                        <DropdownComponent
                          options={t.drop || []}
                          onAction={(newItem) =>
                            changeSelected(indexF, newItem)
                          }
                        />
                      </PageLayoutFeatsComponent>
                    </PageLayoutFeatsComponent>
                  )
              )}
              </div>
              )
              }}
          </PageLayout>
  );
}

              {/* <PageLayoutFeats>
                <PageLayoutFeatsComponent></PageLayoutFeatsComponent>
              </PageLayoutFeats>

              {selectedSkillsRanks && (
                <PageLayoutFeatsComponent>
                  <p>{selectedSkillsRanks}</p>
                </PageLayoutFeatsComponent>
              )}
              {selectedItems && (
                <PageLayoutFeatsComponent>
                  <DropdownComponent
                    options={itemsFilted || []}
                    onAction={(newItem) => changeSelected(indexF, newItem)}
                  />
                  <p>{selectedItems}</p>
                </PageLayoutFeatsComponent>
              )} */}

              {/* <p>{selectedFeats}</p> */}
              {/* {f.classFeat?.feat?.toSelect?.featType && ( */}
              <>
                {/* {featsBonusFilted && ( */}
                {/* <DropdownComponent
                  options={featsBonusFilted || []}
                  onAction={(newItem) => changeSelected(indexF, newItem)}
                /> */}
                {/* // )} */}
              </>
              {/* )} */}
              {/* <p>{selectedItems}</p>
              <p>{f.selected?.weaponType?.text}</p>
              {selectedItems && (
                <DropdownComponent
                  options={itemsFilted || []}
                  onAction={(newItem) => changeSelected(indexF, newItem)}
                />
              )}
              <p>{selectedSkillsRanks}</p>
            </div>
          ); */}
        {/* })} */}
      {/* {featsList
        ?.filter((f) => f.classFeat)
        .map((f, indexF) => {
          const skillsRanks: string = getSkillStudyRanks(
            f.feat?.modifiers?.skillStudy
          );
          return (
            <div key={indexF}>
              <p>{f.classFeat?.className + " " + f.classFeat?.feat.featName}</p>
              <p>{f.classFeat?.feat.toSelect?.featType}</p> \\ il feat e' usato
              come filtro
              <p>
                {f.classFeat?.toSelect?.items?.map((i) => i.name).join(", ")}
              </p>
              <p>{skillsRanks}</p>
              {/* <p>{f.classFeat?.toSelect?.items?.map((i) => i.name).join(", ")}</p> */}
      {/* </div>
          ); */}

      {/* {featsList && featsList.map((f, indexF) => (
        <div key={indexF}> */}
      {/* <p>{f.level && f.level + ".lv "}{f.feat?.featName}</p>
          {f.feat?.toSelect && f.feat?.toSelect.items?.map((i) => (
            <p>{i.name}</p>
          ))}
          {f.classFeat?.toSelect && (
            <p>{f.classFeat?.toSelect?.weaponType?.text}</p>
          )}
          {f.selected && (
            f.selected.items && (
              <p style={{color: "yellow"}}>{f.selected.items[0].name}</p>
            )
          )} */}
      {/* </div>
      ))} */}
      {/* {featsToAddList
        .sort((a, b) => (a.level ?? 0) - (b.level ?? 0))
        .map((f, index) => {
          let prevFeatNotNull: boolean = true;
          if (
            index !== 0 &&
            !featsToAddList[index - 1].feat &&
            !featsToAddList[index].feat
          ) {
            prevFeatNotNull = false;
          }
          return (
            <div className="rpgui-container-framed-grey" key={index}>
              {filtroList && itemList ? (
                <FeatToAddInLevel
                  key={f.level + ".FeatToAddInLevel"}
                  filtro={filtroList}
                  prevFeatNotNull={index === 0 ? true : prevFeatNotNull}
                  element={f}
                  indexItem={index}
                  items={itemList}
                  onAction={newFeatsToAddList}
                />
              ) : null}
            </div>
          );
        })}
      {featsPcToSelectList
        .sort((a, b) => (a.classFeat?.level ?? 0) - (b.classFeat?.level ?? 0))
        .map((f, indexF) => (
          <div key={indexF}>
            {filtroList ? (
              <FeatPcToAddInLevel
                key={f.level + ".PcToSelect"}
                featIndex={indexF}
                element={f}
                filtro={filtroList}
                onAction={newFeatsPcToAddList}
              />
            ) : null}
          </div>
        ))} */}
    

export const PageLayoutFeats: React.FC<React.PropsWithChildren<{}>> = ({
  children
}) => {
  return (
    <div
      style={{
        borderColor: "goldenrod",
        borderWidth: "2px",
        borderStyle: "solid",
        display: "grid",
        gridTemplateColumns: "3fr 1fr",
        gap: "10px",
        padding: "10px"
      }}
    >
      {children}
    </div>
  );
};

export const PageLayoutFeatsComponent: React.FC<
  React.PropsWithChildren<{}>
> = ({ children }) => {
  return (
    <div
      style={{
        borderColor: "goldenrod",
        borderWidth: "2px",
        borderStyle: "solid"
      }}
    >
      {children}
    </div>
  );
};

const getTitle = (f: FeatPc): string => {
  const level: string = f.level ? f.level + ".lv " : "";
  const nameFeat: string =
    f.feat?.featName || "" + f.classFeat?.feat.featName || "";
  const className: string | null = f.classFeat
    ? f.classFeat?.className + " "
    : null;
  return className
    ? FormattingText(className) + " " + nameFeat
    : "" + level + nameFeat;
};

const getSelectedFeats = (f: FeatPc): string | null => {
  return f.selected?.feats?.map((f) => f.featName).join(", ") || null;
};

const getSelectedSkills = (f: FeatPc): string | null => {
  return f.feat?.modifiers?.skillStudy
    ? getSkillStudyRanksString(f.feat?.modifiers?.skillStudy)
    : f.selected?.skillStudy
      ? getSkillStudyRanksString(f.selected?.skillStudy)
      : null;
};

const getSelectedItems = (f: FeatPc): string | null => {
  return f.selected?.items?.map((i) => i.name).join(", ") || null;
};

const getNewSelected = (
  f: FeatPc,
  newItems: Feat | Item | Skill | Study
): Prerequisite | undefined => {
  let newPrerequisite: Prerequisite = emptyPrerequisite;

  if (newItems && "featName" in newItems && f.feat?.toSelect?.featType) {
    newPrerequisite = { ...newPrerequisite, feats: [newItems] };
  }

  if (newItems && "itemType" in newItems && f.feat?.toSelect?.weaponType) {
    newPrerequisite = { ...newPrerequisite, items: [newItems] };
  }

  if (
    newItems &&
    ("skillName" in newItems || "studyName" in newItems) &&
    f.feat?.modifiers?.skillStudy
  ) {
    newPrerequisite = {
      ...newPrerequisite,
      skillStudy: [
        {
          skill: "skillName" in newItems ? newItems : undefined,
          study: "studyName" in newItems ? newItems : undefined,
          rank: 3
        }
      ]
    };
  }
  return newPrerequisite.feats ||
    newPrerequisite.items ||
    newPrerequisite.skillStudy
    ? newPrerequisite
    : undefined;
};

// export type ListOfToSelect = {
//   feats?: ItemInDrop<Feat>[];
//   items?: ItemsList,
//   weapons?: ItemInDrop<Item>[];
//   armors?: ItemInDrop<Armor>[];
// };

// export type FeatToAddInLevelProps = {
//   element: FeatPc;
//   filtro: FiltroPrerequisite;
//   prevFeatNotNull?: boolean;
//   indexItem: number;
//   items: ListOfToSelect;
//   onAction: (option: FeatPc, ind: number) => void;
// };

// export const itemsDropFromPrerequisite = (
//   pre: Prerequisite,
//   filtro: FiltroPrerequisite
// ): ItemInDrop<any>[] => {
//   if (pre.featType && pre.featType.length > 0) {
//     return findPrerequisiteFeatsInItemDrop(pre.featType, filtro.feats);
//   }
//   if (pre.feats && pre.feats.length > 0)
//     return addToDrop(pre.feats, (i) => i.featName);
//   if (pre.weaponType && pre.weaponType.text.includes("PROFICENCY"))
//     return filtro.weaponsProficency;
//   if (pre.weaponType) return filtro.weapons;
//   // .filter(
//   //     (w) =>
//   //       (w.item as Weapon).type &&
//   //       (w.item as Weapon).type.includes(pre.weaponType?.text ? pre.weaponType.text : "")
//   //   );
//   return [];
// };

// export const FeatToAddInLevel: React.FC<FeatToAddInLevelProps> = ({
//   element,
//   filtro,
//   prevFeatNotNull,
//   indexItem,
//   items,
//   onAction
// }) => {
//   const featAll: ListOfToSelect = items;

//   const [itemList, setItemList] = useState<ItemInDrop<any>[]>();
//   const [featsToAdd, setFeatsToAdd] = useState<FeatPc>(element);
//   const [filter, setFilter] = useState<FeatsTypeEnum>(FeatsTypeEnum.ALL);
//   const [toSelect, setToSelect] = useState<ItemInDrop<any>[]>([]);

//   useEffect(() => {
//     setToSelect(
//       featsToAdd.feat?.toSelect
//         ? itemsDropFromPrerequisite(featsToAdd.feat.toSelect, filtro)
//         : []
//     );
//   }, [featsToAdd, filtro]);

//   useEffect(() => {
//     const filtred: ItemInDrop<any>[] =
//       filter === FeatsTypeEnum.ALL
//         ? featAll.feats
//         : featAll.feats.filter(
//             (f) =>
//               (f.item as Feat).featType &&
//               (f.item as Feat).featType.includes(filter)
//           );
//     setItemList(filtred);
//   }, [featAll, filter]);

//   const addFeat = (f: Feat) => {
//     const newF = {
//       ...featsToAdd,
//       feat: f,
//       toSelect: f.toSelect ?? emptyPrerequisite
//     };
//     setFeatsToAdd(newF);
//     onAction(newF, indexItem);
//   };
//   const addToSelect = (f: Item | Feat) => {
//     const newF = (f as Item).name
//       ? {
//           ...featsToAdd,
//           selected: {
//             ...featsToAdd.selected,
//             items: [f as Item]
//           }
//         }
//       : {
//           ...featsToAdd,
//           selected: {
//             ...featsToAdd.selected,
//             feats: [f as Feat]
//           }
//         };
//     // setFeatsToAdd(newF);
//     // onAction(newF, indexItem);
//   };

//   const addFilter = (s: FeatsTypeEnum) => {
//     setFilter(s);
//   };

//   const emptyTheFeat = () => {
//     setFeatsToAdd({
//       feat: null,
//       level: featsToAdd.level,
//       id: null,
//       selected: null
//     });
//     onAction(
//       {
//         feat: null,
//         level: featsToAdd.level,
//         id: null,
//         selected: null
//       },
//       indexItem
//     );
//   };

//   return (
//     <div key={indexItem + ".FeatToAddInLevel"}>
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 2 }}>
//           <p>
//             lv.{featsToAdd.level}{" "}
//             {featsToAdd ? (
//               <span onClick={emptyTheFeat}>{featsToAdd.feat?.featName}</span>
//             ) : null}
//             {featsToAdd.selected &&
//               featsToAdd.selected?.items?.flatMap((i) => i.name).join(", ")}
//           </p>
//         </div>
//         <div style={{ flex: 1 }}>
//           {prevFeatNotNull && (
//             <DropdownComponent
//               options={filtro.featsType}
//               onAction={addFilter}
//             />
//           )}
//         </div>
//         <div style={{ flex: 3 }}>
//           {itemList ? (
//             <div>
//               {prevFeatNotNull && (
//                 <DropdownComponent options={itemList} onAction={addFeat} />
//               )}
//               <p></p>
//             </div>
//           ) : (
//             <p>"---loading---"</p>
//           )}
//         </div>
//       </div>
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 3 }}></div>
//         <div style={{ flex: 3 }}>
//           {toSelect.length > 0 && (
//             <div>
//               {prevFeatNotNull && (
//                 <DropdownComponent options={toSelect} onAction={addToSelect} />
//               )}
//               <p></p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div>
//         {featsToAdd.feat && featsToAdd.feat?.id !== 0 ? (
//           <FeatToAdd feat={featsToAdd.feat} />
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export type FeatPcToAddInLevelProps = {
//   featIndex: number;
//   element: FeatPc;
//   filtro: FiltroPrerequisite;
//   onAction: (option: FeatPc, ind: number) => void;
// };

// export const FeatPcToAddInLevel: React.FC<FeatPcToAddInLevelProps> = ({
//   featIndex,
//   element,
//   filtro,
//   onAction
// }) => {
//   const [featsToAdd, setFeatsToAdd] = useState<FeatPc>(element);
//   const [toSelect, setToSelect] = useState<ItemInDrop<any>[]>([]);
//   const [toSelectInSelect, setToSelectInSelect] = useState<ItemInDrop<any>[]>(
//     []
//   );

//   useEffect(() => {
//     setToSelect(
//       featsToAdd.classFeat?.feat?.toSelect
//         ? itemsDropFromPrerequisite(featsToAdd.classFeat.feat.toSelect, filtro)
//         : []
//     );
//   }, [featsToAdd, filtro]);

//   useEffect(() => {
//     setToSelectInSelect(
//       featsToAdd.selected?.feats && featsToAdd.selected?.feats?.length > 0
//         ? featsToAdd.classFeat?.feat?.toSelect
//           ? featsToAdd.selected?.feats[0].toSelect
//             ? itemsDropFromPrerequisite(
//                 featsToAdd.selected?.feats[0].toSelect,
//                 filtro
//               )
//             : []
//           : []
//         : []
//     );
//   }, [featsToAdd, filtro]);

//   useEffect(() => {
//     onAction(featsToAdd, featIndex);
//   }, [featsToAdd, featIndex]);

//   const addToSelect = (f: Item | Feat) => {
//     if ((f as Item).name) {
//       setFeatsToAdd({
//         ...featsToAdd,
//         selected: featsToAdd.selected
//           ? {
//               ...featsToAdd.selected,
//               items: [f as Item]
//             }
//           : undefined
//       });
//     }
//     if ((f as Feat).featName) {
//       setFeatsToAdd({
//         ...featsToAdd,
//         selected: featsToAdd.selected
//           ? {
//               ...featsToAdd.selected,
//               feats: [f as Feat],
//               items: undefined
//             }
//           : undefined
//       });
//     }
//   };

//   return (
//     <div key={featIndex} className="rpgui-container-framed-grey">
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 2 }}>
//           <p>
//             {"lv."}
//             {featsToAdd.classFeat?.level} {featsToAdd.classFeat?.className}{" "}
//             {featsToAdd.classFeat?.feat?.featName}
//           </p>
//           <p>
//             {featsToAdd.selected?.feats?.flatMap((f) => f.featName).join(", ")}
//           </p>
//           <p>{featsToAdd.selected?.items?.flatMap((i) => i.name).join(", ")}</p>
//         </div>
//         <div style={{ flex: 3 }}>
//           {toSelect ? (
//             <div>
//               <DropdownComponent options={toSelect} onAction={addToSelect} />
//               <p></p>
//             </div>
//           ) : null}
//         </div>
//       </div>
//       <div style={{ display: "flex" }}>
//         <div style={{ flex: 2 }}></div>
//         <div style={{ flex: 3 }}>
//           {toSelectInSelect.length > 0 && (
//             <div>
//               <DropdownComponent
//                 options={toSelectInSelect}
//                 onAction={addToSelect}
//               />
//               <p></p>
//             </div>
//           )}
//         </div>
//       </div>
//       <div>
//         {featsToAdd.classFeat?.feat ? (
//           <FeatToAdd feat={featsToAdd.classFeat.feat} />
//         ) : null}
//       </div>
//       <div>
//         {featsToAdd.selected?.feats ? (
//           <FeatToAdd feat={featsToAdd.selected?.feats[0]} />
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export type FeatProp = {
//   feat?: Feat;
// };

// export const FeatToAdd: React.FC<FeatProp> = ({ feat }) => {
//   if (!feat) return null;
//   return (
//     <div className="rpgui-container-framed">
//       <h2>{feat.featName}</h2>
//       {feat.prerequisiteList ? (
//         <PrerequisiteFeats pre={feat.prerequisiteList} />
//       ) : null}
//       {feat.benefit === null ? null : (
//         <p>
//           <span style={{ color: "yellow" }}>benefit:</span>{" "}
//           <span>{feat.benefit}</span>
//         </p>
//       )}
//       {feat.normal === null ? null : (
//         <p>
//           <span style={{ color: "yellow" }}>normal:</span>{" "}
//           <span>{feat.normal}</span>
//         </p>
//       )}

//       {feat.special === null ? null : (
//         <p>
//           <span style={{ color: "yellow" }}>special:</span>{" "}
//           <span>{feat.special}</span>
//         </p>
//       )}
//     </div>
//   );
// };
// export type PrerequisiteProp = {
//   pre: Prerequisite;
// };

// export const PrerequisiteFeats: React.FC<PrerequisiteProp> = ({ pre }) => {
//   const text: string = pre.text != null ? pre.text : "";
//   return (
//     <div>
//       <p>
//         <span style={{ color: "yellow" }}>prerequisite: </span>
//         <span>{text}</span>
//       </p>
//     </div>
//   );
// };
