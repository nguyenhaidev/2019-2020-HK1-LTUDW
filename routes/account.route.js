const express = require('express');
const bcrypt = require('bcryptjs');
const accountModel = require('../models/account.model');
const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');
const banModel = require('../models/baned.model')
const config = require('../config/default.json');
const router = express.Router();
const catModel = require('../models/category.model');

router.post('/vote/:flag', function (req, res) {
    const owner_id = req.session.authUser.account_id;
    const account_id = req.body.account_id;

    console.log(account_id);

    if (req.params.flag === 'up') {
        accountModel.upVote(owner_id, account_id);
    } else {
        accountModel.downVote(owner_id, account_id);
    }

    res.redirect(req.headers.referer);
})

router.get('/vote-history/:id', async function (req, res) {
    const vote_rate = await accountModel.voteRate(req.params.id);
    const details = await accountModel.voteHistory(req.params.id);
    for (const c of details) {
        c.is_up_vote = (c.vote_point === 1);
    }

    res.render('vaccount/vote_history.hbs', {
        vote_rate: vote_rate[0].vote_rate,
        details: details
    })
})

router.post('/request', async function (req, res) {
    await accountModel.requestSeller(req.session.authUser.account_id);
    req.session.wasRequested = true;
    res.redirect(req.headers.referer);
})

router.get('/vote', async function (req, res) {
    const vote_rate = await accountModel.voteRate(req.session.authUser.account_id);
    const details = await accountModel.voteHistory(req.session.authUser.account_id);
    for (const c of details) {
        c.is_up_vote = (c.vote_point === 1);
    }

    res.render('vaccount/vote_history.hbs', {
        vote_rate: vote_rate[0].vote_rate,
        details: details
    })
})

router.get('/signin', function (req, res) {
    res.render('vaccount/signin.hbs');
})

router.post('/signin', async function (req, res) {
    const user = await accountModel.getAccountByUsername(req.body.username);
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

    const voteRate = await accountModel.voteRate(user.account_id);

    delete user.passwd;
    req.session.isAuthenticated = true;
    req.session.authUser = user;
    req.session.isBidder = user.role_id === 1;
    req.session.isSeller = user.role_id === 2;
    req.session.isAdmin = user.role_id === 3;
    req.session.voteRate = voteRate[0].vote_rate;

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
    res.redirect('/');
})

router.post('/signout', async function (req, res) {
    // console.log("/account/signout");
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    req.session.isBidder = false;
    req.session.isSeller = false;
    req.session.isAdmin = false;
    res.redirect(req.headers.referer);
})

router.get('/watchlist', async function (req, res) {
    if (req.session.isAuthenticated === false &&
        req.session.isBidder === false) {
        res.redirect("/account/signin");
        return;
    }

    const result = await accountModel.watchlistDetails(req.session.authUser.account_id);

    res.render('vaccount/watchlist.hbs', {
        details: result,
        isEmpty: result.length === 0
    });
})

router.get('/bidding', async function (req, res) {
    if (req.session.isAuthenticated === false &&
        req.session.isBidder === false) {
        res.redirect("/account/signin");
        return;
    }

    const result = await accountModel.biddingProducts(req.session.authUser.account_id);

    res.render('vaccount/wonlist.hbs', {
        details: result[1],
        isEmpty: result[1].length === 0,
        text: "Sản phẩm đang đấu giá"
    });
})

router.get('/won', async function (req, res) {
    if (req.session.isAuthenticated === false &&
        req.session.isBidder === false) {
        res.redirect("/account/signin");
        return;
    }

    const result = await accountModel.wonProducts(req.session.authUser.account_id);

    res.render('vaccount/wonlist.hbs', {
        details: result,
        isEmpty: result.length === 0,
        text: "Sản phẩm thắng cuộc"
    });
})

router.post('/watchlist/add', async function (req, res) {
    if (req.session.isAuthenticated === false &&
        req.session.isBidder === false) {

        res.redirect("/account/signin");
        return;
    }
});

router.get('/uname-is-available', async function (req, res) {
    const user = await accountModel.getAccountByUsername(req.query.uname);
    if (!user)
        return res.json(true);
    return res.json(false);
})

router.get('/email-is-available', async function (req, res) {
    const email = await accountModel.getEmailByUsername(req.query.email);
    if (!email)
        return res.json(true);
    return res.json(false);
})

router.post('/watchlist/add', async function (req, res) {
    // console.log(req.body);
    accountModel.watchlistAdd({
        account_id: req.session.authUser.account_id,
        product_id: req.body.product_id
    });
    res.redirect(req.headers.referer);
})

router.post('/watchlist/remove', async function (req, res) {
    if (req.session.isAuthenticated === false &&
        req.session.isBidder === false) {

        res.redirect("/account/signin");
        return;
    }

    accountModel.watchlistRemove({
        account_id: req.session.authUser.account_id,
        product_id: req.body.product_id
    });
    res.redirect(req.headers.referer);
})

router.get('/profile', async function (req, res) {
    if (req.session.isAuthenticated === false) {
        res.redirect('/');
        return;
    }

    const user = req.session.authUser;

    //console.log(user);

    if (user.role_id === 1) {
        res.render('vaccount/bidder.hbs', {
            user: user,
            wasRequested: req.session.wasRequested,
        });
        return;
    }

    if (user.role_id === 2) {
        const products = await productModel.getProductbySeller(user.account_id);
        const categories = await categoryModel.getAllCategories();
        const wonProducts = await productModel.getWonProduct();
        const wonAccount = await accountModel.getAccountBySeller(user.account_id)

        res.render('vaccount/seller.hbs', {
            products: products,
            wonAccount: wonAccount,
            categories: categories,
            isEmpty: products.length === 0,
            isSeller: user.role_id === 2
        });
        return;
    }
});

router.post("/profile", async function (req, res) {
    const entity = {
        account_id: req.session.authUser.account_id,
        fullname: req.body.fullname
    };

    if ("wantChangePassword" in req.body) {
        entity.passwd = bcrypt.hashSync(req.body.password, config.authentication.saltRounds);
    }

    await accountModel.updateProfile(entity, {
        account_id: req.session.authUser.account_id
    });

    const rows = await accountModel.sellerRequests();
    const categories = await catModel.getAllCategories();
    const users = await accountModel.getAllUsers();

    res.render('vaccount/admin.hbs', {
        sellerRequests: rows,
        categories: categories,
        getAllUsers: users,
    });

    req.session.authUser.fullname = entity.fullname;

    res.redirect(req.headers.referer);
});

module.exports = router;