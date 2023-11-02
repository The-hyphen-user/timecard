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

        const email = req.body.email
        if (!email) {
            res.status(404).json({ message: 'missing email' })
        }
        const dupUser = await User.findOne({ email: email })
        if (dupUser) {
            res.status(409).json({ message: "email already taken" })
        }

        while (tokenExists) {
            newToken = Token(32);
            const existingActivation = await UserActivation.findOne({ activationKey: newToken });

            if (!existingActivation) {
                tokenExists = false;

            }
        }
        const userActivation = new UserActivation({ email: email, activationKey: newToken })
        await userActivation.save()
        console.log('userActivation:', userActivation)
        res.status(201).json({ message: 'User created', activationKey: userActivation.activationKey })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error at activation key creation' });
    }
})




export default router;