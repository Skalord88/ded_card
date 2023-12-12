import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'

export function Skills() {

    let { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;

    //1
    const [char, setChar] = useState('')
    const [skills, setSkills] = useState([])
    const [skill, setSkill] = useState({});
    const [actualSkillsPoints, setActualSkillsPoints] = useState(0)
    const [maxSkLv, setMaxSkLv] = useState(0)

    //6
    const [skillName, setSkillName] = useState('')
    const [listToAdd, setListToAdd] = useState('')
    
// 8
    const [id, setId] = useState(0)
    const [skCl, setSkCl] = useState('')
    const [rank, setRank] = useState(0)
    const [count, setCount] = useState(0)
//11

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                
                const resURL = await axios.get(URL)
                
                setChar(resURL.data)
                setSkills(resURL.data.skillsList)
                setMaxSkLv(resURL.data.effectiveCharacterLv + 3)
                setActualSkillsPoints(resURL.data.skillPoints)
                setCount(resURL.data.skillPoints)
                
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    // const handleFilter = (e) => {

    //     let value = e.target.value;

    //     console.log('value:', value, 'skills:',skills)

    //     let filtered = skills.find(sk => sk.idSkill===value);
    //     setSkill(filtered);
    //     console.log(filtered)

    // }
    
    const handleIdSkill = (e) => {

        const existingSkill = skills.find(element => element.idSkill === JSON.parse(e.target.value));

        setId(existingSkill.idSkill)
        setSkillName(existingSkill.nameSkill)

    }

    const handleAddRank = (e) => {

        const updateSkills = skills.map(s => {

            if(s.idSkill===id){
                if(-maxSkLv < (count - actualSkillsPoints)){
                    if(s.classSkill){
                        s.skillRank++
                        setCount(count - 1)
                    } else {
                        setRank(s.skillRank + 0.5)
                        setCount(count - 1)
                    }
                }
            }
        })

        setSkills(updateSkills)

        // if(-maxSkLv < (count - actualSkillsPoints)){
        //     if(skill.classSkill){
        //         setRank(skill.skillRank + 1)
        //         setCount(count - 1)
        //     } else {
        //         setRank(skill.skillRank + 0.5)
        //         setCount(count - 1)
        //     }
        // }
    }
    const handleDelRank = () => {
        if(actualSkillsPoints > count){
            if(JSON.parse(skCl)){
                setRank(rank - 1)
                setCount(count + 1)
            } else {
                setRank(rank - 0.5)
                setCount(count + 1)
            }
        }
    }

    // console.log(id, skCl, rank, (count - actualSkillsPoints))

    const handleChange = () => {

        // let existingSkill = skills.find(element => element.idSkill === id);

        // setSkill(existingSkill)

        setActualSkillsPoints(prev => prev + (count - actualSkillsPoints))
        setId('')
        setRank(0)
    }

    const realodPage = () => window.location.reload(false)

    return (
        <>
        <div>
            {char.characterName}, skills points: {actualSkillsPoints} / {count} rmng pts <button onClick={realodPage}>reload</button>
        </div>
        <div>
            {id?
            <>
            {skillName} {rank}
            <button onClick={handleAddRank}>+</button>
            <button onClick={handleDelRank}>-</button>
            <button onClick={handleChange}>change</button>
            </>
            :
            <></>}
        </div>
        <>
        {skills?
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
                                value={s.idSkill}
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
                        <>
                        {skills.map((s, index) => {
                            return(
                                <div key={index} align='center'>
                                    {s.skillRank}
                                </div>
                            )
                        })}
                        </>
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