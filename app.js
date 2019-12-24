const express = require('express');
const mysql = require('mysql')
const exphbs = require('express-handlebars');

require('express-async-errors');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'auction',
    password: 'auction',
    database: 'auction'
})

connection.connect();
connection.end();

const app = express();
app.engine('hbs', exphbs({
    defaultLayout: 'main.hbs'
}));

app.use('/public', express.static('public'));

app.set('view engine', 'hbs');

app.use(function (req, res) {
    res.render('404', {
        layout: false
    });
})

const PORT = 8080;
app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
})