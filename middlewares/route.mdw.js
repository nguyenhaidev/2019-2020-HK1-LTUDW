const productModel = require('../models/product.model');
const accountModel = require('../models/account.model');

console.log('middlewares/route.mdw')

module.exports = function (app) {

    app.get('/', async function (req, res) {
        const rows = await productModel.getMostOffersCount();
        const highestRows = await productModel.getMostHighestPrice();
        const endingSoon = await productModel.getEndingSoon();
        res.render('home.hbs', {
            mostOfferProducts: rows,
            mostHighestPrice: highestRows,
            endingSoon: endingSoon,
            empty: rows.length === 0
        });
    });

    app.use('/product', require('../routes/product.route'));
    app.use('/account', require('../routes/account.route'));
    app.use('/category', require('../routes/category.route'));
}