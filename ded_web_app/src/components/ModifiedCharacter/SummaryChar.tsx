import { ModifiedCharacter } from "./interface/ModifiedCharacter";

export type SummaryCharProps = {
    modCharacter: ModifiedCharacter;
}

export const SummaryChar: React.FC<SummaryCharProps> = ({
  modCharacter
}) => {
    const speed = 
    (modCharacter.race?.modifiers?.speed?.foot as number || 0)
    + (modCharacter.race?.race.modifiers?.speed?.foot as number || 0)
    ;
    return (
        <div className="rpgui-container-framed golden" >
            <h2>{modCharacter.title}</h2>
            <div style={{display: "flex"}}>
                <div style={{flex: 1}}>
                    <p>Size/Type:</p>
                    <p>Hit Dice:</p>
                    <p>Initiative:</p>
                    <p>Speed:</p>
                </div>
                <div style={{flex: 2}}>
                    <p>{modCharacter.race?.size.size} {modCharacter.race?.race.raceType.raceClass.className}</p>
                    <p>1d8</p>
                    <p>+2</p>
                    <p>{speed}</p>
                </div>
            </div>
        </div>
    )
}