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
    } ,
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
        WHERE account_id = ${id}`)

}