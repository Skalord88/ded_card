/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNav } from './src/shered/navigation/StackNav';


function App(): JSX.Element {
  if(__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
  }
  
  return (
   <NavigationContainer>
    <StackNav/>
   </NavigationContainer>
  );
}
export default App;
