import { ajax_handler, create_form_data } from './ajaxhandler'
import { createNavigationContainerRef } from '@react-navigation/native';
import {useContext} from "react";
import { LyricsContext } from '../../screens/userhome';

export let UserID = null;
export const navigationRef = createNavigationContainerRef()

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

export function login(email, password) {
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

export function login_success_check(object) {
    console.log(object)
    const t_or_f = object.success
    console.log(t_or_f)
    if (t_or_f) {
        UserID = object.userid
        navigate('Userhome')
    }
}

export function song_lyrics(object) {
  //console.log(object)
  const lines = object.lyrics
  return lines
}