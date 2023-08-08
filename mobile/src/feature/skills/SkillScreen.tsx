import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { skillType } from './skillsType'


export const SkillScreen = (item:skillType)=> {
    return (
        <View style={{flexDirection:'row',  justifyContent:'center',alignItems:'center'}}>
            <TouchableOpacity onPress={()=>console.log("minus")}>
                <Image source={{uri:'minus'}} style={styles.icon}/>
            </TouchableOpacity>
            <Text style={styles.title}>{item.item.nameSkill}  {item.item.skillRank}</Text>
            <TouchableOpacity onPress={()=>console.log("plus", item.item.idSkill)}>
                <Image source={{uri:'plus'}} style={styles.icon}/>
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
    box: {
        backgroundColor: '#18181bcc',
        height:'100%'
    },
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      textAlign:'center',
      paddingLeft:10,
      paddingRight:10,
      paddingBottom:10,
      width:220
    },
    icon: {
      height:30,
      width:30,
    }
})