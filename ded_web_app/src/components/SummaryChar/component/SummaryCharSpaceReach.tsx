import { SummaryCharProps } from "../SummaryChar";

export const SummaryCharSpaceReach: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
  function splitSpaceReach(spaceReach: string): [number, number] {
    const [space, reach] = spaceReach.split("/").map(Number);
    return [space, reach];
  }

  const [space, reach] = splitSpaceReach(
    modCharacter.race?.race?.modifiers?.spaceReach || "0/0"
  );

  return (
    <>
      <div>
        <p>Space/Reach:</p>
      </div>
      <div>
        <p>
          {space}ft. / {reach}ft.
        </p>
      </div>
    </>
  );
};