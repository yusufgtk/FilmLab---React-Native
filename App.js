import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AppProvider from './context/AppProvider';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import SearchScreen from './screens/SearchScreen';


const Stack = createNativeStackNavigator();


export default function App() {
  
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: 'FilmLab', headerTintColor: 'red', headerStyle:{backgroundColor: 'black'}, headerTitleStyle:{fontWeight: 'bold', fontSize: 20}}}/>

          <Stack.Screen name="MovieDetailsScreen" component={MovieDetailsScreen} options={{title: 'FilmLab', headerTintColor: 'red', headerTransparent:true, headerStyle:{backgroundColor: 'transparent'}, headerTitleStyle:{fontWeight: 'bold', fontSize: 20}}}/>
          <Stack.Screen name='SearchScreen' component={SearchScreen}  options={{title: 'FilmLab', headerTintColor: 'red', headerStyle:{backgroundColor: 'black'}, headerTitleStyle:{fontWeight: 'bold', fontSize: 20}}} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

const styles = StyleSheet.create({});
