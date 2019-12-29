const express = require('express');
const app = express();

require('express-async-errors');

app.use('/public', express.static('public'));

require('./middlewares/view.mdw')(app);
require('./middlewares/local.mdw')(app);
require('./middlewares/route.mdw')(app);

app.use(function (req, res) {
    res.render('404.hbs', {
        layout: false
    });
})

app.use(function (err, req, res, next) {
    console.log(err);
    res.send('error');
})

const PORT = 8080;
app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
})