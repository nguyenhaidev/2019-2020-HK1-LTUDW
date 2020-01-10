const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nhokbm13@gmail.com',
        pass: 'nhokbmlove740119'
    }
});

module.exports = {
    sendMail: options => {
        options.from = 'support@cdth.com';
        transporter.sendMail(options, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}