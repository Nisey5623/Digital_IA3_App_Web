import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import { styles } from '../static/css/styles'
import { login, navigate } from '../static/js/functions.js'

export function Loginpage({navigation}){
    const [email, updateEmail]= useState("")
    const [password, updatePassword]= useState("")

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Text style={styles.text}>Email</Text>
            <TextInput
            style = {styles.input}
            placeholder = "Enter email"
            onChangeText = {(emailinfo) => {updateEmail(emailinfo)}}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
            style = {styles.input}
            placeholder = "Enter password"
            secureTextEntry={true}
            onChangeText = {(passwordinfo) => {updatePassword(passwordinfo)}}
            />
            <SafeAreaView style={styles.register}>
                <Button title='Register' style={styles.register} onPress={() => {navigation.navigate('Register')}}></Button>
            </SafeAreaView>
            <TouchableOpacity 
            style= {styles.to}
            onPress={() => {login(email, password, navigation)}}>
            <Text 
            style={styles.whitetext}>Login</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
        )}