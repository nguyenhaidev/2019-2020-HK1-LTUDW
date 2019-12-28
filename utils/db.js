const mysql = require('mysql');
const util = require('util');
const pool = mysql.createPool({
    connectionLimit: 100,
    host: '192.168.56.102',
    port: 3306,
    user: 'cdth',
    password: '',
    database: 'cdth'
})

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => pool_query(sql),
    insert: (entity, table) => pool_query(`INSERT INTO ${table} VALUES ?`, entity),
    delete: (condition, table) => pool_query(`DELETE FROM ${table} WHERE ?`, condition),
    update: (entity, condition, table) => pool_query(`UPDATE ${table} SET ? WHERE ?`, entity, condition)
}