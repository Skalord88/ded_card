import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export function Classes() {

    const { charId } = useParams();
    const URLchar = 'http://localhost:8080/character-card/'+charId;
    const URLclassList = 'http://localhost:8080/class'
    const URLclassAdd = 'http://localhost:8080/character-card/class/'+charId;
    const URLclassSell = 'http://localhost:8080/character-card/minus_class/'+charId;

    const [char, setChar] = useState('');
    const [classesList, setClassesList] = useState([]);
    const [sign, setSign] = useState('');
    const [classPcId, setInputId] = useState('');
    const [classPcName, setInputName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resCharList = await axios.get(URLclassList);
                setClassesList(resCharList.data)

                const resChar = await axios.get(URLchar);
                setChar(resChar.data)
            } catch (error){
                console.error(error)
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleData = (e) => {
        const buttonArray = e.target.value.split(',');
        
        if(Array.isArray(buttonArray) && buttonArray.length > 0){
            setSign(buttonArray[0]);
            setInputId(buttonArray[1]);
            setInputName(buttonArray[2])
        }
        console.log(char.classPcList)
    }

    const handleSign = (e) => {
        e.preventDefault();
        try{
        if(sign==='+'){
            axios.post(URLclassAdd, {id : classPcId})
        } else if(sign==='-'){
            axios.post(URLclassSell, {id : classPcId})
        }
    } catch (error){
        console.log(error)
    }
        window.location.reload(false)        
    }

    return (
        <>
            <p>{char.characterName}</p>
            <div>
                {classPcName?<>choosen: {classPcName} <button onClick={handleSign}>proceed</button></>:<>choose one</>}
            </div>
            <div>
                {char.classPcList? <button><Link to='/skill/:id'>to skills</Link></button>:<></>}
            </div>
        <ul>
            {char.classPcList?
            <>{char.classPcList.map((c, index) => {
                return(
                    c.level===0?
                    <></>
                    :<li key={index}><button onClick={handleData} value={['-', c.id, c.className]}>-</button> {c.className} {c.level}</li>
                )
            })}</>
            :<>no classes in character</>
        }</ul>
            <div>
                <p></p>
                    {classesList.map((cl, index) => {
                        return(
                        <div key={index}><button value={['+', cl.id, cl.className]} onClick={handleData}>+</button> {cl.classType}, {cl.className}</div>
                )})}
            </div>
        </>
    )

}