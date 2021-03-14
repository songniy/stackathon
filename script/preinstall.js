const fs = require('fs')
console.log(process.env)
fs.writeFile(
  '../GOOGLE_APPLICATION_CREDENTIALS.json',
  process.env.GOOGLE_CONFIG,
  (err) => {}
)
