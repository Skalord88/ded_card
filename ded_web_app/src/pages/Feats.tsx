import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Feat } from "../components/Feats/Interface/FeatInterface";
import { CharacterPc } from "../components/interfaces";
import { urlChar, urlFeats } from "../components/url";
import {
  DropdownComponent
} from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { CharSummary } from "../components/Summary/CharSummary";
import { FeatsComponent } from "../components/Feats/FeatsComponent";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";

export function Feats() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [featsList, setFeatsList] = useState<itemInDrop[]>();
  const [itemList, setItemList] = useState<itemInDrop[]>();
  const [featsToAddList, setFeatsToAddList] = useState<(Feat | string)[]>([]);
  const [modChar, setModChar] = useState<CharToModify>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);
        setModChar(createModChar(resChar.data));

        const resFeats = await axios.get(urlFeats);
        const listOfFeats: Feat[] = resFeats.data
        const itemsFeats: itemInDrop[] = addToDrop(listOfFeats.filter((f) => f.featType === null || !f.featType.includes("CLASS")), "feat")
        setItemList(itemsFeats);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (modChar) {
      let newSlots = [];
      for (
        let i = 1;
        i <= Math.floor((modChar?.adjBonus.adjLv + modChar.classesLv) / 3);
        i++
      ) {
        newSlots.push("---empty---");
      }
      setFeatsToAddList(newSlots);
    }
  }, [modChar]);

  const newFeatsToAddList = (f: Feat, i: number) => {
    const scelta = featsToAddList[i]
    // setFeatsToAddList(scelta)
  }

  // useEffect(() => {
  //   if (featsList) {
  //     const filtred = featsList.filter((f) => f.featType === null || !f.featType.includes("CLASS"));
  //     setItemList(addToDrop(filtred, "feat"));
  //   }
  // }, [featsList]);

  // const addFeat = (s: itemInDrop) => {
  //   setFeatsToAdd(s.item as Feat);
  // };
  // const handleSubmit = () => {
  //   let list: FeatsId[] = featsToAdd.map((feat) => ({ id: feat.id }));

  //   axios.post(urlFeats + "/" + charId, list);

  //   window.location.reload();
  // };

  // const handleDeleteFeat = (e: number) => {
  //   const feat = { id: e };

  //   axios.post(urlFeats + "/remove/" + charId, feat);

  //   window.location.reload();
  // };

  return (
    <>
      {char ? <CharSummary character={char} /> : null}
      <div style={{ display: "grid", gridTemplateColumns: "50% 2% 48%" }}>
        <div
          className="rpgui-container-framed-grey"
          style={{ gridColumn: "1 / span 3", gridRow: 2 }}
        >
          {modChar ? <FeatsComponent char={modChar} /> : null}
        </div>

        <div
          className="rpgui-container-framed-grey"
          style={{ gridColumn: "1 / span 3", gridRow: 1 }}
        >
          {featsToAddList.map((f, index) => (
                itemList ? <FeatToAddInLevel indexItem={index} items={itemList} onAction={newFeatsToAddList}/> : null
              ))}
          {/* <ListOfPcFeats feat={featsToAddList} pcLevel={10} onNewList={newListToAdd} /> */}
        </div>
      </div>
    </>
  );
}

export type FeatToAddInLevelProps = {
  indexItem: number;
  items: itemInDrop[];
  onAction: (option: Feat, ind: number) => void;
};

export const FeatToAddInLevel: React.FC<FeatToAddInLevelProps> = ({
  indexItem,
  items,
  onAction
}) => {

  const featAll: itemInDrop[] = items;
  const fighterFeats: itemInDrop[] = items
  .filter(i => 
    (i.item as Feat).featType !== null && (i.item as Feat).featType.includes("FIGHTER")
  ).map(i => i);
  const metaFeats: itemInDrop[] = items
  .filter(i => 
    (i.item as Feat).featType !== null && (i.item as Feat).featType.includes("METAMAGIC")
  ).map(i => i);

  const [itemList, setItemList] = useState<itemInDrop[]>([]);
  const [featsToAdd, setFeatsToAdd] = useState<Feat>();
  const [filter, setFilter] = useState<string>();

  const filtr: itemInDrop[] = addToDrop(
    ["ALL", "FIGHTER", "METAMAGIC"],
    "filter"
  );

  useEffect(() => {
    if (filter === "ALL") setItemList(featAll)
    
    if (filter === "FIGHTER") setItemList(fighterFeats)
    if (filter === "METAMAGIC") setItemList(metaFeats)
  }, [featAll, fighterFeats, filter, metaFeats]);

  const addFeat = (f: Feat) => {
    if(f) {
      setFeatsToAdd(f)
    }
    if (featsToAdd) {
        onAction(featsToAdd, indexItem);
    }
  };

  const addFilter = (s: itemInDrop) => {
    if(s) setFilter(s as unknown as string)
  };

  const emptyFeat = () => {
    setFeatsToAdd(undefined)
  }
  return (
    <div key={indexItem}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 2 }}>
          <p>
          <span>{" lv."}{indexItem * 3}{" "}</span>
          {featsToAdd ? <span onClick={emptyFeat}>{featsToAdd.featName}</span> : null}
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <p>
            <DropdownComponent options={filtr} onAction={addFilter} />
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p>
              <DropdownComponent options={itemList} onAction={addFeat} />

          </p>
        </div>
      </div>
      <div>{featsToAdd ? <FeatToAdd feat={featsToAdd} /> : null}</div>
    </div>
  );
};

export type FeatProp = {
  feat: Feat;
};

export const FeatToAdd: React.FC<FeatProp> = ({ feat }) => {
  return (
    <div className="rpgui-container-framed-golden">
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
    console.log(slotsList.map((slot, i) => (i === index ? null : slot)));
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
