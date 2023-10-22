import express from "express";
const router = express.Router();
import Timecard from "../models/timecard.js";
import Jobsite from "../models/jobsite.js";
import isAuthenticated from '../util/isAuthenticated.js'
import isAdmin from '../util/isAdmin.js'

//route: /api/jobsite



router.get("/", isAuthenticated, async (req, res) => {
    try {
        const timecards = await Timecard.find({ user: req.user._id })
        res.json(timecards)
    } catch (error) {
        console.log(error)
    }
})

router.get("/all", isAuthenticated, async (req, res) => {
    try {
        const jobsites = await Jobsite.find({})
        res.json(jobsites)
    } catch (error) {
        console.log(error)
    }
})

router.get('/search', isAuthenticated, async (req, res) => {
    try{
        const query = req.query;
        const timecards = await Timecard.find(query)
        res.json(timecards)
    } catch(error){
        console.log(error)
    }
})

router.get('/recent', async (req, res) => {//taken out for testing: isAuthenticated,
    try{
        // const recentJobsites =  await Jobsite.find({}).sort({lastWorked: -1}).limit(5)
        const datePlusOneWeek = new Date()
        datePlusOneWeek.setDate(datePlusOneWeek.getDate() - 7)
        const recentJobsites = await Jobsite.find({startDate: {$lte: datePlusOneWeek}}).sort({lastWorked: -1}).limit(5)
        res.json(recentJobsites)
    } catch(error){
        console.log(error)
    }
})

router.post('/create',  async (req, res) => {//taken out for testing: isAuthenticated, isAdmin,
    try{
        if (!req.body.startDate) {
            req.body.startDate = Date.now()
        }
        const jobsite = new Jobsite(req.body);
        jobsite.lastWorked = req.body.startDate
        await jobsite.save()
        .then((result) => {
            res.json({jobsite:jobsite, id: result.id})
        })
    } catch(error){
        console.log(error)
    }
})

export default router;