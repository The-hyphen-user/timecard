import express from "express";
const router = express.Router();
import User from "../models/user.js";
import UserActivation from "../models/userActivation.js";
import Recovery from "../models/recovery.js";
import Token from '../util/token.js'
//route: /api/activation
router.post('/create', async (req, res) => {
    try {
        let newToken;
        let tokenExists = true;

        while (tokenExists) {
            newToken = Token(16);
            const existingActivation = await UserActivation.findOne({ activationKey: newToken });

            if (!existingActivation) {
                tokenExists = false;
            }
            const userActivation = new UserActivation({ email: req.body.email, activationKey: newToken })
            await userActivation.save()
            console.log('userActivation:', userActivation)
            res.status(201).json({ message: 'User created', activationKey: userActivation.activationKey })
        }
    }
    catch (error) {
        console.log(error)
    }
})


export default router;