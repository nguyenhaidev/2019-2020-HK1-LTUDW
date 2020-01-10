const catModel = require('../models/category.model');

module.exports = function(app) {
    app.use(async function(req, res, next) {
        if (req.session.isAuthenticated === null) {
            req.session.isAuthenticated = false;
          }
      
          res.locals.isAuthenticated = req.session.isAuthenticated;
          res.locals.authUser = req.session.authUser;
        next();
    })
    app.use(async function(req, res, next) {
        const rows = await catModel.getAllCategories();
        res.locals.categories = rows;
        next();
    })
}