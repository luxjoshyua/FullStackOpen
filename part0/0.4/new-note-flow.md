title New note diagram
participant browser
participant server

    Note right of browser: user enters new note into input, clicks save
    browser->>server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    server-->>browser: status code 302 tells browser to reload
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>browser: server responds with HTML, DOM paints
    browser->>server: HTTP GET https://studies.c    s.helsinki.fi/exampleapp/main.css
    server-->>browser: server responds with CSS file
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: server responds with JS file
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->browser: server responds with JSON object containing array of 100 notes
    Note right of browser: browser executes the callback function that renders the updated notes array
