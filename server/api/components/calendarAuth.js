const express = require('express')
const {google} = require('googleapis')

const privateKey = require('../../../calendarPrivateKey.json')

//configure jwt client

function CalendarAuth() {
  let jwtClient = new google.auth.JWT(
    privateKey.client_email,
    null,
    privateKey.private_key,
    ['https://www.googleapis.com/auth/calendar']
  )

  //authenticate request
  jwtClient.authorize((err, tokens) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Successfully connected!')
    }
  })
  return jwtClient
}

module.exports = CalendarAuth
