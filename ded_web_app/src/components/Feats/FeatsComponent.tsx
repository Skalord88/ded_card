import { useState } from "react";
import { ClassFeats, Feat, FeatPc } from "./Interface/FeatInterface";
import { Prerequisite } from "../Prerequisite/interface/Prerequisite";
import { CharToModify } from "../Prerequisite/functions/modifyCharacter";
import { FormattingText } from "../Formatting/Function";
import { SignNumber } from "../functions";

export type FeatsComponentProps = {
  char: CharToModify;
};

export const FeatsComponent: React.FC<FeatsComponentProps> = ({ char }) => {
  const featsFromLevel: FeatPc[] = char.feats.pcFeats.fromLevel
  const featsFromClass: FeatPc[] = char.feats.pcFeats.fromClass
  const featsFeats: Feat[] = char.feats.feats;
  const featsClassFeats: ClassFeats[] = char.feats.classFeats;
  const featsClassFeatsOneTime = Array.from(
    new Map(featsClassFeats.map((item) => [item.feat.id, item])).values()
  );

  const fePcLv: {
    name: string;
    prer?: Prerequisite[];
    description: { benefit: string; normal: string; special: string };
  }[] = featsFromLevel.map(
    (f, index) =>
      f && {
        name: f.feat.featName,
        prer:
          f.selected && f.feat.modifiers
            ? [f.selected, f.feat.modifiers]
            : f.selected
            ? [f.selected]
            : f.feat.modifiers
            ? [f.feat.modifiers]
            : [],
        description: {
          normal: f.feat.normal,
          special: f.feat.special,
          benefit: f.feat.benefit
        }
      }
  );
  const fePcBnsCl: {
    name: string;
    prer?: Prerequisite[];
    description: { benefit: string; normal: string; special: string };
  }[] = featsFromClass.map(
    (f, index) =>
      f && {
        name: f.feat.featName,
        prer:
          f.selected && f.feat.modifiers
            ? [f.selected, f.feat.modifiers]
            : f.selected
            ? [f.selected]
            : f.feat.modifiers
            ? [f.feat.modifiers]
            : [],
        description: {
          normal: f.feat.normal,
          special: f.feat.special,
          benefit: f.feat.benefit
        }
      }
  );
  const fe: {
    name: string;
    prer?: Prerequisite[];
    description: { benefit: string; normal: string; special: string };
  }[] = featsFeats.map(
    (f, index) =>
      f && {
        name: f.featName,
        prer: f.modifiers && [f.modifiers],
        description: {
          normal: f.normal,
          special: f.special,
          benefit: f.benefit
        }
      }
  );
  const feCl: {
    name: string;
    prer?: Prerequisite[];
    description: { benefit: string; normal: string; special: string };
  }[] = featsClassFeatsOneTime.map(
    (f, index) =>
      f && {
        name: f.feat.featName,
        prer: f.modifiers && [f.modifiers],
        description: {
          normal: f.feat.normal,
          special: f.feat.special,
          benefit: f.feat.benefit
        }
      }
  );

  return (
    <div>
      <h2 className="rpgui-container-framed-golden-2">Feats</h2>
      <ListOfFeatsMap key={"Feats Level"} feats={fePcLv} titolo={"Feats Level"} />
      <ListOfFeatsMap key={"Feats Class Bonus"} feats={fePcBnsCl} titolo={"Feats Class Bonus"} />
      <ListOfFeatsMap key={"Feats"} feats={fe} titolo={"Feats"} />
      <ListOfFeatsMap key={"Class Feats"} feats={feCl} titolo={"Class Feats"} />
    </div>
  );
};

export type ListOfFeatsMapProps = {
  feats: {
    name: string;
    prer?: Prerequisite[];
    description: { benefit: string; normal: string; special: string };
  }[];
  titolo: string;
};

export const ListOfFeatsMap: React.FC<ListOfFeatsMapProps> = ({
  feats,
  titolo
}) => {
  const [selectedFeat, setSelectedFeat] = useState<{
    name: string;
    prer?: Prerequisite[];
    description: { benefit: string; normal: string; special: string };
  } | null>(null);

  const orderedFeats = feats.sort((a, b) => {
    const nameA = a.name || ""; // Default to an empty string if null or undefined
    const nameB = b.name || "";
    return nameA.localeCompare(nameB);
  });

  const selectFeat = (feat: {
    name: string;
    prer?: Prerequisite[];
    description: { benefit: string; normal: string; special: string };
  }) => {
    setSelectedFeat(feat);
  };

  const clearSelectedFeat = () => {
    setSelectedFeat(null);
  };

  return (
    <>
      
      <div style={{ display: "grid", gridColumn: "45% 5% 50%" }}>
        <div style={{ gridColumn: 1 }}>
        {orderedFeats.length > 0 && feats && <h4>{titolo}</h4>}
          {feats.map(
            (f, index) =>
              f && (
                <div key={index}>
                  <p onClick={() => selectFeat(f)}>{f.name}</p>
                  {f.prer && (
                    <ListOfBonusMap key={index} prerequisite={f.prer} />
                  )}
                </div>
              )
          )}
        </div>
        {selectedFeat && (
          <div style={{ gridColumn: 2 }}>
            <SelectedFeat
              key={selectFeat.name}
              feat={selectedFeat}
              onClear={clearSelectedFeat}
            />
          </div>
        )}
      </div>
    </>
  );
};

export type SelectedFeatProps = {
  feat: {
    name: string;
    prer?: Prerequisite[];
    description: { benefit: string; normal: string; special: string };
  };
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
    <div style={{ minHeight: 50, maxHeight: 500, overflowY: "auto" }}>
      {feat.name && <h4 onClick={selectOut}>{feat.name}</h4>}
      {feat.description.benefit ? (
        <p>
          <span style={{ color: "yellow"}}>benefit: </span>
          <span>{feat.description.benefit}</span>
        </p>
      ) : null}
      {feat.description.normal ? (
        <p>
          <span style={{ color: "yellow"}}>normal: </span>
          <span>{feat.description.normal}</span>
        </p>
      ) : null}
      {feat.description.special ? (
        <p>
          <span style={{ color: "yellow"}}>special: </span>
          <span>{feat.description.special}</span>
        </p>
      ) : null}
    </div>
  );
};

export type ListOfBonusProps = {
  prerequisite: Prerequisite[];
};

export const ListOfBonusMap: React.FC<ListOfBonusProps> = (prerequisite) => {
  return (
    <>
      {prerequisite.prerequisite?.map(
        (p, pIndex) =>
          p && (
            <div key={`prerequisite-${pIndex}`}>
              {p.items?.map((i) => (
                <li key={`item-${i.id ?? i.name}`}>{i.name}</li>
              ))}
              {p.skillStudy?.map((s, index) => (
                <li
                  key={`skillStudy-${index ?? s.skill?.skillName}-${
                    s.study?.studyName
                  }`}
                >
                  {FormattingText(s.skill?.skillName ?? "")}
                  {FormattingText(s.study?.studyName ?? "")}
                  {SignNumber(s.rank)}
                  {s.rank}
                  {s.target?.join(", ")}
                </li>
              ))}
              {p.feats?.map(fe => (
                <li>{fe.featName}</li>
              ))}
            </div>
          )
      )}
    </>
  );
};
