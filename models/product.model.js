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
    getHistory: id => db.load(`sp_get_history(${id})`),
    getMostOffersCount: _ => db.callPro(`sp_get_most_offer_count`),
    getMostHighestPrice: _ => db.callPro(`sp_get_most_highest_price`),
    getMostEndingSoon: _ => db.load(`sp_get_most_ending_soon`),
    countBidders: id => db.load(`sp_count_bidder`),
    addHistory: e => db.callPro(`sp_bid_product(${e.product_id}, ${e.account_id}, ${e.price})`),
    purchase: e => db.callPro(`sp_purchase(${e.product_id}, ${e.account_id})`)
}