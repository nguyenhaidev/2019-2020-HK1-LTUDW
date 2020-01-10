const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const catModel = require('../models/category.model');

console.log("routes/product.route");

router.post('/search', async function(req, res) {
    const products = await productModel.searchProduct(req.body.searchKeyword);
    const categories = await catModel.getAllCategories();
    res.render('vproduct/common.hbs', {
        products: products[0],
        categories: categories,
        isEmpty: products[0].length === 0
    });
})

router.get('/:id', async function(req, res) {
    const prows = await productModel.getProduct(req.params.id);
    const crows = await catModel.getCategory(prows[0].category_id);
    const history = await productModel.getHistory(req.params.id, 0);

    if (prows[0].won_bidder != null) {
        res.render('vproduct/finish.hbs');
        return;
    }

    res.render('vproduct/detail.hbs', {
        product: prows[0],
        category: crows[0],
        history: history[0]
    });
});

router.post('/add', async function(req, res) {
    console.log(req.body)

    const entity = {
        account_id: 1,
        product_id: req.body.product_id,
        price: req.body.price
    };

    await productModel.addHistory(entity);
    res.redirect(`/product/${req.body.product_id}`)
})

router.post('/purchase', async function(req, res) {
    console.log(req.body)

    const entity = {
        account_id: 1,
        product_id: req.body.product_id
    };
    await productModel.purchase(entity);
    res.redirect(`/product/${req.body.product_id}`)
})

module.exports = router;