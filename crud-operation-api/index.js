const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const apiRoutes = require('./routes');
// require('./models');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: '.env' });

/**
 * Create Express server.
 */
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: [ 'http://localhost:3000']
    }));
}

/**
 * Connect to MongoDB.
 */
const options = {
    autoReconnect: true,
    keepAlive: 1,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 0,
    useNewUrlParser: true
};

mongoose.connect(process.env.MONGODB_URI, options);

mongoose.connection.on('connected', () => {
    console.log('%s MongoDB is connected');
});
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
    mongoose.connection.close();
});

/**
 * If the Node process ends, close the Mongoose connection 
 */
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});



/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




const apiRouter = express.Router();
if (apiRoutes) {
    apiRouter.use('/api', apiRoutes);
}



app.use(apiRouter);


/**
 * Start Express server.
 */

app.listen(app.get('port'), () => {
    console.log('%s App is running at %s:%d in %s mode', app.get('host'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
}).on('error', (err) => {
    console.log(err);
})


module.exports = app;









// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
