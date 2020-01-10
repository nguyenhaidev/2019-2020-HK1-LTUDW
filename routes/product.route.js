const express = require('express');
const router = express.Router();
const productModel = require('../models/product.model');
const catModel = require('../models/category.model');
const config = require('../config/default.json');
const moment = require('moment');
const mailModel = require('../models/mail.model');

console.log("routes/product.route");

router.get('/:id', async function (req, res) {
    const prows = await productModel.getProduct(req.params.id);
    const crows = await catModel.getCategory(prows[0].category_id);
    const history = await productModel.getHistory(req.params.id, 0);
    const start_date = moment(prows[0].start_date);

    // if (prows[0].won_bidder != null || 
    //     diff > 0) {
    //     res.render('vproduct/finish.hbs');
    //     return;
    // }

    res.render('vproduct/detail.hbs', {
        product: prows[0],
        category: crows[0],
        history: history[0],
        wasPurchased: prows[0].won_bidder != null,
        isAuthenticated: req.session.isAuthenticated
    });
});

router.post('/search', async function (req, res) {
    const count = await productModel.getSearchResultCount(req.body.searchKeyword);
    const page = +req.query.page || 1;

    if (page < 0) page = 1;
    const offset = (page - 1) * config.pagination.limit;
    const nPages = Math.ceil(count[0].offer_count / config.pagination.limit);
    const page_items = [];

    for (i = 1; i <= nPages; i++) {
        const item = {
            value: i,
            isActive: i === page
        }
        page_items.push(item);
    }

    req.session.previousKeyword = req.body.searchKeyword;

    const products = await productModel.searchProduct(req.body.searchKeyword, offset);
    const categories = await catModel.getAllCategories();

    res.render('vproduct/common.hbs', {
        products: products[0],
        categories: categories,
        isEmpty: products[0].length === 0,
        page_items,
        can_go_prev: page > 1,
        can_go_next: page < nPages,
        prev_value: page - 1,
        next_value: page + 1,
    });
})

router.post('/add', async function (req, res) {
    if (req.session.isAuthenticated === false) {
        res.redirect(`/product/${req.body.product_id}`);
        return;
    }

    const entity = {
        account_id: req.session.authUser.account_id,
        product_id: req.body.product_id,
        price: req.body.price
    };

    await productModel.addHistory(entity);
    res.redirect(`/product/${req.body.product_id}`);

    const product = await productModel.getProduct(req.body.product_id);
    console.log(product);
    const receiver = await mailModel.createReceiverInfo(
        req.session.authUser.email,
        "CTDH ONLINE AUTION FLOOR / Successfully bidded",
        "You have bidded " + product[0].product_name + " for " + req.body.price
        );
    await mailModel.sendMail(receiver);
})

router.post('/purchase', async function (req, res) {
    // console.log(req.body)

    const entity = {
        account_id: req.session.authUser.account_id,
        product_id: req.body.product_id
    };
    await productModel.purchase(entity);
    res.redirect(`/product/${req.body.product_id}`);

    const product = await productModel.getProduct(req.body.product_id);
    console.log(product);
    const receiver = await mailModel.createReceiverInfo(
        req.session.authUser.email,
        "CTDH ONLINE AUTION FLOOR / Pruchase successfully",
        "Thanks for purchase " + product.product_name
        );
    await mailModel.sendMail(receiver);
})

module.exports = router;