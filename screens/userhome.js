import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from '../static/css/styles'
import { createContext, useCallback, useContext, useState } from 'react';
import { lyricsget } from '../static/js/functions';
import { ajax_handler, create_form_data } from '../static/js/ajaxhandler';
import { check_logged } from '../static/js/functions';

export const LyricsContext = createContext({
    lyrics: "", 
    setLyrics: () => {},
});

export function Homepage({navigation}){
    const {lyrics} = useContext(LyricsContext);
    const {setLyrics} = useContext(LyricsContext);
    const [lyrics2, setLyrics2] = useState('')
    const [name, updateName]= useState("")
    const [artist, updateArtist]= useState("")
    const [checkedForLogin, updateCheckForLogin] = useState(false)
    if (checkedForLogin === false){
        check_logged()
        updateCheckForLogin(true)
    }
    return(
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.safeAreaView}>
                <Text style={styles.text}>Song Name</Text>
                <TextInput
                style = {styles.inputlyrics}
                placeholder = "Enter name"
                onChangeText = {(nameinfo) => {updateName(nameinfo)}}
                />
                <Text style={styles.text}>Song Artist</Text>
                <TextInput
                style = {styles.inputlyrics}
                placeholder = "Enter artist"
                onChangeText = {(aristinfo) => {updateArtist(aristinfo)}}
                />
                <TouchableOpacity 
                style= {styles.to}
                onPress={() => {
                        const song_data = {'name':name, 'artist':artist}
                        console.log(song_data)
                        ajax_handler('https://22nisbettl.pythonanywhere.com/gepowerlyrics', (object)=>{
                            setLyrics2(object.lyrics);
                            
                        }, create_form_data(song_data));
                        console.log(lyrics)
                    }}>
                <Text 
                style={styles.whitetext}>Lyrics</Text>
                </TouchableOpacity>   
            </SafeAreaView>
            <Text>{"\r"}</Text>
            <SafeAreaView style={styles.insidesafeAreaView}>
                <Text style={styles.text}>{lyrics2}</Text>
            </SafeAreaView>
        </ScrollView>
        )}