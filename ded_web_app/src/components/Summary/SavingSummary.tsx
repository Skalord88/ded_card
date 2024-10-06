import { SavingProps } from "../Saving/Saving";

export type SavingSummaryProps = {
  saving: SavingProps[] | undefined;
};

export const SavingSummary: React.FC<SavingSummaryProps> = ({ saving }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {saving?
      <>
      <p>Fort: {saving[0].tot.sign}{saving[0].tot.number}</p>
      <p>/ Ref: {saving[1].tot.sign}{saving[1].tot.number}</p>
      <p>/ Will: {saving[2].tot.sign}{saving[2].tot.number}</p>
      </>
      : null}
    </div>
  );
};
