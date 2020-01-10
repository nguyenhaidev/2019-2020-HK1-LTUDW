const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nhokbm13@gmail.com',
        pass: 'nhokbmlove740119'
    }
});

module.exports = {
    createReceiverInfo: (email, subject, text) => {
        const receiver = {
            from: "CTDH ONLINE AUTION FLOOR",
            to: email,
            subject: subject,
            text: text,
            html: ""
        }

        return receiver;
    },
    sendMail: receiver => {
        transporter.sendMail(receiver, function(err, info) {
            if (err) {
                console.log(err);
            } else {
                console.log('Message sent: '+ info.response);
            }
        })
    }
}