title New note SPA diagram
participant browser
participant server

    Note right of browser: user enters new note into input, clicks save
    browser->>server: https://studies.cs.helsinki.fi/exampleapp/new_note_spa POST request is made to send note to server
    Note right of browser: code instructing this POST request is in spa.js
    Note right of browser: code prevents default GET request behaviour on the form that triggers rerender, instead the POST request to /new_note_spa is handled inside spa.js
    server-->>browser: status code 201, server responds with new note in JSON format
    Note left of server: note successfully updated, doesn't trigger rerender, note is stored on server
