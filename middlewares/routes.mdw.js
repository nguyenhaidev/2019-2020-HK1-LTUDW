module.exports = function(app) {
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
}