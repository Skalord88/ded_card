import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ISubRace } from './raceType'
import { RaceAbilitys } from './RaceAbilitys'


export const SubRaces = (item:ISubRace) => {
    return (
        <View>
            <Text style={styles.title}>{item.item.subRacesName}</Text>
            {/* {item.item.raceAbilitys != null?
                <RaceAbilitys item={item.item.raceAbilitys}/>
                : <></>
            } */}
        </View>
    )
}

const styles = StyleSheet.create ({
    title: {
      fontSize:16,
      fontWeight:'800',
      color:'green',
    }
  })