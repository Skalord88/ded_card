import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function Classes() {

    const { charId } = useParams();
    const URLchar = 'http://localhost:8080/character-card/'+charId;
    const URLclassList = 'http://localhost:8080/class'
    const URLclassAdd = 'http://localhost:8080/character-card/class/'+charId;

    const chosen = ''
    const chosenClass = ''

    const [classPcId, setInputId] = useState(chosen);
    const [classPcName, setInputName] = useState(chosenClass);
    const [char, setChar] = useState("");
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
        console.log(e.target.name, e.target.value, URLclassAdd)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URLclassAdd, {id : classPcId})
        .then((response) => {console.log(response)})
    }

    return (
        <>
        <p>
            {char.characterName}
            <p>
                {classPcName?<>choosen: {classPcName} <button onClick={handleSubmit}>+</button></>:<>choose one</>}
            </p> {char.classPcList===null?
            <>{char.classPcList.map((c, index) => {
                return(
                    <li key={index}>{c.name}</li>
                )
            })}</>
            :<>no classes in character</>
        }
        </p>
            <div>
                <p>{chosen.value===''?
                <></>
                :<></>
            }</p>
            {classesList.map((cl, index) => {
                return(
                    <>
                    <button onClick={handleData} name={cl.id} value={cl.className}>+</button> <lu key={index}>{cl.classType}, {cl.className}</lu><p></p>
                    </>
            )})}
            </div>
        </>
    )

}