const express = require('express');
const catModel = require('../models/category.model');
const productModel = require('../models/product.model');
const config = require('../config/default.json');
const router = express.Router();

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

router.get('/edit/:catId', async function(req, res) {
    const category = await catModel.getCategory(req.params.catId);
    if (category === null) {
        return;
    }
    console.log(category);
    res.render('vcategory/edit', {
        category: category[0]
    });
})

router.post('/update', async function(req, res) {
    console.log(req.body);
    const rs = await catModel.updateCategory(req.body.catId, req.body.catTitle);
    res.redirect('/account/profile');
})

router.post('/delete/:catId', async function(req, res) {
    const rs = await catModel.delCategory(req.params.catId);
    console.log('asd');
    res.redirect('/account/profile');
})

router.post('/add', async function(req, res) {
    await catModel.addCategory({
        category_id: 0,
        category_title: req.body.title
    });
    res.redirect('/account/profile');
})

module.exports = router;