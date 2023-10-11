import express from "express";
const router = express.Router();
import User from "../models/user.js";
import Recovery from "../models/recovery.js";
import Token from '../util/token.js'


router.post('/password-reset/:token', async (req, res) => {
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

router.post('/request-email', async (req, res) => {//need to send recovery emails, gunmail?
    try {
        const email = req.body.email
        if (!email){
            return res.status(404).json({ message: 'Email not found' })
        } else{
            User = await User.findOne({ email: email })
            const recovery = new Recovery(req.body)
            recovery.user = User._id
            await recovery.save()
            res.json({message: 'a recovery email has been sent to you'})
        }
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/request-username', async(req, res) => {
    try {
        const username = req.body.username
        if(!username) {
            return res.status(404).json({message: 'Username not found'})
        } else {
            const recoveryUser = await User.findOne({username: username})
            // const id = user.id
            const token = Token()
            const recovery = new Recovery({user: recoveryUser.id, token})
            await recovery.save()
            console.log('recovery:', recovery)
            //success 
            res.status(201).json({message: 'a recovery email has been sent to you'})
        }
    } catch (error) {
        console.log(error)
    }
})

export default router;