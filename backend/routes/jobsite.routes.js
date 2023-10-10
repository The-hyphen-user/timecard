import express from "express";
const router = express.Router();
import Timecard from "../models/timecard.js";
import Jobsite from "../models/jobsite.js";
import isAuthenticated from '../util/isAuthenticated.js'
import isAdmin from '../util/isAdmin.js'




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

router.post('/create', isAuthenticated, isAdmin, async (req, res) => {
    try{
        const jobsite = new Jobsite(req.body);
        await jobsite.save();
        res.json(jobsite)
    } catch(error){
        console.log(error)
    }
})

export default router;