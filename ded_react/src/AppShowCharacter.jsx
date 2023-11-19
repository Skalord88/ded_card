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
            :<div>...loading abilitys...</div>}
            </p>
            <p>classes:{char.classPcList?.className?
                <>
                {char.classPcList.map((c, index) => {
                    return(
                    <li key={index}>{c.className} {c.level}</li>
                )})}
                </>
            :<div>...loading class...</div>}
            </p>
            <p>ECL: {char.effectiveCharacterLv}</p>
        </div>
        
    )

}

export default AppShowCharacter;