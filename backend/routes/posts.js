import express from 'express';
import db from '../db/db.js';

const router = express.Router();

//get
router.get('/', async (req, res) => {
    let posts = await db.collection('posts').find({}).toArray()
    console.log('posts', posts);
    res.send(posts).status(200);

})



router.post('/', async (req, res) => {
    // let collection = await db.collection('posts')
    console.log('req.body: ', req.body);
    let post = req.body
    if (!post.title) {
        res.send('title req').status(400)
        return
    } else {
        let posts = await db.collection('posts')
        let result = await posts.insertOne(post)
        res.send(result).status(200)
    } 
})


export default router;
