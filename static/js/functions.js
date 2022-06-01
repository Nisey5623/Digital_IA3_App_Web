import { ajax_handler, create_form_data } from './ajaxhandler'

export function login(email, password) {
    const login_data = {'Email':email, 'Password':password}
    
    ajax_helper('https://22nisbettl.pythonanywhere.com/react_login', console.log, create_form_data(login_data));
}