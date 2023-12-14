import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export function Create() {

    const URL = 'http://localhost:8080/character-card';

    const char = {characterName : '', playerName : ''}

    const [inputData, setInputData] = useState(char)
    const [charId, setCharId] = useState('')

    const handleData = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL, inputData)
        .then((response) => {setCharId(response.data.characterId)})
    }

    return (
        <>
            <form>
                <input type='text' placeholder="Character Name" onChange={handleData} name="characterName" value={inputData.characterName}></input>
                <input type='text' placeholder="Player" onChange={handleData} name="playerName" value={inputData.playerName}></input>
            <p>
                <>{charId === ''?
                <button onClick={handleSubmit}>create</button>
                :<button> <Link to={'/abilitys/' + charId}>to abilitys</Link></button>
            }</>
            </p>
            </form>
        </>
    )
}