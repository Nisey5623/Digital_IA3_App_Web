import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Component, useState } from 'react'
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { styles } from './static/css/styles.js';
import { Userhome } from './screens/userhome.js';
import { Registerpage } from './screens/register.js';
import { Loginpage } from './screens/login';
import { Lyrics } from './screens/lyrics'
import { Search } from './screens/search.js';
import { Events } from './screens/events.js';
import { navigationRef } from './static/js/functions.js';

const Tab = createBottomTabNavigator();
const MainNav = createStackNavigator();

export default function App() {
  {/* First navigator that is opnened on app start for login and register screens */}
  return(
    <NavigationContainer>
  <MainNav.Navigator>
    <MainNav.Screen name="Login" component={Loginpage} />
    <MainNav.Screen name="MainNav" component={MainApp} options={{"headerShown": false}} />
    <MainNav.Screen name="Register" component={Registerpage} />
  </MainNav.Navigator>
  </NavigationContainer>)
}

function MainApp() {
  {/* Tab Navigator for userhome, search screen, lyrics screen and events screen */}
  return (
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Userhome') {
            iconName = focused ? 'ios-home' : 'ios-home';
          }
          else if (route.name === 'Lyrics') {
            iconName = focused ? 'ios-musical-notes' : 'ios-musical-notes';
          }
          else if (route.name === 'Events') {
            iconName = focused ? 'ios-play' : 'ios-play';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name="Userhome" component={Userhome} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Events" component={Events} />
        <Tab.Screen name="Lyrics" component={Lyrics} />
      </Tab.Navigator>
  );
}
