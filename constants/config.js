// constants/config.js

module.exports = {
    APP_NAME: "WorkMates",
    PORT: process.env.PORT || 3001,
    JWT_EXPIRES_IN: "1d",
    DB_ENCRYPT: true,
    DB_TRUST_CERT: true,
};