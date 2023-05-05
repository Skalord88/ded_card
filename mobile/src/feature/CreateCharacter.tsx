import { Text, View, TextInput, Button, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { CharacterI } from "./characterType";

export default function CreateCharacter() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      characterName: '',
      playerName: ''
    }
  });
  const [vlaue, setValue] = useState([])
  const onSubmit = (data:any) => setValue(data);

  return (
    <View>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Character Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="characterName"
      />
      {errors.characterName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
         maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Player Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="playerName"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
