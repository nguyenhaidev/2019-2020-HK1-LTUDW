const db = require("../utils/db");

module.exports = {
    getAccountBySeller: id => db.load(`
        SELECT a.*
        FROM af_product p, af_account a
        WHERE p.owner_id = ${id} AND p.won_bidder = a.account_id
    `),

    getAccountById: id => db.load(`
        SELECT * 
        FROM af_account
        WHERE account_id = ${id}`),
    getAccountByUsername: uname => db.load(`
        SELECT * 
        FROM af_account
        WHERE uname = ${uname}`),
    addAccount: entity => db.insert(entity, 'af_account'),
    upVote: id => db.load(`
        UPDATE af_account
        SET upvote = upvote + 1
        WHERE account_id = ${id}`),
    downVote: id => db.load(`
        UPDATE af_account
        SET downvote = downvote + 1
        WHERE account_id = ${id}`)

}