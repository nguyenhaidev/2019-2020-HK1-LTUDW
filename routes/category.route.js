const express = require('express');
const catModel = require('../models/category.model');
const productModel = require('../models/product.model');
const config = require('../config/default.json');
const router = express.Router();

router.get('/:id', async function (req, res) {
    const cat = await catModel.getCategoryInfo(req.params.id);
    const page = +req.query.page || 1;

    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;
    const products = await productModel.getProductsByCat(req.params.id, offset);
    const nPages = Math.ceil(cat[0].total / config.pagination.limit);
    const page_items = [];

    for (i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        page_items.push(item);
    }

    res.render('vproduct/common.hbs', {
        products: products,
        categories: res.locals.categories,
        isEmpty: products.length === 0,
        page_items,
        can_go_prev: page > 1,
        can_go_next: page < nPages,
        prev_value: page - 1,
        next_value: page + 1,
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