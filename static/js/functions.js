import { ajax_handler, create_form_data } from './ajaxhandler'
import { createNavigationContainerRef } from '@react-navigation/native';
import {useContext} from "react";
import { LyricsContext } from '../../screens/lyrics';

export let UserID = null;
export const navigationRef = createNavigationContainerRef()

export function map_search(place, callback) {
  const data = null;

  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      callback(JSON.parse(this.responseText));
    }
  });

  xhr.open("GET", `https://google-maps28.p.rapidapi.com/maps/api/place/textsearch/json?query=${place}&region=en&language=en`);
  xhr.setRequestHeader("X-RapidAPI-Key", "988768d5acmsh98ee21ca7b4aed4p1d5b65jsn80bbfcd199dc");
  xhr.setRequestHeader("X-RapidAPI-Host", "google-maps28.p.rapidapi.com");

  xhr.send(data);
}

export function spotify_search(song, callback) {
  const data = null;
  console.log(song)
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      callback(JSON.parse(this.responseText));
    }
  });

  xhr.open("GET", `https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=10&numberOfTopResults=5`);
  xhr.setRequestHeader("X-RapidAPI-Key", "988768d5acmsh98ee21ca7b4aed4p1d5b65jsn80bbfcd199dc");
  xhr.setRequestHeader("X-RapidAPI-Host", "spotify23.p.rapidapi.com");

  xhr.send(data);
}

export function check_logged() {
  console.log(UserID)
  if (UserID) {
    console.log("There is a user id")
  }
  else{
    console.log("No user id")
    navigate('Login')
  }
}

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function register(fname, sname, uname, email, password) {
    const register_data = {'fname':fname, 'sname':sname, 'uname':uname, 'email':email, 'password':password}
    
    ajax_handler('https://22nisbettl.pythonanywhere.com/react_register', register_success_check, create_form_data(register_data));
}

export function login(email, password, navigation) {
  const login_data = {'email':email, 'password':password}
  console.log(login_data)
  ajax_handler('https://22nisbettl.pythonanywhere.com/react_login', login_success_check, create_form_data(login_data), "POST", true, navigation );
}

export function event(name, userid, location) {
  const login_data = {'email':email, 'password':password}
  
  ajax_handler('https://22nisbettl.pythonanywhere.com/react_login', login_success_check, create_form_data(login_data));
}

export function register_success_check(object) {
  console.log(object)
  const t_or_f = object.success
  const message = object.message
  alert(message)
  console.log(t_or_f)
  if (t_or_f) {
      navigate('Login')
  }
}

export function login_success_check(object, random_crap) {
    console.log(object)
    const t_or_f = object.success
    console.log(t_or_f)
    if (t_or_f) {
        UserID = object.userid
        random_crap.navigate("MainNav")
    }
}

export function song_lyrics(object) {
  //console.log(object)
  const lines = object.lyrics
  return lines
}