import { useState } from "react";
import { ClassFeats, Feat, FeatPc, FeatsToShow } from "./Interface/FeatInterface";
import { Prerequisite } from "../Prerequisite/interface/Prerequisite";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { FormattingText } from "../Formatting/Function";
import { SignNumber } from "../functions";

export type FeatsComponentProps = {
  char: CharToModify
};

export const FeatsComponent: React.FC<FeatsComponentProps> = ({ char }) => {
  const featsFeatPc: FeatPc[] = char.feats.pcFeats;
  const featsFeats: Feat[] = char.feats.feats;
  const featsClassFeats: ClassFeats[] = char.feats.classFeats;
  const featsClassFeatsOneTime = Array.from(
    new Map(featsClassFeats.map((item) => [item.feat.id, item])).values()
  );

  const fePc: {name: string, prer: (Prerequisite | null)[], description: string[] }[] 
  = featsFeatPc.map(f => f && ({name: f.feat.featName, prer: [f.selected, f.feat.modifiers], description: [
    "normal: " + f.feat.normal, "special: " + f.feat.special, "benefit: " + f.feat.benefit, "special: " + f.feat.special]}))
  const fe: {name: string, prer: (Prerequisite | null)[], description: string[] }[] 
  = featsFeats.map(f => f && ({name: f.featName, prer: [f.modifiers], description: [
    "normal: " + f.normal, "special: " + f.special, "benefit: " + f.benefit, "special: " + f.special]}))
  const feCl: {name: string, prer: (Prerequisite | null)[], description: string[] }[] 
  = featsClassFeatsOneTime.map(f => f && ({name: f.feat.featName, prer: [f.modifiers], description: [
    "normal: " + f.feat.normal, "special: " + f.feat.special, "benefit: " + f.feat.benefit, "special: " + f.feat.special]}))

  return (
    <div>
      <h2 className="rpgui-container-framed-golden-2">Feats</h2>
      <ListOfFeatsMap key={"Feats Pc"} feats={fePc} titolo={"Feats Pc"} />
      <ListOfFeatsMap key={"Feats"} feats={fe} titolo={"Feats"} />
      <ListOfFeatsMap key={"Class Feats"} feats={feCl} titolo={"Class Feats"} />
    </div>
  );
};

export type ListOfFeatsMapProps = {
  feats: {name: string, prer: (Prerequisite | null)[], description: string[] }[], titolo: string
}

export const ListOfFeatsMap: React.FC<ListOfFeatsMapProps> = ({feats, titolo}) => {
  const [selectedFeat, setSelectedFeat] = useState<{name: string, prer: (Prerequisite | null)[], description: string[] } | null>(null);

  const orderedFeats = feats.sort((a, b) => a.name.localeCompare(b.name))

  const selectFeat = (feat: {name: string, prer: (Prerequisite | null)[], description: string[] }) => {
    setSelectedFeat(feat);
  };

  const clearSelectedFeat = () => {
    setSelectedFeat(null);
  };

  return (
    <>
      <div>
        {orderedFeats.length > 0 && feats && (
          <h4>{titolo}</h4>
        )}
        <div style={{ display: "flex" }}>
          <div style={{ flexBasis: "45%" }}>
            {feats.map((f, index) =>
              f && (
                <>
                  <div>
                    <p onClick={() => selectFeat(f)}>{f.name}</p>

                    <ListOfBonusMap key={index} prerequisite={f.prer} />
                  </div>
                </>
              )
            )}
          </div>
          {selectedFeat && (
            <div style={{ flexBasis: "55%" }}>
              <SelectedFeat key={selectFeat.name} feat={selectedFeat} onClear={clearSelectedFeat} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export type SelectedFeatProps = {
  feat: {name: string, prer: (Prerequisite | null)[], description: string[] };
  onClear: () => void;
};

export const SelectedFeat: React.FC<SelectedFeatProps> = ({
  feat,
  onClear
}) => {
  const [view, setView] = useState<boolean>(true);

  const selectOut = () => {
    setView(false);
    onClear();
  };

  if (!view) return null;

  return (
    <div className="rpgui-container-framed-grey">
      {feat.name && <h4 onClick={selectOut}>{feat.name}</h4>}
      {feat.description && <p>{feat.description}</p>}
    </div>
  );
};

export type ListOfBonusProps = {
  prerequisite: (Prerequisite | null)[];
};

export const ListOfBonusMap: React.FC<ListOfBonusProps> = (prerequisite) => {
  return (
    <>
        {prerequisite.prerequisite.map(p => 
          p && (
            <>
              {p.items?.map((i, index) => (
                <li key={index}>{i.name}</li>
              ))}
              {p.skillStudy?.map((s, index) => 
                <li key={index}>{FormattingText(s.skill?.skillName ?? "")} {FormattingText(s.study?.studyName ?? "")} {SignNumber(s.rank)}{s.rank} {s.target?.join(", ")}</li>
              )}
            </>
          )
        )}
    </>
  );
};
