const express = require('express')
const {google} = require('googleapis')
let privateKey
if (process.env.PGHOST === 'localhost') {
  privateKey = require('../../../GOOGLE_APPLICATION_CREDENTIALS.json')
} else {
  privateKey = process.env.GOOGLE_APPLICATION_CREDENTIALS.replace(/\\n/g, '\n')
}

// const privateKey = {
//   client_email: process.env.PRIVATEKEY_CLIENT_EMAIL,
//   private_key: privateKey_Private_Key,
// }
// //configure jwt client

function CalendarAuth() {
  console.log('privateKey process.env', privateKey, process.env)
  if (process.env.PGHOST === 'localhost') {
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
}

module.exports = CalendarAuth
