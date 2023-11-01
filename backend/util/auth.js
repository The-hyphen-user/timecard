import express from 'express';
import passport from 'passport';
import User from '../models/user.js'
import Timecard from '../models/timecard.js'
import Jobsite from '../models/jobsite.js'
import UserActivation from '../models/userActivation.js'
const router = express.Router();
//route: /api/auth

router.post('/register', async (req, res) => {
    try{
        const { username, password, activationkey, admin } = req.body;
    
        const role = admin ? 'admin' : 'user';
        const userActivationSchema = await UserActivation.find({ activationKey: activationkey });
        const email = userActivationSchema.email;
    
        User.register(new User({ username, email, role }), password, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            passport.authenticate('local')(req, res, () => {
                res.status(201).json({ message: 'Registration successful', user: user });
            });
        });
    } catch (error) {
            console.log(error)
    }
});


// User login route
router.post('/login', passport.authenticate('local'), async (req, res) => {
    // console.log(res)
    const user = req.user;
    const datePlusOneWeek = new Date() 
    datePlusOneWeek.setDate(datePlusOneWeek.getDate() + 7)
    const recentTimecards = await Timecard.find({user: user}).sort({date : -1}).limit(15)
    const jobsiteIds = recentTimecards.map(timecard => timecard.jobsite)
    const uniqueJobsiteIds = Array.from(new Set(jobsiteIds));
    const recentUniqueJobsites = await Jobsite.find({ _id:uniqueJobsiteIds })
    
    const recentJobsites = await Jobsite.find({startDate: {$lte: datePlusOneWeek}}).sort({lastWorked: -1}).limit(15)
    res.json({ message: 'Login successful', user: req.user, recentTimecards, recentJobsites: recentUniqueJobsites, recentToAll: recentJobsites })
});


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.json({ message: 'Logout successful' })
    });
  });
// router.get('/logout', (req, res) => {
//     req.logout();
//     res.json({ message: 'Logout successful' });
// });
export default router;
