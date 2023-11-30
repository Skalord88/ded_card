import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Classes() {

    const { charId } = useParams();
    const URLchar = 'http://localhost:8080/character-card/'+charId;
    const URLclassList = 'http://localhost:8080/class'
    const URLclassAdd = 'http://localhost:8080/character-card/class/'+charId;
    const URLclassSell = 'http://localhost:8080/character-card/minus_class/'+charId;

    const [classPcId, setInputId] = useState('');
    const [classPcName, setInputName] = useState('');
    const [char, setChar] = useState('');
    const [classesList, setClassesList] = useState([]);

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
        setInputId(e.target.name)
        setInputName(e.target.value)
    }

    const handletAdd = (e) => {
        e.preventDefault();
        axios.post(URLclassAdd, {id : classPcId})
        window.location.reload(false)
    }

    const handleMinus = (e) => {
        e.preventDefault();
        setInputId(e.target.value);
        axios.post(URLclassSell, {id : classPcId});
        window.location.reload(false)
    }

    return (
        <>

            {char.characterName}
            <p>
                {classPcName?<>choosen: {classPcName} <button onClick={handletAdd}>+</button></>:<>choose one</>}
            </p>
        <ul>
                {char.classPcList?
            <>{char.classPcList.map((c, index) => {
                return(
                    <li key={index}><button onClick={handleData} name={c.id} value={c.className}>-</button> {c.className} {c.level}</li>
                )
            })}</>
            :<>no classes in character</>
        }</ul>
            <div>
                <p></p>
                    {classesList.map((cl, index) => {
                        return(
                        <div key={index}><button onClick={handleData} name={cl.id} value={cl.className}>+</button> {cl.classType}, {cl.className}</div>
                )})}
            </div>
        </>
    )

}