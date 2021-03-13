const express = require('express')
const {getAllCalendarEvents} = require('./components/calendar')
const calendarAuth = require('./components/calendarAuth')
const calendarController = express.Router()

calendarController.get('/events/:num', async (req, res, next) => {
  try {
    if (typeof parseInt(req.params.num) === 'number') {
      const auth = await calendarAuth()
      console.log(auth)
      const {data} = await getAllCalendarEvents(parseInt(req.params.num), auth)
      console.log('calendar get data', data)
      res.json(data)
    }
  } catch (err) {
    next(console.log('something went wrong, res,event', res, 500, err))
  }
})

module.exports = calendarController
