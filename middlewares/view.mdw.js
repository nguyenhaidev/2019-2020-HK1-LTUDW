const exphbs = require('express-handlebars');
const expsec = require('express-handlebars-sections');
const numeral = require('numeral');
const dateFormat = require('dateformat');

module.exports = function (app) {
  app.engine('hbs', exphbs({
    defaultLayout: 'default.hbs',
    sections: expsec(),
    helpers: {
      formatPrice: val => `${numeral(val).format('0,0')}đ`,
      increasePrice: val => val + 1000,
      formatDate: val => dateFormat(val, "dd/mm/yyyy H:MM:ss")
    }
  }));
  
  app.set('view engine', 'hbs');
};
