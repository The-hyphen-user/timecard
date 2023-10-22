import express from "express";
const router = express.Router();
import authRoutes from '../util/auth.js'
import timecardRoutes from './timecard.routes.js'
import jobsiteRoutes from './jobsite.routes.js'
import recovery from './recovery.routes.js'
import activationRoutes from './activation.routes.js'

//route: /api
router.use('/auth', authRoutes)

router.use('/timecard', timecardRoutes)
router.use('/jobsite', jobsiteRoutes)
router.use('/recovery', recovery)

router.use('/activation', activationRoutes)



export default router;