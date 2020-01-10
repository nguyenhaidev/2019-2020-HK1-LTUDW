const catModel = require('../models/category.model');

module.exports = function(app) {
    app.use(async function(req, res, next) {
        if (req.session.isAuthenticated === null) {
            req.session.isAuthenticated = false;
          }
      
          res.locals.isAuthenticated = req.session.isAuthenticated;
          res.locals.authUser = req.session.authUser;
          res.locals.isBidder = req.session.isBidder;
          res.locals.isAdmin = req.session.isAdmin;
          res.locals.isSeller = req.session.isSeller;
          res.locals.voteRate = req.session.voteRate;
          res.locals.previousKeyword = req.session.previousKeyword;
        next();
    })
    app.use(async function(req, res, next) {
        const rows = await catModel.getAllCategories();
        res.locals.categories = rows;
        next();
    })
}