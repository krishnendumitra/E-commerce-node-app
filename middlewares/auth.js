const logger = require('./../libs/loggerLib');
const responseGen = require('./../libs/responseLib');
const check = require('./../libs/checkLib');


let isAuthenticated = (request, response, next) => {
    if (request.params.authToken
        || request.query.authToken
        || request.header('authToken')) {
        if (request.params.authToken === "Admin" || request.query.authToken === "Admin" || request.header('authToken') === "Admin") {
            request.user = { fullName: 'Admin', userId: 'Admin' }
            next();
        } else {
            logger.error('Incorrect authentication token', 'auth Middleware : isAuthenticated', 5);
            response.send(responseGen.generateResponse(true, 'incorrect authentication token', 403, null));
        }

    } else {
        logger.error('Authentication Token Missing', 'auth MiddleWire : isAuthenticated', 5);
        response.send(responseGen.generateResponse(true, 'Authentication token is missing in the request', 403, null));
    }

}

module.exports = {
    isAuthenticated: isAuthenticated
}