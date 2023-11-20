import { useEffect, useState } from 'react'
import axios from 'axios';

export function AppShowCharacter(){

    let idChar = 1;
    const URL = 'http://localhost:8080/character-card/'+idChar;

    const [char, setChar] = useState("");
    const [abilitys, setAbilitys] = useState("");
    const [classes, setClasses] = useState("");
    const [hitDices, setHitDices] = useState(new Map())

    useEffect(() => {
        axios
        .get(URL)
        .then((response) => {
            setChar(response.data);
            setAbilitys(response.data.abilitys);
            setClasses(response.data.classPcList);
            setHitDices(response.data.vitality)
            console.log("API CALLED");
        });
    }, []);

    return (
        <div>            
            <p>name: {char.characterName}</p>
            <p>player: {char.playerName}</p>
            <p>race: {char.race}, {char.subRace}</p>
            <p>size: {char.size}, speed: {char.speed}</p>
            <p>base attack bonus: {char.bab}</p>
            <p>abilitys: {abilitys?
                <>
                <li>STR: {abilitys.streght}</li>
                <li>DEX: {abilitys.dextrity}</li>
                <li>CONS: {abilitys.constitution}</li>
                <li>INT: {abilitys.intelligence}</li>
                <li>WIS: {abilitys.wisdom}</li>
                <li>CHA: {abilitys.charisma}</li>
                </>
            :<>...loading abilitys...</>}
            </p>
            <p>classes: {classes?
                <>
                {char.classPcList.map((c, index) => {
                    return(
                    <li key={index}>{c.className} {c.level}</li>
                )})}
                </>
                :<>...loading class...</>}
            </p>
            <p>ECL: {char.effectiveCharacterLv}</p>
            <p>life: {char.vitality?.life?
                <>{char.vitality.life}</>
                :<>...loading life...</>}
            </p>
            <p>hit dice: {char.vitality?
            <p>{hitDices.hitDices.map((k, v) => {
                return (
                    <p>{k}:{v}</p>
                    );
            })}</p>
            :<p>...loading vitality...</p>
        }</p>
            <p>hit points: {char.vitality?.hitPoints?
                <>{char.vitality.hitPoints}</>
                :<>loading...hit point...</>}
            </p>
            <p>AC: {char.armorClass?.dextrityBonus?
                <>{10 + 
                char.armorClass.dextrityBonus + char.armorClass.sizeBonus +
                char.armorClass.armorBonus + char.armorClass.shildBonus +
                char.armorClass.enhancementBonuses + char.armorClass.deflectionBonuses +
                char.armorClass.deflectionBonuses + char.armorClass.dodgeBonus
                }, touch: {
                10 +
                char.armorClass.dextrityBonus + char.armorClass.sizeBonus +
                char.armorClass.deflectionBonuses + char.armorClass.dodgeBonus
                }, flat-footed: {
                10 +
                char.armorClass.sizeBonus + char.armorClass.armorBonus +
                char.armorClass.shildBonus + char.armorClass.enhancementBonuses
                }</>
                :<>...loading armor class...</>}    
            </p>
            <p>saving throw: {char.savingThrow?.fortitude?
                <>fort: {char.savingThrow.fortitude}, ref: {char.savingThrow.reflex}, will: {char.savingThrow.will}</>
                :<>...loading saving throw...</>}
            </p>
            
        </div>
        
    )

}

export default AppShowCharacter;