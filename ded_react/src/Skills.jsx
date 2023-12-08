import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Skills() {

    let { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;

    let [skill, setSkill] = useState({
        idSkill: '',
        skillRank: ''
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setSkill(prevSkill => ({
        ...prevSkill,
        idSkill: name,
        skillRank: value
        }));
    };

    const [char, setChar] = useState("");
    const [skills, setSkills] = useState("");
    let skillsToAdd = []

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resURL = await axios.get(URL);
                
                setChar(resURL.data)
                setSkills(resURL.data.skillsList);

                let skillsToAdd = skills.map(s => {
                    setSkill(prevSkill => ({
                        ...prevSkill,
                        idSkill : s.idSkill,
                        skillRank : ''
                    }))
                })

            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
        char.skillsList.map((s) => {
            setSkill(prevSkill => ({
                ...prevSkill,
                idSkill: s.idSkill,
                skillRank: ''
                }));
                skillsToAdd.push(skill)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // const addSkill = (e) => {
    //     skillToAdd.push(inputData)
    //     console.log(skillToAdd)
    // }

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
                                value={skill.skillRank}
                                onChange={handleInputChange}
                                placeholder="Inserisci l'id della skill"
                                />
                                
                                <strong>Stato attuale della skill:</strong> {JSON.stringify(skill)}
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