const moment = require('moment');
const momenttz = require('moment-timezone');

let now = () => {
    return moment.utc().format();
}

let getLocalTime = (zone) => {
    return moment().tz(zone).format();
}

let convertToLocalTime = (time, zone) => {
    return momenttz.tz(time, zone).format('LLLL');
}

module.exports = {
    now: now,
    getLocalTime: getLocalTime,
    convertToLocalTime: convertToLocalTime
}