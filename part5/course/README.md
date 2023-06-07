[Deployed course app](https://render-test-fu9h.onrender.com/)

To run the app, start the backend from the backend folder with `npm run dev` and the frontend with `npm start`
If deploying to remote server, change the config in `services/notes.js` in the frontend to be the relative URL API

For running Cypress

- Backend use `npm run start:test`
- Frontend use `npm start` and `npm run cypress:open`
- To run cypress from the command line, use `npm run test:e2e` in the frontend
