const app = require('./app'); // the Express app
const config = require('./utils/config');
const logger = require('./utils/logger');

app.listen(config.PORT, () => {
  logger.info(`Server running on port https://localhost:${config.PORT}`);
});
