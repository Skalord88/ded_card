import { Popup } from "../Popup/Popup";
import { Feat } from "./Interface/FeatInterface";

export type FeatsComponentProps = {
  feats: Feat[];
};

export const FeatsComponent: React.FC<FeatsComponentProps> = ({ feats }) => {

  let featsOneTime = Array.from(new Map(feats.map(f => [f.featName, f])).values());

  return (
    <>
      {featsOneTime.map((f) => (
        <p>
          <Popup
            text={f.featName}
            popText={f.description}
          />
        </p>
      ))}
    </>
  );
};
