import React, { useState } from 'react';
import { FlatList, TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native'

export const LvlDetails = (item) => {
    const [isOpen, setOpen] = useState(false);
    const seeSubRaces = ()=>{
        setOpen(isOpen => !isOpen)
    }
    return (
        <View style={styles.wraper}>
            <TouchableOpacity onPress={seeSubRaces}>
                <View style={{flexDirection:'row',  justifyContent:'center',}}>
                    <Text style={styles.name}>lvl {item.item.level}</Text>
                    <Image source={{uri: isOpen ?'arrowup' : 'arrowdown'}} style={{width:20, height:20, marginLeft:5, marginTop:5}}/>
                </View>
            </TouchableOpacity>
            {isOpen &&
                <FlatList
                    data={item.item.classFeats}
                    renderItem={(item) => <Text style={styles.title}>{item.item}</Text>}
                    keyExtractor={item => item.item?.id.toString()}
                    ItemSeparatorComponent={()=> <View style={{paddingBottom:10}}/>}
                /> 
            }
        </View>
    )
}

const styles = StyleSheet.create ({
    wraper:{
        flex:1,
        borderColor:"#fff",
        justifyContent:'center',
        padding:20,
        backgroundColor: '#18181bcc',
        borderRadius:20
    },
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      textAlign:'center',
      paddingTop:10
    },
    name: {
        fontSize:20,
        fontWeight:'800',
        color:'#fff',
        textAlign:'center',
      }
})