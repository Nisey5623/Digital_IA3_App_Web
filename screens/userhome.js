import { StatusBar } from 'expo-status-bar';
import { Button, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EventContainer } from '../assets/event_container';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Audio, Video } from 'expo-av';
import { ajax_handler, create_form_data } from '../static/js/ajaxhandler';
import { check_logged, logout } from '../static/js/functions.js';
import * as Sharing from 'expo-sharing';
import { useState, useEffect } from 'react'
import { styles } from '../static/css/styles'
import { UserID, Username } from '../static/js/functions.js';
import { navigate } from '../static/js/functions.js'

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

{/* Screen Function */}
export function Userhome({navigation}){

  const [checkedForLogin, updateCheckForLogin] = useState(false)
    if (checkedForLogin === false){
        check_logged()
        updateCheckForLogin(true)
  }
  const [eventResults, updateResults] = useState([])
  const [sound, setSound] = useState();
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearchResponse = data => {
    updateResults(simplifySearchResponse(data))
  }

  {/* Constantly retrieves event data relating to the UserID of logged in user */}
  useEffect(() => {
    const interval = setInterval(() => {console.log("Test")},1000)
    const userid = {'UserID':UserID}
    check_logged()
    ajax_handler('https://22nisbettl.pythonanywhere.com/react_events_user', handleSearchResponse, create_form_data(userid));
    return () => clearInterval(interval)
  })  

  {/* Starts the audio recording, after asking for microphone permission */}
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        
        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  {/* Stops recording, saving the uri to be reaplyed, uploaded or shared */}
  const [recordingName, updaterecordingName]= useState("")
  async function stopRecording() {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
  
      let updatedRecordings = [...recordings];
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const uri = recording.getURI()
      console.log(uri)
      updatedRecordings.push({
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      });
  
      setRecordings(updatedRecordings);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
    }

  {/* Uploads audio using formdata and fetch to the Python Anywhere server. The name of the file begins with the user's username then the inputed name */}
  async function uploadAudioAsync(uri) {
    console.log("Uploading " + uri);
    let apiUrl = 'https://22nisbettl.pythonanywhere.com/uploadaudio';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];
  
    let formData = new FormData();
    formData.append('file', {
      uri,
      name: `${Username}_${recordingName}.${fileType}`,
      type: `audio/x-${fileType}`,
    });
    formData.append('database', {
      UserID: `${UserID}`,
      Rname: `${recordingName}`,
    })
    console.log(formData)
  
    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
  
    console.log("POSTing " + uri + " to " + apiUrl);
    return fetch(apiUrl, options);
  }

  {/* Gets duration of the recording in minutes and seconds */}
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
    
  {/* Displays the buttons for the recordings */}
  function getRecordingLines() {
      return recordings.map((recordingLine, index) => {
        return (
          <View key={index} style={styles.row}>
            <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
            <Button style={styles.button} onPress={() => {recordingLine.sound.replayAsync();
            recordingLine.sound.setVolumeAsync(1);}} title="Play"></Button>
            <TextInput
              style = {styles.minput}
              placeholder = "Enter recording name"
              onChangeText = {(rname) => {updaterecordingName(rname)}}
              />
            <Button style={styles.button} onPress={() => {
              uploadAudioAsync(recordingLine.file)
              }} title="Upload"></Button>
            <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
          </View>
        );
      });
  }

  const [modal1Visible, setModal1Visible] = useState(false);

  return(
    <SafeAreaView style={styles.safeAreaView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal1Visible}
        onRequestClose={() => {
        setModal1Visible(!modal1Visible);
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <SafeAreaView style={styles.safeAreaView}>
                <Button title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}></Button>
                {getRecordingLines()}
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
        <Text>Userhome</Text>
        <TouchableOpacity 
              style= {styles.tour}
              onPress={() => {setModal1Visible(true)}}>
              <Text 
              style={styles.whitetext}>Audio Recordings</Text>
              <Ionicons name="mic" size={30} color={"white"}></Ionicons>
              </TouchableOpacity>
          <View style={styles.userhomeView}>
            <TouchableOpacity 
            style= {styles.tou}
            onPress={() => {navigation.navigate('Lyrics')}}>
            <Text 
            style={styles.whitetext}>Lyrics Finder</Text>
            <Ionicons name="musical-notes" size={50} color={"white"}></Ionicons>
            </TouchableOpacity>

            <TouchableOpacity 
            style= {styles.tou}
            onPress={() => {navigation.navigate('Search')}}>
            <Text 
            style={styles.whitetext}>Search Song</Text>
            <Ionicons name="information-circle-outline" size={50} color={"white"}></Ionicons>
            </TouchableOpacity>

            <TouchableOpacity 
            style= {styles.tou}
            onPress={() => {navigation.navigate('Events')}}>
            <Text 
            style={styles.whitetext}>Events</Text>
            <Ionicons name="play" size={50} color={"white"}></Ionicons>
            </TouchableOpacity>
          </View>
          <Text style={styles.htext}>My Events</Text>
          <SafeAreaView style={styles.safeAreaView}>
          <FlatList data={eventResults} extraData={eventResults} style= {{flex: 1}}
            renderItem={({item, index}) =>{
            return (
                <TouchableOpacity 
                  onPress={() => {
                    const eventid = {'EventID':item.trackID}
                    {/* Deletes event that the user has pressed */}
                    ajax_handler('https://22nisbettl.pythonanywhere.com/react_events_delete', handleSearchResponse, create_form_data(eventid));
                  }}>
                  <View style={{width: Dimensions.get('window').width}} >
                      <EventContainer colour = {item.Colour}
                      eventName = {item.eventName} timerange = {item.TimeRange} location = {item.location} startDate = {item.startDate} endDate = {item.endDate} />
                  </View>
                </TouchableOpacity>
            )
            } } />
          </SafeAreaView>
          <TouchableOpacity
              style= {styles.tob}
              onPress={() => {
                  logout()
              }}
          ><Text style={styles.whitetext}>Logout</Text></TouchableOpacity>
        <StatusBar style="auto" />
    </SafeAreaView>
  )}