import { useEffect, useState } from "react"

export function AppShowCharacter(){

    //let idChar = 1;
    const URL = 'http://192.168.0.105:8080/character-card/1';

    const [char, setChar] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const result = (await fetch(URL), {
                mode: 'no-cors'
              })
            result.json()
            .then(json => {
                setChar(json)
                console.log(json)
            })
        }
        fetchData();
    }, []);

    const grapple = char.bab;

    return (
        <div>            
            <p>name: {char.characterName}</p>
            <p>player: {char.playerName}</p>
            <p>race: {char.race}, {char.subRace}</p>
            <p>size: {char.size}, speed: {char.speed}</p>
            <p>abilitys:</p>
            <p>grapple: {grapple}</p>
            {console.log(char.abilitys)}
            <p>base attack bonus: {char.bab}</p>
        </div>
        
    )

}

export default AppShowCharacter;