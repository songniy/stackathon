const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const ejs = require('ejs')
const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_NO_REPLY_REFRESH_TOKEN,
  GOOGLE_NO_REPLY_EMAIL
} = process.env

const MAILING_SERVICE_CLIENT_ID = GOOGLE_CLIENT_ID
const MAILING_SERVICE_CLIENT_SECRET = GOOGLE_CLIENT_SECRET
const MAILING_SERVICE_REFRESH_TOKEN = GOOGLE_NO_REPLY_REFRESH_TOKEN
const SENDER_EMAIL_ADDRESS = GOOGLE_NO_REPLY_EMAIL

console.log(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  MAILING_SERVICE_REFRESH_TOKEN,
  SENDER_EMAIL_ADDRESS
)

const Mailing = {}
const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
)

const TEMPLATES = {
  subscribe: {
    fileName: 'subscribe.ejs',
    subject: '[ABC Inc.] Welcome to ABC Inc.'
  }
}

/**
 * Send Email
 */
Mailing.sendEmail = data => {
  oauth2Client.setCredentials({
    refresh_token: MAILING_SERVICE_REFRESH_TOKEN
  })
  const accessToken = oauth2Client.getAccessToken()
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL_ADDRESS,
      clientId: MAILING_SERVICE_CLIENT_ID,
      clientSecret: MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: MAILING_SERVICE_REFRESH_TOKEN,
      accessToken
    }
  })
  const filePath = `./client/components/template/${
    TEMPLATES[data.template].fileName
  }`
  ejs.renderFile(filePath, data, {}, (e, content) => {
    if (e) return e
    const mailOptions = {
      from: SENDER_EMAIL_ADDRESS,
      to: data.email,
      subject: TEMPLATES[data.template].subject,
      html: content
    }
    smtpTransport.sendMail(mailOptions, (err, info) => {
      if (err) return err
      return info
    })
  })
}
module.exports = Mailing
