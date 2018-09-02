const logger = require('./../libs/loggerLib');
// other error handlers
const responseGen = require('./../libs/responseLib');
let errorHandler = (err, request, response, next) => {
    logger.error("global not found handler called " + err.message, "appErrorHandler : errorHandler", 10);
    response.send(responseGen.generateResponse(true, "internal error", 500, null));
}

// 404 not found

let notFoundHandler = (request, response, next) => {
    logger.error("global not found handler called", "appErrorHandler : notFoundHandler", 10);
    response.send(responseGen.generateResponse(true, "route not found", 404, null));
}

module.exports = {
    globalErrorHandler: errorHandler,
    globalNotFoundHandler: notFoundHandler
}