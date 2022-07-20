import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Modal, Pressable, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../static/css/styles'
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ajax_handler, create_form_data } from '../static/js/ajaxhandler';
import { check_logged } from '../static/js/functions';
import { SongContainer } from '../assets/song_container.js'

function simplifySearchResponse(data){
    //const trackItems = data.items;
    console.log(data)
    //console.log(trackItems)
    let eventData = [];
    for (let i = 0; i < data.length; i++){
        console.log("Here")
        const event = data[i];
        const eventID = event.EventID
        const UserID = event.UserID
        const EventName = event.EventName;
        const Location = event.Location
        const StartDate = event.StartDate
        const EndDate = event.EndDate
        const Longitude = event.Longitude
        const Latitude = event.Latitude
        const File = event.File
        eventData.push(
            {'trackName': EventName, 'previewURL': UserID, 'duration': Location,
            'artists': StartDate, 'albumName':EndDate, 'source': File, 'trackID': eventID}
        );
    }
    console.log(eventData)
    return eventData
}

export function Events({navigation}){
    
    const [modalVisible, setModalVisible] = useState(false);
    const [eventResults, updateResults] = useState([])
    const handleSearchResponse = data => {
        updateResults(simplifySearchResponse(data))
    }
    useEffect(() => {
        ajax_handler('https://22nisbettl.pythonanywhere.com/react_events', handleSearchResponse);
    })

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView>
                                <Text style={styles.text}></Text>
                            </ScrollView>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                            >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            <Text>Events Page</Text>
            <TouchableOpacity
            style= {styles.to}
            onPress={() => {
                setModalVisible(true)
            }}
            ></TouchableOpacity>
            <FlatList data={eventResults} extraData={eventResults} style= {{flex: 1}}renderItem={({item, index}) =>{
            return (
                <TouchableWithoutFeedback>
                    <View style={{width: Dimensions.get('window').width}} >
                        <SongContainer source = {item.source} previewURL = {item.previewURL} 
                        trackName = {item.trackName} artists = {item.artists} albumName = {item.albumName} />
                    </View>
                </TouchableWithoutFeedback>
                
                
            )
            } } />
            <StatusBar style="auto" />
        </SafeAreaView>
        )}