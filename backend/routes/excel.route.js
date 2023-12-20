import express from 'express';
import Timecard from '../models/timecard.js';
import Key from '../models/key.js';
import Jobsite from '../models/jobsite.js';
// import formatForSpreadsheet from '../util/formatForSpreadsheet.js';



const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // console.log('headers:', req.headers)
    const { timecardaccesskey } = req.headers;
    const { startDate, endDate } = req.query;
    if (!timecardaccesskey) {
      console.log('missing key')
    }

    console.log('startend times:', startDate, endDate)
    // const validKey = await Key.find({ key: timecardaccesskey })
    // console.log('key?', validKey)

    // if (validKey.length === 0 || !validKey) {
    //   res.status(401).send('Unauthorized 2')
    // } else 
    if (!startDate || !endDate || startDate === null || endDate === null) {
      const oneWeekAgo = new Date(new Date().setDate(new Date().getDate() - 7))
      const today = new Date()
      const timecards = await Timecard.find({
        date: {
          $gte: new Date(oneWeekAgo.setHours(0, 0, 0, 0)),
          $lte: new Date(today.setHours(23, 59, 59, 999)),
        }
      })
        .populate('jobsite', 'name')
        .populate('user', 'username')
        .limit(100)
      console.log('timecards', timecards)
      // const dataSheet = formatForSpreadsheet(timecards, 4) 
      // res.status(200).send(dataSheet)
      // res.status(200).send(dataSheet)
      res.status(200).send(timecards)
    } else {
      const timecards = await Timecard.find({ date: { $gte: startDate, $lte: endDate } })
        .populate('jobsite', 'name')
        .populate('user', 'username')
        .limit(100)
      res.status(200).send(timecards)
    }
  }
  catch (err) {
    console.log(err)
  }
})

export default router;