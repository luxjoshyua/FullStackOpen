# sequenceDiagram

### example flow for [https://studies.cs.helsinki.fi/exampleapp/notes]

participant browser
participant server

<!-- 1. new note is submitted-->

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
activate server
server responds with 302 status (if post request successful)
server-->>browser: HTML document reloads because server asks the browser to do a new GET request to /notes with the new note
deactivate server

<!-- 2. call css file -->

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
activate server
server-->>browser: the css file
deactivate server

<!-- 3. call JS file after DOM and CSS got -->

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
activate server
server->>browser: the JavaScript file
deactivate server

<!-- call the raw data of the notes (data.json) -->

Note that the browser now starts executing the JavaScript code that fetches the JSON from the server
