import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'
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

    return (
        <View style={styles.wraper}>
            <Text style={styles.characterName}>Details of {item.characterName}</Text>
            <Text style={styles.title}>{item.playerName}</Text>
            <Text style={styles.title}>{item.race}</Text>
            <Text style={styles.title}>{item.subRace}</Text>
            <Text style={styles.title}>Other informations....</Text>
            {item.classPcList &&<FlatList
                data={item.classPcList}
                renderItem={({item}) => <Text style={styles.title}>{item.className}</Text>}
                keyExtractor={item => item.level}
                ItemSeparatorComponent={()=> <View style={{paddingBottom:10}}/>}
            /> }
           {show && <Button title="Go to class"  onPress={goToClassList} />}
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
      textTransform:'capitalize'
    },
    characterName: {
        fontSize:25,
        fontWeight:'800',
        color:'#fff',
        textAlign:'center'
      }
})