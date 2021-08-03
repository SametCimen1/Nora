const Pool = require('pg').Pool;
const password = require('../ps');
const pool = new Pool({
    user:"postgres",
    password:password,
    host:"localhost",
    port:5432,
    database:"nora"
})

module.exports = pool;