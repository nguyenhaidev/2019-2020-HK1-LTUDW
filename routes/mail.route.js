const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/send', function(req, res) {
    res.render('send.hbs');
})

router.post('/send', function(req, res, next) {
    var transporter =  nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nhokbm13@gmail.com',
            pass: 'nhokbmlove740119'
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: 'Tuong',
        to: 'nhokbm18@gmail.com',
        subject: 'Test Nodemailer',
        text: 'You recieved message from ' + req.body.email,
        html: '<p>You have got a new message</b><ul><li>Username:' + req.body.name + '</li><li>Email:' + req.body.email + '</li><li>Username:' + req.body.message + '</li></ul>'
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
});
