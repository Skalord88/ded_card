import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FeatsId, characterPc, serverFeat } from "../components/interfaces";
import { urlChar, urlFeats } from "../components/url";

export function Feats() {
  const { charId } = useParams();
  const [char, setChar] = useState<characterPc>();
  const [featsList, setFeatsList] = useState<serverFeat[]>([]);
  const [levelFeatsList, setLevelFeatsList] = useState<serverFeat[]>([]);
  const [featsGeneral, setFeatsGeneral] = useState<serverFeat[]>([]);
  const [elcFeats, setElcFeats] = useState(0);
  const [lvFeats, setLvFeats] = useState(0);
  const [selectFeat, setSelectFeat] = useState<serverFeat>();
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

            if (check === feat.prerequisite.feats.length) {
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

  const handleSelect = (e: serverFeat) => {
    setSelectFeat(e);
  };

  const handleAdd = (e: serverFeat) => {
    if (featsToAdd.length < elcFeats) {
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
      <div className="container">
        <div className="container-item">
          {elcFeats === lvFeats ? (
            <>
              <div>all feats added</div>
              <div>
                <button>
                  <Link to={"/item/" + charId}>to items</Link>
                </button>
              </div>
            </>
          ) : (
            <div>add {elcFeats - lvFeats} feat</div>
          )}
        </div>

        <div className="container-item">
          <div className="container-item">
            ---Class Feats---
            {char?.featsList.map((feat, index) => {
              return (
                <>
                  <div key={index}>---{feat.characterFeatName}---</div>
                  <div key={index}>{feat.characterFeatDescription}</div>
                </>
              );
            })}
          </div>
          <div className="container-item">
            ---Level Feats---
            {levelFeatsList.map((feat, index) => {
              return (
                <>
                  <div key={index}>
                    ---{feat.featName}
                    <button onClick={() => handleDeleteFeat(feat.id)}>-</button>
                  </div>
                  <div key={index}>{feat.description}</div>
                </>
              );
            })}
          </div>
        </div>
        <div className="container-item">
          {featsGeneral ? (
            <>
              {featsGeneral?.map((feat: serverFeat, index) => {
                return (
                  <>
                    <div className="container-item" key={index}>
                      <button onClick={() => handleSelect(feat)}>
                        {feat.featName}
                      </button>
                    </div>
                  </>
                );
              })}
            </>
          ) : (
            <>...loading feats...</>
          )}
        </div>
        <div>
          {selectFeat ? (
            <div className="container-item">
              <div>{selectFeat.featName}</div>
              <div>{selectFeat.description}</div>
              <button onClick={() => handleAdd(selectFeat)}>Add</button>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div>
          {featsToAdd.length > 0 ? (
            <div className="container-item">
              added feats <button onClick={handleSubmit}>add feats</button>
              {featsToAdd.map((feat, index) => {
                return (
                  <>
                    <div key={index}>
                      {feat.featName}
                      <button onClick={() => handleRemove(feat.id)}>
                        remove
                      </button>
                    </div>
                  </>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
}
