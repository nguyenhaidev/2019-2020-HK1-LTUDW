const model = require('../models/product.model');

console.log('middlewares/route.mdw')

module.exports = function (app) {
    app.get('/', async function (req, res) {
        const rows = await model.getAllProducts();
        // console.log(rows);
        res.render('home.hbs', {
            products: rows,
            empty: rows.length === 0
        });
    });

    app.use('/product', require('../routes/product.route'));
}