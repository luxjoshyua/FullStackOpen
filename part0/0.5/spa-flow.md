title SPA initial render diagram
participant browser
participant server

    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
    server->>browser: HTML is returned
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server->>browser: CSS is returned
    browser->>server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser: JS is returned
    Note right of browser: html and CSS is rendered from the JS file
    browser->>server: GET request from main.js for data.json file
    server->>browser: data.json is returned
    Note right of browser: Notes are now fully rendered in DOM
