import { useState } from "react";
import { ListOfSomething } from "../List/List";
import { addToDrop, itemInDrop } from "../functions";
import { feat, serverFeat, ServerFeatsProns } from "./Interface/FeatInterface";

export const ServerFeatsList: React.FC<ServerFeatsProns> = ({
  feats,
  title,
  selectFeat
}) => {
  const [selected, setSelected] = useState<serverFeat | feat | null>();

  const handleDescription = (e: itemInDrop) => {
    setSelected(e.item.item);
    selectFeat(e.item.item);
  };

  return (
    <>
      <div className="rpgui-container-framed-grey" style={{ flex: 1 }}>
        <h2 className="rpgui-container-framed-golden-2">{title}</h2>
        <div>
          <div>
            {feats ? (
              <ListOfSomething
                items={addToDrop(feats, "feat")}
                text=""
                onSelect={handleDescription}
              />
            ) : (
              <></>
            )}
          </div>
          {selected ? (
            <>
              <div className="rpgui-container-framed-grey">
                <h2 onClick={() => setSelected(null)}>
                  {(selected as serverFeat).featName ||
                    (selected as feat).characterFeatName}
                </h2>
                <p>
                  {(selected as serverFeat).description ||
                    (selected as feat).characterFeatDescription}
                </p>
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
