import express from 'express';
import session from 'express-session';
import passport from 'passport';
import passportLocal from 'passport-local';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/user.js';
import routes from './routes/index.js';
import path from 'path';

/* eslint-disable-next-line no-unused-vars */
import db from './db/db.js'

// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

dotenv.config();
const LocalStrategy = passportLocal.Strategy;
const PORT = process.env.API_LOCAL_PORT || 5000;
const { LOCAL_IP_ADDRESS } = process.env
const app = express();
const corsOptions = { origin: ['http://localhost:3000', 'http://localhost:3050', `http://${LOCAL_IP_ADDRESS}:3000`], credentials: true }

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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


// Middleware function to log requests
app.use((req, res, next) => {
    // Log the request URL and method
    console.log(`🦃[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Move to the next middleware in the chain
    next();
});

// Log static file requests
// app.use('/uploads', (req, res, next) => {
//     console.log(`🎄[${new Date().toISOString()}] Serving static file: ${req.url}`);
//     res.status(200).json({ test: 'uploads interupted' })
//     next();
// });

// Serve static files from the 'uploads' directory
app.use('/uploads/', express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
//     setHeaders: (res) => {
//         console.log('setting headers')
//         res.setHeader('Cache-Control', 'no-store');
//     },
// }));
app.use('/uploads', (req, res, next) => {
    console.log(`🎄[${new Date().toISOString()}] Serving static file: ${req.url}`);
    next();
});
app.use('/api', routes);


app.use('/', (req, res) => {
    res.status(200).send(`you have reached home ${req.path}, please leave a message after the beep... beep`)
})



app.listen(PORT, () => {
    console.log('app running on port 5000')
})
