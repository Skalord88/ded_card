import { useState } from "react";
import { feat, serverFeat } from "./interfaces";

export interface FeatProps {
  feats: feat[] | undefined;
  title: string;
}

export interface ServerFeatsProns {
  feats: serverFeat[] | undefined;
  title: string;
  selectFeat: (select: serverFeat) => void;
}

export interface ServerFeatsPronsDelete {
  feats: serverFeat[] | undefined;
  title: string;
  deleteFeat: (deleted: number) => void;
}

export const FeatsList: React.FC<FeatProps> = ({ feats, title }) => {
  const [selected, setSelected] = useState<feat>();

  const handleDescription = (e: feat) => {
    setSelected(e);
  };

  return (
    <div className="rpgui-container-framed-grey" style={{ flex: 1 }}>
      <h2 className="rpgui-container-framed-golden-2">{title}</h2>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          {feats?.map((feat, index) => {
            return (
              <>
                <p key={index} onClick={() => handleDescription(feat)}>
                  {feat.characterFeatName} {feat.characterFeatSpecial}
                </p>
              </>
            );
          })}
        </div>
        {selected ? (
          <>
            <div className="rpgui-container-framed-grey" style={{ flex: 2 }}>
              <h2>{selected.characterFeatName}</h2>
              <p>{selected.characterFeatDescription}</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export const ServerFeatsList: React.FC<ServerFeatsProns> = ({
  feats,
  title,
  selectFeat
}) => {
  const [selected, setSelected] = useState<serverFeat>();

  const handleDescription = (e: serverFeat) => {
    setSelected(e);
    selectFeat(e);
  };

  return (
    <>
      <div className="rpgui-container-framed-grey" style={{ flex: 1 }}>
        <h2 className="rpgui-container-framed-golden-2">{title}</h2>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {feats?.map((feat: serverFeat, index) => {
              return (
                <>
                  <div style={{ flex: 1 }}>
                    <p key={index} onClick={() => handleDescription(feat)}>
                      {feat.featName}
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          {selected ? (
            <>
              <div className="rpgui-container-framed-grey" style={{ flex: 2 }}>
                <h2>{selected.featName}</h2>
                <p>{selected.description}</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export const ServerFeatsToDelete: React.FC<ServerFeatsPronsDelete> = ({
  feats,
  title,
  deleteFeat
}) => {
  const [selected, setSelected] = useState<serverFeat>();

  const handleDescription = (e: serverFeat) => {
    deleteFeat(e.id);
  };

  return (
    <>
      <div className="rpgui-container-framed-grey" style={{ flex: 1 }}>
        <h2 className="rpgui-container-framed-golden-2">{title}</h2>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            {feats?.map((feat: serverFeat, index) => {
              return (
                <>
                  <div style={{ flex: 1 }}>
                    <p key={index} onClick={() => setSelected(feat)}>
                      {feat.featName}{" "}
                      <button
                        className="rpgui-button-golden-mini"
                        onClick={() => handleDescription(feat)}
                      >
                        -
                      </button>
                    </p>
                  </div>
                </>
              );
            })}
          </div>
          {selected ? (
            <>
              <div className="rpgui-container-framed-grey" style={{ flex: 2 }}>
                <p>{selected?.description}</p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
