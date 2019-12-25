const mysql = require('mysql');
const util = require('util');
const pool = mysql.createPool({
    connectionLimit: 100,
    host: '25.4.97.5',
    port: 3306,
    user: 'cdth',
    password: '',
    database: 'cdth'
})

module.exports = {
    load: sql => pool_query(sql),
    insert: (entity, table) => pool_query(`INSERT INTO ${table} VALUES ?`, entity),
    delete: (condition, table) => pool_query(`DELETE FROM ${table} WHERE ?`, condition),
    update: (entity, condition, table) => pool_query(`UPDATE ${table} SET ? WHERE ?`, entity, condition)
}