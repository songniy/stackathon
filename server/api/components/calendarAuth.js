const express = require('express')
const {google} = require('googleapis')

let privateKey_Private_Key = ''
if (process.env.PGHOST === 'localhost') {
  privateKey_Private_Key = process.env.PRIVATEKEY_PRIVATE_KEY
} else {
  privateKey_Private_Key = process.env.PRIVATEKEY_PRIVATE_KEY.replace(
    /\\n/g,
    '\n'
  ).replace(/'/g, '')
}
const privateKey = {
  client_email: process.env.PRIVATEKEY_CLIENT_EMAIL,
  private_key: privateKey_Private_Key
}
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
