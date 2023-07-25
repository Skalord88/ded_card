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
                keyExtractor={item => item.raceName}
                ItemSeparatorComponent={()=> <View style={{paddingBottom:10}}/>}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    box: {
        backgroundColor: '#18181bcc',
        height:'100%'
    },
    title: {
      fontSize:22,
      fontWeight:'800',
      color:'#fff',
      paddingLeft:20,
      fontStyle:'italic',
      paddingBottom:10
    }
  })