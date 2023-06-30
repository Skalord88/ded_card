import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { CreateCharacterEnum } from "../shered/enums/characterEnum";
import { useStore } from "../shered/store";
import { useNavigation } from "@react-navigation/native";
import { StackEnum } from "../shered/enums/navigationEnum";

export default function CreateCharacter() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      characterName: '',
      playerName: ''
    }
  });
  const [characterName, createNewUser] = useStore(
    (state) => [state.characterName, state.createNewUser],
  )
  const navigation = useNavigation();
  
  const submitNav = ()=>{
    createNewUser
    navigation.navigate(StackEnum.ABILITY)
  }


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
      <Button title="Submit" onPress={handleSubmit(submitNav)} />
      
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
    paddingTop:20,
    backgroundColor:'#525252'
  }

})