import express from "express";
const router = express.Router();
import User from "../models/user.js";
import Recovery from "../models/recovery.js";


router.post('/:token', async (req, res) => {
    try{
        const user = await User.findOne({ username: req.body.username })
        if(!user){
            return res.status(404).json({ message: 'User not found' })
        } else{
            user.password = req.body.password
            await user.save()
            res.json(user)
        }
    } catch(error){
        console.log(error)
    }
})

router.post('/', async (req, res) => {//need to send recovery emails, gunmail?
    try {
        const email = req.body.email
        if (!email){
            return res.status(404).json({ message: 'Email not found' })
        } else{
            User = await User.findOne({ email: email })
            const recovery = new Recovery(req.body)
            recovery.user = User._id
            await recovery.save()
            res.json(recovery)
        }
    }
    catch (error) {
        console.log(error)
    }
})

export default router;