import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Component, useState } from 'react'
import { CustomDrawer } from './static/js/custom.js';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';

import { Register } from './screens/register.js';
import { Login } from './screens/login';
import { Home } from './screens/userhome'
import { navigationRef } from './static/js/functions.js';

const Drawer = createDrawerNavigator();

export default 

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator  drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          color: 'white'
        },
        drawerActiveBackgroundColor: '#0f0082',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          fontSize: 15,
        },
      }}> 
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Userhome" component={Home} />
        <Drawer.Screen name="Register" component={Register} />
      </Drawer.Navigator>
    </NavigationContainer>    
  );
}