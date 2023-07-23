import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ISubRace } from './raceType'


export const SubRaces = ({item}:ISubRace) => {
    return (
        <View>
            <Text style={styles.title}>{item.subRacesName}</Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    title: {
      fontSize:16,
      fontWeight:'800',
      color:'#fff',
    }
  })