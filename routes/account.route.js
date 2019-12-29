const express = require('express');
const bcrypt = require('bcryptjs');

const accountModel = require('../models/account.model');
const config = require('../config/default.json');

const router = express.Router();

router.get('/signin', async function(req, res) {
    res.render('vaccount/signin', {
        layout: false
    });
})

router.post('/signin', async function(req, res) {
    console.log(req.body);

    const user = await accountModel.getAccountByUsername(req.body.username);
    if (user == null) {
        return res.render('vaccount/signin', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    }

    const rs = bcrypt.compareSync(req.body.password, user.passwd);
    if (rs === false) {
        return res.render('/signin', {
            layout: false,
            err_message: 'Invalid username or password.'
        });
    }

    delete user.password_hash;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    const url = req.query.retUrl || '/';
    res.redirect(url);
})

router.post('/logout', async function(req, res) {
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
})

// const restrict = require('../middlewares/auth.mdw');
// router.get('/profile', restrict, async function (req, res) {
//   res.render('vwAccount/profile');
// })

module.exports = router;