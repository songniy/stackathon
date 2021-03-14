const fs = require('fs')
console.log(process.env)
if (!process.env.TAVIS_OS_NAME) {
  let googleAuth = {}
  if (process.env.GOOGLE_CONFIG) {
    googleAuth = process.env.GOOGLE_CONFIG
  }
  fs.writeFile(
    '../GOOGLE_APPLICATION_CREDENTIALS.json',
    googleAuth,
    (err) => {}
  )
}
