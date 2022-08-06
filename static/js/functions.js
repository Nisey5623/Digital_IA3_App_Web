import { ajax_handler, create_form_data } from './ajaxhandler'
import { createNavigationContainerRef } from '@react-navigation/native';
import {useContext} from "react";
import { LyricsContext } from '../../screens/lyrics';

{/* Constants required for navigation and user functions */}
export let UserID = null;
export let Username = null;
export const navigationRef = createNavigationContainerRef()
export let nav = null;

{/* Logs out user by setting UserID to NULL */}
export function logout() {
  UserID = null
}

{/* Uses the Spotify API to retrieve song data using the search input in the search screen */}
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

{/* Checks if a user is logged in, else sends user to login screen */}
export function check_logged() {
  //console.log(UserID)
  if (UserID) {
    //console.log("There is a user id")
  }
  else{
    console.log("No user id")
    nav.navigate('Login')
  }
}

{/* Navigate to different screen */}
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

{/* 
Registers user using form input from register screen where function is called. The inputs are then placed into a form data
which is sent to the Python Anywhere server using AJAX handler
*/}
export function register(fname, sname, uname, email, password) {
    const register_data = {'fname':fname, 'sname':sname, 'uname':uname, 'email':email, 'password':password}
    
    ajax_handler('https://22nisbettl.pythonanywhere.com/react_register', register_success_check, create_form_data(register_data));
}

{/* Similar to the register function but it has to change navigation from stack to tab */}
export function login(email, password, navigation) {
  const login_data = {'email':email, 'password':password}
  console.log(login_data)
  ajax_handler('https://22nisbettl.pythonanywhere.com/react_login', login_success_check, create_form_data(login_data), "POST", true, navigation );
}

{/* Same as above funtions but creates an event */}
export function event(eventName, userid, location, startDate, timeRange, endDate, colour) {
  const event_data = {'eventName':eventName, 'userid':userid, 'location':location,'startDate':startDate, 'timeRange':timeRange, 'endDate':endDate, 'colour':colour}
  
  ajax_handler('https://22nisbettl.pythonanywhere.com/react_eventsend', console.log(), create_form_data(event_data));
}

{/* Navigates to the login page if logged in, else alerts the device to the error */}
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

{/* Navigates to the tab navigator and saves the UserID and username as a constant */}
export function login_success_check(object, random_crap) {
    console.log(object)
    const t_or_f = object.success
    console.log(t_or_f)
    if (t_or_f) {
        UserID = object.userid
        Username = object.username
        random_crap.navigate("MainNav")
        nav = random_crap
    }
}

export function song_lyrics(object) {
  //console.log(object)
  const lines = object.lyrics
  return lines
}