import axios from "axios";
import { useEffect, useState } from "react";
import { urlChar, urlFeats } from "../components/url";
import { useParams } from "react-router-dom";
import { characterPc, serverFeat } from "../components/interfaces";

export function Feats() {
  const { charId } = useParams();
  const [char, setChar] = useState<characterPc>();
  const [featsList, setFeatsList] = useState<serverFeat[]>([]);
  const [featsGeneral, setFeatsGeneral] = useState<serverFeat[]>([]);
  const [elcFeats, setElcFeats] = useState(0);
  const [selectFeat, setSelectFeat] = useState<serverFeat>();

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
    let generalFeats: serverFeat[] = featsList.filter((feat) =>
      "GENERAL".includes(feat.featsType)
    );

    setFeatsGeneral(generalFeats);

    console.log(generalFeats);
  }, [featsList]);

  useEffect(() => {
    if (char?.effectiveCharacterLv) {
      let numberOfFeats = 1 + Math.floor(char.effectiveCharacterLv / 3);
      setElcFeats(numberOfFeats);
    }
  }, [char]);

  const handleSelect = (e: serverFeat) => {
    setSelectFeat(e);

    console.log(e.prerequisite);
  };

  return (
    <>
      <div className="container">
        <div>{elcFeats}</div>

        <div>
          {char?.featsList.map((feat, index) => {
            return (
              <>
                <div key={index}>{feat.characterFeatName}</div>
              </>
            );
          })}
        </div>
        <div>
          {featsGeneral ? (
            <>
              {featsGeneral?.map((feat: serverFeat, index) => {
                return (
                  <>
                    <div key={index}>
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
            <>
              <div>{selectFeat.featName}</div>
              {/* <div>{Object.entries(selectFeat.prerequisite).forEach(([p, pname]) =>
              )}
                </div> */}
              <div>{selectFeat.description}</div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
