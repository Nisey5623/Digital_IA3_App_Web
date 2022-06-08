import { ajax_handler, create_form_data } from './ajaxhandler'
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function login(email, password) {
    const login_data = {'email':email, 'password':password}
    
    ajax_handler('https://22nisbettl.pythonanywhere.com/react_login', success_check, create_form_data(login_data));
}

export function success_check(object) {
    console.log(object)
    const t_or_f = object.success
    console.log(t_or_f)
    if (t_or_f) {
        navigate('Userhome', {})
    }

}