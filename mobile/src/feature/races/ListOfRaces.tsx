import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IListOfRaces } from './raceType'
import { SubRaces } from './SubRaces'


export const ListOfRaces = ({item}:IListOfRaces) => {
    const [isOpen, setOpen] = useState(false);
    const seeSubRaces = ()=>{
        setOpen(isOpen => !isOpen)
    }
    return (
        <View>
            <TouchableOpacity key={item.raceName} onPress={seeSubRaces} style={styles.box}>
                <Text style={styles.title}>{item.raceName}</Text>
            </TouchableOpacity>
            {isOpen &&
                <FlatList
                    data={item.subRaces}
                    renderItem={(el) => <SubRaces item={el.item}/>}
                    keyExtractor={item => item.item?.id.toString()}
                /> 
            }
        </View>
    )
}

const styles = StyleSheet.create ({
    box:{
        borderWidth:1,
        borderRadius:20,
        borderColor:"#fff",
        justifyContent:'center',
        padding:20
    },
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      textAlign:'center'
    }
})