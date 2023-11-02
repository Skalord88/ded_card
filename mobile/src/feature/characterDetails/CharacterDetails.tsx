import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackEnum } from '../../shered/enums/navigationEnum';
import { useStore } from '../../shered/store';


export const CharacterDetails = ({route}:any) => {
    const { item } = route.params;
    const navigation = useNavigation();

    const goToClassList = () => {
        navigation.navigate(StackEnum.CLASS);
    }
    const [show] = useStore(
        (state) => [state.show],
    )

    const goToNewCreate = () => {
        navigation.navigate(StackEnum.CLASS);
    }

    const [ setRaceGetDetails] = useStore(
        (state) => [state.setRaceGetDetails],
    )

    const updateLvl = async () => {
        const id = item.classPcList.map(s=>s.id).unshift()
        const data = await setRaceGetDetails(id)
            return data
    }
console.log(item.classPcList)
    return (
        <View style={styles.wraper}>
            <Text style={styles.characterName}>Details of {item.characterName}</Text>
            <Text style={styles.title}>{item.playerName}</Text>
            <Text style={styles.title}>{item.race}</Text>
            <Text style={styles.title}>{item.subRace}</Text>
            {item.classPcList &&
                <View>
                    <Text style={styles.info}>Your Classes :</Text>
                    <FlatList
                        data={item.classPcList}
                        renderItem={({item}) =>
                            <View>
                                <Text style={styles.title}>{item.className}</Text>
                                <Text style={[styles.info,{paddingLeft:10,paddingRight:10,paddingBottom:10}]}>Your LVL :</Text>
                                <View style={{flexDirection:'row',  justifyContent:'center',alignItems:'center'}}>
                                    <TouchableOpacity>
                                        <Image source={{uri:'minus'}} style={{height:30, width:30,}}/>
                                    </TouchableOpacity>
                                        <Text style={[styles.title,{paddingLeft:10,paddingRight:10,paddingBottom:10}]}>{item.level}</Text>
                                    <TouchableOpacity onPress={updateLvl}>
                                        <Image source={{uri:'plus'}} style={{height:30, width:30}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        keyExtractor={item => item.className}
                        ItemSeparatorComponent={()=> <View style={{paddingBottom:10}}/>}
                    /> 
                </View>
            }
           {show? <Button title="Add class"  onPress={goToClassList} />:<Button title="Add second class"  onPress={goToNewCreate} />}
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
      paddingTop:10,
      textTransform:'capitalize',
      paddingBottom:10
    },
    characterName: {
        fontSize:25,
        fontWeight:'800',
        color:'#fff',
        textAlign:'center'
    },
    info : {
        fontSize:20,
        fontWeight:'800',
        color:'#fff',
        paddingTop:10,
    }
})