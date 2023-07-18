import { Text, View, StyleSheet } from "react-native";
import { useStore } from "../shered/store";
import reactotron from "reactotron-react-native";


export default function Abilitis() {
  const characterName = useStore(state => state.characterName)

  return (
    <View style={styles.box}>
        <Text>Umiejętności {characterName}</Text>
    </View>
  );
}

const styles = StyleSheet.create ({
  box:{
    backgroundColor:'#525252'
  },
  title:{}
})