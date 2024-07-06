import { useState } from "react";
import { serverFeat, ServerFeatsPronsDelete } from "./Interface/FeatInterface";

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
                    <div key={index} style={{ flex: 1 }}>
                      <p onClick={() => setSelected(feat)}>
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