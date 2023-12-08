import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Skills() {

    let { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;
    const URLskills = 'http://localhost:8080/skills/list'

    const addSkill = {
        id : '',
        rank : ''
    }
    const [char, setChar] = useState('');
    const [skills, setSkills] = useState('');
    let [input, setInput] = useState(addSkill)
    const [skillsList, setSkillsList] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resURL = await axios.get(URL);
                const resURLskills = await axios.get(URLskills);
                
                setChar(resURL.data);
                setSkills(resURL.data.skillsList);
                setSkillsList(resURLskills.data);
                
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let skill;

    let skillsToAdd = skillsList.map((s) => {
        skill = {
            idSkill : s.idSkill,
            skillRank : 0
        }
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        skillsToAdd.forEach((s) => {
            if ( name === s.idSkill ) {
                s.skillRank = value
            }
        })
        console.log(skillsToAdd)
    };

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
                            <div key={index} align='center'>
                                <input
                                type="number"
                                name={s.idSkill}
                                value={input.rank}
                                onChange={handleInputChange}
                                placeholder="0"
                                />
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