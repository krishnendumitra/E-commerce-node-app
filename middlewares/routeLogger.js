const appConfig = require('./../config/appConfig');
const logger = require('./../libs/loggerLib');

let requestLogger = (request, response, next) => {

    let remoteIp = request.connection.remoteAddress + '://' + request.connection.remotePort;
    let realIp = request.headers['X-REAL-IP'];
    // logging routes
    logger.info(request.method + "Request made from " + remoteIp + " for Route --  " + request.originalUrl, "RouteLogger : requestLogger", 5);

    // options is a pre request before any other
    if (request.method === 'OPTIONS') {
        console.log('!OPTIONS');
        let headers = {};
        // IE8 does not allow domains to be specified.just the *
        //headers["Access-Control-Allow-Origin"] = request.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST,GET,PUT,DELETE,OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400';
        headers["Access-Control-Allow-Headers"] = "X-Requested-With,X-HTTP-Method-Override,Content-Type,Accept";
        response.writeHead(200, headers);
        response.end();
    } else {

        // enable disable cors here
        response.header("Access-Control-Allow-Origin", appConfig.allowedCorsOrigin);
        response.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE,OPTIONS');
        response.header("Access-Control-Allow-headers", "Origin,X-Requested-With, Content-Type,Accept");
        next();
    }


} // end request logger

module.exports = {
    logIp: requestLogger
}