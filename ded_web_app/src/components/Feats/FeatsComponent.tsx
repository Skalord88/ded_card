import { useState } from "react";
import { Feat, FeatsToShow, Prerequisite } from "./Interface/FeatInterface";

export type FeatsComponentProps = {
  feats: FeatsToShow[];
  titolo: string;
};

export const FeatsComponent: React.FC<FeatsComponentProps> = ({ feats }) => {
  const featsFeatPc = feats.filter((f) => f.title === "FeatPc");
  const featsFeats = feats.filter((f) => f.title === "Feat");
  const featsClassFeats = feats.filter((f) => f.title.includes("ClassFeats"));
  const featsClassFeatsOneTime = Array.from(
    new Map(featsClassFeats.map((item) => [item.id, item])).values()
  );

  return (
    <div>
      <h2 className="rpgui-container-framed-golden-2">Feats</h2>
      <ListOfFeatsMap feats={featsFeatPc} titolo={"Feats Pc"} />
      <ListOfFeatsMap feats={featsFeats} titolo={"Feats"} />
      <ListOfFeatsMap feats={featsClassFeatsOneTime} titolo={"Class Feats"} />
    </div>
  );
};

export const ListOfFeatsMap: React.FC<FeatsComponentProps> = (feats) => {
  const [selectedFeat, setSelectedFeat] = useState<Feat | null>(null);

  const orderedFeats = feats.feats.sort((a, b) => a.feat.featName.localeCompare(b.feat.featName))

  const selectFeat = (feat: Feat) => {
    setSelectedFeat(feat);
  };

  const clearSelectedFeat = () => {
    setSelectedFeat(null);
  };

  return (
    <>
      <div>
        {orderedFeats.length > 0 && feats != null ? (
          <h4>{feats.titolo}</h4>
        ) : null}
        <div style={{ display: "flex" }}>
          <div style={{ flexBasis: "45%" }}>
            {feats.feats.map((f, index) =>
              f != null ? (
                <>
                  <div key={index}>
                    <p onClick={() => selectFeat(f.feat)}>{f.feat.featName}</p>

                    <ListOfBonusMap prerequisite={f.listOfBonus} />
                  </div>
                </>
              ) : null
            )}
          </div>
          {selectedFeat && (
            <div style={{ flexBasis: "55%" }}>
              <SelectedFeat feat={selectedFeat} onClear={clearSelectedFeat} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export type SelectedFeatProps = {
  feat: Feat;
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
      {feat.featName && <h4 onClick={selectOut}>{feat.featName}</h4>}
      {feat.benefit && <p>benefit: {feat.benefit}</p>}
      {feat.normal && <p>normal: {feat.normal}</p>}
      {feat.special && <p>special: {feat.special}</p>}
    </div>
  );
};

export type ListOfBonusProps = {
  prerequisite: Prerequisite | null;
};

export const ListOfBonusMap: React.FC<ListOfBonusProps> = (prerequisite) => {
  return (
    <>
      {prerequisite != null ? (
        <>
          {prerequisite.prerequisite?.items.map((it) => (
            <li>{it.name}</li>
          ))}

          {prerequisite.prerequisite?.feats.map((ft) => (
            <li>{ft.featName}</li>
          ))}

          <p>{prerequisite.prerequisite?.armorType}</p>
          <p>{prerequisite.prerequisite?.weaponType}</p>
          {/* <p>{prerequisite.prerequisite?.ar}</p> */}
        </>
      ) : null}
    </>
  );
};
