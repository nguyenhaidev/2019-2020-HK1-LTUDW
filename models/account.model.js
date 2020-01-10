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
    updateProfile: entity => {
        const condition = { account_id: entity.account_id };
        delete entity.account_id;
        return db.updateEx(entity, `account_id = ${condition.account_id}`, 'af_account');
    },
    upVote: (owner_id, account_id) => db.callPro(`sp_up_vote(${owner_id}, ${account_id})`),
    downVote: (owner_id, account_id) => db.callPro(`sp_down_vote(${owner_id}, ${account_id})`),
    voteHistory: (account_id) => db.load(`
        SELECT ac.fullname, vt.* FROM af_vote vt
        JOIN af_account ac ON ac.account_id = vt.owner_id
        WHERE vt.account_id = ${account_id}`),
    voteRate: (account_id) => db.load(`
        SELECT GREATEST(upvote, 1) / (GREATEST(upvote, 1) + downvote)
            AS vote_rate
        FROM af_account
        WHERE account_id = ${account_id}`),
    watchlistDetails: id => db.load(`
        SELECT ap.*, ac.fullname 
        FROM af_watchlist aw
        JOIN af_product ap ON ap.product_id = aw.product_id
        JOIN af_account ac ON ac.account_id = aw.account_id
        WHERE aw.account_id = ${id}`),
    watchlistAdd: entity => db.insert(entity, 'af_watchlist'),
    watchlistRemove: entity => db.deleteEx(`product_id = ${entity.product_id} AND account_id = ${entity.account_id}`, 'af_watchlist'),
    biddingProducts: id => db.callPro(`sp_bidding_products(${id})`),
    wonProducts: id => db.load(`
        SELECT ap.*, ac.fullname 
        FROM af_product ap
        JOIN af_account ac ON ac.account_id = ${id}
        WHERE ap.won_bidder = ${id}`),
    requestSeller: id => db.callPro(`sp_new_request(${id})`),
    getAllUsers: _ => db.load(`
        SELECT *
        FROM af_account`)
}