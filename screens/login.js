import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { Component, useState } from 'react'
import { styles } from '../static/css/styles'

export function Login({navigation}){
    const [email, updateEmail]= useState("")
    const [password, updatePassword]= useState("")

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Text style={styles.text}>Open up App.js to start working on your app!</Text>
            <SafeAreaView>
            <Text style={styles.text}>Email</Text>
            <TextInput
            style = {styles.input}
            placeholder = "Enter email"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
            style = {styles.input}
            placeholder = "Enter password"
            />
            </SafeAreaView>
            <StatusBar style="auto" />
        </SafeAreaView>
        )}