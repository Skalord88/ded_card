import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Skills() {

    let { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;

    const [char, setChar] = useState('');
    const [skills, setSkills] = useState('');
    const [skillsToAdd, setSkillsToAdd] = useState('');
    const [skillToChange, setSkillToChange] = useState('');
    const [listToAdd, setListToAdd] = useState('')
    const [actualSkillsPoints, setActualSkillsPoints] = useState(0)

    const [id, setId] = useState('')
    const [skCl, setSkCl] = useState('')
    let [rank, setRank] = useState(0)

    let [count, setCount] = useState(0);
    let [add, setAdd] = useState([false, true]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resURL = await axios.get(URL);
                
                setChar(resURL.data);
                setSkills(resURL.data.skillsList);
                setActualSkillsPoints(resURL.data.skillPoints)
                setCount(resURL.data.skillPoints)
                
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleIdSkill = (e) => {
        const buttonArray = e.target.value.split(',');
        if(Array.isArray(buttonArray) && buttonArray.length > 0){
        setSkillsToAdd({
            idSkill : buttonArray[0],
            skClass : buttonArray[1],
            skillRank : rank
        })}

        setSkillToChange(buttonArray[2])

    }

    console.log(skillsToAdd)

    const handleRankSkill = (e) => {
        
        const sign = e.target.value

        let updateSkill = 0;

        let actualRank = skillsToAdd.skillRank

        if(skillsToAdd.skClass && sign){
            updateSkill = {...skillsToAdd, skillRank : +1}
        } else if (skillsToAdd.skClass && !sign) {
            updateSkill = {...skillsToAdd, skillRank : -1}
        } else if (!skillsToAdd.skClass && sign){
            updateSkill = {...skillsToAdd, skillRank : +0.5}
        } else if (!skillsToAdd.skClass && !sign){
            updateSkill = {...skillsToAdd, skillRank : -0.5}
        }

        setSkillsToAdd(updateSkill)


        // setCount(actualSkillsPoints - rank)

        // if(rank > 0){
        //     setAdd([true, true])
        // } else if(rank < 0){
        //     setAdd([true, false])
        // }

    }

    console.log(skillsToAdd)

    const handleAdd = () => {
        
        setListToAdd([...listToAdd, skillsToAdd])
        setActualSkillsPoints(prev => prev - skillsToAdd.skPoints)
        setSkillsToAdd('')
        setRank(0)
    }

    return (
        <>
        <div>{char.characterName}, skills points: {actualSkillsPoints} / {count} rmng pts</div>
        <div>
            {skillsToAdd?
            <>
            {skillToChange}
            {rank}
            <button
            value={true}
            onClick={handleRankSkill}
            >+</button>
            <button
            value={false}
            onClick={handleRankSkill}
            >-</button>
            <button onClick={handleAdd}>add</button>
            </>
            :<></>}
        </div>
        <div>{add===true?<button>add</button>:<></>}</div>
        <>{skills?
        <fieldset>
            <legend>skills</legend>
        <div>
            <table>
                <thead>
                    <th>CS</th>
                    <th align='left'>skill</th>
                    <th align='center'>add/rmv</th>
                    <th align='center'>tot</th>
                    <th align='center'>rnk</th>
                    <th align='center'>abi</th>
                    <th align='center'>dif</th>
                </thead>
                <tbody>
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
                                value={[s.idSkill, s.classSkill, s.nameSkill]}
                                onClick={handleIdSkill}
                                >{s.nameSkill}</button>
                                </div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'>
                                {s.skillRank+s.skillAbility+s.skillBonus}
                            </div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'>
                                {s.skillRank}
                            </div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'>
                                {s.skillAbility}
                            </div>
                        )})}
                    </td>
                    <td>
                    {skills.map((s,index) => {
                        return(
                            <div key={index} align='center'>
                                {s.skillBonus}
                            </div>
                        )})}
                    </td>
                </tbody>
            </table>
        </div>
        </fieldset>
        :<div>...</div>
        }</>
        </>
    )
}