const express = require('express')
const router = express.Router()

router.get('/watchlist', function(req, res) {
    res.render('vw-product/watchlist.hbs')
})