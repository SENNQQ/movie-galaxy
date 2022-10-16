const Pool = require('pg').Pool
const pool = new Pool({
    user: 'zxc',
    host: 'localhost',
    database: 'movie-galaxy',
    password: 'cawaq359268',
    port: 5432,
})

module.exports = pool;