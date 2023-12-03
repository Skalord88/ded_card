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

    return (
        <>
        <div>{char.characterName}, skills points: {char.skillPoints}</div>
        <p></p>
        <>{skills?
        <div>
            {skills.map((s,index) => {
                return(
                    <li><button key={index}>add</button> {s.nameSkill}</li>
                )
            })}
        </div>
        :<div>...</div>
        }</>
        </>
    )
}