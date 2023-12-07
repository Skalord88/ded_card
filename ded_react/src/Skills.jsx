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
            <table>
                <tr>
                    <th>CS</th>
                    <th align='left'>skill</th>
                    <th align='center'>add/rmv</th>
                    <th align='center'>tot</th>
                    <th align='center'>rnk</th>
                    <th align='center'>abi</th>
                    <th align='center'>dif</th>
                </tr>
                <tr>
                    <td>
                        {skills.map((s,index) => {
                            return(
                                <div key={index} align='center'>{s.classSkill?<>x</>:<>o</>}</div>
                            )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='left'>{s.nameSkill}</div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'><button>+</button><button>-</button></div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'>{s.skillRank+s.skillAbility+s.skillBonus}</div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'>{s.skillRank}</div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'>{s.skillAbility}</div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'>{s.skillBonus}</div>
                        )})}
                    </td>
                </tr>
            </table>
        </div>
        </fieldset>
        :<div>...</div>
        }</>
        </>
    )
}