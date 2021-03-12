const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_CLIENT_ID,
    pass: 'SuperSecretPassword' // naturally, replace both with your real credentials or an application-specific password
  }
})

const mailOptions = {
  from: 'vindication@enron.com',
  to: 'friendsofenron@gmail.com, enemiesofenron@gmail.com',
  subject: 'Invoices due',
  text: 'Dudes, we really need your money.'
}

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error)
  } else {
    console.log('Email sent: ' + info.response)
  }
})
