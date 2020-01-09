const express = require('express');
const catModel = require('../models/category.model');
const productModel = require('../models/product.model');
const config = require('../config/default.json');
const router = express.Router();

console.log('routes/category.route');

router.get('/:id', async function (req, res) {
    const products = await productModel.getProductsByCat(req.params.id);
    const categories = await catModel.getAllCategories();
    // console.log(products)
    res.render('vproduct/common.hbs', {
        products: products,
        categories: categories,
        isEmpty: products.length === 0
    });
})
module.exports = router;