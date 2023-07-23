import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IRaceAbilitys } from './raceType'

export const RaceAbilitys = ({item}:IRaceAbilitys) => {
    return (
        <View>
            <Text>{item.charisma}</Text>
            <Text>{item.constitution}</Text>
            <Text>{item.dextrity}</Text>
            <Text>{item.intelligence}</Text>
            <Text>{item.streght}</Text>
            <Text>{item.wisdom}</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
    }
})