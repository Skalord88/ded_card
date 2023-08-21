import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useStore } from "../shered/store";
import { Controller, useForm } from "react-hook-form";
import { AbilitisEnum } from "../shered/enums/characterEnum";
import { useNavigation } from "@react-navigation/native";
import { StackEnum } from "../shered/enums/navigationEnum";
import { ScrollView} from "react-native-gesture-handler";


export default function Abilitis() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      streght: "",
      dextrity: "",
      constitution: "",
      intelligence: "",
      wisdom: "",
      charisma: ""
    }
  });

  const [characterName, addAbility] = useStore(
    (state) => [state.characterName,state.addAbility],
  )

  const navigation = useNavigation();
  const submitNav = (
    data:{ 
        streght: number,
        dextrity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number,
    })=>{
    addAbility(data)
    navigation.navigate(StackEnum.RACES)
  }
  
  return (
    <ScrollView style={styles.box}>
        <Text style={styles.characterName}>Create abilitis for {characterName}</Text>
        <View style={styles.box}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <Text style={styles.title}>Strength</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType = "number-pad"
              maxLength = {3}
              inputMode = "numeric"
              value={value}
            />
          </View>
          )}
          name={AbilitisEnum.STREGTH}
        />
        </View>
        <View style={styles.box}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.title}>Dextrity</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType = "number-pad"
                maxLength = {3}
                inputMode = "numeric"
                value={value}
              />
            </View>
          )}
          name={AbilitisEnum.DEXTRITY}
        />
        </View>
        <View style={styles.box}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.title}>Constitution</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType = "number-pad"
                maxLength = {3}
                inputMode = "numeric"
                value={value}
              />
            </View>
          )}
          name={AbilitisEnum.CONSTITUTION}
        />
        </View>
        <View style={styles.box}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.title}>Intelligence</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType = "number-pad"
                maxLength = {3}
                inputMode = "numeric"
                value={value}
              />
            </View>
          )}
          name={AbilitisEnum.INTELLIGENCE}
        />
        </View>
        <View style={styles.box}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.title}>Wisdom</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType = "number-pad"
                maxLength = {3}
                inputMode = "numeric"
                value={value}
              />
            </View>
          )}
          name={AbilitisEnum.WISDOM}
        />
        </View>
        <View style={styles.box}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              <Text style={styles.title}>Charisma</Text>
              <TextInput
                style={styles.input}
                placeholder="0"
                onBlur={onBlur}
                onChangeText={onChange}
                keyboardType = "number-pad"
                maxLength = {3}
                inputMode = "numeric"
                value={value}
              />
            </View>
          )}
          name={AbilitisEnum.CHARISMA}
        />
        </View>
        <Button title="Add abilitis" onPress={handleSubmit(submitNav)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create ({
  characterName: {
    fontSize:16,
    fontWeight:'800',
    color:'white',
  },
  title:{
    fontSize:14,
    fontWeight:'800',
    color:'white',
    paddingBottom:5
  },
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
    paddingBottom:15,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    backgroundColor:'#525252'
  }

})