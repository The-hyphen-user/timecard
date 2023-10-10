import express from "express";
const router = express.Router();
import timecardRoutes from './timecard.routes.js'
import authRoutes from '../util/auth.js'

router.use('/auth', authRoutes)

router.use('/timecard', timecardRoutes)



export default router;