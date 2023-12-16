import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';

import { urlChar, urlRaceList } from '../components/url'
import { characterPc, races, subRaces } from '../components/interfaces'
import { characterEmpty } from '../components/variables'

export function Races() {

    const { charId } = useParams();

    const charRace = { id : '' }

    const [char, setChar] = useState< characterPc >( characterEmpty );
    const [races, setRaces] = useState< races[] >();
    const [inputData, setInputData] = useState(charRace)
    const [change, setChange] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resChar = await axios.get( urlChar + '/' + charId);
                setChar(resChar.data)

                const resRaceList = await axios.get(urlRaceList);
                setRaces(resRaceList.data)

                console.log(resChar.data, resRaceList.data)

            } catch (error){
                console.error(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleData = (e:any) => {
        setInputData({...inputData, [e.target.name] : e.target.value})
        setChange(true)
    }
    const handleSubmit = (e:any) => {
        e.preventDefault();
        axios.post(urlRaceList + '/' + charId + '/race', inputData)
        .then((response) => {console.log(response)})
    }

    return (
        <>
        <p>
            {char.characterName} <>{change===true?
            <button onClick={handleSubmit}>
                <Link to={'/class/'+charId}>to classes</Link></button>
                :<>...choose race</>}</>
        </p>
            <div>
                {races? 
                <>{races.map((r: races, index: number) => {
                    return(
                    <div key={index}><b>{r.raceName}</b> {r.subRaces?
                    <ul>{r.subRaces.map((sr: subRaces, indexSR: number) => {
                        return(
                            <li key={indexSR}>
                                <><button onClick={handleData} name="id" value={sr.id}>{sr.subRacesName}</button></>: {sr.raceAbilitys?
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