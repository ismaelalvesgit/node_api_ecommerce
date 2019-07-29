var MailConfig = require('../../config/mail');
var hbs = require('nodemailer-express-handlebars');
var gmailTransport = MailConfig.GmailTransport;
var smtpTransport = MailConfig.SMTPTransport;
let environment = process.env;
module.exports.sendEmail = function(app, req, res){
    let HelperOptions = {
        from: '"Tariqul islam" <'+environment.SMTP_USER_NAME+'>',
        to: req.body.email,
        subject: 'Hellow world!',
        template: 'email',
        context: {
          name:"tariqul_islam",
          email: "tariqul.islam.rony@gmail.com",
          address: "52, Kadamtola Shubag dhaka"
        }
      };
    gmailTransport.sendMail(HelperOptions, (error,info) => {
    if(error) {
        console.log(error);
        res.json(error);
    }
    console.log("email is send");
    console.log(info);
    res.json(info)
    });
}