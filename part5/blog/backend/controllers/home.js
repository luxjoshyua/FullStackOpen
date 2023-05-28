const homeRouter = require('express').Router();

homeRouter.get('/', (request, response) => {
  response.send('<h1>Hello World / Home Router!</h1>');
});

module.exports = homeRouter;
