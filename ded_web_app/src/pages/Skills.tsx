import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import axios from 'axios'
import { characterPc, skill, skillToServer } from '../components/interfaces';
import { characterEmpty } from '../components/variables';

export function Skills() {

    const { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;
    const URLskillSet = 'http://localhost:8080/skills/'+charId;

    const [char, setChar] = useState< characterPc >( characterEmpty )
    const [skills, setSkills] = useState< skill[] >( [] )
    const [actualSkillsPoints, setActualSkillsPoints] = useState(0)
    const [maxSkillsPoints, setMaxSkillsPoints] = useState(0)
    const [maxSkillLv, setMaxSkillLv] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            
            try {
                
                const resURL = await axios.get(URL)

                setChar(resURL.data)
                setSkills(resURL.data.skillsList)
                setMaxSkillLv(resURL.data.effectiveCharacterLv + 3)
                setActualSkillsPoints(resURL.data.skillPoints)
                setMaxSkillsPoints(resURL.data.skillPoints)
                
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddRank = (e) => {

        setSkills((prevSkills) =>
            prevSkills.map((skill) =>
                skill.idSkill === JSON.parse(e.target.value)?
                skill.classSkill && skill.skillRank < maxSkillLv?
                { ...skill, skillRank: skill.skillRank + 1 } :
                skill.skillRank < maxSkillLv/2?
                { ...skill, skillRank: skill.skillRank + 0.5 } :
                skill :
                skill
        ))
        skills.map((skill) =>
            // se id = id
            skill.idSkill === JSON.parse(e.target.value)?
            // se class skill = true e rank < max
            skill.classSkill && skill.skillRank < maxSkillLv?
            setActualSkillsPoints(points => points - 1) :
            skill.skillRank < maxSkillLv/2?
            setActualSkillsPoints(points => points - 1) :
            setActualSkillsPoints(points => points) :
            setActualSkillsPoints(points => points)
        )
    };

    const handleDelRank = (e: any) => {

        setSkills((prevSkills) =>
            prevSkills.map((skill) =>
                skill.idSkill === JSON.parse(e.target.value)?
                skill.classSkill && skill.skillRank > 0?
                { ...skill, skillRank: skill.skillRank - 1 } :
                skill.skillRank > 0?
                { ...skill, skillRank: skill.skillRank - 0.5 } :
                skill :
                skill
        ))
        skills.map((skill) =>
            skill.idSkill === JSON.parse(e.target.value) &&
            actualSkillsPoints < maxSkillsPoints &&
            skill.skillRank > 0?
            setActualSkillsPoints(points => points + 1) :
            setActualSkillsPoints(points => points)
        )
    };

    const handleChange = () => {

        const skillUp: skillToServer[] = []
        let skill: skillToServer = {}

        skills.forEach(s => {
            s.classSkill && s.skillRank > 0?
            skill = { 
                idSkill : s.idSkill,
                skillRank : s.skillRank
            } : skill = {
                idSkill : s.idSkill,
                skillRank : s.skillRank*2
            }
            skillUp.push(skill)
        })

        console.log('skillUp:', skillUp)

        try{
            axios.post((URLskillSet, skillUp))
        } catch (error){
            console.log(error)
        }

        

        // window.location.reload(false)

    }
    
    console.log('skills:', skills)

    const realodPage = () => window.location.reload(false)

    return (
        <>
        <div>
            {char.characterName}, skills points: {actualSkillsPoints} <button onClick={handleChange}>set Skills</button> <button onClick={realodPage}>reload</button>
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
                                {s.nameSkill}
                                <button
                                value={s.idSkill}
                                onClick={handleAddRank}
                                >+</button>
                                <button
                                value={s.idSkill}
                                onClick={handleDelRank}
                                >-</button>
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