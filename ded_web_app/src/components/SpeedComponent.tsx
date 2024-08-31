import { CharProps } from "./interfaces";
import { CountSpeed } from "./Modifiers/Speed/Function";



export const SpeedComponent: React.FC<CharProps> = ({ char }) => {
  const speed = CountSpeed(char);
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Speed</h2>

      <div>
        <p>{speed} ft.</p>
      </div>
      <div>
        <p>{speed / 5} squares</p>
      </div>
    </>
  );
};
