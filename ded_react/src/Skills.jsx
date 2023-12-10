import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Skills() {

    let { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;

    const [char, setChar] = useState('');
    const [skills, setSkills] = useState('');
    const [skillsToAdd, setSkillsToAdd] = useState('')
    let [count, setCount] = useState(0)
    let [add, setAdd] = useState([false, true])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resURL = await axios.get(URL);
                
                setChar(resURL.data);
                setSkills(resURL.data.skillsList);
                
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleIdSkill = (e) => {
        const { name, value } = e.target
        setSkillsToAdd({
            idSkill : name,
            skPoints : 0
        })
        console.log(skillsToAdd)
    }

    const handleRankSkill = (e) => {
        const { name, value } = e.target

        setSkillsToAdd({
            idSkill : name,
            skPoints : value
        })

        setCount(char.skillPoints - value)

        if(value > 0){
            setAdd([true, true])
        } else if(value < 0){
            setAdd([true, false])
        }


        console.log(skillsToAdd, add)
    }


    return (
        <>
        <div>{char.characterName}, skills points: {char.skillPoints} / {count} remaining</div>
        <div>
            {skillsToAdd?
            <input type='number' placeholder="0" onChange={handleRankSkill} name={skillsToAdd.idSkill} value={skillsToAdd.skPoints}></input>
            :<></>}
        </div>
        <div>{add===true?<button>add</button>:<></>}</div>
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
                                <div key={index} align='center'>
                                    {s.classSkill?<>x</>:<>o</>}
                                </div>
                            )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='left'>
                                <button
                                name={s.idSkill}
                                value={s.nameSkill}
                                onClick={handleIdSkill}
                                >{s.nameSkill}</button>
                                </div>
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