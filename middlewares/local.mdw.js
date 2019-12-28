const catModel = require('../models/category.model');

module.exports = function(app) {
    app.use(async function(req, res, next) {
        const rows = await catModel.getAllCategories();
        res.locals.categories = rows;
        next();
    })
}