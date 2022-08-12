const { app } = require('./app.js')
const { APP } = require('./config/index.js');

app.listen(APP.PORT, () => {
  console.log(`${APP.ENV} server is running on port ${APP.PORT}`);
});