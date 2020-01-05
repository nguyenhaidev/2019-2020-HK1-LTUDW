const exphbs = require('express-handlebars');
const expsec = require('express-handlebars-sections');
const numeral = require('numeral');
const dateFormat = require('dateformat');

module.exports = function (app) {
  app.engine('hbs', exphbs({
    defaultLayout: 'default.hbs',
    sections: expsec(),
    helpers: {
      section: function (name, options) {
        if (!this._sections) {
          this._sections = {};
        }
        this._sections[name] = options.fn(this);
        return null;
      },
      formatPrice: val => `${numeral(val).format('0,0')}đ`,
      increasePrice: val => val + 1000,
      formatDate: val => dateFormat(val, "dd/mm/yyyy H:MM:ss"),
      ifCond: (v1, operator, v2, options) => {
        switch (operator) {
          case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
          case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
          case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
          case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
          case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
          case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
          case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
          case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
          case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      }
    }
  }));

  app.set('view engine', 'hbs');
};
