import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Skills() {

    let { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;

    const [char, setChar] = useState("");
    const [skills, setSkills] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resURL = await axios.get(URL);
                setChar(resURL.data);
                setSkills(resURL.data.skillsList);

            } catch(error) {
                console.log(char)
            }
        }
        console.log(skills)
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let num = 1;
    let arrayNum = [];
    for(let n = 0; n = char.effectiveCharacterLv+3; n++){
        arrayNum.push(num);
        num++;
    }
    console.log(arrayNum.length)

    return (
        <>
        <div>{char.characterName}, skills points: {char.skillPoints}</div>
        <label for="browser">Choose your browser from the list:</label>
            <input list="browsers" name="browser" id="browser"/>
            <datalist id="browsers"/>
                <option value="Edge"/>
                <option value="Firefox"/>
                <option value="Chrome"/>
                <option value="Opera"/>
                <option value="Safari"/>
        <input type="submit"/>
        <>{skills?
        <fieldset>
            <legend>skills</legend>
        <div>
            {skills.map((s,index) => {
                return(
                    <li><button key={index}>add</button> {s.nameSkill}</li>
                )
            })}
        </div>
        </fieldset>
        :<div>...</div>
        }</>
        </>
    )
}