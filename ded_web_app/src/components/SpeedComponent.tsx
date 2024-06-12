import { CharacterPc } from "./interfaces";

export interface CharProps {
    char: CharacterPc;
  }

export const SpeedComponent: React.FC<CharProps> = ({ char }) => {
    
    return(
        <div className="rpgui-container-framed-grey">
            <h2 className="rpgui-container-framed-golden-2">Speed</h2>
            <p>
              <div>{char.speed} ft.</div>
              <div>{char.speed / 5} squares</div>
            </p>
          </div>
    )
}