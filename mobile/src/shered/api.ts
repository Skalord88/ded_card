import axios from 'axios';
const baseUrl = 'http://192.168.0.140:8080';

export const createUser =  (data: {
     characterName: string; playerName: string;
    }) => {
        return axios.post(`${baseUrl}/character-card`, {
            characterName: data.characterName,
            playerName: data.playerName,
        })
  };

export const addAbility = (characterId:number,
    data:{ 
        streght: number,
        dextrity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number
    }
    ) =>{
    return axios.post(`${baseUrl}/${characterId}/ability`, {
        streght: data.streght,
        dextrity: data.dextrity,
        constitution: data.constitution,
        intelligence: data.intelligence,
        wisdom: data.wisdom,
        charisma: data.charisma
    })
}