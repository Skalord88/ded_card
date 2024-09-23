import { SavingProps } from "../Saving/Saving";

export type SavingSummaryProps = {
  saving: SavingProps | undefined;
};

export const SavingSummary: React.FC<SavingSummaryProps> = ({ saving }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <p>Fort: {saving?.forTot.sign}{saving?.forTot.number}</p>
      <p>/ Ref: {saving?.refTot.sign}{saving?.refTot.number}</p>
      <p>/ Will: {saving?.willTot.sign}{saving?.willTot.number}</p>
    </div>
  );
};
