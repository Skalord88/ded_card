import axios from "axios";
import { useEffect, useState } from "react";
import { urlChar, urlFeats } from "../components/url";
import { useParams } from "react-router-dom";
import { characterPc, feat } from "../components/interfaces";

export function Feats() {
  const { charId } = useParams();
  const [char, setChar] = useState<characterPc>();
  const [featsList, setFeatsList] = useState<feat[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resChar = await axios.get(urlChar + "/" + charId);
        setChar(resChar.data);

        const resFeats = await axios.get(urlFeats);
        setFeatsList(resFeats.data);

        console.log(resFeats);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="container">
        {char?.featsList.map((feat, index) => {
          return<> <div className="row" key={index}>{feat.characterFeatName}</div>
          </>;
        })}
      </div>
      <div className="container">
        {featsList?
        <>{featsList?.map((feat, index) => {
            return(<>
            <div className="row" key={index}>{feat.characterFeatName}</div>
            </>)
        })}</>:<>...loading feats...</>}
        
      </div>
    </>
  );
}
