const model = require('../models/product.model');
const accModel = require('../models/account.model');

console.log('middlewares/route.mdw')

module.exports = function (app) {

    app.get('/', async function (req, res) {
        const rows = await model.getAllProducts();

        const entity = {
            account_id: 0,
            role_id: 1,
            uname: 'haiduoi',
            passwd: 'haiduoi',
            fullname: '123',
            address: 'Vo gia cu',
            email: 'khong oc email',
            upvote: 0,
            downvote: 0
        };
        
        accModel.addAccount(entity);

        // console.log(rows);
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