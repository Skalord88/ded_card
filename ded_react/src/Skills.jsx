import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Skills() {

    let { charId } = useParams();
    const URL = 'http://localhost:8080/character-card/'+charId;

    const [char, setChar] = useState('');
    const [skills, setSkills] = useState('');
    const [actualSkillsPoints, setActualSkillsPoints] = useState(0)
    const [maxSkLv, setMaxSkLv] = useState(0)

    const [skillName, setSkillName] = useState('');
    const [listToAdd, setListToAdd] = useState([])
    

    const [id, setId] = useState('')
    const [skCl, setSkCl] = useState('')
    const [rank, setRank] = useState(0)

    const [count, setCount] = useState(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const resURL = await axios.get(URL);
                
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

    const handleIdSkill = (e) => {
        const buttonArray = e.target.value.split(',');
        if(Array.isArray(buttonArray) && buttonArray.length > 0){
            setId(buttonArray[0])
            setSkCl(buttonArray[1])
            setSkillName(buttonArray[2])
        }
    }

    const handleAddRank = () => {
        if(-maxSkLv < (count - actualSkillsPoints)){
            if(JSON.parse(skCl)){
                setRank(rank + 1)
                setCount(count - 1)
            } else {
                setRank(rank + 0.5)
                setCount(count - 1)
            }
        }
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

    console.log(id, skCl, rank, (count - actualSkillsPoints))

    const handleAdd = () => {
        debugger
        if(listToAdd.length===0){
            setListToAdd([...listToAdd, {

                idSkill : id,
                classSkill : skCl,
                nameSkill : skillName,
                skillRank : rank
                
            }])
        }
        const existingSkill = listToAdd.find(e => e.idSkill === id);
        
        if(existingSkill){
            setListToAdd([...listToAdd, listToAdd.skillRank = rank])
        } else {
            setListToAdd([...listToAdd, {

                idSkill : id,
                classSkill : skCl,
                nameSkill : skillName,
                skillRank : rank
                
            }])
        }
        
        setActualSkillsPoints(prev => prev + (count - actualSkillsPoints))
        setId('')
        setRank(0)
    }

    const realodPage = () => window.location.reload(false)

    console.log(listToAdd)

    return (
        <>
        <div>
            {char.characterName}, skills points: {actualSkillsPoints} / {count} rmng pts <button onClick={realodPage}>reload</button>
        </div>
        {listToAdd.length>0?
        <>
        {listToAdd.map((s, index) => {
            return (
            <div key={index}>
                <button
                value={[s.idSkill, s.classSkill, s.nameSkill]}
                onClick={handleIdSkill}
                >
                {s.nameSkill}</button> {s.skillRank}
            </div>
        )})}
        </>
        :
        <></>}
        <div>
            {id?
            <>
            {skillName} {rank}
            <button onClick={handleAddRank}>+</button>
            <button onClick={handleDelRank}>-</button>
            <button onClick={handleAdd}>add</button>
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