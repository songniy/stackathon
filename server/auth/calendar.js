const express = require('express')
const google = require('googleapis')
const privateKey = require('../../calendarPrivateKey.json')

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALENDAR_ALL_TOKEN,
  OAUTH_PLAYGROUND
} = process.env

//configure jwt client
let jwtClient = new google.Auth.JWT(
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
