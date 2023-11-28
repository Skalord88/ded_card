import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export function Create() {

    const URL = 'http://localhost:8080/character-card';

    const char = {characterName : '', playerName : ''}
    const navigate = useNavigate();

    const [inputData, setInputData] = useState(char)
    const [charId, setCharId] = useState('')

    const handleData = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL, inputData)
        .then((response) => {console.log(response, setCharId(response.data.characterId))})
        .navigate('/class' + charId)
    }

    return (
        <>
            <form>
                <input type='text' placeholder="Character Name" onChange={handleData} name="characterName" value={inputData.characterName}></input>
                <input type='text' placeholder="Player" onChange={handleData} name="playerName" value={inputData.playerName}></input>
            <p>
                <button onClick={handleSubmit}>create</button>
            </p>
            </form>
        </>
    )
}