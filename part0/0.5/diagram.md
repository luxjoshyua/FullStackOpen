# sequenceDiagram

### example flow for [https://studies.cs.helsinki.fi/exampleapp/spa]

diagram for when the user goes to the SPA version of the app

participant browser
participant server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate server
server-->>browser: GET request returns all the resources needed for initial render; HTML, CSS and JavaScript files. This is the key difference from the other app.
deactivate server

At this stage, the browser is executing the JavaScript code that fetches the JSON from the server

browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
activate server
server-->>browser: JSON object that returns the notes
deactivate server

At this stage, the browser has executed the callback function that renders the notes. As this is an SPA and we are fetching the data through JavaScript already loaded, the browser doesn't rerender
