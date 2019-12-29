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
    getHistory: id => db.load(`
        SELECT acc.fullname, his.price, his.creation_date
        FROM af_history his
        JOIN  af_account acc ON acc.account_id = his.account_id
        WHERE his.product_id = ${id}
        ORDER BY price DESC
        LIMIT 10`),
    addHistory: e => db.callPro(`sp_bid_product(${e.product_id}, ${e.account_id}, ${e.price})`)

}