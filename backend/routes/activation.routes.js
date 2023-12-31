import express from 'express';
import dotenv from 'dotenv'
// import mongoose from 'mongoose'
import User from '../models/user.js';
import UserActivation from '../models/userActivation.js';
// import Recovery from "../models/recovery.js";
import Token from '../util/token.js';
import sendEmail from '../util/elasticEmail.js';
// route: /api/activation

const router = express.Router();

dotenv.config();

const { ENV, PROD_HOST_IP } = process.env


router.post('/createactivation', async (req, res) => {
  try {
    let newToken;
    let tokenExists = true;

    const { email, username, role } = req.body;
    if (!email || !username || !role) {
      res.status(404).json({ message: 'missing information' });
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
      email, username, role,
      activationKey: newToken,
    });
    await userActivation.save();
    const prodActivationLink = `http://${PROD_HOST_IP}/signup/${newToken}`
    const activationLink = `http://localhost:3000/signup/${newToken}`//  change me
    const professionalLink = `http://danielwamsher.com/signup/${newToken}`
    const message = `Hello ${username}, you have been invited to use Fast Track Timecards \n please go to ${professionalLink} to finish your sign up`
    if (ENV === 'prod') {
      await sendEmail({ recipientEmail: email, content: message })
    } else {
      await sendEmail({ recipientEmail: email, content: `please go to: ${activationLink} to activate your account, username: ${username}` })
    }
    // await sendEmail({ recipientEmail: email, content: `please go to: ${activationLink} to activate your account` })
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
