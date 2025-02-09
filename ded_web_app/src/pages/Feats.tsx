import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { typeOfPrerequisiteInToSelect } from "../components/Feats/function";
import { Feat } from "../components/Feats/Interface/FeatInterface";
import { addToDrop, itemInDrop } from "../components/functions";
import { CharacterPc, Item } from "../components/interfaces";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";
import { CharSummary } from "../components/Summary/CharSummary";
import { urlChar, urlFeats, urlItems } from "../components/url";
import { emptyFeat, emptyPrerequisite } from "../components/variables";

export type NewFeatPc = {
  classe?: { id: number; text: string };
  feat: Feat;
  level: number;
  selected?: Prerequisite;
  toSelect?: Prerequisite;
};

export function Feats() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [itemList, setItemList] = useState<ListOfToSelect>();
  const [filtroList, setFiltroList] = useState<itemInDrop[]>([]);
  const [featsToAddList, setFeatsToAddList] = useState<NewFeatPc[]>([]);
  const [featsPcToSelectList, setFeatsPcToAddList] = useState<NewFeatPc[]>([]);
  const [modChar, setModChar] = useState<CharToModify>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        const char = resChar.data;
        setChar(char);
        const newModChar = createModChar(resChar.data);
        setModChar(newModChar);

        const resFeats = await axios.get(urlFeats);
        const listOfFeats: Feat[] = resFeats.data;
        const itemsFeats: itemInDrop[] = addToDrop(
          listOfFeats.filter(
            (f) => f.featType === null || !f.featType.includes("CLASS")
          ),
          "feat"
        );

        const resItems = await axios.get(urlItems);
        const dbWeapons = resItems.data.weaponsList;
        const itemsWeapons = addToDrop(dbWeapons, "items");
        const dbArmors = resItems.data.armorsList;
        const itemsArmors = addToDrop(dbArmors, "items");

        setItemList({
          feats: itemsFeats,
          weapons: itemsWeapons,
          armors: itemsArmors
        });

        setFiltroList(
          addToDrop(
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
          )
        );

        const quantiFeats: number =
          Math.floor((newModChar?.adjBonus.adjLv + newModChar.classesLv) / 3) +
          1;

        let featsFromLevel: NewFeatPc[] = [];

        for (let i = 0; i < quantiFeats; i++) {
          featsFromLevel.push({
            feat: emptyFeat,
            level: i === 0 ? 1 : i * 3,
            selected: emptyPrerequisite,
            toSelect: emptyPrerequisite
          });
        }

        for (let i = 0; i < newModChar.feats.pcFeats.fromLevel.length; i++) {
          featsFromLevel[i] = {
            ...featsFromLevel[i],
            feat: newModChar.feats.pcFeats.fromLevel[i].feat,
            selected: newModChar.feats.pcFeats.fromLevel[i].selected,
            toSelect: newModChar.feats.pcFeats.fromLevel[i].feat.toSelect
          };
        }

        if (featsFromLevel) {
          setFeatsToAddList(featsFromLevel);
        }

        let classPcBonusFeats: NewFeatPc[] = newModChar.feats.classFeats
          .filter(
            (c) =>
              c.toSelect?.feats ||
              c.toSelect?.featType ||
              c.feat.toSelect?.featType ||
              c.feat.toSelect?.feats
          )
          .map((clF) =>
            clF.toSelect?.feats || clF.feat.toSelect?.feats
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

  const newFeatsToAddList = (f: Feat, i: number) => {
    const updatedList = [...featsToAddList];
    updatedList[i] = (f as Feat)
      ? {
          ...updatedList[i],
          feat: f
        }
      : updatedList[i];

    console.log(updatedList);
    setFeatsToAddList(updatedList);
  };

  const newFeatsPcToAddList = (f: Feat, i: number) => {
    if (featsPcToSelectList) {
      const updatedList = [...featsPcToSelectList];
      updatedList[i] = {
        ...updatedList[i],
        selected: f
      };
      setFeatsPcToAddList(updatedList);
    }
  };

  const handleSubmit = () => {
    let list: { level: number; feat: { id: number } }[] = featsToAddList
      .filter((filt) => filt.feat.id !== 0)
      .map((f, index) => {
        return {
          level: f.level,
          feat: { id: f.feat.id }
        };
      });

    // console.log(urlFeats + "/" + charId, list)
    axios.post(urlFeats + "/" + charId, list);

    window.location.reload();
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
        <span>
          {f.feat.id} {f.feat.featName}
        </span>
      ))}
      {featsPcToSelectList.map((f) => (
        <span>
          {f.selected?.id}
          {f.selected?.feats?.map((sF) => (
            <span>{sF.featName}</span>
          ))}
        </span>
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
              {itemList ? (
                <FeatToAddInLevel
                  filtro={filtroList}
                  element={f.feat}
                  indexItem={index}
                  items={itemList}
                  onAction={newFeatsToAddList}
                />
              ) : null}
            </div>
          ))}
          {featsPcToSelectList.map((f, indexF) => (
            <div>
              {itemList ? (
                <FeatPcToAddInLevel
                  featIndex={indexF}
                  element={f}
                  items={itemList}
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

export type FeatPcToAddInLevelProps = {
  featIndex: number;
  element: NewFeatPc;
  items: ListOfToSelect;
  onAction: (option: Feat, level: number, ind: number) => void;
};

export const FeatPcToAddInLevel: React.FC<FeatPcToAddInLevelProps> = ({
  featIndex,
  element,
  items,
  onAction
}) => {
  let drop: itemInDrop[] = typeOfPrerequisiteInToSelect(element, items);

  const [selected, setSelected] = useState<NewFeatPc>(element);
  const [selectedToSelect, setSelectedToSelect] = useState<Prerequisite>();
  const addItem = (option: Feat) => {
    //   onAction(option, featIndex === 0 ? 1 : featIndex * 3, featIndex);
    //   const newSelected: NewFeatPc = {
    //     ...selected,
    //     selected: { ...selected, feats: [option] }
    //   };
    //   console.log("newSelected: " + newSelected)
    //   setSelected(newSelected);
  };
  return (
    <div key={featIndex} className="rpgui-container-framed-grey">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <p>
            {"lv."}
            {selected.level} {selected.classe?.text} {selected.feat.featName}
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p>
            {drop ? (
              <DropdownComponent options={drop} onAction={addItem} />
            ) : null}
          </p>
        </div>
      </div>
      <div>{selected ? <FeatToAdd feat={selected.feat} /> : null}</div>
    </div>
  );
};

export type FeatToAddInLevelProps = {
  element: Feat;
  filtro: itemInDrop[];
  indexItem: number;
  items: ListOfToSelect;
  onAction: (option: Feat, ind: number) => void;
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
  const [featsToAdd, setFeatsToAdd] = useState<Feat>(element);
  const [filter, setFilter] = useState<string>("");

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
    setFeatsToAdd(f);
    onAction(f, indexItem);
  };

  const addFilter = (s: string) => {
    setFilter(s as string);
  };

  const emptyTheFeat = () => {
    setFeatsToAdd(emptyFeat);
    onAction(emptyFeat, indexItem);
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
              <span onClick={emptyTheFeat}>{featsToAdd.featName}</span>
            ) : null}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <p>
            <DropdownComponent options={filtro} onAction={addFilter} />
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
      <div>{featsToAdd.id !== 0 ? <FeatToAdd feat={featsToAdd} /> : null}</div>
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
      {feat.toSelect ? <ToSelect pre={feat.toSelect} /> : null}
    </div>
  );
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

export type PrerequisiteProp = {
  pre: Prerequisite;
};

export const ToSelect: React.FC<PrerequisiteProp> = ({ pre }) => {
  const armorType: string[] = pre.armorType ? pre.armorType : [];
  const weaponType: string[] = pre.weaponType ? pre.weaponType : [];
  const feats: Feat[] = pre.feats ? pre.feats : [];
  return (
    <div>
      {armorType.map((ar, indexAr) => (
        <div key={indexAr}>
          <p>{ar}</p>
        </div>
      ))}
      {weaponType.map((we, indexWe) => (
        <div key={indexWe}>
          <p>{we}</p>
        </div>
      ))}
      {feats.map((f, indexFe) => (
        <div key={indexFe}>
          <p>{f.featName}</p>
        </div>
      ))}
    </div>
  );
};

export type ListOfPcFeatsProps = {
  // feat: (Feat | null)[];
  pcLevel: number;
  // onNewList: (list: (Feat | null)[]) => void
};

export const ListOfPcFeats: React.FC<ListOfPcFeatsProps> = ({
  // feat,
  pcLevel
  // onNewList
}) => {
  const [slotsList, setSlotsList] = useState<(Feat | null)[]>([]);

  // useEffect(() => {
  //   let newSlots = [];
  //   for (let i = 1; i <= Math.floor(pcLevel / 3); i++) {
  //     newSlots.push(
  // feat[i - 1] || null
  //   );
  // }

  // setSlotsList(newSlots);
  // onNewList(newSlots);
  // }, [feat.length]);

  const emptyTheSlot = (index: number) => {
    setSlotsList((prevSlots) =>
      prevSlots.map((slot, i) => (i === index ? null : slot))
    );
  };

  return (
    <>
      {slotsList.map((slot, index) => (
        <div key={index}>
          <p>
            lv.{(index + 1) * 3}{" "}
            {slot ? (
              <span onClick={() => emptyTheSlot(index)}>
                {slot.id} {slot.featName}
              </span>
            ) : (
              "--- empty ---"
            )}
          </p>
        </div>
      ))}
    </>
  );
};
