import { CharToModify } from "./Prerequisite/functions/modifyCharacter";
import { Speed } from "./Speed/interface";

export type SpeedComponentProps = {
  char: CharToModify
};

export const SpeedComponent: React.FC<SpeedComponentProps> = ({ char }) => {
  const speed: Speed = {
    foot: char.speed.foot,
    fly: char.speed.fly,
    climb: char.speed.climb,
    swim: char.speed.swim,
    special: ""
  }
  return (
    <>
      <h2 className="rpgui-container-framed-golden-2">Speed</h2>

      <div><p style={{backgroundColor:"grey"}}>tactic</p></div>
      <div>
        <p>
          move: {Number(speed.foot)}ft. / {Number(speed.foot) / 5}s
        </p>
      </div>
      <div>
        <p>
          rapid: {Number(speed.foot) * 2}ft. / {(Number(speed.foot) * 2) / 5}s
        </p>
      </div>
      <div>
        <p>
          run x3: {Number(speed.foot) * 3}ft. / {(Number(speed.foot) * 3) / 5}s
        </p>
      </div>
      <div>
        <p>
          run x4: {Number(speed.foot) * 4}ft. / {(Number(speed.foot) * 4) / 5}s
        </p>
      </div>

      <p style={{backgroundColor:"grey"}}>one minut</p>
      <div>
        <p>
          move: {Number(speed.foot) * 10}ft. / {(Number(speed.foot) * 10) / 5}s
        </p>
      </div>
      <div>
        <p>
          rapid: {Number(speed.foot) * 20}ft. / {(Number(speed.foot) * 20) / 5}s
        </p>
      </div>
      <div>
        <p>
          run x3: {Number(speed.foot) * 30}ft. / {(Number(speed.foot) * 30) / 5}s
        </p>
      </div>
      <div>
        <p>
          run x4: {Number(speed.foot) * 40}ft. / {(Number(speed.foot) * 40) / 5}s
        </p>
      </div>

      <p style={{backgroundColor:"grey"}}>one hour</p>
      <div>
        <p>move: {Math.floor(Number(speed.foot) * 0.30)}km</p>
      </div>
      <div>
        <p>rapid: {Math.floor(Number(speed.foot) * 0.60)}km</p>
      </div>

      <p style={{backgroundColor:"grey"}}>one day - 6 hours</p>
      <div>
        <p>move: {Math.floor(Number(speed.foot) * 0.30 * 6)}km</p>
      </div>
      <div>
        <p>rapid: {Math.floor(Number(speed.foot) * 0.60 * 6)}km</p>
      </div>
    </>
  );
};

export const SpeedSummaryComponent: React.FC<SpeedComponentProps> = ({ char }) => {
  const speed: Speed = {
    foot: char.speed.foot,
    fly: char.speed.fly,
    climb: char.speed.climb,
    swim: char.speed.swim,
    special: ""
  }
  const speedText: string = speed.foot? "foot " + speed.foot + "ft." : ""
  return (<div><p>speed: {speedText}</p></div>)
}
