import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Component, useState } from 'react'
import { create_form_data, ajax_handler } from './static/js/ajaxhandler'
import { CustomDrawer } from './custom.js';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';

import { Login } from './screens/login';

const Drawer = createDrawerNavigator();

export default 

function App() {
  return (
    <NavigationContainer>
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
      </Drawer.Navigator>
    </NavigationContainer>    
  );
}