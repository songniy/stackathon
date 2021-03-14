const {google} = require('googleapis')

let calendar
if (process.env.PGHOST === 'localhost') {
  calendar = google.calendar('v3')
} else {
  calendar = google.calendar('v3')
}

async function getAllCalendarEvents(eventsNum, auth) {
  let events = await calendar.events.list({
    auth: auth,
    calendarId: process.env.GOOGLE_CALENDAR_ID,
    singleEvents: true,
    maxResults: eventsNum,
    timeMin: new Date().toISOString()
  })
  return events
}

async function addCalendarEvent(){
  return
}
module.exports = {getAllCalendarEvents,addCalendarEvent}
