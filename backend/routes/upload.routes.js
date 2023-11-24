// routes/upload.js
import express from 'express';
import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import Jobsite from '../models/jobsite.js';

const router = express.Router();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// File upload handling using multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueFilename);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Only images are allowed!');
        }

    },
});

// API upload route
router.post('/', upload.single('file'), async (req, res) => {
    try {
        // Access the uploaded file information
        const file = req.file;

        // console.log('File stored at:', path.join(__dirname, '../uploads', file.originalname));


        // Process the file as needed (e.g., save file details to a database)
        // Process the file as needed (e.g., save file details to a database)
        const jobsite = new Jobsite({ imageURL: `/uploads/${file.filename}` });
        await jobsite.save();
        // Send a response indicating success
        res.status(200).json({ message: 'File uploaded successfully', file: file });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
