import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'
import { StackEnum } from '../../shered/enums/navigationEnum';


export const CharacterDetails = ({route}:any) => {
    const { item } = route.params;
    const navigation = useNavigation();

    const goToClassList = () => {
        navigation.navigate(StackEnum.CLASS);
    }


    return (
        <View style={styles.wraper}>
            <Text style={styles.characterName}>Details of {item.characterName}</Text>
            <Text style={styles.title}>{item.playerName}</Text>
            <Text style={styles.title}>{item.race}</Text>
            <Text style={styles.title}>{item.subRace}</Text>
            <Text style={styles.title}>Other informations....</Text>
            <Button title="Go to class"  onPress={goToClassList} />
        </View>
    )
}

const styles = StyleSheet.create ({
    wraper:{
        flex:1,
        borderColor:"#fff",
        justifyContent:'center',
        padding:20,
        backgroundColor: '#18181bcc',
    },
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      textAlign:'center',
      paddingTop:10
    },
    characterName: {
        fontSize:25,
        fontWeight:'800',
        color:'#fff',
        textAlign:'center'
      }
})