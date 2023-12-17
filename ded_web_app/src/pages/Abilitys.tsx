import React, { useState } from 'react'
import axios from 'axios'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import { abilitys } from '../components/interfaces'
import { urlAb } from '../components/url'
import { abilitysEmpty } from '../components/variables'

export function Abilitys() {

    const { charId } = useParams();

    const [abilitys, setAbilitys] = useState<abilitys>( abilitysEmpty )
    const [change, setChange] = useState<boolean>( false )

    const handleData = (e: any) => {
        setAbilitys({...abilitys, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post(urlAb + charId, abilitys)
        .then((response) => {console.log(response)})
        setChange(true)
    }

    console.log(charId, change)

    return (
        <>
            <table>
                <tr>
                    <th align='left'>valor</th>
                    <th align='left'>ability</th>
                </tr>
                <tr>
                    <td>
                    <input
                    type='number'
                    onChange={handleData}
                    name="streght"
                    value={abilitys.streght}
                    />
                    </td>
                    <td align='left'>streght</td>
                </tr>
                <tr>
                    <td><input type='number' onChange={handleData} name="dextrity" value={abilitys.dextrity}></input></td>
                    <td align='left'>dextrity</td>
                </tr>
                <tr>
                    <td><input type='number' onChange={handleData} name="constitution" value={abilitys.constitution}></input></td>
                    <td align='left'>constitution</td>
                </tr>
                <tr>
                    <td><input type='number' onChange={handleData} name="intelligence" value={abilitys.intelligence}></input></td>
                    <td align='left'>intelligence</td>
                </tr>
                <tr>
                    <td><input type='number' onChange={handleData} name="wisdom" value={abilitys.wisdom}></input></td>
                    <td align='left'>wisdom</td>
                </tr>
                <tr>
                    <td><input type='number' onChange={handleData} name="charisma" value={abilitys.charisma}></input></td>
                    <td align='left'>charisma</td>
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