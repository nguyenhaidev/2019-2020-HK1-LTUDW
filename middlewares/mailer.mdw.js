const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kennythai76935@gmail.com',
        pass: 'cucduong@123'
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