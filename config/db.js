// config/db.js
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, // e.g., localhost
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // set to true if you're using Azure or remote server
        trustServerCertificate: true, // set to true for localhost
    },
    port: parseInt(process.env.DB_PORT || '1433'),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log('✅ MSSQL connected');
        return pool;
    })
    .catch((err) => {
        console.error('❌ Database connection failed:', err);
        process.exit(1);
    });

module.exports = {
    sql,
    poolPromise,
};
