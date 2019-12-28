const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const catModel = require('../models/category.model');

console.log("routes/product.route");

router.get('/:id', async function(req, res) {
    const prows = await productModel.getProduct(req.params.id);
    const crows = await catModel.getCategory(prows[0].category_id);
    res.render('vproduct/detail.hbs', {
        product: prows[0],
        category: crows[0]
    });
});

module.exports = router;