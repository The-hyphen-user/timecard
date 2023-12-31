import express from 'express';
import path from 'path'
import fs from 'fs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import Timecard from '../models/timecard.js';
import Jobsite from '../models/jobsite.js';
import isAuthenticated from '../util/isAuthenticated.js';
// import isAdmin from '../util/isAdmin.js'

// route: /api/jobsite


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();



router.get('/', isAuthenticated, async (req, res) => {
  try {
    const timecards = await Timecard.find({ user: req.user._id });
    res.json(timecards);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.post('/create', async (req, res) => {
  // taken out for testing: isAuthenticated, isAdmin,
  try {
    if (!req.body.startDate) {
      req.body.startDate = Date.now();
    }
    const jobsite = new Jobsite(req.body);

    if (req.body.imageData) {
      // Use uuid to generate a unique filename
      const uniqueFilename = `${uuidv4()}.jpg`;

      // Save the image file with the unique filename
      const imagePath = path.join(__dirname, '../uploads', uniqueFilename);

      fs.writeFileSync(imagePath, req.body.imageData, 'base64');

      // Set the imageURL in the jobsite model
      jobsite.imageURL = `/uploads/${uniqueFilename}`;
    }

    jobsite.lastWorked = req.body.startDate;

    console.log('last worked', jobsite.lastWorked);
    await jobsite.save().then((result) => {
      res.json({ jobsite, id: result.id });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/all', isAuthenticated, async (req, res) => {
  try {
    const jobsites = await Jobsite.find({});
    res.json(jobsites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {// dates go into timecard not jobsite
  // taken out for testing: isAuthenticated,
  try {
    const { searchTerm, searchQuantity, startDate, endDate } = req.query;
    const quantity = searchQuantity || 10;
    console.log('dates', startDate, endDate)
    const query = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
        { city: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
      ],
    };
    if (startDate && endDate) {
      query.lastWorked = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    console.log('search dates:', startDate, endDate)
    const jobsites = await Jobsite.find(query).limit(
      parseInt(quantity, 10),
    );
    console.log('jobsites', jobsites);
    res.json({ jobsites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/recenttome', async (req, res) => {
  // taken out for testing: isAuthenticated,
  try {
    const { user } = req;
    const datePlusOneWeek = new Date();
    datePlusOneWeek.setDate(datePlusOneWeek.getDate() + 7);
    const recentTimecards = await Timecard.find({ user })
      .sort({ date: -1 })
      .limit(15);
    const jobsiteIds = recentTimecards.map((timecard) => timecard.jobsite);
    console.log('letsgo:', recentTimecards);
    const uniqueJobsiteIds = Array.from(new Set(jobsiteIds));
    const recentUniqueJobsites = await Jobsite.find({ _id: uniqueJobsiteIds });
    console.log(recentUniqueJobsites);

    res.json({ jobsites: recentUniqueJobsites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/recenttoall', async (req, res) => {
  // taken out for testing: isAuthenticated,
  try {
    const { searchQuantity } = req.query;
    // const recentJobsites =  await Jobsite.find({}).sort({lastWorked: -1}).limit(5)

    // console.log('iso date', isoDate)
    const datePlusOneWeek = new Date();
    datePlusOneWeek.setDate(datePlusOneWeek.getDate() + 7);
    const recentJobsites = await Jobsite.find({
      startDate: { $lte: datePlusOneWeek },
    })
      .sort({ lastWorked: -1 })
      .limit(searchQuantity);
    res.json({ jobsites: recentJobsites });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/delete/:id', isAuthenticated, async (req, res) => {
  const jobsiteId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(jobsiteId)) {
    return res.status(400).json({ error: 'Invalid jobsite ID' });
  }
  try {
    const jobsite = await Jobsite.findById(jobsiteId);

    if (!jobsite) {
      return res.status(404).json({ message: 'Jobsite not found' });
    }

    const imageURL = jobsite.imageURL;

    const deletedJobsite = await Jobsite.findByIdAndRemove(jobsiteId);
    if (deletedJobsite) {
      if (imageURL) {
        const imagePath = path.join(__dirname, `../uploads/${imageURL}`);
        await fs.unlink(imagePath);
      }
      res.status(204).json({ message: "jobsite succcessfully deleted" })
    } else {
      res.status(404).json({ message: "jobsite not found" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


export default router;
