import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { useStore } from '../../shered/store'
import { getRaces } from '../../shered/api';
import { ListOfRaces } from './ListOfRaces';

export const Races = ()=> {
    const [characterName] = useStore(
        (state) => [state.characterName],
    )
   
    let [data, setData] = useState(null)

  useEffect(() => {
    getRaces()
    .then((response) => {
        setData(response.data)
      });
  },[])

    return (
        <View style={styles.box}>
            <Text style={styles.title}>
                {characterName} chose Your races
            </Text>
            <FlatList
                data={data}
                renderItem={({item}) => <ListOfRaces item={item}/>}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    box: {
        backgroundColor:'#525252'
    },
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      paddingLeft:20,
    }
  })