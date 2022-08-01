import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { EventContainer } from '../assets/event_container';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Audio, Video } from 'expo-av';
import { ajax_handler, create_form_data } from '../static/js/ajaxhandler';
import * as Sharing from 'expo-sharing';
import { useState, useEffect } from 'react'
import { styles } from '../static/css/styles'
import { UserID } from '../static/js/functions.js';
import { navigate } from '../static/js/functions.js'

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

export function Userhome({navigation}){

  const [eventResults, updateResults] = useState([])
  const [sound, setSound] = useState();
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearchResponse = data => {
    updateResults(simplifySearchResponse(data))
    //console.log(data)
  }

  useEffect(() => {
    const interval = setInterval(() => {console.log("Test")},1000)
    const userid = {'UserID':UserID}
    //console.log(userid)
    ajax_handler('https://22nisbettl.pythonanywhere.com/react_events_user', handleSearchResponse, create_form_data(userid));
    return () => clearInterval(interval)
  })  

    {/*async function playSound() {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
           require('./assets/Hello.mp3')
        );
        setSound(sound);
    
        console.log('Playing Sound');
        await sound.playAsync(); }*/}

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

    async function stopRecording() {
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
    
        let updatedRecordings = [...recordings];
        const { sound, status } = await recording.createNewLoadedSoundAsync();
        updatedRecordings.push({
          sound: sound,
          duration: getDurationFormatted(status.durationMillis),
          file: recording.getURI()
        });
        console.log(updatedRecordings[file])
    
        setRecordings(updatedRecordings);
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
      }

      function getDurationFormatted(millis) {
        const minutes = millis / 1000 / 60;
        const minutesDisplay = Math.floor(minutes);
        const seconds = Math.round((minutes - minutesDisplay) * 60);
        const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutesDisplay}:${secondsDisplay}`;
      }
      
    function getRecordingLines() {
        return recordings.map((recordingLine, index) => {
          return (
            <View key={index} style={styles.row}>
              <Text style={styles.fill}>Recording {index + 1} - {recordingLine.duration}</Text>
              <Button style={styles.button} onPress={() => {recordingLine.sound.replayAsync();
              recordingLine.sound.setVolumeAsync(100)}} title="Play"></Button>
              <Button style={styles.button} onPress={() => {}} title="Upload"></Button>
              <Button style={styles.button} onPress={() => Sharing.shareAsync(recordingLine.file)} title="Share"></Button>
            </View>
          );
        });
    }

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Text>Userhome</Text>
                <Button title={recording ? 'Stop Recording' : 'Start Recording'}
                onPress={recording ? stopRecording : startRecording}></Button>
                {getRecordingLines()}
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
              <FlatList data={eventResults} extraData={eventResults} style= {{flex: 1}}
                renderItem={({item, index}) =>{
                return (
                    <TouchableOpacity 
                        onPress={() => {
                          const eventid = {'EventID':item.trackID}
                          console.log(eventid)
                          ajax_handler('https://22nisbettl.pythonanywhere.com/react_events_delete', handleSearchResponse, create_form_data(eventid));
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