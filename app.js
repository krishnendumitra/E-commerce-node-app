const express = require('express');
const http = require('http');
const logger = require('./libs/loggerLib');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const appConfig = require('./config/appConfig');
const globalErrorMiddleware = require('./middlewares/appErrorHandler');
const routeLoggerMiddleware = require('./middlewares/routeLogger');
const helmet = require('helmet');
const fs = require('fs');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// handle all the errors
app.use(globalErrorMiddleware.globalErrorHandler);


// route loggers
app.use(routeLoggerMiddleware.logIp);
app.use(helmet());



let routesPath = './routes';
let modelsPath = './models';

fs.readdirSync(modelsPath).forEach(file => {
    if (~file.indexOf('.js')) {
        logger.info('including model' + file);
        require(modelsPath + '/' + file);
    }
});


// Bootstrap all routes
fs.readdirSync(routesPath).forEach(file => {

    if (~file.indexOf('.js')) {
        logger.info("Including file");
        logger.info(routesPath + '/' + file);
        // importing js files
        let route = require(routesPath + '/' + file);
        // setting router by passing app reference
        route.setRouter(app);
    }
});

// End Bootstrap Route

app.use(globalErrorMiddleware.globalNotFoundHandler);



// listen the server on local server

const server = http.createServer(app);

logger.info(appConfig, "App : createServer", 5);

server.listen(appConfig.port);
server.on('error', onError);
server.on('listening', onListening);



function onError(error) {
    if (error.syscall !== 'listen') {
        logger.error(error.code + " not equal listen", "serverOnErrorHandler", 10);
        throw error;
    }

    switch (error.code) {
        case 'EACCES':
            logger.error(error.code + ':elevated privileges required', 'ServerOnErrorHandler', 10);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(error.code + ':port is already in use', 'ServerOnErrorHandler', 10);
            process.exit(1);
            break;
        default:
            logger.error(error.code + ':some unknown error occurred', 'ServerOnErrorHandler', 10);
            throw error;
    }

}

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr : 'port ' + addr.port;
    ('listening on' + bind)
    logger.info('server listening on port ' + addr.port, 'serverOnListeningHandler', 10);
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true });
}


process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at: Promise' + p + 'reason: ' + reason, "process: unhandledRejection", 10);
    throw reason;
});


mongoose.connection.on('error', (err) => {
    logger.error("connection error " + err, "App : mongoose.on('error')", 10);
});

mongoose.connection.on('open', (err) => {
    if (err) {
        logger.error("database error " + err, "App : mongoose.on('open')", 10);
    } else {
        logger.info("database connection successful ", "App : mongoose.on('open')", 5);
    }
}); // end mongoose connection
