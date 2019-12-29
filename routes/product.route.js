const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const catModel = require('../models/category.model');

console.log("routes/product.route");

router.get('/:id', async function(req, res) {
    const prows = await productModel.getProduct(req.params.id);
    const crows = await catModel.getCategory(prows[0].category_id);
    const history = await productModel.getHistory(req.params.id);
    // console.log(history)
    res.render('vproduct/detail.hbs', {
        product: prows[0],
        category: crows[0],
        history: history
    });
});

router.post('/:id', async function(req, res) {
    // console.log(req.params)
    // console.log(req.body)

    const entity = {
        account_id: 1,
        product_id: 1,
        price: req.body.price
    };

    const rs = await productModel.addHistory(entity);
    res.redirect(`/product/${req.params.id}`)
})

module.exports = router;