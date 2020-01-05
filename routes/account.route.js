const express = require('express');
const router = express.Router();

console.log("/routes/account.route");

router.get('/signin', function(req, res) {
    res.render('vaccount/signin.hbs');
});

router.get('/signup', function(req, res) {
    res.render('vaccount/signup.hbs');
});

module.exports = router;