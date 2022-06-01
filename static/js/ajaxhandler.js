
export function create_form_data(data){
    const form_data = new FormData();
    const key_array = Object.keys(data);
    key_array.forEach(key => {
        form_data.append(key, data[key]);
    });
    return form_data
 }

export function ajax_handler(url, callback=console.log, form_object=null, request_method='POST', async_var = true){
    const XMLhr = new XMLHttpRequest();

    XMLhr.open(request_method, url, async_var);

    XMLhr.onreadystatechange = () =>{
        if (XMLhr.readyState !== 4) 
        return
        
        if (XMLhr.status === 200){
            let response = JSON.parse(XMLhr.responseText);
            callback(response);
            return
        }
        console.log(`XMLHttpRequest returned status code of: ${XMLhr.status}`);
    }
    XMLhr.send(form_object);
}