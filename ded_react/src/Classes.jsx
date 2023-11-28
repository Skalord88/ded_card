import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export function Classes() {

    let { charId } = useParams();
    const URLcharList = "http://localhost:8080/class"
    const URLchar = "http://localhost:8080/class/"+charId;

    const chosen = {id : ''}

    const [classPc, setInputData] = useState(chosen);
    const [char, setChar] = useState("");
    const [classesList, setClassesList] = useState("");
    const [classes, setClasses] = useState("");

    useEffect(() => {
        axios.get(URLchar).then((response) => {
            setChar(response.data);
            setClasses(response.data.classPcList);
        })
        axios.get(URLcharList).then((response) => {
            setClassesList(response.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleData = (e) => {
        setInputData({...classPc, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URLchar, classPc)
        .then((response) => {console.log(response)})
    }

    return (
        <>
            <></>
            <p>name: {char.characterName} / character classes: {!classes===''?
            <>{classes.map((cl, index) => {
                return(
                    <li key={index}>{cl.className} {cl.level}</li>
                )
            })}</>
            :<>no classes</>
            }</p>
            <p>classes: {classesList?
            <>
                {classesList.map((cl, index) => {
                    return(
                        <form>
                        <button onClick={handleData} key={index}>name: {cl.className} {cl.classType}</button>
                        <>
                        {chosen===''?
                        <></>
                        :<button onClick={handleSubmit}>chose</button>
                        }</>
                        </form>
                    )
                })}
            </>
            :<>...loading classes...</>
            }</p>
        </>
    )

}