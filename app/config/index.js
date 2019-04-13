const Pool = require('pg').Pool;
const pool = new Pool({
    host:'localhost',
    user:'acrole',
    database:'acroledb',
    password:'123',
    port:5432
})

module.exports = {
  pool
}
