import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';

export function Races() {

    let { charId } = useParams();
    const URLchar = 'http://localhost:8080/character-card/'+charId;
    const URLraceList = 'http://localhost:8080/race';
    const URLrace = 'localhost:8080/race/'+charId+'/race';

    const charRace = {
        id : ''
        }

    const [char, setChar] = useState("");
    const [races, setRaces] = useState("");
    const [inputData, setInputData] = useState(charRace)
    const [change, setChange] = useState(false)

    useEffect(() => {
        axios.get(URLchar).then((response) => {
            setChar(response.data)
        });
        axios.get(URLraceList).then((response) => {
            setRaces(response.data)
        });
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
        <p>
            {char.characterName} <>{change===true?
            <button onClick={handleSubmit}>
                <Link to={'/class/'+char.characterId}>to classes</Link></button>
                :<>...choose race</>}</>
        </p>
            <div>
                {races? 
                <>{races.map((r, index) => {
                    return(
                    <div key={index}><b>{r.raceName}</b> {r.subRaces?
                    <ul>{r.subRaces.map((sr, indexSR) => {
                        return(
                            <li key={indexSR}>
                                <><button onClick={handleData}>{sr.subRacesName}</button></>: {sr.raceAbilitys?
                                <>
                                <>{sr.raceAbilitys.streght? <>str:{sr.raceAbilitys.streght>0? <>+{sr.raceAbilitys.streght}</>:<>{sr.raceAbilitys.streght}</>} </>:<></>}</>
                                <>{sr.raceAbilitys.dextrity? <>dex:{sr.raceAbilitys.dextrity>0? <>+{sr.raceAbilitys.dextrity}</>:<>{sr.raceAbilitys.dextrity}</>} </>:<></>}</>
                                <>{sr.raceAbilitys.constitution? <>con:{sr.raceAbilitys.constitution>0? <>+{sr.raceAbilitys.constitution}</>:<>{sr.raceAbilitys.constitution}</>} </>:<></>}</>
                                <>{sr.raceAbilitys.intelligence? <>int:{sr.raceAbilitys.intelligence>0? <>+{sr.raceAbilitys.intelligence}</>:<>{sr.raceAbilitys.intelligence}</>} </>:<></>}</>
                                <>{sr.raceAbilitys.wisdom? <>wis:{sr.raceAbilitys.wisdom>0? <>+{sr.raceAbilitys.wisdom}</>:<>{sr.raceAbilitys.wisdom}</>} </>:<></>}</>
                                <>{sr.raceAbilitys.charisma? <>cha:{sr.raceAbilitys.charisma>0? <>+{sr.raceAbilitys.charisma}</>:<>{sr.raceAbilitys.charisma}</>} </>:<></>}</>
                                </>
                                :<></>
                                }
                                {sr.levelAdjustment===0? <></>:<> lva:{sr.levelAdjustment}</>}
                                
                                </li>
                    )})}</ul>
                    :<p>...loading sub races...</p>
                    }</div>
                )})}</>
                :<p>...loading races...</p>
            }
            </div>
        </>
    );
}