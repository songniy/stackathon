const express = require('express')
const Mailing = require('../../client/components/emailer')
//import {SOME_THING_WENT_WRONG} from '../store/constant'
//import {generateServerErrorCode} from '../store/utils'
const mailingController = express.Router()
/**
 * POST/ User subscribe to App
 */
mailingController.post('/', (req, res, next) => {
  try {
    //req.query should be an object with {email,template}
    //email could come from database.
    //Mailing.sendEmail(req.query)
    res.status(200).json({message: 'email sent successfully'})
  } catch (e) {
    next(console.log('something went wrong res,event', res, 500, e))
  }
})
module.exports = mailingController
