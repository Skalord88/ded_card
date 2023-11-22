import { useState, useEffect } from "react";
import axios from 'axios';

export function AppListOfCharacters(){

    const URL = 'http://localhost:8080/character-card';

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
            list of characters:
            {charList?
            <>{charList.map((c, index) => {
                return (
                <li key={index}>character:<b>{c.characterName}</b> / player:<b>{c.playerName}</b></li>
            )})}</>
            :<div>...loading characters...</div>
            }
        </>
    )
}