const db = require('../utils/db');
const config = require('../config/default.json');

module.exports = {
    all: _ => db.load("SELECT * FROM af_category")
}