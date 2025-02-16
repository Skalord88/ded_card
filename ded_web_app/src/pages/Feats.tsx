import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DropdownComponent } from "../components/DropDown/DropDown";
import {
  ClassFeats,
  Feat,
  FeatPc
} from "../components/Feats/Interface/FeatInterface";
import { addToDrop, itemInDrop } from "../components/functions";
import { CharacterPc, Item, Weapon } from "../components/interfaces";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";
import { CharSummary } from "../components/Summary/CharSummary";
import { urlChar, urlFeats, urlItems } from "../components/url";
import {
  emptyFeat,
  emptyFeatPc,
  emptyPrerequisite
} from "../components/variables";
import React from "react";
import { findPrerequisiteFeatsInItemDrop } from "../components/Feats/function";

// export type FeatPc = {
//   classe?: { id: number; text: string };
//   feat: Feat;
//   level: number;
//   selected?: Prerequisite;
//   toSelect?: Prerequisite;
// };

// export const emptyFeatPc: FeatPc = {
//   feat: emptyFeat,
//   level: 0,
//   selected: emptyPrerequisite,
//   toSelect: emptyPrerequisite
// };

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
  const [modChar, setModChar] = useState<CharToModify>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const resItems = await axios.get(urlItems);

        const char = resChar.data;
        setChar(char);
        const newModChar = createModChar(resChar.data, resItems.data);
        setModChar(newModChar);

        const resFeats = await axios.get(urlFeats);
        const listOfFeats: Feat[] = resFeats.data;
        const itemsFeats: itemInDrop[] = addToDrop(
          listOfFeats.filter(
            (f) => f.featType === null || !f.featType.includes("CLASS")
          ),
          "feat"
        );

        const dbWeapons = resItems.data.weaponsList;
        const itemsWeapons = addToDrop(dbWeapons, "items");
        const dbArmors = resItems.data.armorsList;
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

        const quantiFeats: number =
          Math.floor((newModChar?.adjBonus.adjLv + newModChar.classesLv) / 3) +
          1;

        let featsFromLevel: FeatPc[] = [];

        for (let i = 0; i < quantiFeats; i++) {
          featsFromLevel.push({
            feat: emptyFeat,
            level: i === 0 ? 1 : i * 3,
            selected: emptyPrerequisite
          });
        }

        for (let i = 0; i < newModChar.feats.pcFeats.fromLevel.length; i++) {
          featsFromLevel[i] = {
            ...featsFromLevel[i],
            feat: newModChar.feats.pcFeats.fromLevel[i].feat,
            selected: newModChar.feats.pcFeats.fromLevel[i].selected
            // toSelect: newModChar.feats.pcFeats.fromLevel[i].feat.toSelect
          };
        }

        if (featsFromLevel) {
          setFeatsToAddList(featsFromLevel);
        }

        let classPcBonusFeats: FeatPc[] = newModChar.feats.classFeats
          .filter(
            (c: FeatPc) =>
              (c.feat.toSelect?.feats ||
                // c.toSelect?.feats ||
                c.feat.toSelect?.weaponType) &&
              !c.selected &&
              !c.feat.selected
          )
          .map((clF) =>
            clF
              ? {
                  classe: {
                    id: clF.classId,
                    text: clF.className
                  },
                  feat: clF.feat,
                  level: clF.level,
                  selected: emptyPrerequisite,
                  toSelect: clF.toSelect
                    ? clF.toSelect
                    : clF.feat.toSelect
                    ? clF.feat.toSelect
                    : emptyPrerequisite
                }
              : clF
          );

        if (classPcBonusFeats) {
          setFeatsPcToAddList(classPcBonusFeats);
        }
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
  };

  const newFeatsPcToAddList = (f: FeatPc, i: number) => {
    if (featsPcToSelectList) {
      const updatedList = [...featsPcToSelectList];
      updatedList[i] = f;
      setFeatsPcToAddList(updatedList);
    }
  };

  const handleSubmit = () => {
    const list: {
      feat: { id: number };
      level?: number;
      classFeat?: { id?: number };
      selected?: Prerequisite;
    }[] = featsToAddList
      .map((f) => {
        return {
          feat: { id: f.feat.id },
          level: f.level,
          selected: f.selected
        };
      });

    const listBonus: {
      feat: { id: number };
      level?: number;
      classFeat?: { id?: number };
      selected?: Prerequisite;
    }[] = featsPcToSelectList
      .map((f) => {
        return {
          feat: { id: f.feat.id },
          level: f.classFeat?.level,
          classFeat: { id: f.classFeat?.id },
          selected: f.selected
        };
      });
    console.log(list);
    console.log(listBonus);
    axios.post(urlFeats + "/" + charId, [list, listBonus]);

    // window.location.reload();
  };

  return (
    <>
      {char ? (
        <CharSummary
          character={char}
          // feats={featsToAddList}
        />
      ) : null}
      {featsToAddList.map((f) => (
        <div>
          <p>
            lv: {f.level}
            {" / "}
            feats: {f.feat.id} {f.feat.featName}
            {" / "}
            toSelect: {f.feat.toSelect?.weaponType}
            {f.feat.toSelect?.armorType}
            {f.feat.toSelect?.featType}
            {" / "}
            select: {f.selected?.items?.flatMap((w) => w.name).join(", ")}
            {f.selected?.feats?.flatMap((f) => f.featName).join(", ")}
          </p>
        </div>
      ))}
      {featsPcToSelectList.map((f) => (
        <div>
          <p>
            lv: {f.level}
            {" / "}
            feats: {f.feat.id} {f.feat.featName}
            {" / "}
            toSelect: {f.feat.toSelect?.weaponType}
            {f.feat.toSelect?.armorType}
            {f.feat.toSelect?.featType}
            {" / "}
            select: {f.selected?.items?.flatMap((w) => w.name).join(", ")}
            {f.selected?.feats?.flatMap((f) => f.featName).join(", ")}
          </p>
        </div>
      ))}
      <div>
        {
          <button className="rpgui-button" onClick={() => handleSubmit()}>
            <p>add Feats</p>
          </button>
        }
        {
          <button className="rpgui-button">
            <p>to Inventory</p>
          </button>
        }
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "50% 2% 48%" }}>
        <div
          className="rpgui-container-framed-grey"
          style={{ gridColumn: "1 / span 3", gridRow: 2 }}
        ></div>

        <div
          className="rpgui-container-framed-grey"
          style={{ gridColumn: "1 / span 3", gridRow: 1 }}
        >
          {featsToAddList.map((f, index) => (
            <div className="rpgui-container-framed-grey" key={index}>
              {filtroList && itemList ? (
                <div>
                  <FeatToAddInLevel
                    filtro={filtroList}
                    element={f}
                    indexItem={index}
                    items={itemList}
                    onAction={newFeatsToAddList}
                  />
                </div>
              ) : null}
            </div>
          ))}
          {featsPcToSelectList.map((f, indexF) => (
            <div>
              {filtroList && itemList ? (
                <FeatPcToAddInLevel
                  featIndex={indexF}
                  element={f}
                  filtro={filtroList}
                  onAction={newFeatsPcToAddList}
                />
              ) : null}
            </div>
          ))}
          {
            <button className="rpgui-button">
              <p>add Feats</p>
            </button>
          }
          {
            <button className="rpgui-button">
              <p>to Inventory</p>
            </button>
          }
          {featsToAddList.map((f) => (
            <div>
              <p>
                lv: {f.level}
                {" / "}
                feats: {f.feat.id} {f.feat.featName}
                {" / "}
                toSelect: {f.feat.toSelect?.weaponType}
                {f.feat.toSelect?.armorType}
                {f.feat.toSelect?.featType}
                {" / "}
                select: {f.selected?.items?.flatMap((w) => w.name).join(", ")}
                {f.selected?.feats?.flatMap((f) => f.featName).join(", ")}
              </p>
            </div>
          ))}
          {featsPcToSelectList.map((f) => (
            <div>
              <p>
                lv: {f.level}
                {" / "}
                feats: {f.feat.id} {f.feat.featName}
                {" / "}
                toSelect: {f.feat.toSelect?.weaponType}
                {f.feat.toSelect?.armorType}
                {f.feat.toSelect?.featType}
                {" / "}
                select: {f.selected?.items?.flatMap((w) => w.name).join(", ")}
                {f.selected?.feats?.flatMap((f) => f.featName).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
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
      featsToAdd.feat.toSelect
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
    setFeatsToAdd(emptyFeatPc);
    onAction(
      {
        feat: emptyFeat,
        level: 0
      },
      indexItem
    );
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <p>
            {indexItem === 0 ? (
              <span>{"lv.1 "}</span>
            ) : (
              <span>
                {"lv."}
                {indexItem * 3}{" "}
              </span>
            )}
            {featsToAdd ? (
              <span onClick={emptyTheFeat}>{featsToAdd.feat.featName}</span>
            ) : null}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <p>
            <DropdownComponent
              options={filtro.featsType}
              onAction={addFilter}
            />
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p>
            {itemList ? (
              <DropdownComponent options={itemList} onAction={addFeat} />
            ) : (
              "---loading---"
            )}
          </p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 3 }}></div>
        <div style={{ flex: 3 }}>
          <p>
            {toSelect.length > 0 && (
              <div>
                <DropdownComponent options={toSelect} onAction={addToSelect} />
              </div>
            )}
          </p>
        </div>
      </div>
      <div>
        {featsToAdd.feat.id !== 0 ? <FeatToAdd feat={featsToAdd.feat} /> : null}
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
      featsToAdd.feat.toSelect
        ? itemsDropFromPrerequisite(featsToAdd.feat.toSelect, filtro)
        : []
    );
  }, [featsToAdd, filtro]);

  useEffect(() => {
    setToSelectInSelect(
      featsToAdd.selected?.feats && featsToAdd.selected?.feats?.length > 0
        ? featsToAdd.feat.toSelect
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
  };
  return (
    <div key={featIndex} className="rpgui-container-framed-grey">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <p>
            {"lv."}
            {featsToAdd.level} {featsToAdd.classFeat?.className}{" "}
            {featsToAdd.feat.featName}
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p>
            {toSelect ? (
              <DropdownComponent options={toSelect} onAction={addToSelect} />
            ) : null}
          </p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}></div>
        <div style={{ flex: 3 }}>
          <p>
            {toSelectInSelect.length > 0 && (
              <div>
                <DropdownComponent
                  options={toSelectInSelect}
                  onAction={addToSelect}
                />
              </div>
            )}
          </p>
        </div>
      </div>
      <div>{featsToAdd ? <FeatToAdd feat={featsToAdd.feat} /> : null}</div>
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
