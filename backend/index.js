import express from 'express';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/user.js';
import routes from './routes/index.js';
/* eslint-disable-next-line no-unused-vars */
import db from './db/db.js'


dotenv.config();
const LocalStrategy = passportLocal.Strategy;


const PORT = process.env.API_LOCAL_PORT || 5000;
const app = express();
const corsOptions = { origin: ['http://localhost:3000', 'http://localhost:3050'], credentials: true }
app.use(cors(corsOptions));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET_KEY, // Change this to a secure secret key
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/api', routes);


app.use('/', (req, res) => {
    res.send('you have reached home, please leave a message after the beep... beep')
})



app.listen(PORT, () => {
    console.log('app running on port 5000')
})
