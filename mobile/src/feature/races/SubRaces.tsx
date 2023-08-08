import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { ISubRace } from './raceType'
import { useNavigation } from '@react-navigation/native'
import { StackEnum } from '../../shered/enums/navigationEnum'


export const SubRaces = (item:ISubRace) => {
    const subRaceName = item.item.subRacesName
    const navigation = useNavigation();
    const navToRaceAbilitis = () =>{
        navigation.navigate(StackEnum.RACES_DETAILS, {name: subRaceName, item:item});
    }

    return (
        <View style={styles.box}>
            <TouchableOpacity key={subRaceName} onPress={navToRaceAbilitis}>
                <View style={{flexDirection:'row',  justifyContent:'center',}}>
                    <Text style={styles.title}>{subRaceName}</Text>
                    <Image source={{uri:'arrow_right_press'}} style={{width:20, height:20,}}/>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create ({
    box: {
        justifyContent:'center',
        padding:10,
    },
    title: {
      fontSize:16,
      fontWeight:'800',
      color:'green',
      textAlign:'center',
      marginRight:5,
      textTransform:'capitalize'
    }
  })