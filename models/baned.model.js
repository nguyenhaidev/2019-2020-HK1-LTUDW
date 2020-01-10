const db = require("../utils/db");

module.exports = {
    getBanedbyProductID: pro_id=> db.load(`
        SELECT *
        FROM af_ban b
        WHERE b.account_id = ${pro_id}
    `),

    BanedAcc: (account_id, product_id) => db.callPro(`sp_ban_bidder(${product_id} , ${account_id})`)
}