const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
require('express-async-errors');

const app = express();
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs'
}));

app.use(express.static(path.join(__dirname, "/public")));

app.set('view engine', 'hbs');

app.get('/', function(req, res) {
    res.render('home')
});

app.get('/signin', function(req, res) {
    res.render('v-account/signin')
});

app.get('/products', function(req, res) {
    res.render('v-product/product')
})

app.get('/product/1', function(req, res) {
    res.render('v-product/product-details')
})

app.get('/signup', function(req, res) {
    res.render('v-account/signup')
});

app.get('/watchlist', function(req, res) {
    res.render('v-product/watchlist')
})

app.use(function (req, res) {
    res.render('404', {
        layout: false
    });
})

const PORT = 8080;
app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
})