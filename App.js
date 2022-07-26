import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Component, useState } from 'react'
import { CustomDrawer } from './static/js/custom.js';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';

import { styles } from './static/css/styles.js';
import { Userhome } from './screens/userhome.js';
import { Registerpage } from './screens/register.js';
import { Loginpage } from './screens/login';
import { Lyrics } from './screens/lyrics'
import { Search } from './screens/search.js';
import { Events } from './screens/events.js';
import { navigationRef } from './static/js/functions.js';

const Drawer = createDrawerNavigator();

export default 

function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Drawer.Navigator 
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          color: 'white'
        },
        
      }}> 
        <Drawer.Screen name="Login" component={Loginpage} />
        <Drawer.Screen name="Register" component={Registerpage} />
        <Drawer.Screen name="Userhome" component={Userhome} />
        <Drawer.Screen name="Lyrics" component={Lyrics} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="Events" component={Events} />
      </Drawer.Navigator>
      <SafeAreaView style= {styles.bottomView}>
      <TouchableOpacity
            style= {styles.to}
            onPress={() => {
                setModal1Visible(true)
            }}
            ><Text style={styles.whitetext}>Create Event</Text></TouchableOpacity>
      </SafeAreaView>
    </NavigationContainer>    
  );
}