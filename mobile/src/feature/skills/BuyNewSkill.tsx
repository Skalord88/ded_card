import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { skillsList } from './skillArray'
import { SkillScreen } from './SkillScreen'


export const BuyNewSkill = ()=> {
    return (
        <View style={styles.box}>
            <FlatList 
                data={skillsList}
                renderItem={(el) => <SkillScreen item={el.item}/>}
                keyExtractor={item => item.idSkill.toString()}
                ItemSeparatorComponent={()=> <View style={{paddingBottom:10}}/>}
            />
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
      textAlign:'center'
    }
})