FUNCTION spotify_search(song, callback)
    CONSTANT data = NULL
    XMLhttp Request
    callback(JSON)
    xhr OPEN ("GET", 'Link with song')
    xhr set Request ("API Key")
    xhr set Request ("API Host")
    xhr send(data)
END FUNCTION

FUNCTION getpowerlyrics()
    IF request.method == 'POST'
        url = 'power lyrics url'
        name = Form request('name')
        artist = Form request('artist')
        querystring = {'title':name,'artist':artist}
        headers = {APIKey, APIHost}
        requests request("GET"), url, headers, parameters
    END IF
END FUNCTION

FUNCTION Event_data
    useEffect(() => {
        interval = setInterval(1000)
        event_data = {'eventSearch': eventSearch}
        AJAX_handler(url, handleSearchResponse, create_form_data(event_data))
    })
END FUNCTION

FUNCTION Register()
    IF request.method == 'POST'
        first_name = Form request('fname')
        surname = Form request('sname')
        username = Form request('uname')
        email = Form request('email')
        password = Form request('password')
        emailcheck = SQL View Query
        IF emailcheck
            Success = False
        END IF
        usernamecheck = SQL View Query
        IF usernamecheck
            Success = False
        END IF
        Hash(password)
        SQL Insert Query
        Success = True
    END IF
END FUNCTION