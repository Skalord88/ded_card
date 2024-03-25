import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export function Create() {

    const URL = 'http://localhost:8080/character-card';

    const [inputData, setInputData] =
    useState<{
        characterName: string,
        playerName: string
        }>({
        characterName: '',
        playerName: ''
    });

    const [charId, setCharId] = 
    useState<number>(-1)

    const handleData = (e:any) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e:any) => {
        e.preventDefault();
        axios.post(URL, inputData)
        .then((response) => {setCharId(response.data.characterId)})
    }

    return (
        <div className='container'>
            <div className='container-item'>
            <form>
                <input type='text' placeholder="Character Name" onChange={handleData} name="characterName" value={inputData.characterName}></input>
                <input type='text' placeholder="Player" onChange={handleData} name="playerName" value={inputData.playerName}></input>
            

                <div>{charId > -1?
                <button> <Link to={'/ability/' + charId}>to abilitys</Link></button>
                :<button onClick={handleSubmit}>create</button>
                
            }</div>

            </form>
            </div>
        </div>
    )
}