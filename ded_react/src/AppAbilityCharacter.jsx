import { useState, useEffect } from "react";
import axios from 'axios'

export function AppAbilityCharacter(){

    let idChar = 1;
    const URL = 'http://localhost:8080/ability/'+idChar;

    const char = {
        streght : '',
        dextrity : '',
        constitution : '',
        intelligence : '',
        wisdom : '',
        charisma : ''
    }

    const [inputData, setInputData] = useState(char)

    const handleData = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL, inputData)
        .then((response) => {console.log(response)})
    }

    const [charAB, setCharAB] = useState('')
    const [abilitys, setCharABability] = useState('')

    useEffect(() => {
        axios
        .get(URL)
        .then((response) => {
            setCharAB(response.data)
            setCharABability(response.data.abilitys)
        });
    }, [])

    return (
        <>
            <form>
            <input type='number' placeholder="10" onChange={handleData} name="streght" value={inputData.streght}></input> streght
            <p></p><input type='number' placeholder="10" onChange={handleData} name="dextrity" value={inputData.dextrity}></input> dextrity
            <p></p><input type='number' placeholder="10" onChange={handleData} name="constitution" value={inputData.constitution}></input> constitution
            <p></p><input type='number' placeholder="10" onChange={handleData} name="intelligence" value={inputData.intelligence}></input> intelligence
            <p></p><input type='number' placeholder="10" onChange={handleData} name="wisdom" value={inputData.wisdom}></input> wisdom
            <p></p><input type='number' placeholder="10" onChange={handleData} name="charisma" value={inputData.charisma}></input> charisma
                <p>
                    <button onClick={handleSubmit}>create</button>
                </p>
            </form>
            <p>{charAB.characterName}, {charAB.playerName}</p>
            <li>STR: {abilitys.streght} {abilitys.streght>=0? '+' : ''}{Math.floor(((abilitys.streght-10)/2))}</li>
            <li>DEX: {abilitys.dextrity} {abilitys.dextrity>=0? '+' : ''}{Math.floor(((abilitys.dextrity-10)/2))}</li>
            <li>CON: {abilitys.constitution} {abilitys.constitution>=0? '+' : ''}{Math.floor(((abilitys.constitution-10)/2))}</li>
            <li>INT: {abilitys.intelligence} {abilitys.intelligence>=0? '+' : ''}{Math.floor(((abilitys.intelligence-10)/2))}</li>
            <li>WIS: {abilitys.wisdom} {abilitys.wisdom>=0? '+' : ''}{Math.floor(((abilitys.wisdom-10)/2))}</li>
            <li>CHA: {abilitys.charisma} {abilitys.charisma<=0? '+' : ''}{Math.floor(((abilitys.charisma-10)/2))}</li>
        </>
    )

}