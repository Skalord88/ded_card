import { SummaryCharProps } from "../SummaryChar";

export const SummaryCharFeats: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  return (
    <>
      <div>
        <p>Feats:</p>
      </div>
      <div>
        {modCharacter.feats && modCharacter.feats.map((f, index) => {
          return (
            <div key={index}>
              <span>{f.featName} </span>
            </div>
          );
        })}
      </div>
    </>
  );
};