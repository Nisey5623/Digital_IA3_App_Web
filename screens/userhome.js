import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import { styles } from '../static/css/styles'
import { navigate } from '../static/js/functions.js'

export function Userhome({navigation}){

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Text>Userhome</Text>
            <View style={styles.userhomeView}>
                <TouchableOpacity 
                style= {styles.tou}
                onPress={() => {navigate('Lyrics')}}>
                <Text 
                style={styles.whitetext}>Lyrics Finder</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style= {styles.tou}
                onPress={() => {navigate('Search')}}>
                <Text 
                style={styles.whitetext}>Search Song</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style= {styles.tou}
                onPress={() => {navigate('Events')}}>
                <Text 
                style={styles.whitetext}>Events</Text>
                </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
        )}