import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react'
import { styles } from '../static/css/styles';

export function Register({navigation}){
    const [email, updateEmail]= useState("")
    const [password, updatePassword]= useState("")
    const [fname, updateFname]= useState("")
    const [surname, updateSurname]= useState("")
    const [username, updateUsername]= useState("")


    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Text>Register Page</Text>
            <View style={styles.namerow}>
                <View style={styles.nameswrap}>
                    <Text style={styles.text}>First Name</Text>
                    <TextInput
                    style = {styles.inputnames}
                    placeholder = "Enter first name"
                    onChangeText = {(emailinfo) => {updateEmail(emailinfo)}}
                    />
                </View>
                <View style={styles.nameswrap}>
                    <Text style={styles.text}>Surname</Text>
                    <TextInput
                    style = {styles.inputnames}
                    placeholder = "Enter surname"
                    onChangeText = {(emailinfo) => {updateEmail(emailinfo)}}
                    />
                </View>
            </View>
            <Text style={styles.text}>Username</Text>
            <TextInput
            style = {styles.input}
            placeholder = "Enter username"
            onChangeText = {(emailinfo) => {updateEmail(emailinfo)}}
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
            onChangeText = {(emailinfo) => {updateEmail(emailinfo)}}
            />
            <StatusBar style="auto" />
        </SafeAreaView>
    )}
