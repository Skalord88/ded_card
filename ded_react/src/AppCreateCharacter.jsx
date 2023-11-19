import React, {Component, useState} from "react"

export function AppCreateCharacter() {

    const [inputName, setInputName] = useState("name")
    const [inputPlayer, setInputPlayer] = useState("player")

    let onChange = (event) =>{
        const newValue = event.target.value;
        setInputName(newValue)
        setInputPlayer(newValue)
    }

    // postData() {

    //     try {
    //         let name = await fetch('http://localhost:8080/character-card', {
    //             method: 'post',
    //             mode: 'no-cors',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 characterName: inputName,
    //                 playerName: inputPlayer
    //             })
    //         })
    //     } catch (error) {
    //         console.log(e)
    //     }
    // }

    

    return (
        <>
            <div>
            <input placeholder="Character Name" onChange={onChange}></input>
            <input placeholder="Player" onChange={onChange}></input>
            </div>
            <p><button onClick={this.postData()}>create</button></p>
        </>
    )
}