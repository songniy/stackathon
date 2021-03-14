const fs = require('fs')
console.log(process.env)
if (!process.env.TAVIS_OS_NAME) {
  fs.writeFile(
    '../GOOGLE_APPLICATION_CREDENTIALS.json',
    process.env.GOOGLE_CONFIG,
    (err) => {}
  )
}
