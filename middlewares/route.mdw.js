const model = require('../models/product.model');

console.log('middlewares/route.mdw')

module.exports = function (app) {

    app.get('/', async function (req, res) {
        const rows = await model.getAllProducts();
        res.render('home.hbs', {
            products: rows,
            empty: rows.length === 0
        });
    });

    app.get('/signin', function(req, res) {
        res.render('vaccount/signin.hbs');
    });

    app.get('/signup', function(req, res) {
        res.render('vaccount/signup.hbs');
    })

    app.use('/product', require('../routes/product.route'));
}