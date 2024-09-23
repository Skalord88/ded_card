import { Feat } from "../Feats/Interface/FeatInterface";
import { Popup } from "../Popup/Popup";

export type FeatsSummaryProps = {
  feats: Feat[];
};

export const FeatsSummary: React.FC<FeatsSummaryProps> = ({ feats }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p>
        Feats:{" "}
        {feats.map((feat, index) => {
          return <><Popup text={feat.featName} popText={feat.description}/>{index === feats.length - 1? "":", "}</>;
        })}
      </p>
    </div>
  );
};
