// standard format of api response
let generate = (error, message, status, data) => {
    let response = {
        error: error,
        message: message,
        status: status,
        data: data
    }
    return response;
}

module.exports = {
    generateResponse: generate
}