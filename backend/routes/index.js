import express from 'express';
import authRoutes from '../util/auth.js';
import timecardRoutes from './timecard.routes.js';
import jobsiteRoutes from './jobsite.routes.js';
import recovery from './recovery.routes.js';
import activationRoutes from './activation.routes.js';
import uploadRoutes from './upload.routes.js'
import excel from './excel.route.js';


const router = express.Router();

// route: /api
router.use('/auth', authRoutes);

router.use('/timecard', timecardRoutes);
router.use('/jobsite', jobsiteRoutes);
router.use('/recovery', recovery);
router.use('/excel', excel)

router.use('/upload', uploadRoutes)

router.use('/activation', activationRoutes);

export default router;
