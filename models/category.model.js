db = require('../utils/db');

module.exports = {
    getAllCategories: _ => db.load(`SELECT * FROM af_category`),
    getCategory: id => db.load(`SELECT * FROM af_category WHERE category_id = ${id}`),
    addCategory: entity => db.insert(entity, `af_category`), 
    delCategory: id => db.delete({category_id: id}, 'af_category')
}