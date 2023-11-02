import React from 'react'
import { StyleSheet, Text, Button, View } from 'react-native'
import { useStore } from '../../shered/store';
import { useNavigation } from '@react-navigation/native';
import { StackEnum } from '../../shered/enums/navigationEnum';

export const RaceDetails = ({ route }:any) => {
    const {name, item } = route.params;
    const [ setRaceGetDetails] = useStore(
        (state) => [state.setRaceGetDetails],
    )
    const navigation = useNavigation();

    const setRace = async () => {
      const data = await setRaceGetDetails(item.item.id)
      if(data){
        return  navigation.navigate(StackEnum.CHARACTER_DETAILS, {item:data});
      }
    }

    return (
        <View style={styles.wraper}>
            <Text style={styles.title}>{name}</Text>
            <View style={{paddingTop:20}}>
                <Button title="Submit" key={item.item.id} onPress={setRace} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      textTransform:'capitalize'
    },
    wraper:{
        justifyContent:'center',
        padding:20,
        flex:1,
        backgroundColor: '#18181bcc',
    },
})