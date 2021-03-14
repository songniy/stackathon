const express = require('express')
const Mailing = require('./components/emailer')
const {isAdminUser} = require('./components/gatekeeper')
const mailingController = express.Router()
/**
 * POST/ User subscribe to App
 */
mailingController.post('/', isAdminUser, (req, res, next) => {
  try {
    //req.query should be an object with {email,template}
    //email need to also trigger tracker in the database.
    //How to test the route: http://localhost:8080/api/mailing?email=songniy@gmail.com&template=subscribe
    const data = {email: req.query.email, template: req.query.template}
    //above for security reasons
    Mailing.sendEmail(data)
    res.status(200).json({message: 'email sent successfully'})
  } catch (e) {
    next(console.log('something went wrong res,event', res, 500, e))
  }
})

module.exports = mailingController
