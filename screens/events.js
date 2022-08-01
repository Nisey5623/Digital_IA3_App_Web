import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, Image, View, ScrollView, TouchableOpacity, Modal, Pressable, Dimensions, FlatList, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../static/css/styles'
import { event } from '../static/js/functions';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ajax_handler, create_form_data } from '../static/js/ajaxhandler';
import { check_logged } from '../static/js/functions';
import { SongContainer } from '../assets/song_container.js'
import { EventContainer } from '../assets/event_container';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as ImagePicker from 'expo-image-picker'
import DateTimePicker from '@react-native-community/datetimepicker';

function simplifySearchResponse(data){
    //const trackItems = data.items;
    //console.log(data)
    //console.log(trackItems)
    let eventData = [];
    for (let i = 0; i < data.length; i++){
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
            {'Latitude':Latitude, 'Longitude':Longitude,'eventName': EventName, 'previewURL': UserID, 'location': Location,
            'startDate': StartDate, 'endDate':EndDate, 'source': File, 'trackID': eventID}
        );
    }
    //console.log(eventData)
    return eventData
}

export function Events({navigation}){
    
    const [checkedForLogin, updateCheckForLogin] = useState(false)
    if (checkedForLogin === false){
        check_logged()
        updateCheckForLogin(true)
    }

    const [sdate, setSDate] = useState(new Date());
    const onSChange = (event, value) => {
        setSDate(value);
        if (Platform.OS === 'android') {
          setIsPickerShow(false);
        }
      };

    const [edate, setEDate] = useState(new Date());
    const onEChange = (event, value) => {
        setEDate(value);
        if (Platform.OS === 'android') {
        setIsPickerShow(false);
        }
    };

    var [latitude, updateLatitude] = useState(0.0)
    //console.log(latitude)
    var [longitude, updateLongitude] = useState(0.0)
    //console.log(longitude)
    const [modal1Visible, setModal1Visible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [eventResults, updateResults] = useState([])

    const [eventSearch, updateSearch] = useState("")
    const handleSearchResponse = data => {
        updateResults(simplifySearchResponse(data))
        //console.log(data)
    }
    useEffect(() => {
        const interval = setInterval(() => {console.log("Test")},1000)
        const event_data = {'eventSearch':eventSearch}
        //console.log(event_data)
        ajax_handler('https://22nisbettl.pythonanywhere.com/react_events_search', handleSearchResponse, create_form_data(event_data));
        return () => clearInterval(interval)
    })

    const [eventName, updateEventName]= useState("")
    const [location, updateLocation]= useState("")

    const region = {
        latitude: -27.439229,
        longitude: 152.9777076,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
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
                                <DateTimePicker
                                value={sdate}
                                mode={'datetime'}
                                display={Platform.OS === 'ios' ? 'default' : 'default'}
                                is24Hour={true}
                                onChange={onSChange}
                                style={styles.datePicker}
                                />
                                <Text style={styles.pickedDate}>{sdate.toUTCString()}</Text>
                                <Text style={styles.text}>End Date</Text>
                                <DateTimePicker
                                value={edate}
                                mode={'datetime'}
                                display={Platform.OS === 'ios' ? 'default' : 'default'}
                                is24Hour={true}
                                onChange={onEChange}
                                style={styles.datePicker}
                                />
                                <Text style={styles.pickedDate}>{edate.toUTCString()}</Text>
                                <Button title="Pick an image from camera roll" onPress={pickImage} />
                                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                                <TouchableOpacity
                                style= {styles.to}
                                onPress={() => {
                                    event(eventName, '1', location, sdate, edate)
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
                                //latitude={latitude}
                                //longitude={longitude}
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
                        updateLatitude(item.Latitude)
                        updateLongitude(item.Longitude)
                        setModal2Visible(true)
                    }}>
                    <View style={{width: Dimensions.get('window').width}} >
                        <EventContainer source = {item.source}
                        eventName = {item.eventName} location = {item.location} startDate = {item.startDate} endDate = {item.endDate} />
                    </View>
                </TouchableOpacity>
            )
            } } />
            <StatusBar style="auto" />
        </SafeAreaView>
        )}