import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackEnum } from '../../shered/enums/navigationEnum';


export const ClassList = (item) => {
    const [isOpen, setOpen] = useState(false);
    const navigation = useNavigation()
    const upperClassName = item.item.className.charAt(0).toUpperCase() + item.item.className.slice(1)
    const goToDetails = ()=>{
        navigation.navigate(StackEnum.CLASS_DETAILS, {name: upperClassName, item:item});
    }
    return (
        <View style={styles.wraper}>
            <TouchableOpacity key={item.id} onPress={goToDetails} style={styles.box}>
                <View style={{flexDirection:'row',  justifyContent:'center',}}>
                    <Text style={styles.title}>{upperClassName}</Text>
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
      textAlign:'center'
    }
})