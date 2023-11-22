import React, { useState} from 'react'
import axios from 'axios'

export function AppClassCharacter() {

    let idChar = 1;
    const URL = 'http://localhost:8080/character-card/class'+idChar;

    const classPc = {className : ''}

    const [inputData, setInputData] = useState(classPc)

    const handleData = (e) => {
        setInputData({...inputData, [e.target.name]:e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(URL, inputData)
        .then((response) => {console.log(response)})
    }

    return (
        <>
            <>
                <form>
                    <input type='text' placeholder="Class" onChange={setInputDataClassPc} name="className" value={inputData.className}></input>
                <p>
                    <button onClick={handleSubmit}>create</button>
                </p>
                </form>
            </>
        </>
    )
}