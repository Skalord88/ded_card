import React, { useEffect, useState } from 'react'
import {View, Text, StyleSheet, FlatList} from 'react-native'
import { useStore } from '../../shered/store'
import { getClass } from '../../shered/api';
import { ClassList } from '../class/ClassList';

export const Class = ()=> {
    const [characterName] = useStore(
        (state) => [state.characterName],
    )
    let [data, setData] = useState(null)

    useEffect(() => {
        getClass()
        .then((response) => {
            setData(response.data)
        });
    },[])


    return (
        <View style={styles.box}>
            <Text style={styles.title}>
                {characterName} chose Your class
            </Text>
            <FlatList
                data={data}
                renderItem={({item}) => <ClassList item={item} />}
                keyExtractor={item => item.className}
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