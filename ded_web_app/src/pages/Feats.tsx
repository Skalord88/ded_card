import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { Feat, FeatPc } from "../components/Feats/Interface/FeatInterface";
import { addToDrop, itemInDrop } from "../components/functions";
import { CharacterPc, Item, Weapon } from "../components/interfaces";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";
import { urlChar, urlFeats, urlItems } from "../components/url";
import { emptyPrerequisite } from "../components/variables";
import React from "react";
import {
  createClassPcBonusFeats,
  createClassPcClassFeats,
  findPrerequisiteFeatsInItemDrop
} from "../components/Feats/function";
import { PageLayout } from "./AppLayout";

export type FiltroPrerequisite = {
  featsType: itemInDrop[];
  feats: itemInDrop[];
  weapons: itemInDrop[];
  weaponsProficency: itemInDrop[];
  skills: itemInDrop[];
};

export function Feats() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [itemList, setItemList] = useState<ListOfToSelect>();
  const [filtroList, setFiltroList] = useState<FiltroPrerequisite>();
  const [featsToAddList, setFeatsToAddList] = useState<FeatPc[]>([]);
  const [featsPcToSelectList, setFeatsPcToAddList] = useState<FeatPc[]>([]);
  // const [modChar, setModChar] = useState<CharToModify>();
  const [change, setChange] = useState(false);

  // const [choosenFeatsCheck, setChoosenFeatsCheck] = useState<boolean[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const resItems = await axios.get(urlItems);

        const charData = await resChar.data;
        setChar(charData);

        const newModChar = await createModChar(charData, resItems.data);
        // setModChar(newModChar);

        const resFeats = await axios.get(urlFeats);
        const listOfFeats: Feat[] = resFeats.data;
        const itemsFeats: itemInDrop[] = addToDrop(
          listOfFeats.filter(
            (f) =>
              f.featType === null ||
              (!f.featType.includes("CLASS") && !f.featType.includes("MAGE"))
          ),
          "feat"
        );

        const dbWeapons = await resItems.data.weaponsList;
        const itemsWeapons = addToDrop(dbWeapons, "items");
        const dbArmors = await resItems.data.armorsList;
        const itemsArmors = addToDrop(dbArmors, "items");

        setItemList({
          feats: itemsFeats,
          weapons: itemsWeapons,
          armors: itemsArmors
        });

        setFiltroList({
          featsType: addToDrop(
            Array.from(
              new Set(
                itemsFeats.flatMap((f) =>
                  (f.item as Feat).featType
                    ? ["ALL"].concat((f.item as Feat).featType)
                    : []
                )
              )
            ),
            "filter"
          ),
          feats: addToDrop(Array.from(new Set(listOfFeats)), "feat"),
          weapons: addToDrop(
            Array.from(
              new Set(
                itemsWeapons.flatMap((w) =>
                  (w.item as Weapon) ? (w.item as Weapon) : []
                )
              )
            ),
            "items"
          ),
          weaponsProficency: addToDrop(
            newModChar?.proficency.specific
              ? newModChar?.proficency.specific
              : [],
            "items"
          ),
          skills: addToDrop(["culi", "tette"], "filter")
        });
        const quantiFeats: FeatPc[] = createClassPcBonusFeats(newModChar);
        setFeatsToAddList(quantiFeats);
        // const checkQuantiFeats: boolean[] = [];
        // quantiFeats.forEach((f, index) => {
        //   if (index === 0) {
        //     checkQuantiFeats.push(true);
        //   } else {
        //     f.feat ? checkQuantiFeats.push(true) : checkQuantiFeats.push(false);
        //   }
        //   setChoosenFeatsCheck(checkQuantiFeats);
        // });

        setFeatsPcToAddList(createClassPcClassFeats(newModChar));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const newFeatsToAddList = (f: FeatPc, i: number) => {
    const updatedList = [...featsToAddList];
    updatedList[i] = f;
    setFeatsToAddList(updatedList);
    // const seltiFeats = [...choosenFeatsCheck];
    // seltiFeats[i] = true;
    // console.log("seltiFeats", seltiFeats);
    // console.log("updatedList", updatedList);
    // setChoosenFeatsCheck(seltiFeats);
  };

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

  const newFeatsPcToAddList = (f: FeatPc, i: number) => {
    if (featsPcToSelectList) {
      const updatedList = [...featsPcToSelectList];
      updatedList[i] = f;
      setFeatsPcToAddList(updatedList);
    }
  };

  const handleSubmit = () => {
    const list: {
      id?: number | null;
      feat?: { id: number } | null;
      level?: number;
      selected?: Prerequisite | null;
    }[] = featsToAddList.map((f) => {
      return {
        id: f.id === 0 ? null : f.id,
        feat: f.feat ? { id: f.feat?.id } : null,
        level: f.level,
        selected: f.selected ? f.selected : null
      };
    });

    const listBonus: {
      id: number | null;
      classFeat?: { id?: number } | null;
      selected?: Prerequisite | null;
    }[] = featsPcToSelectList.map((f) => {
      return {
        id: f.id ?? f.id,
        classFeat: f.classFeat ? { id: f.classFeat?.id } : null,
        selected: f.selected ? f.selected : null
      };
    });
    // console.log("list", list);
    // console.log("listBonus", listBonus);
    axios.post(urlFeats + "/" + charId, [...list, ...listBonus]);
    // window.location.reload();
  };

  useEffect(() => {
    let checkTheNull: boolean = false;
    featsToAddList.forEach((f) => {
      if (f.feat === null) checkTheNull = true;
    });
    checkTheNull ? setChange(false) : setChange(true);
  }, [featsToAddList]);

  return (
    <PageLayout
      title={"Feats"}
      // pageStyle="1fr 2fr"
      onAction={handleSubmit}
      buttons={{
        back: { text: "Classes", link: "/class/" + charId },
        next: { text: "Skills", link: "/feat/" + charId, change: change }
      }}
    >
      {featsToAddList
        .sort((a, b) => (a.level ?? 0) - (b.level ?? 0))
        .map((f, index) => {
          let prevFeatNotNull: boolean = true;
          if (index !== 0 && !featsToAddList[index - 1].feat 
            && !featsToAddList[index].feat) {prevFeatNotNull = false}
          return (
          <div className="rpgui-container-framed-grey" key={index}>
            {filtroList && itemList ? (
              <FeatToAddInLevel
                key={f.level + ".FeatToAddInLevel"}
                filtro={filtroList}
                prevFeatNotNull={index === 0? true : prevFeatNotNull}
                element={f}
                indexItem={index}
                items={itemList}
                onAction={newFeatsToAddList}
              />
            ) : null}
          </div>
        )})}
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
        ))}
    </PageLayout>
  );
}

export type ListOfToSelect = {
  feats: itemInDrop[];
  weapons: itemInDrop[];
  armors: itemInDrop[];
};

export type FeatToAddInLevelProps = {
  element: FeatPc;
  filtro: FiltroPrerequisite;
  prevFeatNotNull?: boolean;
  indexItem: number;
  items: ListOfToSelect;
  onAction: (option: FeatPc, ind: number) => void;
};

export const itemsDropFromPrerequisite = (
  pre: Prerequisite,
  filtro: FiltroPrerequisite
): itemInDrop[] => {
  if (pre.featType && pre.featType.length > 0) {
    return findPrerequisiteFeatsInItemDrop(pre.featType, filtro.feats);
  }
  if (pre.feats && pre.feats.length > 0) return addToDrop(pre.feats, "feat");
  if (pre.weaponType && pre.weaponType.includes("PROFICENCY"))
    return filtro.weaponsProficency;
  if (pre.weaponType && pre.weaponType.length > 0)
    return filtro.weapons.filter(
      (w) =>
        (w.item as Weapon).type &&
        (w.item as Weapon).type.includes(pre.weaponType ? pre.weaponType : "")
    );
  return [];
};

export const FeatToAddInLevel: React.FC<FeatToAddInLevelProps> = ({
  element,
  filtro,
  prevFeatNotNull,
  indexItem,
  items,
  onAction
}) => {
  const featAll: ListOfToSelect = items;

  const [itemList, setItemList] = useState<itemInDrop[]>();
  const [featsToAdd, setFeatsToAdd] = useState<FeatPc>(element);
  const [filter, setFilter] = useState<string>("");
  const [toSelect, setToSelect] = useState<itemInDrop[]>([]);

  useEffect(() => {
    setToSelect(
      featsToAdd.feat?.toSelect
        ? itemsDropFromPrerequisite(featsToAdd.feat.toSelect, filtro)
        : []
    );
  }, [featsToAdd, filtro]);

  useEffect(() => {
    const filtred: itemInDrop[] =
      filter === "ALL"
        ? featAll.feats
        : featAll.feats.filter(
            (f) =>
              (f.item as Feat).featType &&
              (f.item as Feat).featType.includes(filter)
          );
    setItemList(filtred);
  }, [featAll, filter]);

  const addFeat = (f: Feat) => {
    const newF = {
      ...featsToAdd,
      feat: f,
      toSelect: f.toSelect ?? emptyPrerequisite
    };
    setFeatsToAdd(newF);
    onAction(newF, indexItem);
  };
  const addToSelect = (f: Item | Feat) => {
    const newF = (f as Item).name
      ? {
          ...featsToAdd,
          selected: {
            ...featsToAdd.selected,
            items: [f as Item]
          }
        }
      : {
          ...featsToAdd,
          selected: {
            ...featsToAdd.selected,
            feats: [f as Feat]
          }
        };
    setFeatsToAdd(newF);
    onAction(newF, indexItem);
  };

  const addFilter = (s: string) => {
    setFilter(s as string);
  };

  const emptyTheFeat = () => {
    setFeatsToAdd({
      feat: null,
      level: featsToAdd.level,
      id: null,
      selected: null
    });
    onAction(
      {
        feat: null,
        level: featsToAdd.level,
        id: null,
        selected: null
      },
      indexItem
    );
  };

  return (
    <div key={indexItem + ".FeatToAddInLevel"}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <p>
            lv.{featsToAdd.level}{" "}
            {featsToAdd ? (
              <span onClick={emptyTheFeat}>{featsToAdd.feat?.featName}</span>
            ) : null}
            {featsToAdd.selected &&
              featsToAdd.selected?.items?.flatMap((i) => i.name).join(", ")}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          {prevFeatNotNull && <DropdownComponent options={filtro.featsType} onAction={addFilter} />}
        </div>
        <div style={{ flex: 3 }}>
          {itemList ? (
            <div>
              {prevFeatNotNull && <DropdownComponent options={itemList} onAction={addFeat} />}
              <p></p>
            </div>
          ) : (
            <p>"---loading---"</p>
          )}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 3 }}></div>
        <div style={{ flex: 3 }}>
          {toSelect.length > 0 && (
            <div>
              {prevFeatNotNull && <DropdownComponent options={toSelect} onAction={addToSelect} />}
              <p></p>
            </div>
          )}
        </div>
      </div>
      <div>
        {featsToAdd.feat && featsToAdd.feat?.id !== 0 ? (
          <FeatToAdd feat={featsToAdd.feat} />
        ) : null}
      </div>
    </div>
  );
};

export type FeatPcToAddInLevelProps = {
  featIndex: number;
  element: FeatPc;
  filtro: FiltroPrerequisite;
  onAction: (option: FeatPc, ind: number) => void;
};

export const FeatPcToAddInLevel: React.FC<FeatPcToAddInLevelProps> = ({
  featIndex,
  element,
  filtro,
  onAction
}) => {
  const [featsToAdd, setFeatsToAdd] = useState<FeatPc>(element);
  const [toSelect, setToSelect] = useState<itemInDrop[]>([]);
  const [toSelectInSelect, setToSelectInSelect] = useState<itemInDrop[]>([]);

  useEffect(() => {
    setToSelect(
      featsToAdd.classFeat?.feat?.toSelect
        ? itemsDropFromPrerequisite(featsToAdd.classFeat.feat.toSelect, filtro)
        : []
    );
  }, [featsToAdd, filtro]);

  useEffect(() => {
    setToSelectInSelect(
      featsToAdd.selected?.feats && featsToAdd.selected?.feats?.length > 0
        ? featsToAdd.classFeat?.feat?.toSelect
          ? featsToAdd.selected?.feats[0].toSelect
            ? itemsDropFromPrerequisite(
                featsToAdd.selected?.feats[0].toSelect,
                filtro
              )
            : []
          : []
        : []
    );
  }, [featsToAdd, filtro]);

  useEffect(() => {
    onAction(featsToAdd, featIndex);
  }, [featsToAdd, featIndex]);

  const addToSelect = (f: Item | Feat) => {
    if ((f as Item).name) {
      setFeatsToAdd({
        ...featsToAdd,
        selected: {
          ...featsToAdd.selected,
          items: [f as Item]
        }
      });
    }
    if ((f as Feat).featName) {
      setFeatsToAdd({
        ...featsToAdd,
        selected: {
          ...featsToAdd.selected,
          feats: [f as Feat],
          items: undefined
        }
      });
    }
  };

  return (
    <div key={featIndex} className="rpgui-container-framed-grey">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <p>
            {"lv."}
            {featsToAdd.classFeat?.level} {featsToAdd.classFeat?.className}{" "}
            {featsToAdd.classFeat?.feat?.featName}
          </p>
          <p>
            {featsToAdd.selected?.feats?.flatMap((f) => f.featName).join(", ")}
          </p>
          <p>{featsToAdd.selected?.items?.flatMap((i) => i.name).join(", ")}</p>
        </div>
        <div style={{ flex: 3 }}>
          {toSelect ? (
            <div>
              <DropdownComponent options={toSelect} onAction={addToSelect} />
              <p></p>
            </div>
          ) : null}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}></div>
        <div style={{ flex: 3 }}>
          {toSelectInSelect.length > 0 && (
            <div>
              <DropdownComponent
                options={toSelectInSelect}
                onAction={addToSelect}
              />
              <p></p>
            </div>
          )}
        </div>
      </div>
      <div>
        {featsToAdd.classFeat?.feat ? (
          <FeatToAdd feat={featsToAdd.classFeat.feat} />
        ) : null}
      </div>
      <div>
        {featsToAdd.selected?.feats ? (
          <FeatToAdd feat={featsToAdd.selected?.feats[0]} />
        ) : null}
      </div>
    </div>
  );
};

export type FeatProp = {
  feat?: Feat;
};

export const FeatToAdd: React.FC<FeatProp> = ({ feat }) => {
  if (!feat) return null;
  return (
    <div className="rpgui-container-framed">
      <h2>{feat.featName}</h2>
      {feat.prerequisiteList ? (
        <PrerequisiteFeats pre={feat.prerequisiteList} />
      ) : null}
      {feat.benefit === null ? null : (
        <p>
          <span style={{ color: "yellow" }}>benefit:</span>{" "}
          <span>{feat.benefit}</span>
        </p>
      )}
      {feat.normal === null ? null : (
        <p>
          <span style={{ color: "yellow" }}>normal:</span>{" "}
          <span>{feat.normal}</span>
        </p>
      )}

      {feat.special === null ? null : (
        <p>
          <span style={{ color: "yellow" }}>special:</span>{" "}
          <span>{feat.special}</span>
        </p>
      )}
    </div>
  );
};
export type PrerequisiteProp = {
  pre: Prerequisite;
};

export const PrerequisiteFeats: React.FC<PrerequisiteProp> = ({ pre }) => {
  const text: string = pre.text != null ? pre.text : "";
  return (
    <div>
      <p>
        <span style={{ color: "yellow" }}>prerequisite: </span>
        <span>{text}</span>
      </p>
    </div>
  );
};
