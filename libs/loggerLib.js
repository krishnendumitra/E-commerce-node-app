const pino = require('pino');
const momenttz = require('moment-timezone');
const moment = require('moment');
const logger = pino({
    colorize: true,
});

let captureError = (errorMessage, errorOrigin, errorLevel) => {
    let currentTime = momenttz.tz(moment.utc().format(), 'Asia/Calcutta').format('LLLL');

    let errorResponse = {
        timeStamp: currentTime,
        errorMessage: errorMessage,
        errorOrigin: errorOrigin,
        errorLevel: errorLevel
    }

    logger.error(errorResponse);

    return errorResponse;
}

let captureInfo = (message, origin, importance) => {
    let currentTime = momenttz.tz(moment.utc().format(), 'Asia/Calcutta').format('LLLL');


    let infoMessage = {
        timeStamp: currentTime,
        message: message,
        origin: origin,
        importanceLevel: importance
    }
    logger.info(infoMessage);
    return infoMessage;
}


module.exports = {
    error: captureError,
    info: captureInfo
}