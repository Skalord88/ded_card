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
                
                setChar(resURL.data)
                setSkills(resURL.data.skillsList);

            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        <div>{char.characterName}, skills points: {char.skillPoints}</div>
        <>{skills?
        <fieldset>
            <legend>skills</legend>
        <div>
            {skills.map((s,index) => {
                return(
                    <div key={index}>{s.classSkill?<>x</>:<>o</>} {s.nameSkill}</div>
                )
            })}
        </div>
        </fieldset>
        :<div>...</div>
        }</>
        </>
    )
}