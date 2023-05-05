/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import CreateCharacter from './src/feature/CreateCharacter';



function App(): JSX.Element {
  return (
   <NavigationContainer>
    <CreateCharacter/>
   </NavigationContainer>
  );
}
export default App;
