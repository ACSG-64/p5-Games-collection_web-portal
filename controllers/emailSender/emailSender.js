const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function sendActivationMail(emailAddress, userRealName, activationCode) {
    const mailOptions = {
        from: 'agonware@gmail.com',
        to: emailAddress,
        subject: 'p5 Games - Activate your account',
        html: `<p>Hello ${userRealName}.</p>. 
<p>Thank you for registering on 'p5 Games'. To activate your account, click on this link or copy it into your browser's search bar: <a href="https://p5-games.acsg.repl.co/auth/activation/${activationCode}">https://p5-games.acsg.repl.co/auth/activation/${activationCode}</a></p>
<p>If you have not registered on <a href="https://p5-games.acsg.repl.co/">'p5 Games'</a>, please ignore this email.</p>`
    };
    await transporter.sendMail(mailOptions);
}

module.exports = {sendActivationMail}
