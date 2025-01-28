import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ServerFeatsList } from "../components/Feats/ServerFeatsList";
import { Feat, serverFeat } from "../components/Feats/Interface/FeatInterface";
import { ServerFeatsToDelete } from "../components/Feats/ServerFeatsToDelete";
import { CharacterPc, FeatsId } from "../components/interfaces";
import { urlChar, urlFeats } from "../components/url";
import { DropdownComponent } from "../components/DropDown/DropDown";
import { addToDrop, itemInDrop } from "../components/functions";
import { ListOfSomething } from "../components/List/List";
import { CharSummary } from "../components/Summary/CharSummary";
import { FeatsComponent } from "../components/Feats/FeatsComponent";
import { CharToModify } from "../components/Prerequisite/functions/modifyCharacter";
import { createModChar } from "../components/Prerequisite/functions/modChar";
import { Prerequisite } from "../components/Prerequisite/interface/Prerequisite";

export function Feats() {
  const { charId } = useParams();

  const [char, setChar] = useState<CharacterPc>();
  const [featsList, setFeatsList] = useState<Feat[]>();
  const [itemList, setItemList] = useState<itemInDrop[]>();
  const [featsToAdd, setFeatsToAdd] = useState<itemInDrop>();
  const [modChar, setModChar] = useState<CharToModify>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);
        setModChar(createModChar(resChar.data));

        const resFeats = await axios.get(urlFeats);
        setFeatsList(resFeats.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (featsList) {
      const filtred = featsList.filter((f) => f.featType === null);
      setItemList(addToDrop(filtred, "feat"));
    }
  }, [featsList]);

  const addFeat = (s: itemInDrop) => {
    setFeatsToAdd(s);
  };

  // useEffect(() => {
  // let listChar = char?.featsList.map((feat) => feat.characterFeatName);
  // char?.levelFeatsList.forEach((feat) =>
  //   listChar?.push(feat.characterFeatName)
  // );

  // let generalNotChar: serverFeat[] = featsList.filter(
  //   (feat) =>
  //     !listChar?.includes(feat.featName) && "GENERAL".includes(feat.featsType)
  // );

  // let prerequisite: serverFeat[] = generalNotChar.filter((feat) => {
  //   if (feat.prerequisite === null || feat.prerequisite.feats === null) {
  //     return feat;
  //   }
  // });

  // generalNotChar.forEach((feat) => {
  //   if (feat.prerequisite !== null && feat.prerequisite.feats !== null) {
  //     let check = 0;
  //     feat.prerequisite.feats.forEach((prerFeat) => {
  //       listChar?.forEach((charFeat) => {
  //         charFeat === prerFeat ? check++ : (check += 0);

  //         if (check === feat.prerequisite?.feats.length) {
  //           prerequisite.push(feat);
  //         }
  //       });
  //     });
  //   }
  //   return false;
  // });

  //   setFeatsGeneral(prerequisite);
  // }, [
  //   featsList,
  //   levelFeatsList,
  //   featsToAdd,
  //   char?.featsList,
  // char?.levelFeatsList
  // ]);

  // useEffect(() => {
  //   if (char?.effectiveCharacterLv) {
  //     let numberOfFeats = 1 + Math.floor(char.effectiveCharacterLv / 3);
  //     setElcFeats(numberOfFeats);
  //   }
  // }, [char]);

  // useEffect(() => {
  //   let featsInLevel: serverFeat[] = [];
  //   if (char?.levelFeatsList) {
  //     char.levelFeatsList.forEach((feat) => {
  //       featsList.forEach((featFromList) => {
  //         if (feat.characterFeatName === featFromList.featName) {
  //           featsInLevel.push(featFromList);
  //         }
  //       });
  //     });

  //     setLevelFeatsList(featsInLevel);
  //     setLvFeats(featsInLevel.length);
  //   }
  // }, [char, featsList]);

  // const handleAdd = (e: serverFeat) => {
  //   if (featsToAdd.length <= elcFeats && !featsToAdd.includes(e)) {
  //     featsGeneral.forEach((feat) => {
  //       if (feat.id === e.id) {
  //         setFeatsToAdd((prevFeat) => [...prevFeat, e]);
  //       }
  //     });
  //   }
  // };

  // const handleRemove = (e: number) => {
  //   const list = featsToAdd.filter((feat) => feat.id !== e);
  //   setFeatsToAdd(list);
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
        <div className="rpgui-container-framed-grey" style={{ gridColumn: 1 }}>
          {itemList ? (
            <ListOfSomething
              items={itemList}
              text={"Feats"}
              onSelect={addFeat}
            />
          ) : (
            <p>...loading...</p>
          )}
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{
            gridColumn: 3,
            gridRow: 1,
            overflowY: "scroll",
            minHeight: 50,
            maxHeight: 400
          }}
        >
          {featsToAdd ? (
            <div>
              <h2 className="rpgui-container-framed-golden-2">
                {featsToAdd.name}
              </h2>
              {featsToAdd.item.benefit === null ? null : (
                <p>
                  <span style={{ color: "yellow" }}>benefit:</span>{" "}
                  <span>{featsToAdd.item.benefit}</span>
                </p>
              )}
              {featsToAdd.item.normal === null ? null : (
                <p>
                  <span style={{ color: "yellow" }}>normal:</span>{" "}
                  <span>{featsToAdd.item.normal}</span>
                </p>
              )}
              {featsToAdd.item.toSelect ? (
                <ToSelect pre={featsToAdd.item.toSelect} />
              ) : null}
              {featsToAdd.item.special === null ? null : (
                <p>
                  <span style={{ color: "yellow" }}>special:</span>{" "}
                  <span>{featsToAdd.item.special}</span>
                </p>
              )}
            </div>
          ) : null}
        </div>
        <div
          className="rpgui-container-framed-grey"
          style={{ gridColumn: 1, gridRow: 2 }}
        >
          {modChar ? <FeatsComponent char={modChar} /> : null}
        </div>
      </div>
    </>
  );
}

export type PrerequisiteProp = {
  pre: Prerequisite;
};

export const ToSelect: React.FC<PrerequisiteProp> = ({ pre }) => {
  const armorType: string[] = pre.armorType ? pre.armorType : [];
  const weaponType: string[] = pre.weaponType ? pre.weaponType : [];
  return (
    <>
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
    </>
  );
};
