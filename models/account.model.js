const db = require("../utils/db");

module.exports = {
    getAccountById: id => db.load(`
        SELECT * 
        FROM af_account
        WHERE account_id = ${id}`),
    getAccountByUsername: async uname => {
        const rows = await db.load(`
            SELECT * 
            FROM af_account
            WHERE uname = '${uname}'`)

        if (rows.length === 0)
            return null;

        return rows[0];
    },
    getEmailByUsername: async uname => {
        const rows = await db.load(`
            SELECT email
            FROM af_account
            WHERE uname = '${uname}'
        `)

        if (rows.length === 0)
        return null;
        
        return rows[0];
    },
    authenticate: (uname, passwd) => db.load(`
        SELECT 1
        FROM af_account
        WHERE uname = ${uname} AND passwd = ${passwd}`),
    addAccount: entity => db.insert(entity, 'af_account'),
    upVote: id => db.load(`
        UPDATE af_account
        SET upvote = upvote + 1
        WHERE account_id = ${id}`),
    downVote: id => db.load(`
        UPDATE af_account
        SET downvote = downvote + 1
        WHERE account_id = ${id}`),
    watchlistDetails: id => db.load(`
        SELECT ap.*, ac.fullname FROM af_watchlist aw
        JOIN af_product ap ON ap.product_id = aw.product_id
        JOIN af_account ac ON ac.account_id = aw.account_id
        WHERE aw.account_id = ${id}`),
    watchlistAdd: entity => db.insert(entity, 'af_watchlist'),
    watchlistRemove: entity => db.deleteEx(`product_id = ${entity.product_id} AND account_id = ${entity.account_id}`, 'af_watchlist'),
    sellerRequests: _ => db.load(`
        SELECT sr.*, ac.fullname, ac.role_id FROM af_seller_request sr
        JOIN af_account ac ON ac.account_id = sr.account_id
        WHERE finish_flag = 0`),
    getAllUsers: _ => db.load(`
        SELECT *
        FROM af_account
        `),
    watchlistRemove: entity => db.deleteEx(`product_id = ${entity.product_id} AND account_id = ${entity.account_id}`, 'af_watchlist')
}