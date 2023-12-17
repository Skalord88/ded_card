import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { urlChar, urlClassList, urlClassAdd, urlClassSell } from '../components/url'
import { characterPc } from '../components/interfaces';
import { characterEmpty } from '../components/variables';

export function Classes() {

    const { charId } = useParams();

    const [char, setChar] = useState< characterPc >( characterEmpty );
    const [classesList, setClassesList] = useState([]);
    const [sign, setSign] = useState('')
    const [id, setId] = useState(-1)

    const [classPcName, setInputName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {

                const resChar = await axios.get(urlChar + '/' + charId);
                setChar(resChar.data)


                const resClassList = await axios.get(urlClassList);
                setClassesList(resClassList.data)

                
            } catch (error){
                console.error(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleData = (e: any) => {

        setSign(e[0])
        setId(e[1])
        setInputName(e[2])

    }

    const handleSign = (e: any) => {
        e.preventDefault();
        try{
        if(sign==='+'){
            axios.post(urlClassAdd + charId, {id : id})
        } else if(sign==='-'){
            axios.post(urlClassSell + charId, {id : id})
        }
    } catch (error){
        console.log(error)
    }
        window.location.reload()        
    }

    return (
        <>
            <p>{char.characterName}</p>
            <div>
                {classPcName?<>choosen: {classPcName} <button onClick={handleSign}>proceed</button></>:<>choose one</>}
            </div>
            <div>
                {char.classPcList.length>0? <button><Link to={'/skill/'+charId}>to skills</Link></button>:<></>}
            </div>
        <ul>
            {char.classPcList?
            <>{char.classPcList.map((c: any, index: number) => {
                return(
                    c.level===0?
                    <></>
                    :<li key={index}>
                        <button
                        onClick={() => handleData(['-', c.id, c.className, c.level])}>
                            -</button> {c.className} {c.level}</li>
                )
            })}</>
            :<>no classes in character</>
        }</ul>
            <div>
                <p></p>
                    {classesList.map((cl: any, index) => {
                        return(
                        <div key={index}>
                            <button
                            onClick={() => handleData(['+', cl.id, cl.className, cl.level])}>
                                +</button> {cl.classType}, {cl.className}</div>
                )})}
            </div>
        </>
    )

}