import express from "express";
const router = express.Router();
import Timecard from "../models/timecard.js";
import isAuthenticated from '../util/isAuthenticated.js'
//route: /api/timecard

router.get('/recent', isAuthenticated, async (req, res) => {
    try {
        const timecards = await Timecard.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(12)
        res.json(timecards)
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

router.post('/', isAuthenticated, async (req, res) => {
    try {
        const timecard = new Timecard(req.body)
        timecard.user = req.user._id
        await timecard.save()
        res.json({ message: 'timecard submited', timecard: timecard })
    } catch (error) {
        console.log(error)
    }
})

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const timecards = await Timecard.find({ user: req.user._id })
        res.json(timecards)
    } catch (error) {
        console.log(error)
    }
})

export default router;