const exphbs = require('express-handlebars');
const expsec = require('express-handlebars-sections');
const numeral = require('numeral');
const dateFormat = require('dateformat');
const moment = require('moment');
const maskdata = require('maskdata');
const parser = require('parse-full-name');

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
            maskData: val => {
                const data = parser.parseFullName(val);
                const options = {
                    maskWith: "*",
                    fields: ['first', 'middle']
                };
                const newData = maskdata.maskJSONFields(data, options);
                // console.log(newData);
                return newData.first + ' ' + newData.middle + ' ' + newData.last;
            },
            formatPrice: val => `${numeral(val).format('0,0')}đ`,
            increasePrice: val => val + 1000,
            formatDate: val => dateFormat(val, "dd/mm/yyyy H:MM:ss"),
            formatAccountType: val => {
                arr = ['Bidder', 'Seller', 'Administrator'];
                return arr[val - 1];
            },
            formatPercent: val => `${val * 100}%`,
            formatEndDate: (wonbidder, val) => {
                const time = moment(val);
                const current = moment();
                const diff = time.diff(current) / 1000;
                const result = moment(diff);

                // console.log(time.format());
                // console.log(diff);

                if (diff < 0) {
                    return 'Đã hết phiên đấu giá!';
                }

                if (diff < 3600) {
                    return result.format("Còn MM phút");
                }

                if (diff < 24 * 3600) {
                    return result.format("Còn HH giờ");
                }

                if (diff < 3 * 24 * 3600) {
                    return result.format("Còn DD ngày");
                }

                return time.format("DD/MM/YYYY");
            }
        }
    }));

    app.set('view engine', 'hbs');
};
