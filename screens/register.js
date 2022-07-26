import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import { styles } from '../static/css/styles';
import { register } from '../static/js/functions';

export function Registerpage({navigation}){
    const [email, updateEmail]= useState("")
    const [password, updatePassword]= useState("")
    const [fname, updateFname]= useState("")
    const [surname, updateSurname]= useState("")
    const [username, updateUsername]= useState("")


    return(
        <SafeAreaView style={styles.registersafeAreaView}>
            <Text style={styles.text}>Username</Text>
            <TextInput
            style = {styles.input}
            placeholder = "Enter username"
            onChangeText = {(usernameinfo) => {updateUsername(usernameinfo)}}
            />
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
            onChangeText = {(passwordinfo) => {updatePassword(passwordinfo)}}
            />
            <View style={styles.namerow}>
                <View style={styles.nameswrap}>
                    <Text style={styles.text}>First Name</Text>
                    <TextInput
                    style = {styles.inputnames}
                    placeholder = "Enter first name"
                    onChangeText = {(fnameinfo) => {updateFname(fnameinfo)}}
                    />
                </View>
                <View style={styles.nameswrap}>
                    <Text style={styles.text}>Surname</Text>
                    <TextInput
                    style = {styles.inputnames}
                    placeholder = "Enter surname"
                    onChangeText = {(snameinfo) => {updateSurname(snameinfo)}}
                    />
                </View>
            </View>
            <TouchableOpacity 
            style= {styles.to}
            onPress={() => {register(fname, surname, username, email, password)}}>
            <Text 
            style={styles.whitetext}>Register</Text>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </SafeAreaView>
    )}
