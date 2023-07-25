import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { IListOfRaces } from './raceType'
import { SubRaces } from './SubRaces'


export const ListOfRaces = ({item}:IListOfRaces) => {
    const [isOpen, setOpen] = useState(false);
    const seeSubRaces = ()=>{
        setOpen(isOpen => !isOpen)
    }
    return (
        <View style={styles.wraper}>
            <TouchableOpacity key={item.raceName} onPress={seeSubRaces} style={styles.box}>
                <View style={{flexDirection:'row',  justifyContent:'center',}}>
                    <Text style={styles.title}>{item.raceName}</Text>
                    <Image source={{uri: isOpen ?'arrowup' : 'arrowdown'}} style={{width:20, height:20, marginLeft:5, marginTop:5}}/>
                </View>
            </TouchableOpacity>
            {isOpen &&
                <FlatList
                    data={item.subRaces}
                    renderItem={(el) => <SubRaces item={el.item}/>}
                    keyExtractor={item => item.item?.id.toString()}
                    ItemSeparatorComponent={()=> <View style={{paddingBottom:10}}/>}
                /> 
            }
        </View>
    )
}

const styles = StyleSheet.create ({
    wraper:{
        borderRadius:60,
        borderColor:"#fff",
        justifyContent:'center',
        padding:20,
        backgroundColor: '#18181bcc',
    },
    box:{
        borderWidth:1,
        borderRadius:20,
        borderColor:"#fff",
        padding:20
    },
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      textAlign:'center'
    }
})