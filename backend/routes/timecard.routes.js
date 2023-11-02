import express from "express";
const router = express.Router();
import Timecard from "../models/timecard.js";
import Jobsite from '../models/jobsite.js'
import isAuthenticated from '../util/isAuthenticated.js'
import mongoose from 'mongoose'
//route: /api/timecard

router.get('/recent', isAuthenticated, async (req, res) => {
    try {
        const timecards = await Timecard.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(12)
        res.json(timecards)
    } catch (error) {
        console.log(error)
    }
})

router.get('/search/jobsite', isAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id
        const jobsiteId = req.query.jobsiteId
        const timecards = await Timecard.find({ user: userId,jobsite: jobsiteId }).sort({ createdAt: -1 }).limit(5)
        console.log('sending back timecards:', timecards, 'id:',  jobsiteId)
        res.json({ message: 'success', timecards: timecards, jobsiteId: jobsiteId })
    } catch (error) {
        console.log(error)
    }
})

router.get('/search', isAuthenticated, async (req, res) => {
    try {
        const params = req.query
        const user = req.user._id
        const searchTerm = params.searchTerm
        const startDate = params.startDate
        const endDate = params.endDate
        const page = params.page
        const results = await Timecard.find({})
    } catch (error) {
        console.log(error)
    }
})

router.post('/create', isAuthenticated, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();//need session to update both or neither
    try {
        const timecardData = req.body.timecard;
        timecardData.user = req.user._id;
        const jobsiteId = timecardData.jobsite;
        const JobsiteToUpdate = await Jobsite.findById(jobsiteId)
        if (!JobsiteToUpdate) {
            return res.status(404).json({ message: 'Jobsite not found' });
        }
        const currentHours = JobsiteToUpdate.totalHoursSoFar
        const addedHours = parseFloat(timecardData.hours)
        const newHoursCalculation = currentHours + addedHours
        const newStartTime = timecardData.startTime 
        const timecard = new Timecard(timecardData);
        
        const updatedJobsite = await Jobsite.findByIdAndUpdate(
            jobsiteId,
            { startTime: newStartTime, totalHoursSoFar: newHoursCalculation },
            { new: true }
        ).session(session);

        // Save Timecard and Jobsite changes
        await timecard.save({ session: session });
        await session.commitTransaction();

        res.json({
            message: 'Timecard submitted successfully',
            timecard: timecard,
            updatedJobsite: updatedJobsite,
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

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const timecards = await Timecard.find({ user: req.user._id })
        res.json(timecards)
    } catch (error) {
        console.log(error)
    }
})

export default router;