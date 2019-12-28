const db = require("../utils/db");

module.exports = {
    getProduct: id => db.load(`
        SELECT p.*, a.fullname AS bidder_name 
        FROM af_product p
        JOIN af_account a ON a.account_id = p.owner_id
        WHERE p.product_id = ${id}
    `),
    getProductsByCat: cat_id => db.load(`SELECT * FROM af_product WHERE category_id = ${id}`),
    getAllProducts: _ => db.load(`
        SELECT p.*, a.fullname AS bidder_name 
        FROM af_product p 
        JOIN af_account a ON a.account_id = p.owner_id`),
    addProduct: entity => db.insert(entity, 'af_product'),
}