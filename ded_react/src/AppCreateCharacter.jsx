import React, { useEffect, useState} from 'react'
import axios from 'axios'

export function AppCreateCharacter() {

    const URL = 'http://localhost:8080/character-card';

    const char = {characterName : '', playerName : ''}

    const [inputData, setInputData] = useState(char)

    const handleData = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL, inputData)
        .then((response) => {console.log(response)})
    }

    const [charList, setCharList] = useState('')

    useEffect(() => {
        axios
        .get(URL)
        .then((response) => {
            setCharList(response.data)
        });
    }, [])

    return (
        <>
            <>
                <form>
                    <input type='text' placeholder="Character Name" onChange={handleData} name="characterName" value={inputData.characterName}></input>
                    <input type='text' placeholder="Player" onChange={handleData} name="playerName" value={inputData.playerName}></input>
                <p>
                    <button onClick={handleSubmit}>create</button>
                </p>
                </form>
        </>
        <>
            list of characters:
            {charList?
            <>{charList.map((c, index) => {
                return (
                <li key={index}>character:<b>{c.characterName}</b> / player:<b>{c.playerName}</b></li>
            )})}</>
            :<div>...loading characters...</div>}</>
        </>
    )
}