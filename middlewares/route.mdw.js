const productModel = require('../models/product.model');
const accountModel = require('../models/account.model');

console.log('middlewares/route.mdw')

module.exports = function (app) {

    app.get('/', async function (req, res) {
        const rows = await productModel.getAllProducts();
        res.render('home.hbs', {
            products: rows,
            empty: rows.length === 0
        });
    });

    app.use('/product', require('../routes/product.route'));
    app.use('/account', require('../routes/account.route'));
}