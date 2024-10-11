import { Popup } from "../Popup/Popup";
import { FeatsToShow } from "./Interface/FeatInterface";

export type FeatsComponentProps = {
  feats: FeatsToShow[];
};

export const FeatsComponent: React.FC<FeatsComponentProps> = ({ feats }) => {
  const featsOneTime = Array.from(
    new Map(feats.map((f) => [f.feat.featName, f])).values()
  );

  return (
    <div>
      <h2 className="rpgui-container-framed-golden-2">Feats</h2>
      {featsOneTime.map((f, index) => (
        <div key={index}>
          <p>
            <Popup text={f.feat.featName} popText={f.feat.description} />
          </p>
        </div>
      ))}
    </div>
  );
};
