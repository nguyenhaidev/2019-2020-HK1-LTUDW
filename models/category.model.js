db = require('../utils/db');

module.exports = {
    getAllCategories: _ => db.load(`SELECT * FROM af_category`),
    getCategory: id => db.load(`SELECT * FROM af_category WHERE category_id = ${id}`),
    getCategoryInfo: id => db.load(`
        SELECT c.*, COUNT(1) as total FROM af_category c
        JOIN af_product p ON p.category_id = c.category_id
        WHERE c.category_id = ${id}`),
    addCategory: entity => db.insert(entity, `af_category`), 
    delCategory: id => db.delete({category_id: id}, 'af_category')
}