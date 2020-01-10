const express = require('express');
const bcrypt = require('bcryptjs');
const accountModel = require('../models/account.model');
const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');
const banModel = require('../models/baned.model')
const config = require('../config/default.json');
const router = express.Router();

router.get('/signin', function (req, res) {
    res.render('vaccount/signin.hbs');
})

router.post('/signin', async function (req, res) {
    console.log(req.body);

    const user = await accountModel.getAccountByUsername(req.body.username);

    console.log(user.passwd);

    if (user === null) {
        return res.render('vaccount/signin', {
            err_message: 'Invalid username or password.'
        });
    }

    const rs = bcrypt.compareSync(req.body.password, user.passwd);
    if (rs === false) {
        return res.render('vaccount/signin', {
            err_message: 'Wrong username or password.'
        });
    }

    delete user.passwd;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    const url = req.query.retUrl || '/';
    res.redirect(url);
})

router.get('/signup', function (req, res) {
    res.render('vaccount/signup.hbs');
})

router.post('/signup', async function (req, res) {
    const hash_pwd = bcrypt.hashSync(req.body.passwd);
    const entity = {
        account_id: 0,
        role_id: 1,
        uname: req.body.uname,
        passwd: hash_pwd,
        fullname: req.body.fullname,
        address: req.body.address,
        email: req.body.email,
        upvote: 0,
        downvote: 0
    }
    const ret = await accountModel.addAccount(entity);
    res.render('/');
})

router.post('/signout', async function (req, res) {
    // console.log("/account/signout");
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
})

router.get('/watchlist', async function(req, res) {
    if (req.session.isAuthenticated === false) {
        res.redirect("/account/signin");
        return;
    }

    const result = await accountModel.watchlistDetails(req.session.authUser.account_id);

    // console.log(result)

    res.render('vaccount/watchlist.hbs', {
        details: result,
        isEmpty: result.length === 0
    });
})

router.get('/is-available', async function(req, res) {
    const user = accountModel.getAccountByUsername(req.query.uname);
    if (!user)
    return true;
    const userEmail = accountModel.getEmailByUsername(req.query.uname);
    if (!email)
    return true;
    return false;
})

router.post('/watchlist/add', async function(req, res) {
    // console.log(req.body);
    accountModel.watchlistAdd({
        account_id: req.session.authUser.account_id,
        product_id: req.body.product_id
    });
    res.redirect(req.headers.referer);
})

router.post('/watchlist/remove', async function(req, res) {
    // console.log(req.body);
    accountModel.watchlistRemove({
        account_id: req.session.authUser.account_id,
        product_id: req.body.product_id
    });
    res.redirect(req.headers.referer);
})

router.get('/profile', async function(req, res) {
    if (req.session.isAuthenticated === false) {
        res.redirect('/');
        return;
    }

    const user = req.session.authUser;

    console.log(user);

    if (user.role_id === 1) {
        res.render('vaccount/bidder.hbs');
        return;
    }

    if (user.role_id === 2) {
        const products = await productModel.getProductbySeller(user.account_id);
        const categories = await categoryModel.getAllCategories();
        const wonProducts = await productModel.getWonProduct();

        res.render('vaccount/seller.hbs', {
            products: wonProducts,
            categories: categories,
            isEmpty: products.length === 0,
            isSeller: user.role_id === 2
        });
        return;
    }

    res.render('vaccount/admin.hbs', {

    });
})

module.exports = router;