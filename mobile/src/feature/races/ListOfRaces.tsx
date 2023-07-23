import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { IListOfRaces } from './raceType'
import { SubRaces } from './SubRaces'


export const ListOfRaces = ({item}:IListOfRaces) => {
    console.log(item)
    return (
        <View>
            <Text style={styles.title}>{item.raceName}</Text>
                <FlatList
                    data={item.subRaces}
                    renderItem={(el) => <SubRaces item={el.item}/>}
                    keyExtractor={item => item.id}
                />
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