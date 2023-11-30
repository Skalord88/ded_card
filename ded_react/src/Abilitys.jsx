import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom';

export function Abilitys() {

    const { charId } = useParams();
    const URL = 'http://localhost:8080/ability/'+charId;

    const charAbilitys = {
        streght : '',
        dextrity : '',
        constitution : '',
        intelligence : '',
        wisdom : '',
        charisma : ''
        }

    const [char, setChar] = useState("");
    const [inputData, setInputData] = useState(charAbilitys)
    const [change, setChange] = useState(false)

    useEffect(() => {
        axios.get(URL).then((response) => {
            setChar(response.data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleData = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL, inputData)
        .then((response) => {console.log(response)})
        .then(setChange(true))
    }

    return (
        <>
        <p>
            <>{char.characterName}</>
        </p>
            <table>
                <tr>
                    <th>valor</th>
                    <th>ability</th>
                </tr>
                <tr>
                    <td><input type='number' placeholder="10" onChange={handleData} name="streght" value={inputData.streght}></input></td>
                    <td>streght</td>
                </tr>
                <tr>
                    <td><input type='number' placeholder="10" onChange={handleData} name="dextrity" value={inputData.dextrity}></input></td>
                    <td>dextrity</td>
                </tr>
                <tr>
                    <td><input type='number' placeholder="10" onChange={handleData} name="constitution" value={inputData.constitution}></input></td>
                    <td>constitution</td>
                </tr>
                <tr>
                    <td><input type='number' placeholder="10" onChange={handleData} name="intelligence" value={inputData.intelligence}></input></td>
                    <td>intelligence</td>
                </tr>
                <tr>
                    <td><input type='number' placeholder="10" onChange={handleData} name="wisdom" value={inputData.wisdom}></input></td>
                    <td>wisdom</td>
                </tr>
                <tr>
                    <td><input type='number' placeholder="10" onChange={handleData} name="charisma" value={inputData.charisma}></input></td>
                    <td>charisma</td>
                </tr>
            </table>
            <p>
                <>{change===false?
                <button onClick={handleSubmit}>set</button>
                :<>
                <button> <Link to={"/race/"+charId}>to race</Link></button>
                </>
            }</>
            </p>
        </>
    )
}