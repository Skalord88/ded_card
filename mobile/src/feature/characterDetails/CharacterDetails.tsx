import React from 'react';
import { StyleSheet, Text, View } from 'react-native'


export const CharacterDetails = ({route}:any) => {
    const { item } = route.params;

    return (
        <View style={styles.wraper}>
            <Text style={styles.characterName}>Details of {item.characterName}</Text>
            <Text style={styles.title}>{item.playerName}</Text>
            <Text style={styles.title}>{item.race}</Text>
            <Text style={styles.title}>{item.subRace}</Text>
            <Text style={styles.title}>Other informations....</Text>
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