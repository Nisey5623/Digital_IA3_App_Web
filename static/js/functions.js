import { ajax_handler, create_form_data } from './ajaxhandler'

export function login(email, password) {
    const login_data = {'email':email, 'password':password}
    
    ajax_handler('https://22nisbettl.pythonanywhere.com/react_login', success_check, create_form_data(login_data));
}

export function success_check(object) {
    console.log(object)
    const t_or_f = object.success
    console.log(t_or_f)
    
}