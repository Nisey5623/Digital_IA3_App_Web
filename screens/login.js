import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { Component, useState } from 'react'
import { styles } from '../static/css/styles'
import { login } from '../static/js/functions.js'

export function Login({navigation}){
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
            <TouchableOpacity 
            style= {styles.to}
            onPress={() => {login(email,password)}}>
            <Text 
            style={styles.whitetext}>Login</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
        )}