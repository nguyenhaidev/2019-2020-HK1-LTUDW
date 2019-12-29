const db = require("../utils/db");

module.exports = {
    getAccount: id => db.load(`
        SELECT * 
        FROM af_account
        WHERE account_id = ${id}`),
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