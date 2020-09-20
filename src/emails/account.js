const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'navid@mail.com',
        subject: 'Welcome',
        text: `Hello, ${name}. Your account was created successfully.`
    })
};

module.exports = {
    sendWelcomeEmail,
};