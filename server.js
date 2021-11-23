require('dotenv').config({
    path: "./config/.env"
});
const App = require('./src');
global.config = require('./config/settings/index');
new App();