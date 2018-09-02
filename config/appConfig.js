let ecomAppConfig = {};
ecomAppConfig.port = 5000;
ecomAppConfig.allowedCorsOrigin = "*";
ecomAppConfig.env = "dev";
ecomAppConfig.IP = "0.0.0.0";
ecomAppConfig.db = {
    uri: 'mongodb://127.0.0.1:27017/ecomAppDB'
};
ecomAppConfig.apiVersion = '/api/v1';

module.exports = {
    port: ecomAppConfig.port,
    allowedCorsOrigin: ecomAppConfig.allowedCorsOrigin,
    environment: ecomAppConfig.env,
    db: ecomAppConfig.db,
    apiVersion: ecomAppConfig.apiVersion,
    IP: ecomAppConfig.IP
}; // end module exports