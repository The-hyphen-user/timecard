import express from 'express';
import cors from 'cors';
import db from './db/db.js';
import dotenv from 'dotenv';
dotenv.config();

import postRoutes from './routes/posts.js';


const app = express();
app.use(cors());
app.use(express.json());


app.use('/posts', (req, res, done) => {
    console.log('request received at /posts');
    done();
}, postRoutes);

app.use('/', (req, res) => {
    res.send('you have reached home, please leave a message after the beep, beep')
})



app.listen('5000', () => {
    console.log('app running on port 5000')
})
