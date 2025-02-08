import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Feat, FeatPc } from "../components/Feats/Interface/FeatInterface";
import { CharacterPc } from "../components/interfaces";
import { urlChar, urlFeats } from "../components/url";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { CharSummary } from "../components/Summary/CharSummary";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";
import { emptyFeat } from "../components/variables";
import { checkFeatPcType, findPrerequisiteFeatsInFeatsList } from "../components/Feats/function";

export type newFeatPc = {
  classe: { id: number; text: string };
  feat: { id: number; text: string };
  level: number;
  selected?: Feat;
  toSelect?: Feat[];
};

export function Feats() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [itemList, setItemList] = useState<itemInDrop[]>();
  const [featsToAddList, setFeatsToAddList] = useState<Feat[]>([]);
  const [featsPcToSelectList, setFeatsPcToAddList] = useState<newFeatPc[]>();
  const [modChar, setModChar] = useState<CharToModify>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);
        setModChar(createModChar(resChar.data));

        const resFeats = await axios.get(urlFeats);
        const listOfFeats: Feat[] = resFeats.data;
        const itemsFeats: itemInDrop[] = addToDrop(
          listOfFeats.filter(
            (f) => f.featType === null || !f.featType.includes("CLASS")
          ),
          "feat"
        );
        setItemList(itemsFeats);

        const classPcBonusFeats: newFeatPc[] = (
          resChar.data as CharacterPc
        ).classPcList.flatMap((cl) =>
          cl.classCharacter.classFeats.flatMap((cF) =>
            cF.toSelect || cF.feat.toSelect
              ? {
                  classe: {
                    id: cl.classCharacter.id,
                    text: cl.classCharacter.className
                  },
                  feat: { id: cF.feat.id, text: cF.feat.featName },
                  level: cF.level,
                  selected: emptyFeat,
                  toSelect: cF.toSelect
                    ? cF.toSelect.feats
                    : cF.feat.toSelect && cF.feat.toSelect?.featType
                    ? findPrerequisiteFeatsInFeatsList(
                        cF.feat.toSelect.featType,
                        listOfFeats
                      )
                    : []
                }
              : []
          )
        );

        if (classPcBonusFeats) setFeatsPcToAddList(classPcBonusFeats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (modChar) {
      const lenght: number =
        Math.floor((modChar?.adjBonus.adjLv + modChar.classesLv) / 3) + 1;
      let newSlots = [];
      for (let i = 1; i <= lenght; i++) {
        newSlots.push(emptyFeat);
      }
      let indexChar: number = 0;
      modChar.feats.pcFeats.fromLevel
      .sort((a, b) => a.level - b.level)
      .forEach((fChar) => {
        if (checkFeatPcType(fChar) === 1) {
          newSlots[indexChar] = fChar.feat;
          indexChar++;
        }
      });
      setFeatsToAddList(newSlots);
    }
  }, [modChar]);

  const newFeatsToAddList = (f: Feat, i: number) => {
    const updatedList = [...featsToAddList];
    updatedList[i] = (f as Feat) ? f : updatedList[i];
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
    let list: {level: number, feat: {id: number}}[] = featsToAddList
    .filter(filt => filt.id !== 0)
    .map((f, index) => {
      return {
        level: index === 0 ? 1 : index * 3,
        feat: {id: f.id}
      };
    });

    // console.log(urlFeats + "/" + charId, list)
    axios.post(urlFeats + "/" + charId, list);

    window.location.reload();
  };

  return (
    <>
      {char ? <CharSummary character={char} feats={featsToAddList} /> : null}
      {featsToAddList
        ? featsToAddList.map((f) => (
            <span>
              {f.id} {f.featName}
            </span>
          ))
        : null}
      {featsPcToSelectList
        ? featsPcToSelectList.map((f) => (
            <span>
              {f.selected?.id} {f.selected?.featName}
            </span>
          ))
        : null}
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
          {featsToAddList.map((f, index) =>
            itemList ? (
              <div className="rpgui-container-framed-grey" key={index}>
                <FeatToAddInLevel
                  filtro={addToDrop(
                    Array.from(
                      new Set(
                        itemList.flatMap((f) =>
                          (f.item as Feat).featType
                            ? ["ALL"].concat((f.item as Feat).featType)
                            : []
                        )
                      )
                    ),
                    "filter"
                  )}
                  element={f}
                  indexItem={index}
                  items={itemList}
                  onAction={newFeatsToAddList}
                />
              </div>
            ) : null
          )}
          {featsPcToSelectList
            ? featsPcToSelectList.map((f, indexF) => (
                <div>
                  <FeatPcToAddInLevel
                    featIndex={indexF}
                    items={f}
                    onAction={newFeatsPcToAddList}
                  />
                </div>
              ))
            : null}
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

export type FeatPcToAddInLevelProps = {
  featIndex: number;
  items: newFeatPc;
  onAction: (option: Feat, level: number, ind: number) => void;
};

export const FeatPcToAddInLevel: React.FC<FeatPcToAddInLevelProps> = ({
  featIndex,
  items,
  onAction
}) => {
  const lista: itemInDrop[] = items.toSelect
    ? addToDrop(items.toSelect, "feat")
    : [];
  const [selected, setSelected] = useState<Feat>();
  const addItem = (option: Feat) => {
    onAction(option, featIndex === 0 ? 1 : featIndex * 3, featIndex);
    setSelected(option);
  };
  return (
    <div key={featIndex} className="rpgui-container-framed-grey">
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <p>
            {"lv."}
            {items.level} {items.classe.text} {items.feat.text}
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p>
            <DropdownComponent options={lista} onAction={addItem} />
          </p>
        </div>
      </div>
      <div>{selected ? <FeatToAdd feat={selected} /> : null}</div>
    </div>
  );
};

export type FeatToAddInLevelProps = {
  element: Feat
  filtro: itemInDrop[];
  indexItem: number;
  items: itemInDrop[];
  onAction: (option: Feat, ind: number) => void;
};

export const FeatToAddInLevel: React.FC<FeatToAddInLevelProps> = ({
  element,
  filtro,
  indexItem,
  items,
  onAction
}) => {
  const featAll: itemInDrop[] = items;

  const [itemList, setItemList] = useState<itemInDrop[]>();
  const [featsToAdd, setFeatsToAdd] = useState<Feat>(element);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    const filtred: itemInDrop[] =
      filter === "ALL"
        ? featAll
        : featAll.filter(
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
  feat: Feat;
};

export const FeatToAdd: React.FC<FeatProp> = ({ feat }) => {
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
