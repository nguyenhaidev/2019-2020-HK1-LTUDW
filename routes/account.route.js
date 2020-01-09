const express = require('express');
const bcrypt = require('bcryptjs');
const accountModel = require('../models/account.model');
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
    
})

router.post('/signout', async function (req, res) {
    console.log("/account/signout");
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
})

router.get('/watchlist', async function(req, res) {
    const result = await accountModel.watchlistDetails(1)
    console.log(result)
    res.render('vaccount/watchlist.hbs', {
        details: result
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

module.exports = router;