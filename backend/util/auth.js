import express from 'express';
import passport from 'passport';
import User from '../models/user.js'
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
router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
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
