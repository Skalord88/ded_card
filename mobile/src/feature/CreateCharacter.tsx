import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { CreateCharacterEnum } from "../shered/characterEnum";
import Reactotron from "reactotron-react-native";
import axios from "axios";

export default function CreateCharacter() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      characterName: '',
      playerName: ''
    }
  });
  const [vlaue, setValue] = useState([])
  
  const postData = (data: { characterName: string; playerName: string; }) => {
    const baseUrl = 'http://192.168.0.140:8080';
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
  const onSubmit = (data: { characterName: string; playerName: string; }) => postData(data)


  return (
    <View>
      <View style={styles.box}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Imię postaci"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name={CreateCharacterEnum.CHARACTER_NAME}
        />
        {errors.characterName && <Text style={styles.error}>Pole jest wymagane.</Text>}
        </View>
        <View style={styles.box}>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Imię użytkownika"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name={CreateCharacterEnum.PLAYER_NAME}
        />
        {errors.playerName && <Text style={styles.error}>Pole jest wymagane.</Text>}
      </View>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create ({
  error: {
    fontSize:12,
    fontWeight:'800',
    color:'red',
    paddingLeft:20,
  },
  input: {
    borderColor: 'white',
    borderWidth:1,
    borderRadius:20,
  },
  box: {
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20
  }

})