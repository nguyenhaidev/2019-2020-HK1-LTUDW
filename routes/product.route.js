const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const catModel = require('../models/category.model');

console.log("routes/product.route");

router.get('/:id', async function(req, res) {
    const prows = await productModel.getProduct(req.params.id);
    const crows = await catModel.getCategory(prows[0].category_id);
    const history = await productModel.getHistory(req.params.id);
    
    if (prows[0].won_bidder != null) {
        res.render('vproduct/finish.hbs');
        return;
    }

    res.render('vproduct/detail.hbs', {
        product: prows[0],
        category: crows[0],
        history: history
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