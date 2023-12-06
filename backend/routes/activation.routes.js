import express from 'express';
// import mongoose from 'mongoose'
import User from '../models/user.js';
import UserActivation from '../models/userActivation.js';
// import Recovery from "../models/recovery.js";
import Token from '../util/token.js';
import sendEmail from '../util/elasticEmail.js';
// route: /api/activation

const router = express.Router();

router.post('/createactivation', async (req, res) => {
  try {
    let newToken;
    let tokenExists = true;

    const { email } = req.body;
    if (!email) {
      res.status(404).json({ message: 'missing email' });
    }
    const dupUser = await User.findOne({ email });
    if (dupUser) {
      res.status(409).json({ message: 'email already taken' });
    }

    while (tokenExists) {
      newToken = Token(32);
      /* eslint-disable no-await-in-loop */
      const existingActivation = await UserActivation.findOne({
        activationKey: newToken,
      });

      if (!existingActivation) {
        tokenExists = false;
      }
    }
    const userActivation = new UserActivation({
      email,
      activationKey: newToken,
    });
    await userActivation.save();
    const activationLink = `http://localhost:3000/signup/${newToken}`//  change me
    await sendEmail({ recipientEmail: email, content: `please go to: ${activationLink} to activate your account` })
    console.log('userActivation:', userActivation);
    res
      .status(201)
      .json({
        message: 'User created',
        activationKey: userActivation.activationKey,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Internal Server Error at activation key creation' });
  }
});

router.post('/activateuser', async (req, res) => {
  try {
    const { activationKey, email, username, password } = req.body
    const newUserActivation = await UserActivation.findOne({ email, activationKey })

    if (newUserActivation && username && password) {
      const newUser = await User.create({
        username,
        password,
        email,
        role: 'user',
      })

      res.status(201).json({ newUser })
    } else {
      res.status(404).json({ message: "missing user activation, username or password" })
    }
  } catch (error) {
    console.error('an error accured', error)
    res.status(500).json({ error })
  }
})

export default router;
