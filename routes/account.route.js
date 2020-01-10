const express = require('express');
const bcrypt = require('bcryptjs');
const accountModel = require('../models/account.model');
const config = require('../config/default.json');
const router = express.Router();

router.post('/vote/:flag', function(req, res) {
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

router.get('/vote-history/:id', async function(req, res) {
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

router.post('/request', async function(req, res) {
    await accountModel.requestSeller(req.session.authUser.account_id);
    req.session.wasRequested = true;
    res.redirect(req.headers.referer);
})

router.get('/vote', async function(req, res) {
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
    res.render('vaccount/signin');
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
    const passwd = req.body.passwd;
    req.body.account_id = 0;
    req.body.role_id = 1;
    req.body.passwd = bcrypt.hashSync(passwd, config.authentication.saltRounds);
    // console.log(req.body.passwd);
    accountModel.addAccount(req.body);
    res.render('vaccount/signup.hbs');
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

router.get('/watchlist', async function(req, res) {
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

router.get('/bidding', async function(req, res) {
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

router.get('/won', async function(req, res) {
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

router.post('/watchlist/add', async function(req, res) {  
    if (req.session.isAuthenticated === false &&
        req.session.isBidder === false) {
        
        res.redirect("/account/signin");
        return;
    }

    accountModel.watchlistAdd({
        account_id: req.session.authUser.account_id,
        product_id: req.body.product_id
    });
    res.redirect(req.headers.referer);
})

router.post('/watchlist/remove', async function(req, res) {
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

router.get('/profile', async function(req, res) {
    if (req.session.isAuthenticated === false) {
        res.redirect('/');
        return;
    }

    const user = req.session.authUser;

    console.log(req.session.wasRequested);

    if (user.role_id === 1) {
        res.render('vaccount/bidder.hbs', {
            user: user,
            wasRequested: req.session.wasRequested,
        });
        return;
    }

    if (user.role_id === 2) {
        res.render('vaccount/seller.hbs', {

        });
        return;
    }
});

router.post("/profile", async function(req, res) {
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

    req.session.authUser.fullname = entity.fullname;

    res.redirect(req.headers.referer);
})

module.exports = router;