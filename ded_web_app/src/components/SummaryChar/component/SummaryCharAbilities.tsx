import { SummaryCharProps } from "../SummaryChar";

export const SummaryCharAbilities: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  return (
    <>
      <div>
        <p>Abilities:</p>
      </div>
      <div style={{ display: "", flexDirection: "row" }}>
        {modCharacter.abilitys && Object.entries(modCharacter.abilitys).map(([key, value]) => {
          if (value as number)
            return (
              <div key={key}>
                <p>
                  {key}:{value as number}
                </p>
              </div>
            );
        })}
      </div>
    </>
  );
};
