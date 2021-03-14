const express = require('express')
const {google} = require('googleapis')

// const privateKey = {
//   client_email: process.env.PRIVATEKEY_CLIENT_EMAIL,
//   private_key: privateKey_Private_Key,
// }
// //configure jwt client

function CalendarAuth() {
  let privateKey
  if (process.env.PGHOST === 'localhost') {
    privateKey = require('../../../GOOGLE_APPLICATION_CREDENTIALS.json')
  } else {
    privateKey = process.env.GOOGLE_APPLICATION_CREDENTIALS
    console.log('privateKey pre-corr', privateKey)
    // if (privateKey.private_key) {
    //}
  }

  console.log(' process.env', process.env)
  privateKey.private_key.replace(/\\n/g, "\n' + '")
  console.log('privateKey post-corr', privateKey)

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
