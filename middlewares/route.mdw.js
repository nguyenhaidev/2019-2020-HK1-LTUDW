const productModel = require('../models/product.model');
const accountModel = require('../models/account.model');

console.log('middlewares/route.mdw')

module.exports = function (app) {

    app.get('/', async function (req, res) {
        const offerCount  = await productModel.getMostOffersCount();
        const highestPrice = await productModel.getMostHighestPrice();
        const endingSoon = await productModel.getMostEndingSoon();
        res.render('home.hbs', {
            mostOfferProducts: offerCount[0],
            mostHighestPrice: highestPrice[0],
            endingSoon: endingSoon[0],
            empty: offerCount.length === 0
        });
    });

    app.use('/product', require('../routes/product.route'));
    app.use('/account', require('../routes/account.route'));
    app.use('/category', require('../routes/category.route'));
}