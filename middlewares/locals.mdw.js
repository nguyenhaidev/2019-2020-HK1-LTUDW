const categoryModel = require('../models/category.model');

module.exports = function (app) {
  app.use(async function (req, res, next) {
    const rows = await categoryModel.all();
    res.locals.lcCategories = rows;
    next();
  })
};
