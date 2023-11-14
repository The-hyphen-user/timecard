import express from 'express';
import mongoose from 'mongoose';
import Timecard from '../models/timecard.js';
import Jobsite from '../models/jobsite.js';
import isAuthenticated from '../util/isAuthenticated.js';
// route: /api/timecard

const router = express.Router();

router.get('/recent', isAuthenticated, async (req, res) => {
  try {
    const timecards = await Timecard.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(12);
    res.json(timecards);
  } catch (error) {
    console.log(error);
  }
});

router.get('/search/jobsite', isAuthenticated, async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobsiteId } = req.query;

    const timecards = await Timecard.find({ user: userId, jobsite: jobsiteId })
      .sort({ createdAt: -1 })
      .limit(5);
    console.log('sending back timecards:', timecards, 'id:', jobsiteId);
    res.json({ message: 'success', timecards, jobsiteId });
  } catch (error) {
    console.log(error);
  }
});

router.get('/search', isAuthenticated, async (req, res) => {
  try {
    const { searchTerm, startDate, endDate } = req.query;
    const userId = req.user._id;
    console.log(searchTerm)
    const query = {
      user: userId
    }
    if (searchTerm) {
      query.$or = [
        { description: { $regex: searchTerm, $options: 'i' } },
      ];
    }


    // if (startDate && endDate) {
    //   query.startDate = { $gte: new Date(startDate) };
    //   query.endDate = { $lte: new Date(endDate) };
    // }
    const timecards = await Timecard.find(query).limit(20);
    console.log('timecards', timecards)
    res.json({ timecards });
  } catch (error) {
    console.log(error);
  }
});

router.post('/create', isAuthenticated, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction(); // need session to update both or neither
  try {
    const timecardData = req.body.timecard;
    timecardData.user = req.user._id;
    const jobsiteId = timecardData.jobsite;
    const JobsiteToUpdate = await Jobsite.findById(jobsiteId);
    if (!JobsiteToUpdate) {
      res.status(404).json({ message: 'Jobsite not found' });
    }
    const currentHours = JobsiteToUpdate.totalHoursSoFar;
    const addedHours = parseFloat(timecardData.hours);
    const newHoursCalculation = currentHours + addedHours;
    const newStartTime = timecardData.startTime;
    const timecard = new Timecard(timecardData);

    const updatedJobsite = await Jobsite.findByIdAndUpdate(
      jobsiteId,
      { startTime: newStartTime, totalHoursSoFar: newHoursCalculation },
      { new: true },
    ).session(session);

    // Save Timecard and Jobsite changes
    await timecard.save({ session });
    await session.commitTransaction();

    res.json({
      message: 'Timecard submitted successfully',
      timecard,
      updatedJobsite,
      timecardId: timecard._id,
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback changes if there was an error
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    session.endSession();
  }
});

router.get('/', isAuthenticated, async (req, res) => {
  try {
    const timecards = await Timecard.find({ user: req.user._id });
    res.json(timecards);
  } catch (error) {
    console.log(error);
  }
});

export default router;
