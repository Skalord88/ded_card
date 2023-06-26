import axios from 'axios';
import Reactotron from 'reactotron-react-native';
const baseUrl = 'http://192.168.0.140:8080';

export const createUser=(data: { characterName: string; playerName: string; }) => {
    axios
        .post(`${baseUrl}/character-card`, {
            characterName: data.characterName,
            playerName: data.playerName
        })
        .then(function (response) {
            Reactotron.log(response.data);
        })
        .catch(function (error) {
            Reactotron.log(error.message);
        });
};