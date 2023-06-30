import axios from 'axios';
const baseUrl = 'http://192.168.0.140:8080';

export const createUser =  (data: { characterName: string; playerName: string; }) => {
    return axios.post(`${baseUrl}/character-card`, {
        characterName: data.characterName,
        playerName: data.playerName
      })
  };