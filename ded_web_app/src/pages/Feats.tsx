import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ServerFeatsList
} from "../components/Feats/ServerFeatsList";
import { serverFeat } from "../components/Feats/Interface/FeatInterface";
import { ServerFeatsToDelete } from "../components/Feats/ServerFeatsToDelete";
import { CharacterPc, FeatsId } from "../components/interfaces";
import { urlChar, urlFeats } from "../components/url";
import { addToDrop } from "../components/functions";

export function Feats() {
  const { charId } = useParams();
  const [char, setChar] = useState<CharacterPc>();
  const [featsList, setFeatsList] = useState<serverFeat[]>([]);
  const [levelFeatsList, setLevelFeatsList] = useState<serverFeat[]>([]);
  const [featsGeneral, setFeatsGeneral] = useState<serverFeat[]>([]);
  const [elcFeats, setElcFeats] = useState(0);
  const [lvFeats, setLvFeats] = useState(0);
  const [featsToAdd, setFeatsToAdd] = useState<serverFeat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resFeats = await axios.get(urlFeats);
        setFeatsList(resFeats.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let listChar = char?.featsList.map((feat) => feat.characterFeatName);
    char?.levelFeatsList.forEach((feat) =>
      listChar?.push(feat.characterFeatName)
    );

    let generalNotChar: serverFeat[] = featsList.filter(
      (feat) =>
        !listChar?.includes(feat.featName) && "GENERAL".includes(feat.featsType)
    );

    let prerequisite: serverFeat[] = generalNotChar.filter((feat) => {
      if (feat.prerequisite === null || feat.prerequisite.feats === null) {
        return feat;
      }
    });

    generalNotChar.forEach((feat) => {
      if (feat.prerequisite !== null && feat.prerequisite.feats !== null) {
        let check = 0;
        feat.prerequisite.feats.forEach((prerFeat) => {
          listChar?.forEach((charFeat) => {
            charFeat === prerFeat ? check++ : (check += 0);

            if (check === feat.prerequisite?.feats.length) {
              prerequisite.push(feat);
            }
          });
        });
      }
      return false;
    });

    setFeatsGeneral(prerequisite);
  }, [
    featsList,
    levelFeatsList,
    featsToAdd,
    char?.featsList,
    char?.levelFeatsList
  ]);

  useEffect(() => {
    if (char?.effectiveCharacterLv) {
      let numberOfFeats = 1 + Math.floor(char.effectiveCharacterLv / 3);
      setElcFeats(numberOfFeats);
    }
  }, [char]);

  useEffect(() => {
    let featsInLevel: serverFeat[] = [];
    if (char?.levelFeatsList) {
      char.levelFeatsList.forEach((feat) => {
        featsList.forEach((featFromList) => {
          if (feat.characterFeatName === featFromList.featName) {
            featsInLevel.push(featFromList);
          }
        });
      });

      setLevelFeatsList(featsInLevel);
      setLvFeats(featsInLevel.length);
    }
  }, [char, featsList]);

  const handleAdd = (e: serverFeat) => {
    if (featsToAdd.length <= elcFeats && !featsToAdd.includes(e)) {
      featsGeneral.forEach((feat) => {
        if (feat.id === e.id) {
          setFeatsToAdd((prevFeat) => [...prevFeat, e]);
        }
      });
    }
  };

  const handleRemove = (e: number) => {
    const list = featsToAdd.filter((feat) => feat.id !== e);
    setFeatsToAdd(list);
  };

  const handleSubmit = () => {
    let list: FeatsId[] = featsToAdd.map((feat) => ({ id: feat.id }));

    axios.post(urlFeats + "/" + charId, list);

    window.location.reload();
  };

  const handleDeleteFeat = (e: number) => {
    const feat = { id: e };

    axios.post(urlFeats + "/remove/" + charId, feat);

    window.location.reload();
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        {elcFeats === lvFeats ? (
          <>
            <div id="remFeatsAdded" className="rpgui-container-framed-golden">
              <p>
                all feats added{" "}
                <button className="rpgui-button">
                  <Link to={"/item/" + charId}>
                    <p>to items</p>
                  </Link>
                </button>
              </p>
            </div>
          </>
        ) : (
          <div
            id="remFeats"
            className="rpgui-container-framed-golden"
            style={{ flex: 1 }}
          >
            <p>add {elcFeats - lvFeats - featsToAdd.length} feat</p>
          </div>
        )}

        <div className="rpgui-container-framed-grey" style={{ flex: 4 }}>
          {featsToAdd.length > 0 && levelFeatsList.length < elcFeats ? (
            <>
              {featsToAdd.map((feat, index) => {
                const isLast = index === featsToAdd.length - 1;
                return (
                  <>
                    <div key={index} onClick={() => handleRemove(feat.id)}>
                      <p>{feat.featName}
                      {!isLast && ", "}
                      </p>
                    </div>
                  </>
                );
              })}
              <p>
                <button className="rpgui-button" onClick={handleSubmit}>
                  <p>add feats</p>
                </button>
              </p>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div
        id="classFeats"
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row"
        }}
      >
        <ServerFeatsList
          feats={featsGeneral}
          title={"General Feats"}
          selectFeat={handleAdd}
        />
        <ServerFeatsToDelete
          feats={levelFeatsList}
          title="Level Feats"
          deleteFeat={handleDeleteFeat}
        />
        <ServerFeatsList feats={char?.featsList} title="Class Feats" selectFeat={()=> undefined}/>
      </div>
    </>
  );
}
