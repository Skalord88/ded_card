import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateCharacter from '../../feature/CreateCharacter';
import { StackEnum } from '../enums/navigationEnum';
import Abilitis from '../../feature/Abilitis';
import { Races } from '../../feature/races/Races';
import { RaceDetails } from '../../feature/races/RaceDetails';
import { CharacterDetails } from '../../feature/characterDetails/CharacterDetails';
import { Class } from '../../feature/class/Class';
import { ClassDetails } from '../../feature/class/ClassDetails';

const Stack = createStackNavigator();

export function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerStyle: { backgroundColor: 'grey'} }}>
        <Stack.Screen name={StackEnum.CREATE_CHARACTER} component={CreateCharacter} />
        <Stack.Screen name={StackEnum.ABILITY} component={Abilitis} options={{headerShown:false}}/>
        <Stack.Screen name={StackEnum.RACES} component={Races} options={{headerShown:false}}/>
        <Stack.Screen name={StackEnum.RACES_DETAILS} component={RaceDetails} />
        <Stack.Screen name={StackEnum.CHARACTER_DETAILS} component={CharacterDetails}  options={{headerShown:false}} />
        <Stack.Screen name={StackEnum.CLASS} component={Class}  />
        <Stack.Screen name={StackEnum.CLASS_DETAILS} component={ClassDetails}  />
      </Stack.Group>
    </Stack.Navigator>
  );
}