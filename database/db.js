const {Pool} = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_NAME,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME,
    max: 5,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
}
