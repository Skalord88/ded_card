import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackEnum } from '../../shered/enums/navigationEnum';


export const ClassList = (item) => {
    const navigation = useNavigation()
    const className = item.item.className
    const goToDetails = ()=>{
        navigation.navigate(StackEnum.CLASS_DETAILS, {name: className, item:item});
    }
    return (
        <View style={styles.wraper}>
            <TouchableOpacity key={item.id} onPress={goToDetails} style={styles.box}>
                <View style={{flexDirection:'row',  justifyContent:'center',}}>
                    <Text style={styles.title}>{className}</Text>
                    <Image source={{uri: 'arrow_right_press'}} style={{width:20, height:20, marginLeft:5, marginTop:5}}/>
                </View>
            </TouchableOpacity>
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
      textAlign:'center',
      textTransform:'capitalize'
    }
})