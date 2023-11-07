import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import User from '../models/user.js';
import Timecard from '../models/timecard.js';
import Jobsite from '../models/jobsite.js';
import UserActivation from '../models/userActivation.js';

const router = express.Router();
// route: /api/auth

router.post('/register', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { username, password, activationkey, admin } = req.body;

    const role = admin ? 'admin' : 'user';
    const userActivation = await UserActivation.findOne({
      activationkey,
    }).session(session);
    if (userActivation) {
      const { email } = userActivation;
      const user = new User({ username, email, role });
      await user.setPassword(password);
      await user.save({ session });

      await UserActivation.deleteOne({ activationKey: activationkey }).session(
        session,
      );

      await session.commitTransaction();
      session.endSession();
      res.status(201).json({ user })
    } else {
      await session.abortTransaction();
      session.endSession();
      res.status(404).json({ message: 'Invalid Activation key' });
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error /api/auth/register' });
  }
});

/* old working reg, but keeps keys
router.post('/register', async (req, res) => {
    try {
        const { username, password, activationkey, admin } = req.body;

        const role = admin ? 'admin' : 'user';
        const userActivation = await UserActivation.find({ activationKey: activationkey })
        if (activationkey) {
            const email = userActivation.email;

            User.register(new User({ username, email, role }), password, (err, user) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                passport.authenticate('local')(req, res, () => {
                    res.status(201).json({ message: 'Registration successful', user: user });
                });
            });
        } else {
            res.status(404).json({message: 'Invalid Activation key'})
        }
    } catch (error) {
        console.log(error)
    }
});
*/

// User login route
router.post('/login', passport.authenticate('local'), async (req, res) => {
  // console.log(res)
  const { user } = req;
  const datePlusOneWeek = new Date();
  datePlusOneWeek.setDate(datePlusOneWeek.getDate() + 7);
  const recentTimecards = await Timecard.find({ user })
    .sort({ date: -1 })
    .limit(15);
  const jobsiteIds = recentTimecards.map((timecard) => timecard.jobsite);
  const uniqueJobsiteIds = Array.from(new Set(jobsiteIds));
  const recentUniqueJobsites = await Jobsite.find({ _id: uniqueJobsiteIds });

  const recentJobsites = await Jobsite.find({
    startDate: { $lte: datePlusOneWeek },
  })
    .sort({ lastWorked: -1 })
    .limit(15);
  res.json({
    message: 'Login successful',
    user: req.user,
    recentTimecards,
    recentJobsites: recentUniqueJobsites,
    recentToAll: recentJobsites,
  });
});

// router.get('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         res.json({ message: 'Logout successful' })
//     });
// });
// router.get('/logout', (req, res) => {
//     req.logout();
//     res.json({ message: 'Logout successful' });
// });
export default router;
