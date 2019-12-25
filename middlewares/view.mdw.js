
modules.exports = function(app) {
    app.engine('hbs', exphbs({
        defaultLayout: 'main.hbs'
    }));
    app.set('view engine', 'hbs');

    app.use(function (req, res) {
        res.render('404', {
            layout: false
        });
    })
}
