import express from 'express';
import passport from 'passport';
import User from '../models/user.js'
import Timecard from '../models/timecard.js'
const router = express.Router();

// User registration route
// router.post('/register', (req, res) => {
//     const { username, password } = req.body;
//     User.register(new User({ username }), password,  (err, user) => {
//         if (err) {
//             return res.status(500).json({ error: err.message });
//         }
//         passport.authenticate('local')(req, res, () => {
//             res.status(201).json({ message: 'Registration successful' });
//         });
//     });
// });

router.post('/register', (req, res) => {
    const { username, email, password, admin } = req.body;

    const role = admin ? 'admin' : 'user';

    User.register(new User({ username, email, role }), password, (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.status(201).json({ message: 'Registration successful' });
        });
    });
});


// User login route
router.post('/login', passport.authenticate('local'), async (req, res) => {
    // console.log(res)
    const user = req.user;
    const recentTimecards = await Timecard.find({ user: user._id }).sort({ date: 1 }).limit(5);
    res.json({ message: 'Login successful', user: req.user, recentTimecards })
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
