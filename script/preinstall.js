const fs = require('fs')
fs.writeFile(
  '../GOOGLE_APPLICATION_CREDENTIALS.json',
  process.env.GOOGLE_CONFIG,
  (err) => {}
)
