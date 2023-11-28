import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';

export function Races() {

    let { charId } = useParams();
    const URLchar = 'http://localhost:8080/character-card/'+charId;
    const URLraceList = 'http://localhost:8080/race';
    const URLrace = URLraceList+'/'+charId+'/race';

    const charRace = {
        id : ''
        }

    const [char, setChar] = useState("");
    const [races, setRaces] = useState("");
    const [subRaces, setSubRaces] = useState([]);
    const [subRacesAbility, setSubRacesAbility] = useState("");
    const [inputData, setInputData] = useState(charRace)
    const [change, setChange] = useState(false)

    useEffect(() => {
        axios.get(URLchar).then((response) => {
            setChar(response.data)
            setSubRaces([response.data.subRaces])
            setSubRacesAbility(subRaces.raceAbilitys)
        })
        axios.get(URLraceList).then((response) => {
            setRaces(response.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleData = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URLrace, inputData)
        .then((response) => {console.log(response)})
        .then(setChange(true))
    }

    return (
        <>
            <div>{char.characterName}</div>
            <p></p>
            <div>
                {races? 
                <>{races.map((r, index) => {
                    return(
                    <div key={index}>{r.raceName} {subRaces?
                    <p>{r.subRaces.map((sr, indexSR) => {
                        return(
                            <li key={indexSR}>
                                {sr.subRacesName}
                                {subRacesAbility?
                                <p>
                                <li>{subRacesAbility.streght? <></>:<>no</>}</li>
                                <li>{subRacesAbility.dextrity? <></>:<></>}</li>
                                <li>{subRacesAbility.constitution? <></>:<></>}</li>
                                <li>{subRacesAbility.intelligence? <></>:<></>}</li>
                                <li>{subRacesAbility.wisdom? <></>:<></>}</li>
                                <li>{subRacesAbility.charisma? <></>:<></>}</li>
                                </p>
                                :<>...loading abilitys...</>
                                }
                                {sr.levelAdjustment===0? <></>:<>, lva:{sr.levelAdjustment}</>}</li>
                    )})}</p>
                    :<p>...loading sub races...</p>
                    }</div>
                )})}</>
                :<>...loading races...</>
            }
            </div>
        </>
    );
}