const nodemailer = require('nodemailer')
const {google} = require('googleapis')
const {OAuth2} = google.auth
const ejs = require('ejs')
const OAUTH_PLAYGROUND = process.env.OAUTH_PLAYGROUND

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

const Mailing = {}
const oauth2Client = new OAuth2(
  MAILING_SERVICE_CLIENT_ID,
  MAILING_SERVICE_CLIENT_SECRET,
  OAUTH_PLAYGROUND
)

const TEMPLATES = {
  applicationApproved: {
    fileName: 'applicationApproved.ejs',
    subject: 'Your Adoption Application Has Been Approved!'
  },
  applicationSubmitted: {
    fileName: 'applicationSubmitted.ejs',
    subject: 'Your Adoption Application Has Been Submitted'
  },
  scheduleReference: {
    fileName: 'scheduleReference.ejs',
    subject: 'Contacting References On Your Adoption Application'
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
  const filePath = `./components/template/${TEMPLATES[data.template].fileName}`
  ejs.renderFile(filePath, data, {}, (e, content) => {
    if (e) return e
    const mailOptions = {
      from: 'SENDER_EMAIL_ADDRESS',
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
