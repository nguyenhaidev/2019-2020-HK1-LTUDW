const db = require("../utils/db");

module.exports = {
    getProduct: id => db.load(`
        SELECT p.*, a.fullname AS bidder_name 
        FROM af_product p
        JOIN af_account a ON a.account_id = p.owner_id
        WHERE p.product_id = ${id}
    `),
    getProductsByCat: cat_id => db.load(`
        SELECT p.*, 
        a.fullname AS bidder_name, 
        COUNT(1) AS offer_count
        FROM af_product p 
        JOIN af_account a ON a.account_id = p.owner_id
        LEFT JOIN af_history h ON h.product_id = p.product_id
        WHERE category_id = ${cat_id}
        GROUP BY p.product_id
        LIMIT 10`),
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
    getMostOffersCount: _ => db.load(`
        SELECT p.*, 
        a.fullname AS bidder_name, 
        COUNT(1) AS offer_count
        FROM af_product p 
        JOIN af_account a ON a.account_id = p.owner_id
        LEFT JOIN af_history h ON h.product_id = p.product_id
        GROUP BY p.product_id
        ORDER BY COUNT(1) DESC
        LIMIT 5`),
    getMostHighestPrice: _ => db.load(`
        SELECT p.*, 
        a.fullname AS bidder_name, 
        COUNT(1) AS offer_count
        FROM af_product p 
        JOIN af_account a ON a.account_id = p.owner_id
        LEFT JOIN af_history h ON h.product_id = p.product_id
        GROUP BY p.product_id
        ORDER BY p.highest_price DESC
        LIMIT 5`),
    getEndingSoon: _ => db.load(`
        SELECT p.*, 
        a.fullname AS bidder_name, 
        COUNT(1) AS offer_count
        FROM af_product p 
        JOIN af_account a ON a.account_id = p.owner_id
        LEFT JOIN af_history h ON h.product_id = p.product_id
        GROUP BY p.product_id
        ORDER BY p.end_date DESC
        LIMIT 5`),
    countBidders: id => db.load(`
        SELECT COUNT(1)
        FROM af_history ah
        WHERE ah.product_id = 1`),
    addHistory: e => db.callPro(`sp_bid_product(${e.product_id}, ${e.account_id}, ${e.price})`),
    purchase: e => db.callPro(`sp_purchase(${e.product_id}, ${e.account_id})`)
}