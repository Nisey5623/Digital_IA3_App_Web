import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Modal, Pressable, FlatList } from 'react-native';
import { styles } from '../static/css/styles'
import { createContext, useCallback, useContext, useState } from 'react';
import { ajax_handler, create_form_data } from '../static/js/ajaxhandler';
import { check_logged } from '../static/js/functions';

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

export function Events({navigation}){
    
    const eventsdata

    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Text>Events Page</Text>
            <FlatList data={eventsdata} style= {{flex: 1}}renderItem={({item, index}) =>{
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