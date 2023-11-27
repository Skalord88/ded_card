import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

export function AppListOfCharacters(){

    const URL = 'http://localhost:8080/character-card'
    const URLlist = URL+'/list';

    const [charList, setCharList] = useState('')

    useEffect(() => {
        axios
        .get(URLlist)
        .then((response) => {
            setCharList(response.data)
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            list of characters:
            {charList?
            <>{charList.map((c, index) => {
                return (
                    <p>
                    <Link to={'/character'+c.characterId} key={index}>
                        character:<b>{c.characterName}</b> / player:<b>{c.playerName}</b>
                    </Link>
                    </p>
            )})}</>
            :<div>...loading characters...</div>
            }
        </>
    )
}