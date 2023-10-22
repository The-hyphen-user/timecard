import mongoose from 'mongoose';

const jobsiteSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        required: true
    },
    isMisc:{
        type: Boolean,
        default: false,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    totalHoursSoFar:{
        type: Number,
        required: true
    },
    createDate:{
        type: Date,
        default: Date.now,
        required: true
    },
    lastWorked:{
        type: Date,
        required: true
    },
});

const Jobsite = mongoose.model('Jobsite', jobsiteSchema);

export default Jobsite;
