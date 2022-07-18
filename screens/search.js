import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react'
import { styles } from '../static/css/styles'
import { navigate } from '../static/js/functions.js'
import { spotify_search } from '../static/js/functions.js'
import { SongContainer } from '../assets/song_container.js'

function simplifySearchResponse(data){
    const trackItems = data.tracks.items;
    let trackData = [];
    for (let i = 0; i < trackItems.length; i++){
        const track = trackItems[i].data;
        const trackName = track.name;
        const trackID = track.id
        const previewURL = track.preview_url;
        const duration = track.duration_ms;
        let artistLists = track.artists.items.map(data => {
            return data.profile.name;
        });
        const artists = artistLists.join(', ')
        const albumName = track.albumOfTrack.name;
        const albumImage = track.albumOfTrack.coverArt.sources[0].url
        trackData.push(
            {'trackName': trackName, 'previewURL': previewURL, 'duration': duration,
            'artists': artists, 'albumName':albumName, 'source': albumImage, 'trackID': trackID}
        );
    }
    console.log(trackData)
    return trackData
}

export function Search({navigation}){
    
    const [spotifyResults, updateResults] = useState([])
    const [searchInput, updateInput] = useState('')
    const handleSearchResponse = data => {
        updateResults(simplifySearchResponse(data))
    }

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Text>Song Search</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Enter search"
                onChangeText={text=>{
                    updateInput(text)
                }}
            />
            <TouchableOpacity
            style= {styles.to}
            onPress ={() => {
                spotify_search(searchInput, handleSearchResponse)
            }}
            ><Text 
                style={styles.whitetext}>Search</Text></TouchableOpacity>
            <FlatList data={spotifyResults} extraData={spotifyResults} style= {{flex: 1}}renderItem={({item, index}) =>{
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