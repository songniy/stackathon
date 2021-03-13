const {google} = require('googleapis')

let calendar = google.calendar('v3')

async function getAllCalendarEvents(eventsNum, auth) {
  let answer = await calendar.events.list({
    auth: auth,
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    singleEvents: true,
    maxResults: eventsNum,
    timeMin: new Date().toISOString()
  })
  console.log('answer', answer)
  return answer
}
module.exports = {getAllCalendarEvents}
