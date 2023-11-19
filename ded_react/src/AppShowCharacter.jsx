import { useEffect, useState } from "react"

export function AppShowCharacter(){

    let idChar = 1;
    const URL = 'http://localhost:8080/character-card/'+idChar;

    const [char, setChar] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(URL)
            result.json()
            .then(json => {
                setChar(json)
                console.log(json)
            })
        }
        fetchData();
    }, []);

    return (
        <div>            
            <p>name: {char.characterName}</p>
            <p>player: {char.playerName}</p>
            <p>race: {char.race}, {char.subRace}</p>
            <p>size: {char.size}, speed: {char.speed}</p>
            <p>base attack bonus: {char.bab}</p>
            <p>abilitys: {char.abilitys?.strenght?
                <>
                <li>STR: {char.abilitys.strenght}</li>
                <li>DEX: {char.abilitys.dextrity}</li>
                <li>CONS: {char.abilitys.constitution}</li>
                <li>INT: {char.abilitys.intelligence}</li>
                <li>WIS: {char.abilitys.wisdom}</li>
                <li>CHA: {char.abilitys.charisma}</li>
                </>
            :<>...loading abilitys...</>}
            </p>
            <p>classes:{char.classPcList?.className?
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
            <p>hit dice: {char.vitality?.hitDices?.index?
            <p>{char.vitality.hitDices.map((h, index) => {
                return(
                    <div key={index}>{index} {h}</div>
                )
                })}</p>
                :<>...loading hit dice...</>}
            </p>
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