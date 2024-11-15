import { FormattingText } from "../Formatting/Function";
import { Modifiers } from "../Modifiers/ModifierInterface";

export type ModifierSummaryProps = {
  modifiers: Modifiers[];
};

export const ModifierSummary: React.FC<ModifierSummaryProps> = ({
  modifiers
}) => {
  return (
    <div>
      <p style={{ display: "flex", flexDirection: "row" }}>
      Modifiers:{" "}
        {modifiers.map((m, index) => {
          const lastIndex = modifiers.length;
          return (
            <>
              {FormattingText(m.modifier)}: {FormattingText(m.targets[0])}{" "}
              {m.bonus} {FormattingText(m.targets[1])}{" "}
              {lastIndex - 1 !== index ? " / " : ""}
            </>
          );
        })}
      </p>
    </div>
  );
};
