const express = require('express');
const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const config = require('../config/default.json');
const router = express.Router();

console.log('routes/category.route');

router.get('/:id', async function (req, res) {
    const result = await productModel.getProductsByCat(req.params.id);
    const category = await categoryModel.getCategory(req.params.id);
    res.render('vcategory/products.hbs', {
        products: result,
        category: category[0],
        isEmpty: result.length === 0
    })
})
module.exports = router;