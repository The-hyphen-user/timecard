import express from "express";
const router = express.Router();
import authRoutes from '../util/auth.js'
import timecardRoutes from './timecard.routes.js'
import jobsiteRoutes from './jobsite.routes.js'
import recovery from './recovery.routes.js'

//route: /api
router.use('/auth', authRoutes)

router.use('/timecard', timecardRoutes)
router.use('/jobsite', jobsiteRoutes)
router.use('/recovery', recovery)



export default router;