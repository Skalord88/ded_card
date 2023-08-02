import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
import { StackEnum } from '../../shered/enums/navigationEnum';
import { LvlDetails } from './LvlDetails';
import { useStore } from '../../shered/store';


export const ClassDetails = ({route}:any) => {
    const { item, name } = route.params;
    const navigation = useNavigation();

    const [ setClassUpdateDetails] = useStore(
        (state) => [state.setClassUpdateDetails],
    )

    const setClass = async () => {
      const data = await setClassUpdateDetails(item.item.id)
      if(data){
        return  navigation.navigate(StackEnum.CHARACTER_DETAILS, {item:data});
      }
    }

    return (
        <View style={styles.wraper}>
            <Text style={styles.characterName}>Details of {name}</Text>
            <Text style={styles.title}>{item.item.classType}</Text>
            {item.item.classSkill &&<Text style={styles.title}>{item.item.classSkill}</Text>}
            {item.item.classFeats &&<Text style={styles.title}>Details of feats in lvl:</Text>}
            <FlatList
                data={item.item.classFeats}
                renderItem={({item}) => <LvlDetails item={item}/>}
                keyExtractor={item => item.level}
                ItemSeparatorComponent={()=> <View style={{paddingBottom:10}}/>}
            />
            <Button title="Select Class"  onPress={setClass} />
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
    },
    title: {
      fontSize:20,
      fontWeight:'800',
      color:'#fff',
      textAlign:'center',
      paddingTop:10
    },
    characterName: {
        fontSize:25,
        fontWeight:'800',
        color:'#fff',
        textAlign:'center'
      }
})