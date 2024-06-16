import { CharacterPc } from "./interfaces";

export interface CharProps {
    char: CharacterPc;
  }

export const SpeedComponent: React.FC<CharProps> = ({ char }) => {
    
    return(
        <div className="rpgui-container-framed-grey"
        style={{
          gridColumn: 3,
          gridRow: 6
          }}
        >
            <h2 className="rpgui-container-framed-golden-2">Speed</h2>

              <div><p>{char.speed} ft.</p></div>
              <div><p>{char.speed / 5} squares</p></div>

          </div>
    )
}