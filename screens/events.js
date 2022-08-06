import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, Image, View, ScrollView, TouchableOpacity, Modal, Pressable, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../static/css/styles'
import { event, UserID } from '../static/js/functions';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ajax_handler, create_form_data } from '../static/js/ajaxhandler';
import { check_logged } from '../static/js/functions';
import { SongContainer } from '../assets/song_container.js'
import { EventContainer } from '../assets/event_container';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';

{/*Function pulls data from the useEffect and distributes it to the event container*/}
function simplifySearchResponse(data){
    let eventData = [];
    for (let i = 0; i < data.length; i++){
        const event = data[i];
        const eventID = event.EventID
        const UserID = event.UserID
        const EventName = event.EventName;
        const Location = event.Location
        const StartDate = event.StartDate
        const TimeRange = event.TimeRange
        const EndDate = event.EndDate
        const Longitude = event.Longitude
        const Latitude = event.Latitude
        const Colour = event.Colour
        eventData.push(
            {'Latitude':Latitude, 'Longitude':Longitude,'eventName': EventName, 'previewURL': UserID, 'location': Location,
            'startDate': StartDate, 'TimeRange':TimeRange, 'endDate':EndDate, 'Colour': Colour, 'trackID': eventID}
        );
    }
    return eventData
}

export function Events({navigation}){
    
    
    {/* Checks user is logged in */}
    const [checkedForLogin, updateCheckForLogin] = useState(false)
    if (checkedForLogin === false){
        check_logged()
        updateCheckForLogin(true)
    }

    {/* Modals and coordinate variables and constants */}
    var [latitude, updateLatitude] = useState(0.0)
    var [longitude, updateLongitude] = useState(0.0)
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [eventResults, updateResults] = useState([])

    {/* Event search input constantly updates */}
    const [eventSearch, updateSearch] = useState("")
    const handleSearchResponse = data => {
        updateResults(simplifySearchResponse(data))
    }
    useEffect(() => {
        const interval = setInterval(() => {},1000)
        const event_data = {'eventSearch':eventSearch}
        ajax_handler('https://22nisbettl.pythonanywhere.com/react_events_search', handleSearchResponse, create_form_data(event_data));
        return () => clearInterval(interval)
    })

    {/* Create event form data */}
    const [eventName, updateEventName]= useState("")
    const [location, updateLocation]= useState("")
    const [sdate, updateSdate]= useState("")
    const [edate, updateEdate]= useState("")
    const [time, updateTime]= useState("")
    const [colour, updateColour]= useState("")

    const region = {
        latitude: -27.439229,
        longitude: 152.9777076,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal1Visible}
                    onRequestClose={() => {
                    setModal1Visible(!modal1Visible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <SafeAreaView style={styles.safeAreaView}>
                                <Text style={styles.text}>Event Name</Text>
                                <TextInput
                                style = {styles.input}
                                placeholder = "Enter event name"
                                onChangeText = {(eventn) => {updateEventName(eventn)}}
                                />
                                <Text style={styles.text}>Location</Text>
                                <TextInput
                                style = {styles.input}
                                placeholder = "Enter location / address"
                                onChangeText = {(location) => {updateLocation(location)}}
                                />
                                <Text style={styles.text}>Start Date</Text>
                                <TextInput
                                style = {styles.input}
                                placeholder = "Enter start date : dd/mm/yyyy"
                                onChangeText = {(start) => {updateSdate(start)}}
                                />
                                <Text style={styles.text}>End Date</Text>
                                <TextInput
                                style = {styles.input}
                                placeholder = "Enter end date : dd/mm/yyyy"
                                onChangeText = {(end) => {updateEdate(end)}}
                                />
                                <Text style={styles.text}>Time</Text>
                                <TextInput
                                style = {styles.input}
                                placeholder = "Enter time range : hh:mm - hh:mm"
                                onChangeText = {(timerange) => {updateTime(timerange)}}
                                />
                                <Text style={styles.text}>Colour of event</Text>
                                <TextInput
                                style = {styles.input}
                                placeholder = "Enter colour name or HTML colour code"
                                onChangeText = {(color) => {updateColour(color)}}
                                />
                                <TouchableOpacity
                                style= {styles.to}
                                onPress={() => {
                                    event(eventName, UserID, location, sdate, time, edate, colour)
                                    uploadImageAsync({uri : image })
                                    setModal1Visible(false)
                                }}
                                >      
                                <Text style={styles.whitetext}>Create</Text></TouchableOpacity>
                            </SafeAreaView>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModal1Visible(!modal1Visible)}
                            >
                            <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal2Visible}
                    onRequestClose={() => {
                    setModal1Visible(!modal2Visible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <SafeAreaView style={styles.safeAreaView}>
                                <MapView style={styles.map}
                                initialRegion={{
                                    latitude: -27.4705,
                                    longitude: 153.0260,
                                    latitudeDelta: 0.09,
                                    longitudeDelta: 0.09,
                                  }}><Marker
                                pinColor={"red"}
                                coordinate={{latitude: latitude,longitude: longitude,}}
                                ></Marker></MapView>
                            </SafeAreaView>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModal2Visible(!modal2Visible)}
                            >
                            <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            <Text>Events Page</Text>
            <TouchableOpacity
                style= {styles.to}
                onPress={() => {
                    setModal1Visible(true)
                }}
            ><Text style={styles.whitetext}>Create Event</Text></TouchableOpacity>
            <Text></Text>
            <TextInput
                style = {styles.input}
                placeholder = "Search event"
                onChangeText = {(events) => {updateSearch(events)}}
            />
            <FlatList data={eventResults} extraData={eventResults} style= {{flex: 1}}
            renderItem={({item, index}) =>{
            return (
                <TouchableOpacity 
                    onPress={() => {
                        {/* Map of event */}
                        updateLatitude(item.Latitude)
                        updateLongitude(item.Longitude)
                        setModal2Visible(true)
                    }}>
                    <View style={{width: Dimensions.get('window').width}} >
                        <EventContainer colour = {item.Colour}
                        eventName = {item.eventName} timerange = {item.TimeRange} location = {item.location} startDate = {item.startDate} endDate = {item.endDate} />
                    </View>
                </TouchableOpacity>
            )
            } } />
            <StatusBar style="auto" />
        </SafeAreaView>
        )}