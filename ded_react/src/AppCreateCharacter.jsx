import React, { useState} from 'react'
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
        </>
    )
}