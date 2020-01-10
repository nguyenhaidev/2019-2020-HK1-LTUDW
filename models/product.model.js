const db = require("../utils/db");

module.exports = {
    getWonProduct: _ => db.load(`
        SELECT p.*
        FROM af_product p
        WHERE p.won_bidder != NULL
    `),

    getProductbySeller: user_id =>db.load(`
        SELECT p.*
        FROM af_product p
        WHERE p.owner_id = ${user_id}
    `),

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
    getHistory: (id, offset) => db.callPro(`sp_get_history(${id}, ${offset})`),
    getMostOffersCount: _ => db.callPro(`sp_get_most_offer_count`),
    getMostHighestPrice: _ => db.callPro(`sp_get_most_highest_price`),
    getMostEndingSoon: _ => db.callPro(`sp_get_most_ending_soon`),
    countBidders: id => db.callPro(`sp_count_bidder(${id})`),
    addHistory: e => db.callPro(`sp_bid_product(${e.product_id}, ${e.account_id}, ${e.price})`),
    purchase: e => db.callPro(`sp_purchase(${e.product_id}, ${e.account_id})`),
    searchProduct: str => db.callPro(`sp_search_product('${str}', 0, 0)`)
}