import express from "express";
const router = express.Router();
import Timecard from "../models/timecard.js";
import isAuthenticated from '../util/isAuthenticated.js'

router.post('/', isAuthenticated, async (req, res) => {
    try {
        const timecard = new Timecard(req.body)
        timecard.user = req.user._id
        await timecard.save()
        res.json({message: 'timecard submited', timecard: timecard})
    } catch (error) { console.log(error) }
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