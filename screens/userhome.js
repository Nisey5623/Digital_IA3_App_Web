import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { styles } from '../static/css/styles'

export function Home({navigation}){
    return(
        <SafeAreaView style={styles.safeAreaView}>
            <Text>Homepage</Text>
        </SafeAreaView>
        )}